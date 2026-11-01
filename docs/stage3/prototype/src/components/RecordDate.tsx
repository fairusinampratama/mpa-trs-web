import { useContentReadModel } from "../ContentReadModel";
import { dateView } from "../domain/read";
import type { DatedClaim } from "../domain/contract";
export function RecordDate({
  id,
  claim,
  fallback,
}: {
  id?: string;
  claim?: DatedClaim;
  fallback?: string;
}) {
  const { registry } = useContentReadModel();
  const record = [
    ...registry.activities,
    ...registry.works,
    ...registry.history,
  ].find((r) => r.id === id);
  const d = claim ?? record?.dates;
  if (!d) return fallback ? <span>{fallback}</span> : null;
  const v = dateView(d);
  return (
    <span data-date-state={d.reconciliation}>
      {v.role === "planned" ? "Rencana: " : ""}
      {v.machine ? <time dateTime={v.machine}>{v.label}</time> : v.label}
      {v.uncertain && (
        <span className="text-sm/5 text-muted" data-ui="caption">
          {" "}
          · tanggal belum selaras
        </span>
      )}
    </span>
  );
}
export function DateEvidence({ id }: { id: string }) {
  const { registry } = useContentReadModel();
  const r = [
    ...registry.activities,
    ...registry.works,
    ...registry.history,
  ].find((r) => r.id === id);
  if (!r) return null;
  const planned = r.dates.assertions.filter((a) => a.role === "planned");
  return (
    <>
      {planned.length > 0 && (
        <p>
          Rencana terdokumentasi:{" "}
          {planned
            .map((a) =>
              a.value.precision === "unknown"
                ? "belum diketahui"
                : a.value.start + (a.value.end ? " – " + a.value.end : ""),
            )
            .join("; ")}
          . Ini bukan pengganti tanggal pelaksanaan.
        </p>
      )}
      {r.dates.reconciliation === "unresolved" && (
        <p>
          Tanggal antarbagian sumber belum selaras; rentang tampilan adalah
          pilihan editorial sementara.
        </p>
      )}
      {"dateIssues" in r &&
        r.dateIssues?.map((i) => <p key={i.scope}>{i.explanation}</p>)}
    </>
  );
}
