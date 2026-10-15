const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
(async () => {
  const root = path.resolve(__dirname, ".."),
    out = path.resolve(
      process.env.EVIDENCE_DIR ||
        require("node:os").tmpdir() + "/tursina-domain-proof",
    ),
    entry = out + "/entry";
  fs.mkdirSync(entry, { recursive: true });
  if (!fs.existsSync(entry + "/node_modules"))
    fs.symlinkSync(root + "/node_modules", entry + "/node_modules", "dir");
  fs.writeFileSync(
    entry + "/index.html",
    '<!doctype html><html lang="id"><meta name="viewport" content="width=device-width,initial-scale=1"><div id="tursina-prototype"></div><script type="module" src="/entry.tsx"></script></html>',
  );
  fs.writeFileSync(
    entry + "/entry.tsx",
    `import{createRoot}from'react-dom/client';import{canonicalRegistry,preview}from ${JSON.stringify(root + "/src/domain/index")};import{projectPreview}from ${JSON.stringify(root + "/src/domain/project")};import{withDomainProof}from ${JSON.stringify(root + "/tools/domain-test-fixtures")};const next=withDomainProof(canonicalRegistry),projection=projectPreview(next);Object.assign(canonicalRegistry,next);Object.assign(preview,projection);import(${JSON.stringify(root + "/src/App")}).then(({App})=>createRoot(document.getElementById('tursina-prototype')!).render(<App/>));`,
  );
  const { createServer } = await import(
      pathToFileURL(root + "/node_modules/vite/dist/node/index.js")
    ),
    tailwind = (
      await import(
        pathToFileURL(root + "/node_modules/@tailwindcss/vite/dist/index.mjs")
      )
    ).default;
  const s = await createServer({
    root: entry,
    configFile: false,
    publicDir: false,
    cacheDir: entry + "/cache",
    plugins: [tailwind()],
    server: { host: "127.0.0.1", port: 4183, fs: { allow: [entry, root] } },
  });
  await s.listen();
  const opts = { headless: true, args: ["--no-zygote", "--disable-gpu"] };
  if (process.env.CHROMIUM_PATH)
    opts.executablePath = process.env.CHROMIUM_PATH;
  const b = await chromium.launch(opts),
    errors = [],
    results = [];
  try {
    for (const width of [1366, 390, 320]) {
      const p = await b.newPage({ viewport: { width, height: 844 } });
      p.on("pageerror", (e) => errors.push(e.message));
      const go = async (route) => {
        await p.goto("http://127.0.0.1:4183/#" + route);
        await p.locator("main h1").waitFor();
      };
      await go("/program/te");
      await p
        .getByRole("link", {
          name: "Tursina Explore #DEMO — Edisi uji kontrak — bukan ekspedisi nyata",
          exact: true,
        })
        .click();
      await p
        .getByRole("heading", {
          level: 1,
          name: "Edisi uji kontrak — bukan ekspedisi nyata",
          exact: true,
        })
        .waitFor();
      assert(p.url().endsWith("/expedition/data-proof-te"));
      assert.equal(
        await p.locator("main figure,.te-journey,.ds-publications").count(),
        0,
      );
      await p.reload();
      await p
        .getByRole("heading", {
          level: 1,
          name: "Edisi uji kontrak — bukan ekspedisi nyata",
          exact: true,
        })
        .waitFor();
      await p.screenshot({
        path: out + `/data-only-te-${width}.png`,
        fullPage: true,
      });
      await go("/program/pd?division=ORAD&cohort=none");
      await p
        .getByRole("link", { name: "PD uji kontrak", exact: true })
        .click();
      await p
        .getByRole("heading", { level: 1, name: "PD uji kontrak", exact: true })
        .waitFor();
      assert.equal(
        await p
          .locator(
            "main figure,.activity-chapter,.activity-learning,.ds-publications",
          )
          .count(),
        0,
      );
      await go("/publication/data-proof-work");
      await p
        .getByRole("heading", {
          level: 1,
          name: "Karya uji kontrak mandiri",
          exact: true,
        })
        .waitFor();
      assert.equal(
        await p
          .locator("[data-availability]")
          .getAttribute("data-availability"),
        "restricted",
      );
      assert.equal(
        await p
          .locator(
            ".work-related-activity,main a[download],main img,.te-story-section",
          )
          .count(),
        0,
      );
      await go("/jejak");
      assert.equal(
        await p
          .locator("[data-history-id]")
          .nth(1)
          .getAttribute("data-history-id"),
        "data-proof-history",
      );
      await go("/members");
      await p.getByLabel("Cari NIA atau nama").fill("DEMO.CONTRACT");
      await p.getByText("Anggota Uji Kontrak", { exact: true }).waitFor();
      assert.equal(await p.locator("tbody tr").count(), 1);
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      results.push({
        width,
        newEditionCatalogueDetailRefresh: true,
        pdWithoutCohort: true,
        restrictedIndependentWork: true,
        historyOrderedFromYear: true,
        syntheticMemberAddition: true,
      });
      await p.close();
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      out + "/domain-proof.json",
      JSON.stringify(
        {
          method:
            "Temporary test entry outside public build adds only typed canonical records, validates/projectPreview, then loads unchanged App. No record-specific page components or external data endpoint.",
          browser: await b.version(),
          results,
          errors,
        },
        null,
        2,
      ),
    );
    console.log("PASS canonical data-only browser proof at three widths");
  } finally {
    await b.close();
    await s.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
