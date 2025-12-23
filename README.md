# Geocoding Playground

Interactive demo for the Saudi Arabia Geocoding SDK - browser-based geocoding with zero backend dependencies.

## Features

- **Forward Geocoding**: Convert addresses to coordinates
- **Reverse Geocoding**: Find addresses near coordinates
- **Postcode Search**: Search by postal code with autocomplete
- **House Number Search**: Find addresses by house number
- **Bilingual Support**: Full Arabic and English support
- **Dark/Light Mode**: System-aware theme switching
- **Zero Backend**: Runs entirely in the browser using DuckDB-WASM

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun preview
```

## Deployment

The app is automatically deployed to GitHub Pages on push to `main` branch via GitHub Actions.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- shadcn/ui components
- MapLibre GL for maps
- @tabaqat/geocoding-sdk for geocoding

## License

MIT
