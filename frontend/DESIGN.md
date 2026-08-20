---
name: StudyForge
colors:
  background: '#0F0F12'
  surface: '#1A1A1F'
  text: '#F5F5F5'
  muted: '#9A9AA5'
  primary: '#F5A623'
typography:
  heading:
    fontFamily: Space Grotesk
    fontWeight: '600'
  body:
    fontFamily: Inter
    fontWeight: '400'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 20px
---

## Brand & Style

Dark, minimal, developer-tool-adjacent — built for focused studying, not flashy marketing. Amber accent evokes a highlighter, tying back to the study/notes theme. Generous whitespace, no clutter, one primary accent color used sparingly.

## Colors (5 total)

- **background (#0F0F12):** page background, near-black
- **surface (#1A1A1F):** cards, sidebar, modals — slightly lighter than background
- **text (#F5F5F5):** headings and primary body copy
- **muted (#9A9AA5):** secondary text, placeholders, metadata
- **primary (#F5A623):** primary buttons, active states, progress bars, small highlights only — never used for large surfaces

## Typography

**Space Grotesk** for all headings and buttons — modern, slightly technical. **Inter** for body text and labels — clean and highly legible. No other fonts anywhere in the app.

## Layout & Spacing

- Sidebar nav (Dashboard, My Notes, Flashcards, Study Sets, AI Helper, Settings, Logout) + main content area, consistent across all authenticated screens
- 4px baseline spacing rhythm
- Generous padding around cards and main content — avoid dense/cluttered layouts

## Shapes

- Standard radius (8-12px): buttons, inputs, cards
- No pill-shaped buttons — keep edges structured, matches the technical feel

## Components

- **Buttons:** primary = amber background, dark text. Secondary = transparent, muted border.
- **Cards (notes, study sets):** surface background, subtle border, title + short preview + tag/button.
- **Modals (Add Note):** overlay, surface background, title field + textarea + Cancel/primary action buttons.
- **Progress indicators:** thin amber bar or "3/10" style counter for flashcard study sessions and daily AI usage.
- **Empty states:** centered icon, muted heading, clear single CTA — no clutter.

## Content Rules

- No pricing, testimonials, or fake user counts (portfolio project, not a live SaaS)
- No unverified feature claims (no "GPT-4o", no specific language-support numbers) unless actually true of the built backend
