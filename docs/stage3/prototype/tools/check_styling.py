"""Enforce the prototype's Tailwind-only authoring boundary (not generated dist)."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
FORBIDDEN = [
    (r'\bstyle\s*=', 'inline style attribute'),
    (r'\.\s*style\b|\[\s*[\'\"]style[\'\"]\s*\]', 'JavaScript style access'),
    (r'\b(?:cssText|insertRule|adoptedStyleSheets)\b', 'stylesheet mutation'),
    (r'(?:setAttribute|createElement)\s*\(\s*[\'\"]style[\'\"]', 'injected styles'),
    (r'<style\b|@apply\b', 'authored CSS'),
    (r'\bstyled\s*[.(]|\bcss\s*`', 'CSS-in-JS'),
]


def stylesheet_errors(text):
    """Only the Tailwind import, flat theme tokens and local fonts are allowed."""
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    errors = []
    imports = re.findall(r'@import\s+([\'\"])tailwindcss\1\s*;', text)
    if len(imports) != 1:
        errors.append('theme.css must import Tailwind exactly once')
    text = re.sub(r'@import\s+([\'\"])tailwindcss\1\s*;', '', text)
    blocks = list(re.finditer(r'@(theme|font-face)\s*\{([^{}]*)\}', text))
    if sum(m[1] == 'theme' for m in blocks) != 1:
        errors.append('theme.css must have one centralized @theme block')
    for block in blocks:
        for declaration in block[2].split(';'):
            if not declaration.strip():
                continue
            prop, sep, value = declaration.partition(':')
            prop, value = prop.strip(), value.strip()
            if not sep or not value:
                errors.append('invalid theme/font declaration')
            elif block[1] == 'theme' and not re.fullmatch(r'--[a-zA-Z0-9-]+', prop):
                errors.append('only custom-property tokens are allowed inside @theme')
            elif block[1] == 'font-face':
                if prop not in {'font-family', 'src', 'font-weight', 'font-style', 'font-display'}:
                    errors.append('unexpected font descriptor: ' + prop)
                if prop == 'src' and not re.fullmatch(r"url\(['\"]\./fonts/[\w.-]+\.woff2['\"]\)\s+format\(['\"]woff2['\"]\)", value):
                    errors.append('fonts must use bundled local WOFF2 files')
    remaining = re.sub(r'@(theme|font-face)\s*\{[^{}]*\}', '', text).strip()
    if remaining:
        errors.append('custom CSS rules/directives are prohibited')
    return errors


def source_errors(text):
    return [message for pattern, message in FORBIDDEN if re.search(pattern, text, re.I)]


def check(root=ROOT):
    errors = []
    files = list((root / 'src').rglob('*')) + list(root.glob('*.html'))
    for file in files:
        if not file.is_file():
            continue
        relative = file.relative_to(root)
        if file.suffix in {'.css', '.scss', '.sass', '.less', '.styl'}:
            if relative.as_posix() != 'src/theme.css':
                errors.append(f'{relative}: extra stylesheet is prohibited')
            else:
                errors += [f'{relative}: {error}' for error in stylesheet_errors(file.read_text())]
        elif file.suffix in {'.tsx', '.ts', '.jsx', '.js', '.html'}:
            errors += [f'{relative}: {error}' for error in source_errors(file.read_text())]
    if not (root / 'src/theme.css').is_file():
        errors.append('missing Tailwind entry stylesheet')
    return errors


if __name__ == '__main__':
    errors = check()
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        sys.exit(1)
    print('PASS: Tailwind-only styles; one token/font entry, no authored rules or inline styles')
