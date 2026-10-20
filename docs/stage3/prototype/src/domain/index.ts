import { institutionalContent } from "./records.ts";
import type { InstitutionalRegistry } from "./contract.ts";
import { validateRegistry } from "./validate.ts";
import { projectPreview } from "./project.ts";
export const canonicalRegistry: InstitutionalRegistry =
  validateRegistry(institutionalContent);
export const preview = projectPreview(canonicalRegistry);
