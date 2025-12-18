# Year in Review 2023 – Responsive Landing Page

This project is a responsive **Year in Review** landing page built with semantic HTML5, SCSS, and vanilla JavaScript. It showcases the highlights of a year using a hero Swiper gallery, dynamically generated event sections, and scroll animations powered by AOS.

## Tech Stack

- HTML5 semantic structure
- SCSS (compiled to `style.css`, mobile‑first)
- Vanilla JavaScript for dynamic rendering and interactivity
- Swiper.js v11 (`cards` effect)
- AOS.js v2 for scroll animations

## Getting Started

1. Open `index.html` directly in your browser (no build step required).
2. All dependencies are loaded via CDN (Swiper, AOS, Google Fonts).
3. Styles are served from the pre‑compiled `style.css`. The original `style.scss` is included for reference and customization.

## Project Structure

- `index.html` – Main entry and semantic layout
- `style.scss` – Source SCSS with variables, mixins, and responsive rules
- `style.css` – Pre‑compiled CSS used by the page
- `script.js` – Data structures, dynamic DOM generation, Swiper/AOS init, interactivity
- `README.md` – This documentation

## Dynamic Content

### Hero Gallery

The hero Swiper gallery is generated from the `heroImages` array in `script.js`:

```js
const heroImages = [
  { url, alt, title, caption, tag },
  // ...
];
```

Update this array to change or add hero cards. Images are loaded lazily and use `picsum.photos` placeholders by default.

### Events

Events are defined in the `eventsData` array in `script.js`:

```js
const eventsData = [
  {
    id,
    date,
    monthIndex, // 0–11, used for the timeline progress
    title,
    description,
    location,
    category,
    images: [{ url, alt }, ...] // one or multiple
  },
  // ...
];
```

- **Single image** → a static media card.
- **Multiple images** → a nested Swiper gallery within the event.

To add a new event, append an object to `eventsData`. The page will automatically render a new section with share actions and media.

## Key JS Functions

- `renderHeroSwiper()` – Renders hero cards from `heroImages`.
- `renderEvents()` – Creates event sections from `eventsData`.
- `initializeSwipers()` – Initializes the hero Swiper and any event galleries.
- `setupAnimations()` – Configures AOS (duration, offset, mobile behavior).
- `setupTimelineProgress()` – Updates the year progress bar based on the last event’s `monthIndex`.
- `setupBackToTop()` – Handles the floating back‑to‑top button and scroll visibility.
- `setupThemeToggle()` – Light/dark mode with `localStorage` persistence.
- `setupKeyboardNavigation()` – Small helper for keyboard‑friendly focus behavior.

## Responsiveness

- **Mobile (320px+)**: single‑column layout, stacked sections, touch‑friendly Swipers, reduced spacing.
- **Tablet (768px+)**: two‑column event layout, larger cards, adjusted typography.
- **Desktop (1024px+)**: enhanced shadows, refined spacing, more generous grids.

The SCSS uses a `$breakpoints` map and a `respond()` mixin for mobile‑first media queries.

## Accessibility & UX

- Semantic sections (`header`, `main`, `section`, `footer`).
- ARIA labels for galleries, hero, and share buttons.
- Keyboard navigation support via Swiper’s a11y and keyboard modules.
- Sufficient color contrast and focus states for interactive elements.
- Print‑friendly styles (header UI, controls, and certain interactive elements hidden in print).

## Theming

- Colors and radii are defined as CSS custom properties in `:root`.
- Light/dark modes driven by the `data-theme="light"` attribute on `<html>`.
- The theme toggle button stores preference in `localStorage` (`year-review-theme` key).

## Performance Notes

- All main images use `loading="lazy"`.
- Swiper instances are initialized only when their containers exist.
- AOS is configured with `once: true` to avoid repeated work during scroll.
- No build tooling is required; you can minify CSS/JS separately for production if desired.

## Extending the Page

- **Add new events** – extend `eventsData` in `script.js`.
- **Change the color palette** – adjust CSS variables in `style.scss` (`:root` and `[data-theme='light']`).
- **Swap fonts** – update the Google Fonts link in `index.html` and the font variables in `style.scss`.
- **Add new sections** – create additional semantic `section` blocks in `index.html` and style them in SCSS.

