import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./Button";
import tursinaLogo from "../assets/tursina-logo.png";
export type NavChoice = "grouped" | "direct";
type Destination = {
  label: string;
  href?: string;
  children?: Destination[];
};
const grouped: Destination[] = [
  {
    label: "Tentang",
    href: "#/about",
  },
  {
    label: "Kegiatan",
    children: [
      {
        label: "Tursina Explore",
        href: "#/program/te",
      },
      {
        label: "Pemantapan Divisi",
        href: "#/program/pd",
      },
      {
        label: "Kegiatan lainnya",
        href: "#/activities",
      },
    ],
  },
  {
    label: "Karya & Pengetahuan",
    children: [
      {
        label: "Artikel & pengumuman",
        href: "#/publications",
      },
      {
        label: "Materi belajar",
        href: "#/knowledge",
      },
    ],
  },
  {
    label: "Jejak Tursina",
    href: "#/jejak",
  },
  {
    label: "Buku Induk",
    href: "#/members",
  },
];
const direct: Destination[] = [
  {
    label: "Tursina Explore",
    href: "#/program/te",
  },
  {
    label: "Pendidikan",
    children: [
      {
        label: "Pemantapan Divisi",
        href: "#/program/pd",
      },
      {
        label: "Kenali lima divisi",
        href: "#/about",
      },
    ],
  },
  {
    label: "Kegiatan",
    href: "#/activities",
  },
  {
    label: "Publikasi",
    children: [
      {
        label: "Artikel & pengumuman",
        href: "#/publications",
      },
      {
        label: "Materi belajar",
        href: "#/knowledge",
      },
    ],
  },
  {
    label: "Jejak Tursina",
    href: "#/jejak",
  },
  {
    label: "Buku Induk",
    href: "#/members",
  },
];
const navItem =
  "flex min-h-11 items-center gap-2 text-ink hover:bg-surface-muted hover:text-primary aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6";
function Navigation({
  items,
  route,
  onNavigate,
  mobile,
}: {
  items: Destination[];
  route: string;
  onNavigate: () => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState<string>();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => setOpen(undefined), [route]);
  const itemClasses = `${navItem} ${mobile ? "w-full justify-between px-2 aria-[current=page]:bg-surface-muted" : "whitespace-nowrap"}`;
  return (
    <nav
      aria-label={mobile ? "Navigasi mobile" : "Navigasi publik"}
      data-ui={mobile ? "navigation mobile-navigation" : "navigation"}
      className={`text-base/[25px] font-semibold ${mobile ? "flex flex-col gap-1" : "flex items-center gap-4 wide:gap-6"}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          e.stopPropagation();
          refs.current[open]?.focus();
          setOpen(undefined);
        }
      }}
    >
      {items.map((item, i) =>
        item.children ? (
          <div className="relative" key={item.label} data-ui="nav-group">
            <button
              type="button"
              ref={(node) => {
                refs.current[item.label] = node;
              }}
              aria-expanded={open === item.label}
              aria-current={
                item.children.some((child) => child.href === `#${route}`)
                  ? "page"
                  : undefined
              }
              aria-controls={`${mobile ? "mobile" : "desktop"}-group-${i}`}
              onClick={() =>
                setOpen(open === item.label ? undefined : item.label)
              }
              className={`${itemClasses} border-0 bg-transparent text-left`}
              data-ui="nav-trigger"
            >
              {item.label}
            </button>
            <div
              id={`${mobile ? "mobile" : "desktop"}-group-${i}`}
              hidden={open !== item.label}
              data-ui="nav-children"
              className={`z-10 border border-control-border border-t-2 border-t-primary bg-surface p-2 ${mobile ? "ml-4" : "absolute top-[calc(100%+8px)] right-0 min-w-60 max-w-80 shadow-navigation"}`}
            >
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  aria-current={child.href === `#${route}` ? "page" : undefined}
                  className="flex min-h-11 items-center p-2 whitespace-normal hover:bg-page hover:text-primary aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6"
                  onClick={() => {
                    setOpen(undefined);
                    onNavigate();
                  }}
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a
            className={itemClasses}
            href={item.href}
            key={item.label}
            aria-current={item.href === `#${route}` ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </a>
        ),
      )}
    </nav>
  );
}
export function InstitutionalHeader({
  route,
  navigation = "grouped",
}: {
  route: string;
  navigation?: NavChoice;
}) {
  const [menu, setMenu] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setMenu(false), [route]);
  useEffect(() => {
    const query = matchMedia("(min-width:1080px)");
    const close = () => setMenu(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  const close = () => setMenu(false);
  const items = navigation === "direct" ? direct : grouped;
  return (
    <header
      className="border-b border-border bg-surface"
      data-ui="header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && menu) {
          e.preventDefault();
          setMenu(false);
          trigger.current?.focus();
        }
      }}
    >
      <div
        className="mx-auto flex min-h-17 w-[calc(100%-32px)] max-w-institution items-center justify-between gap-4 md:w-[calc(100%-48px)] nav:min-h-20"
        data-ui="container header-row"
      >
        <a
          className="flex min-h-11 min-w-0 items-center gap-3.5 text-ink no-underline"
          href="#/"
          aria-label="MAPALA Tursina — Beranda"
          data-ui="wordmark"
        >
          <img
            className="h-11 w-12 shrink-0 object-contain"
            src={tursinaLogo}
            width={48}
            height={44}
            alt=""
          />
          <span>
            <strong className="block font-editorial text-xl/6 font-semibold tracking-[-0.01em] max-[360px]:text-lg nav:text-[22px]/[26px]">
              MAPALA Tursina
            </strong>
            <span className="mt-0.5 block text-xs/[17px] tracking-[0.02em] text-muted">
              Mahasiswa Pencinta Alam
            </span>
          </span>
        </a>
        <div className="hidden nav:block" data-ui="desktop-nav">
          <Navigation items={items} route={route} onNavigate={close} />
        </div>
        <button
          type="button"
          className="flex size-11 shrink-0 items-center justify-center gap-2 rounded-control border border-control-border bg-page p-2 text-[15px]/[22px] font-semibold text-primary hover:border-forest hover:bg-surface-muted nav:hidden"
          data-ui="menu-toggle"
          aria-label={menu ? "Tutup menu" : "Buka menu"}
          aria-expanded={menu}
          aria-controls="institutional-mobile-nav"
          ref={trigger}
          onClick={() => setMenu(!menu)}
        >
          <span
            className="relative inline-block h-4 w-5 shrink-0"
            aria-hidden="true"
            data-ui="menu-icon"
          >
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-[transform,top] duration-[140ms] ${menu ? "top-1.75 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute top-1.75 left-0 h-0.5 w-5 bg-current ${menu ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-[transform,top] duration-[140ms] ${menu ? "top-1.75 -rotate-45" : "top-3.5"}`}
            />
          </span>
        </button>
      </div>
      <div
        className="mx-auto w-[calc(100%-32px)] max-w-institution border-t border-border py-4 md:w-[calc(100%-48px)] nav:hidden"
        id="institutional-mobile-nav"
        hidden={!menu}
        data-ui="container mobile-panel"
      >
        <Navigation items={items} route={route} onNavigate={close} mobile />
        <Button
          variant="quiet"
          onClick={() => {
            close();
            trigger.current?.focus();
          }}
        >
          Tutup menu
        </Button>
      </div>
    </header>
  );
}
export function InstitutionalFooter() {
  return (
    <footer
      className="[&_:focus-visible]:outline-focus-inverse bg-primary text-inverse py-10 [&_nav]:flex [&_nav]:flex-wrap [&_nav]:gap-y-2 [&_nav]:gap-x-6 [&_a]:min-h-11 [&_a]:flex [&_a]:items-center [&_a]:text-inverse [&_a:hover]:underline md:[&_nav]:flex-col md:[&_nav]:gap-0 lg:py-14"
      data-ui="footer"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] grid gap-6 md:grid-cols-[2fr_1fr_1fr]"
        data-ui="container footer-grid"
      >
        <div>
          <p
            className="font-semibold text-[28px] leading-[34px] font-editorial [&+p]:mt-4"
            data-ui="footer-name"
          >
            MAPALA Tursina
          </p>
          <p>
            Mahasiswa Pencinta Alam Tursina
            <br />
            UIN Maulana Malik Ibrahim Malang
          </p>
          <p
            className="font-normal text-[18px] leading-[26px] font-editorial mt-6!"
            data-ui="motto"
          >
            Dari alam aku ada, aku ada untuk alam
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <a href="#/about">Tentang</a>
          <a href="#/activities">Kegiatan</a>
          <a href="#/publications">Karya & Pengetahuan</a>
        </nav>
        <nav aria-label="Institusi dan sejarah">
          <a href="#/jejak">Jejak Tursina</a>
          <a href="#/members">Buku Induk</a>
        </nav>
      </div>
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] text-[14px] leading-[20px] mt-8 border-t border-t-inverse pt-4 [&_a]:underline md:flex md:justify-between md:items-center md:gap-6"
        data-ui="container preview-note"
      >
        <p>
          Prototipe Stage 3 · bukan website resmi · versi{" "}
          <span data-source-version>
            {import.meta.env.VITE_SOURCE_COMMIT?.slice(0, 7) || "lokal"}
          </span>
        </p>
        <a href="#/review">Lingkungan review pengembangan</a>
      </div>
    </footer>
  );
}
export function DevelopmentReviewShell({ children }: { children: ReactNode }) {
  return (
    <aside
      className="bg-surface border-b border-b-control-border py-4 text-[14px] [&>div>div]:flex [&>div>div]:flex-wrap [&>div>div]:items-center [&>div>div]:gap-4 [&>div>div]:mt-2 [&_a]:flex [&_a]:items-center [&_a]:min-h-11 [&_a]:underline [&_select]:min-h-11 [&_select]:border [&_select]:border-control-border [&_select]:p-2"
      aria-label="Lingkungan review pengembangan"
      data-ui="review-shell"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
        data-ui="container"
      >
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Review pengembangan / terpisah dari pengalaman publik
        </p>
        <div>
          {children}
          <a href="#/ui-lab">UI laboratory</a>
          <a href="./responsive-review.html">Pemeriksaan viewport</a>
          <a href="#/submission">Simulasi editorial</a>
          <a href="#/legacy">Eksperimen visual terdahulu</a>
          <a href="#/">Beranda tanpa kontrol</a>
        </div>
      </div>
    </aside>
  );
}
