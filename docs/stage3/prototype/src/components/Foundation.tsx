import { buttonClasses } from "./Button";
import { homeEnlargementAuthorized } from "../domain/media";
import { RecordDate } from "./RecordDate";
import { activityDisplayTitle, workDiscovery } from "../domain/read";
import { useContentReadModel } from "../ContentReadModel";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useId,
  type ReactNode,
} from "react";
import type { ActivityFixture } from "./ActivityCard";
import { canonicalRegistry } from "../domain/index.ts";
import { resolvePublicMedia } from "../domain/validate.ts";
import type {
  MediaPlacement,
  InstitutionalRegistry as CanonicalRegistry,
} from "../domain/contract.ts";
export type MediaRole =
  | "identity"
  | "expedition"
  | "gh"
  | "rc"
  | "history"
  | "emblem"
  | "expedition-trail"
  | "expedition-ecology"
  | "kawi"
  | "batafia";
export type ReviewMedia = Partial<
  Record<
    MediaRole,
    {
      src: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
      credit?: string;
      srcSet?: string;
      sizes?: string;
      assetId?: string;
      useId?: string;
    }
  >
>;
// Public entry supplies no held assets. A separate private review entry may provide
// media; that entry and its bytes never belong to the public build root.
export const MediaContext = createContext<ReviewMedia>({});
export const CanonicalMediaContext =
  createContext<CanonicalRegistry>(canonicalRegistry);
export function useDocumentaryAsset(
  role: MediaRole,
  recordId?: string,
  placement?: MediaPlacement,
) {
  const privateReview = useContext(MediaContext)[role];
  const registry = useContext(CanonicalMediaContext);
  if (privateReview) return privateReview;
  // Explicit placement is mandatory for public UI resolution. An unscoped lab,
  // legacy page or another activity must never inherit a global role approval.
  if (!recordId || !placement) return undefined;
  const media = resolvePublicMedia(registry, recordId, placement)[0];
  if (
    !media ||
    !(media.role === role || (role === "identity" && media.role === "kawi"))
  )
    return undefined;
  const base = import.meta.env.BASE_URL;
  const url = (path: string) => base + path.slice(1);
  const derivatives = [...media.derivatives].sort((a, b) => a.width - b.width);
  const preferred = derivatives.find((d) => d.path === media.path)!;
  return {
    src: url(preferred.path),
    width: preferred.width,
    height: preferred.height,
    srcSet: derivatives.map((d) => `${url(d.path)} ${d.width}w`).join(", "),
    sizes: media.sizes,
    alt: media.alt,
    caption: media.caption,
    credit: media.credit,
    assetId: media.id,
    useId: media.useId,
  };
}
export function TextLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <a
      className={` flex items-center justify-start gap-4 min-h-11 font-semibold text-[17px] leading-[24px] font-sans text-primary no-underline w-fit max-w-full [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4 ${inverse ? "" : ""}  `}
      href={href}
      data-ui={`link${inverse ? " inverse" : ""}`}
    >
      <span className="min-w-0">{children}</span>
    </a>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      href={href}
      className={buttonClasses(secondary ? "secondary" : "primary", true)}
      data-ui="button"
    >
      {children}
    </a>
  );
}
export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header
      className="[&_[data-ui~=section-title]]:mt-2.5 [&>[data-ui~=body]]:mt-3.5 mb-8"
      data-ui="section-heading"
    >
      <p
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
        data-ui="label"
      >
        {label}
      </p>
      <h2
        className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
        data-ui="section-title"
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
          data-ui="body"
        >
          {description}
        </p>
      )}
    </header>
  );
}
export function MediaCaption({
  children,
  credit,
}: {
  children: ReactNode;
  credit?: string;
}) {
  return (
    <figcaption
      className="text-[14px] leading-[20px] text-muted"
      data-ui="caption"
    >
      {children}
      {credit && (
        <span className="block" data-ui="credit">
          {credit}
        </span>
      )}
    </figcaption>
  );
}
type DocumentaryAsset = NonNullable<ReturnType<typeof useDocumentaryAsset>>;
function HomePhotoEnlargement({
  asset,
  role,
}: {
  asset: DocumentaryAsset;
  role: MediaRole;
}) {
  const [open, setOpen] = useState(false),
    [failed, setFailed] = useState(false);
  const modal = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const closeControl = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const title =
    role === "gh" ? "Praktik navigasi darat" : "Kerja tim di tebing";
  useEffect(() => {
    if (!open) return;
    const dialog = modal.current!,
      root = document.documentElement;
    const previous = {
      overflow: root.classList.contains("overflow-hidden"),
      gutter: root.classList.contains("[scrollbar-gutter:stable]"),
      scrollY: window.scrollY,
    };
    // Reserve the existing scrollbar gutter before locking background scrolling.
    if (window.innerWidth > root.clientWidth)
      root.classList.add("[scrollbar-gutter:stable]");
    root.classList.add("overflow-hidden");
    dialog.showModal();
    window.scrollTo({
      top: previous.scrollY,
      behavior: "instant",
    });
    return () => {
      dialog.close();
      root.classList.toggle("overflow-hidden", previous.overflow);
      root.classList.toggle("[scrollbar-gutter:stable]", previous.gutter);
      window.scrollTo({
        top: previous.scrollY,
        behavior: "instant",
      });
      if (trigger.current?.isConnected)
        trigger.current.focus({
          preventScroll: true,
        });
    };
  }, [open]);
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-between gap-2 w-full min-h-11 mt-3 p-2 border border-current bg-transparent text-inherit font-semibold text-[15px] leading-[22px] font-sans text-left cursor-pointer hover:underline hover:underline-offset-4"
        ref={trigger}
        aria-haspopup="dialog"
        onClick={() => {
          setFailed(false);
          setOpen(true);
        }}
        data-ui="enlarge-control"
      >
        Perbesar foto {role === "gh" ? "Gunung Hutan" : "Panjat Tebing"}
        <span aria-hidden="true"> ↗</span>
      </button>
      <dialog
        className="box-border m-auto p-6 w-fit max-w-[calc(100vw_-_32px)] max-h-[calc(100dvh_-_32px)] overflow-auto overscroll-contain bg-page text-ink border border-control-border backdrop:bg-black/75 [&_[data-ui~=photo-fullframe]]:w-auto [&_[data-ui~=photo-fullframe]]:max-w-full [&_[data-ui~=photo-fullframe]]:m-0 [&_[data-ui~=photo-fullframe]_img]:block [&_[data-ui~=photo-fullframe]_img]:w-auto [&_[data-ui~=photo-fullframe]_img]:h-auto [&_[data-ui~=photo-fullframe]_img]:max-w-full [&_[data-ui~=photo-fullframe]_img]:max-h-[58dvh] [&_[data-ui~=photo-fullframe]_img]:object-contain [&_[data-ui~=photo-fullframe]_img]:mx-auto [&_[data-ui~=caption]]:text-muted [&_[data-ui~=caption]]:max-w-[65ch] [&_:focus-visible]:outline-focus max-[601px]:p-4 max-[601px]:[&_[data-ui~=photo-fullframe]_img]:max-h-[52dvh] forced-colors:border-[CanvasText] forced-colors:backdrop:bg-[Canvas] forced-colors:backdrop:opacity-85"
        ref={modal}
        aria-labelledby={titleId}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab" && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            closeControl.current?.focus();
          }
        }}
        data-ui="photo-dialog"
      >
        {open && (
          <>
            <header
              className="flex items-start justify-between gap-4 mb-4 [&_[data-ui~=content-title]]:text-[24px] [&_[data-ui~=content-title]]:leading-[30px] [&_[data-ui~=content-title]]:max-w-[22ch] [&_[data-ui~=button]]:shrink-0 max-[601px]:flex-wrap max-[601px]:[&_[data-ui~=content-title]]:text-[22px] max-[601px]:[&_[data-ui~=content-title]]:leading-[28px]"
              data-ui="photo-toolbar"
            >
              <h2
                id={titleId}
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                {title}
              </h2>
              <button
                autoFocus
                ref={closeControl}
                className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:border-forest bg-page border-control-border text-primary [&:hover:not(:disabled)]:bg-surface-muted [&:active:not(:disabled)]:border-primary"
                type="button"
                onClick={() => setOpen(false)}
                data-ui="button button-secondary"
              >
                Tutup foto
              </button>
            </header>
            <figure className="" data-ui="photo-fullframe">
              {failed ? (
                <p role="status">
                  Foto tidak termuat. Tutup dan buka kembali untuk mencoba lagi.
                </p>
              ) : (
                <img
                  src={asset.src}
                  srcSet={asset.srcSet}
                  sizes={
                    role === "gh"
                      ? "(max-width:600px) calc(100vw - 64px), 400px"
                      : "(max-width:600px) calc(100vw - 64px), 530px"
                  }
                  width={asset.width}
                  height={asset.height}
                  alt={asset.alt}
                  decoding="async"
                  onError={() => setFailed(true)}
                />
              )}
              <MediaCaption credit={asset.credit}>{asset.caption}</MediaCaption>
            </figure>
          </>
        )}
      </dialog>
    </>
  );
}
export function DocumentaryMedia({
  role,
  recordId,
  placement,
  eager = false,
  fallbackTitle,
  fallback,
  children,
  omitWhenUnavailable = false,
  enlargement = false,
}: {
  role: MediaRole;
  recordId?: string;
  placement?: MediaPlacement;
  eager?: boolean;
  fallbackTitle: string;
  fallback: string;
  children?: ReactNode;
  omitWhenUnavailable?: boolean;
  enlargement?: boolean;
}) {
  const asset = useDocumentaryAsset(role, recordId, placement);
  const [failedSource, setFailedSource] = useState<string>();
  const failed = !!asset && failedSource === asset.src;
  if ((!asset || failed) && omitWhenUnavailable) return null;
  return asset && !failed ? (
    <figure
      data-media-role={role}
      className="[&_img]:block [&_img]:w-full [&_img]:h-auto [&_img]:object-contain [&_[data-ui~=caption]]:mt-3"
      data-media-asset={asset.assetId}
      data-media-use={asset.useId}
      data-ui="media"
    >
      <img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={asset.sizes}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
        onError={() => setFailedSource(asset.src)}
      />
      <MediaCaption credit={asset.credit}>{asset.caption}</MediaCaption>
      {enlargement &&
        homeEnlargementAuthorized({
          ...asset,
          role,
          recordId,
          placement,
        }) && <HomePhotoEnlargement asset={asset} role={role} />}
    </figure>
  ) : (
    <aside
      data-media-role={role}
      className="border-t-2 border-t-primary bg-surface-muted p-6 self-start [&_[data-ui~=content-title]]:mt-3 [&>p:not(:first-child)]:mt-4 [&>[data-ui~=link]]:mt-4 [&>p[data-ui~=content-title]]:mt-3"
      data-ui="media-fallback"
    >
      <p
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
        data-ui="label"
      >
        {failed ? "Dokumentasi tidak termuat" : "Catatan dokumentasi"}
      </p>
      <p
        className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
        data-ui="content-title"
      >
        {fallbackTitle}
      </p>
      <p>{fallback}</p>
      {children}
      <p className="text-[14px] leading-[20px] text-muted" data-ui="caption">
        {failed
          ? "Keterangan tetap tersedia; muat ulang untuk mencoba kembali."
          : "Foto arsip menunggu kelengkapan izin dan kredit publikasi."}
      </p>
    </aside>
  );
}
export function ProgrammeEntry({
  index,
  title,
  description,
  href,
  action,
}: {
  index: string;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <article
      className="border-t-2 border-t-primary grid grid-cols-[24px_minmax(0,1fr)] gap-3.5 pt-4 [&_p]:mt-2.5 [&_p]:text-[17px] [&_p]:leading-[25px] [&_[data-ui~=link]]:mt-4 lg:block lg:[&_[data-ui~=content-title]]:mt-6 lg:[&_p]:text-[18px] lg:[&_p]:leading-[26px] lg:[&_p]:mt-3.5 lg:[&_[data-ui~=link]]:mt-6"
      data-ui="programme"
    >
      <span
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-muted"
        aria-hidden="true"
        data-ui="label index"
      >
        {index}
      </span>
      <div>
        <h3
          className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
          data-ui="content-title"
        >
          <a href={href}>{title}</a>
        </h3>
        <p>{description}</p>
        <TextLink href={href}>{action}</TextLink>
      </div>
    </article>
  );
}
export function ActivityMetadata({
  activity,
  inline = false,
}: {
  activity: ActivityFixture;
  inline?: boolean;
}) {
  return (
    <div
      className={` text-[15px] leading-[23px] text-blue lg:text-muted ${inline ? " flex flex-wrap items-center gap-y-2 gap-x-4 font-normal text-[16px] leading-[23px] font-sans text-muted [&>[data-ui~=label]]:m-0" : "[&>[data-ui~=label]]:mt-1"}  `}
      data-ui={`activity-metadata${inline ? " metadata-inline" : ""}`}
    >
      <p>
        <RecordDate id={activity.id} fallback={activity.date} />
      </p>
      <p
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
        data-ui="label"
      >
        {activity.state === "historical"
          ? "Historis"
          : activity.state === "planned"
            ? "Direncanakan"
            : activity.state === "ongoing"
              ? "Berlangsung"
              : "Status belum diketahui"}
      </p>
    </div>
  );
}
export function ActivityPreview({
  activity,
  title,
  summary,
}: {
  activity: ActivityFixture;
  title?: string;
  summary?: string;
}) {
  return (
    <article
      className="border-t border-t-border py-6 grid gap-2 text-[17px] leading-[25px] lg:grid-cols-[160px_minmax(0,1.35fr)_minmax(0,.85fr)_minmax(0,1.2fr)] lg:gap-6 lg:min-h-27 lg:[&_[data-ui~=place]]:text-[18px] lg:[&_[data-ui~=place]]:leading-[26px] lg:max-[1200px]:grid-cols-[174px_minmax(0,1fr)] lg:max-[1200px]:[&_[data-ui~=place]]:col-[2] lg:max-[1200px]:[&>p:last-child]:col-[2]"
      data-ui="activity"
    >
      <ActivityMetadata activity={activity} />
      <h3
        className="font-semibold text-[23px] leading-[29px] font-sans [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[24px] lg:leading-[31px]"
        data-ui="activity-title"
      >
        <a href={activity.href} aria-label={title || activity.title}>
          {title || activityDisplayTitle(activity)}
        </a>
      </h3>
      {activity.location && (
        <p className="text-[16px] leading-[23px] text-muted" data-ui="place">
          {activity.location}
        </p>
      )}
      <p>{summary || activity.summary}</p>
    </article>
  );
}
export function PublicationPreview({
  title,
  type,
  date,
  summary,
  href,
  action,
  related,
}: {
  title: string;
  type: string;
  date?: string;
  summary: string;
  href: string;
  action: string;
  related?: string;
}) {
  const { registry } = useContentReadModel();
  const record = registry.works.find(
    (w) => href.split("?")[0] === `#/publication/${w.id}`,
  );
  const availability = record ? workDiscovery(record) : undefined;
  return (
    <article
      className="border-t-2 border-t-blue pt-4 [&>[data-ui~=content-title]]:mt-3 [&>[data-ui~=metadata]]:mt-3 [&>p:not(:first-child)]:mt-3 [&>[data-ui~=link]]:mt-6"
      data-ui="publication"
    >
      <p
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
        data-ui="label"
      >
        {type}
        {related ? ` / ${related}` : " / Mandiri"}
      </p>
      <h3
        className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
        data-ui="content-title"
      >
        <a href={href}>{title}</a>
      </h3>
      {date && (
        <p className="text-[16px] leading-[23px] text-muted" data-ui="metadata">
          {date}
        </p>
      )}
      <p>{summary}</p>
      {availability && (
        <p className="text-[14px] leading-[20px] text-muted" data-ui="caption">
          {availability.cue}
        </p>
      )}
      <TextLink href={href}>{availability?.action ?? action}</TextLink>
    </article>
  );
}
export function EvidenceDisclosure({
  summary = "Sumber dan batas catatan",
  children,
}: {
  summary?: string;
  children: ReactNode;
}) {
  return (
    <details
      className="border-y border-y-control-border self-start font-normal text-[17px] leading-[25px] font-sans [&_summary]:cursor-pointer [&_summary]:font-semibold [&_summary]:pt-4 [&_summary]:pr-2 [&_summary]:pb-4 [&_summary]:pl-2 [&_summary]:min-h-12 [&_summary]:text-primary [&_summary:hover]:bg-surface-muted [&>div]:pt-0 [&>div]:pr-2 [&>div]:pb-6 [&>div]:pl-2 [&_p+p]:mt-4"
      data-ui="evidence"
    >
      <summary>{summary}</summary>
      <div>{children}</div>
    </details>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: {
    label: string;
    href?: string;
  }[];
}) {
  return (
    <nav
      className="font-normal text-[14px] leading-[20px] font-sans text-muted mb-6 [&_ol]:list-none [&_ol]:flex [&_ol]:flex-wrap [&_ol]:gap-y-0 [&_ol]:gap-x-3 [&_ol]:p-0 [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:min-w-0 [&_a]:flex [&_a]:items-center [&_a]:min-h-11 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_[aria-current]]:py-3"
      aria-label="Jejak navigasi"
      data-ui="breadcrumbs"
    >
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
