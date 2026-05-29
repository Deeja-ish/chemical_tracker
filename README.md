# Chemical Tracker

A React + Vite app for logging chemical solutions, tracking concentration and stability metrics, and exporting solution logs as CSV.

## Features

- Add new chemical solutions with name, category, concentration, volume, pH, temperature, and viscosity
- View logged solutions in a searchable table
- Delete individual solution entries
- Visualize data with charts (bar, line, pie) using `recharts`
- Persist solution data locally using `localStorage`
- Export the current solution log as a CSV file

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Recharts
- ESLint

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the URL shown in your terminal, typically `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## App Usage

1. Enter solution details in the form.
2. Click **Log Solution** to add it to the dashboard.
3. Use the search box to filter solutions by name.
4. Click **Delete** to remove an entry.
5. Click **Export CSV** to download the current log as a CSV file.

## Important Notes

- Data is saved in the browser using `localStorage`, so refreshing the page preserves your log.
- CSV export only runs when the **Export CSV** button is clicked.
- Optional fields like pH, temperature, and viscosity accept blank values and will be saved as `N/A` if not provided.

## Project Structure

- `src/App.jsx` — app root and state management
- `src/components/Dashboard.jsx` — dashboard layout and export button
- `src/components/AddSolutionForm.jsx` — form for creating new solution records
- `src/components/SolutionTable.jsx` — searchable solution list with delete actions
- `src/components/ChartsWidget.jsx` — solution visualizations and metrics

## Dependencies

- `react`
- `react-dom`
- `recharts`

## Dev Dependencies

- `@vitejs/plugin-react`
- `tailwindcss`
- `eslint`
- `vite`
- `vitest`

## License

This project is provided as-is.
