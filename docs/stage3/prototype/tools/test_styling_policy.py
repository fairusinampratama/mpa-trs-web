import unittest
from check_styling import check, source_errors, stylesheet_errors


class StylingPolicyTests(unittest.TestCase):
    def test_repository_respects_tailwind_boundary(self):
        self.assertEqual(check(), [])

    def test_blocks_stylesheet_escape_hatches(self):
        valid = "@import 'tailwindcss'; @theme { --color-primary: #214A39; }"
        self.assertEqual(stylesheet_errors(valid), [])
        for extra in ['.card {color:red}', '@utility card {color:red}', '@import "extra.css";',
                      '@media (min-width:768px) {body {color:red}}', '@layer base {h1 {color:red}}']:
            with self.subTest(extra=extra):
                self.assertTrue(stylesheet_errors(valid + extra))

    def test_blocks_inline_and_injected_css(self):
        for text in ['<div style={{color:"red"}}/>', '<div style="color:red">',
                     "root.style.overflow='hidden'", "root['style'].color='red'",
                     'sheet.insertRule("body{}")', 'node.setAttribute("style", value)',
                     'document.createElement("style")', '<style>body{}</style>',
                     'const Card=styled.div`color:red`']:
            with self.subTest(text=text):
                self.assertTrue(source_errors(text))
        self.assertEqual(source_errors('<div className="flex hover:bg-primary md:grid"/>'), [])
