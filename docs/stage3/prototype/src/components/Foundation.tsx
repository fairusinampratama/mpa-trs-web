import { buttonClasses } from "./Button";
import { RecordDate } from "./RecordDate";
import { activityDisplayTitle, workDiscovery } from "../domain/read";
import { useContentReadModel } from "../ContentReadModel";
import {
  createContext,
  useContext,
  useState,
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
  variant = "default",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  variant?: "default" | "quiet";
  ariaLabel?: string;
}) {
  const quiet = variant === "quiet";
  return (
    <a
      className={`group flex min-h-11 w-fit max-w-full items-center justify-start font-sans text-[17px] leading-[24px] font-semibold no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus ${quiet ? "gap-2 text-blue transition-colors duration-150 hover:text-primary active:text-primary-active" : "gap-4 text-primary [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4"}`}
      href={href}
      aria-label={ariaLabel}
      data-ui={`link${inverse ? " inverse" : ""}${quiet ? " quiet" : ""}`}
    >
      <span className="min-w-0">{children}</span>
      {quiet && (
        <span
          className="transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      )}
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
export function DocumentaryMedia({
  role,
  recordId,
  placement,
  eager = false,
  fallbackTitle,
  fallback,
  children,
  omitWhenUnavailable = false,
  frame = "natural",
}: {
  role: MediaRole;
  recordId?: string;
  placement?: MediaPlacement;
  eager?: boolean;
  fallbackTitle: string;
  fallback: string;
  children?: ReactNode;
  omitWhenUnavailable?: boolean;
  frame?: "natural" | "portrait";
}) {
  const asset = useDocumentaryAsset(role, recordId, placement);
  const [failedSource, setFailedSource] = useState<string>();
  const failed = !!asset && failedSource === asset.src;
  if ((!asset || failed) && omitWhenUnavailable) return null;
  return asset && !failed ? (
    <figure
      data-media-role={role}
      className={`[&_img]:block [&_img]:w-full [&_[data-ui~=caption]]:mt-3 ${frame === "portrait" ? "[&_img]:aspect-[4/5] [&_img]:object-cover [&_img]:object-center" : "[&_img]:h-auto [&_img]:object-contain"}`}
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
  variant = "index",
}: {
  index?: string;
  title: string;
  description: string;
  href: string;
  action: string;
  variant?: "index" | "card";
}) {
  if (variant === "card") {
    return (
      <article className="h-full" data-ui="programme">
        <a
          className="group flex h-full flex-col border border-border bg-page p-6 text-inherit no-underline transition-[background-color,border-color,transform] duration-150 hover:border-primary hover:bg-surface-muted active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus lg:p-7"
          href={href}
        >
          <h3
            className="font-editorial text-[26px] leading-[32px] font-semibold lg:text-[30px] lg:leading-[36px]"
            data-ui="content-title"
          >
            {title}
          </h3>
          <p className="mt-3 text-[17px] leading-[25px] lg:text-[18px] lg:leading-[26px]">
            {description}
          </p>
          <span
            className="mt-auto flex min-h-11 items-center gap-2 pt-5 font-sans text-[16px] leading-[22px] font-semibold text-primary"
            data-ui="action"
          >
            <span>{action}</span>
            <span
              className="transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </a>
      </article>
    );
  }

  return (
    <article
      className="border-t-2 border-t-primary grid grid-cols-[24px_minmax(0,1fr)] gap-3.5 pt-4 [&_p]:mt-2.5 [&_p]:text-[17px] [&_p]:leading-[25px] [&_[data-ui~=link]]:mt-4 lg:block lg:[&_[data-ui~=content-title]]:mt-6 lg:[&_p]:text-[18px] lg:[&_p]:leading-[26px] lg:[&_p]:mt-3.5 lg:[&_[data-ui~=link]]:mt-6"
      data-ui="programme"
    >
      {index && (
        <span
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-muted"
          aria-hidden="true"
          data-ui="label index"
        >
          {index}
        </span>
      )}
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
  variant = "default",
}: {
  activity: ActivityFixture;
  title?: string;
  summary?: string;
  variant?: "default" | "archive";
}) {
  const displayTitle = title || activityDisplayTitle(activity);
  if (variant === "archive")
    return (
      <article
        className="grid gap-3 border-t border-t-border py-6 text-[17px] leading-[25px] md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 lg:py-7"
        data-activity-id={activity.id}
        data-ui="activity activity-archive"
      >
        <div
          className="font-sans text-[15px] leading-[23px] text-blue md:pt-1"
          data-ui="activity-metadata"
        >
          <RecordDate id={activity.id} fallback={activity.date} />
        </div>
        <div data-ui="activity-content">
          <h3
            className="font-sans text-[23px] leading-[29px] font-semibold lg:text-[25px] lg:leading-[32px]"
            data-ui="activity-title"
          >
            <a
              className="block w-fit max-w-full no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus hover:text-primary active:text-primary-active"
              href={activity.href}
              aria-label={title || activity.title}
            >
              {displayTitle}
            </a>
          </h3>
          {activity.location && (
            <p className="mt-1 text-[16px] leading-[23px] text-muted" data-ui="place">
              {activity.location}
            </p>
          )}
          <p className="mt-3 max-w-[65ch]">{summary || activity.summary}</p>
          <div className="mt-3">
            <TextLink
              href={activity.href || `#/activity/${activity.id}`}
              variant="quiet"
              ariaLabel={`Baca catatan ${displayTitle}`}
            >
              Baca catatan
            </TextLink>
          </div>
        </div>
      </article>
    );
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
          {displayTitle}
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
  variant = "default",
  byline,
  detail,
  availabilityText,
}: {
  title: string;
  type: string;
  date?: string;
  summary: string;
  href: string;
  action: string;
  related?: string;
  variant?: "default" | "editorial";
  byline?: string;
  detail?: string;
  availabilityText?: string;
}) {
  const { registry } = useContentReadModel();
  const record = registry.works.find(
    (w) => href.split("?")[0] === `#/publication/${w.id}`,
  );
  const availability = record ? workDiscovery(record) : undefined;
  if (variant === "editorial")
    return (
      <article
        className="flex h-full flex-col border-t-2 border-t-blue pt-5 pb-1 [&>[data-ui~=content-title]]:mt-3 [&>[data-ui~=metadata]]:mt-4 [&>[data-ui~=summary]]:mt-4 [&>[data-ui~=availability]]:mt-5 [&>[data-ui~=link]]:mt-6"
        data-ui="publication publication-editorial"
      >
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          {type}
          {related ? ` / ${related}` : " / Mandiri"}
        </p>
        <h3
          className="font-semibold text-[26px] leading-[32px] font-editorial text-primary lg:text-[30px] lg:leading-[36px]"
          data-ui="content-title"
        >
          {title}
        </h3>
        {(byline || date || detail) && (
          <p className="text-[15px] leading-[22px] text-muted" data-ui="metadata">
            {[byline, date, detail].filter(Boolean).join(" · ")}
          </p>
        )}
        <p data-ui="summary">{summary}</p>
        <p
          className="border-l-2 border-l-border pl-3 text-[14px] leading-[20px] text-muted"
          data-ui="availability"
        >
          {availabilityText ?? availability?.cue}
        </p>
        <div className="mt-auto">
          <TextLink
            href={href}
            variant="quiet"
            ariaLabel={`${action}: ${title}`}
          >
            {action}
          </TextLink>
        </div>
      </article>
    );
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
