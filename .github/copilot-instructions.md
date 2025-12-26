# Copilot Instructions — tefhoto-invoice

Purpose: Give an AI coding agent the minimum, actionable context to be immediately productive in this repo: what matters, where logic lives, how to run and test, and project-specific conventions.

## Big picture
- Single-page React app (Vite + Tailwind). The entire UX/logic lives primarily in `src/App.jsx` as one monolithic component.
- No backend: persistence is client-side only (localStorage). UI includes package selection, invoice form, preview/print and simple history management.
- UI/UX decisions favor minimal dependencies and localized Indonesian formats (currency and date strings use `id-ID`).

## Primary flows & data shapes (important to preserve)
- Create invoice: select package -> fill `clientData` -> add additional items -> save. Saving writes to `localStorage` key `tefhoto_invoices`.
- Invoice object example (what to read/write):
  ```js
  {
    id: number, // Date.now()
    createdAt: ISOString,
    clientData: { name, phone, address, invoiceNo, eventType, eventDateStart, eventDateEnd, notes },
    selectedPackage: { id, name, price, features, category },
    additionalItems: [{desc, cost}],
    dpAmount: 'formatted string',
    totalAmount: number,
    balance: number
  }
  ```
- Invoice number format: `INV-TEF-YYMM-SEQ-RAND` (see `generateInvoiceNumber(history)` in `App.jsx`). Do not change this without updating all uses.

## Key files & where to look
- `src/App.jsx` — primary application logic, formatters, components (Navbar, PackageCard) and views (`home`, `form`, `history`, `preview`). Start here for most changes.
- `src/main.jsx` — app bootstrap.
- `index.html`, `src/index.css`, `tailwind.config.js` — styling/build config.
- `package.json` — scripts: `npm run dev` (vite dev server), `npm run build`, `npm run preview`.

## Developer workflows (how to run / debug)
- Run dev server: `npm install` then `npm run dev` (Vite default port 5173). Open the browser and use DevTools to inspect state, localStorage, and console errors.
- To test printing/PDF generation: use the preview view and the browser print dialog (window.print()). Mobile PDF workflow is noted in UI help (share->print->Save as PDF).
- No tests / CI currently—be conservative when changing core logic and add tests or a changelog when touching invoice generation or storage.

## Project-specific conventions & patterns
- Single-file app: refactors should try to preserve behavior; when splitting `App.jsx` into components, keep the state and serialization logic intact, especially `invoiceHistory` and `generateInvoiceNumber` behavior.
- Localization: `Intl` is used extensively (`formatCurrency`, `formatDateIndo`). Keep `id-ID` locale for display strings unless adding locale switching.
- Number inputs: inputs are stored as formatted strings in state (e.g., `dpAmount`), and converted with `parseNumberInput` when needed—maintain this pattern to avoid formatting bugs.
- Images: `dpProofImage` is stored as DataURL (FileReader) but is not persisted to `localStorage` during save (set to `null` on load). Treat uploaded images as ephemeral unless intentionally adding persistent storage.

## Integration points & external deps
- `lucide-react` for icons; `tailwindcss` for styling; `vite` as dev/build tool.
- WhatsApp message flow uses `https://wa.me/?text=` with preformatted message (see `openWaLink`). Keep message formatting when changing invoice preview text.

## Common change pitfalls to avoid
- Changing invoice number format without migrating existing `tefhoto_invoices` data in localStorage will cause numbering inconsistencies.
- Moving `localStorage` key names or invoice schema must include migration code when reading legacy data (see `useEffect` that reads `tefhoto_invoices`).
- Avoid breaking inline formatting helpers (`formatCurrency`, `formatEventDateRange`) as the UI relies on them for Indonesian-friendly output.

## Suggested tasks for contributors (prioritized)
- Split `App.jsx` into small components (e.g., `InvoiceForm`, `PackageCard`, `HistoryList`) with unit tests around invoice creation and numbering.
- Add tests for `generateInvoiceNumber`, parse/format helpers, and `saveToHistory` update vs create behavior.
- Add CI and a minimal E2E test (Playwright or Cypress) to validate print/PDF and WA link flows.

---
If anything here is unclear or you'd like me to add concrete PR templates, tests, or a migration strategy for invoice schema changes, tell me which area to expand. Thank you—what part should I clarify or expand next?