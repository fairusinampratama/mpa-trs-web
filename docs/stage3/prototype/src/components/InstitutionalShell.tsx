import { useEffect, useRef, useState, type ReactNode } from "react";
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
  "flex min-h-11 items-center gap-2 text-ink hover:text-primary active:text-primary-active aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6";
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
  const navigationRef = useRef<HTMLElement>(null);
  useEffect(() => setOpen(undefined), [route]);
  useEffect(() => {
    if (!open) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setOpen(undefined);
      }
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    return () => document.removeEventListener("pointerdown", closeOnPointerDown);
  }, [open]);
  const itemClasses = `${navItem} ${mobile ? "w-full justify-between px-2 hover:bg-surface-muted active:bg-leaf aria-[current=page]:bg-surface-muted" : "whitespace-nowrap"}`;
  return (
    <nav
      ref={navigationRef}
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
              className={`${itemClasses} group border-0 bg-transparent text-left aria-expanded:text-primary`}
              data-ui="nav-trigger"
            >
              <span>{item.label}</span>
              <span
                className="size-1.5 shrink-0 rotate-45 border-r-2 border-b-2 border-current transition-transform duration-[140ms] group-aria-expanded:-rotate-135"
                aria-hidden="true"
                data-ui="nav-chevron"
              />
            </button>
            <div
              id={`${mobile ? "mobile" : "desktop"}-group-${i}`}
              hidden={open !== item.label}
              data-ui="nav-children"
              className={`z-10 rounded-control border border-border bg-surface p-1.5 ${mobile ? "ml-4" : "absolute top-[calc(100%+6px)] left-0 min-w-60 max-w-80 shadow-navigation"}`}
            >
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  aria-current={child.href === `#${route}` ? "page" : undefined}
                  className="flex min-h-11 items-center px-3 py-2 whitespace-normal hover:bg-surface-muted hover:text-primary active:bg-leaf active:text-primary-active aria-[current=page]:bg-surface-muted aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6"
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
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => setMenu(false), [route]);
  useEffect(() => {
    const query = matchMedia("(min-width:960px)");
    const close = () => setMenu(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenu(false);
      }
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    return () => document.removeEventListener("pointerdown", closeOnPointerDown);
  }, [menu]);
  const close = () => setMenu(false);
  const items = navigation === "direct" ? direct : grouped;
  return (
    <header
      id="page-top"
      ref={headerRef}
      className="relative z-20 border-b border-border bg-surface"
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
          className="flex size-11 shrink-0 items-center justify-center rounded-control border border-transparent bg-transparent text-primary hover:bg-surface-muted active:bg-leaf aria-expanded:bg-surface-muted nav:hidden"
          data-ui="menu-toggle"
          aria-label={menu ? "Tutup menu" : "Buka menu"}
          aria-expanded={menu}
          aria-controls="institutional-mobile-nav"
          ref={trigger}
          onClick={() => setMenu(!menu)}
        >
          <span
            className="relative inline-block h-5 w-6 shrink-0"
            aria-hidden="true"
            data-ui="menu-icon"
          >
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-[transform,top] duration-[140ms] ${menu ? "top-2.25 rotate-45" : "top-1"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-[transform,top] duration-[140ms] ${menu ? "top-2.25 -rotate-45" : "top-3.5"}`}
            />
          </span>
        </button>
      </div>
      <div
        className="absolute top-full left-0 z-20 w-full border-t border-border bg-surface px-4 py-4 shadow-navigation md:right-6 md:left-auto md:w-80 md:border md:border-border md:px-3 md:py-3 nav:hidden"
        id="institutional-mobile-nav"
        hidden={!menu}
        data-ui="mobile-panel"
      >
        <Navigation items={items} route={route} onNavigate={close} mobile />
      </div>
    </header>
  );
}
export function InstitutionalFooter() {
  return (
    <footer
      className="bg-primary text-inverse [&_:focus-visible]:outline-focus-inverse [&_a]:text-inverse"
      data-ui="footer"
    >
      <div
        className="mx-auto w-[calc(100%_-_32px)] max-w-institution py-8 md:w-[calc(100%_-_48px)] lg:py-10"
        data-ui="container footer-public"
      >
        <div className="flex justify-end border-b border-inverse/30 pb-4">
          <button
            type="button"
            className="flex min-h-11 items-center gap-2 border-0 bg-transparent px-1 text-base font-semibold text-inverse underline decoration-transparent underline-offset-4 hover:decoration-current active:text-inverse/80"
            onClick={() => window.scrollTo({ top: 0 })}
            data-ui="footer-back-to-top"
          >
            Kembali ke atas
            <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div
          className="grid gap-9 pt-8 sm:grid-cols-2 md:grid-cols-[minmax(0,2fr)_1fr_1fr] md:gap-8"
          data-ui="footer-grid"
        >
          <div className="sm:col-span-2 md:col-span-1" data-ui="footer-identity">
            <div className="flex items-center gap-4">
              <img
                className="h-15 w-16 shrink-0 object-contain"
                src={tursinaLogo}
                width={64}
                height={60}
                alt=""
              />
              <div>
                <p
                  className="font-editorial text-[26px]/8 font-semibold tracking-[-0.01em]"
                  data-ui="footer-name"
                >
                  MAPALA Tursina
                </p>
                <p className="mt-1 text-sm/[20px] text-inverse/80">
                  Mahasiswa Pencinta Alam
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-base/[24px] text-inverse/85">
              Unit kegiatan mahasiswa di bawah naungan{" "}
              <a
                className="font-semibold underline decoration-inverse/50 underline-offset-4 hover:decoration-current"
                href="https://uin-malang.ac.id/"
              >
                UIN Maulana Malik Ibrahim Malang
              </a>
              .
            </p>
            <p
              className="mt-5 font-editorial text-[18px]/[26px] font-normal"
              data-ui="motto"
            >
              Dari alam aku ada, aku ada untuk alam
            </p>
          </div>
          <nav aria-labelledby="footer-explore-title">
            <h2
              className="text-sm/[20px] font-semibold tracking-[0.04em] text-inverse/70 uppercase"
              id="footer-explore-title"
            >
              Jelajahi
            </h2>
            <div className="mt-2 flex flex-col" data-ui="footer-links">
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/activities"
              >
                Kegiatan
              </a>
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/program/te"
              >
                Tursina Explore
              </a>
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/publications"
              >
                Karya &amp; Pengetahuan
              </a>
            </div>
          </nav>
          <nav aria-labelledby="footer-institution-title">
            <h2
              className="text-sm/[20px] font-semibold tracking-[0.04em] text-inverse/70 uppercase"
              id="footer-institution-title"
            >
              Institusi
            </h2>
            <div className="mt-2 flex flex-col" data-ui="footer-links">
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/about"
              >
                Tentang Tursina
              </a>
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/jejak"
              >
                Jejak Tursina
              </a>
              <a
                className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
                href="#/members"
              >
                Buku Induk
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div className="bg-primary-active" data-ui="prototype-status">
        <div
          className="mx-auto grid w-[calc(100%_-_32px)] max-w-institution gap-2 py-4 text-[14px]/[20px] text-inverse/75 md:w-[calc(100%_-_48px)] md:grid-cols-[1fr_auto] md:items-center md:gap-6"
          data-ui="container preview-note"
        >
          <p>
            Prototipe Stage 3 · bukan website resmi · versi{" "}
            <span data-source-version>
              {import.meta.env.VITE_SOURCE_COMMIT?.slice(0, 7) || "lokal"}
            </span>
          </p>
          <a
            className="flex min-h-11 items-center font-semibold underline decoration-inverse/50 underline-offset-4 hover:decoration-current"
            href="#/review"
          >
            Lingkungan review pengembangan
          </a>
        </div>
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
