---
name: brutalist-design
description: Enforces the MerchHub "Brutalist-Lite / High-Editorial" design system for all UI tasks.
---

# Brutalist Design System Rule

When working on any UI or frontend tasks in the `merchhub-1` workspace, you MUST strictly adhere to the following design system.

## 1. Color Palette (Strictly Enforced)
- **Primary**: Stark Red (`#FF0000`). Used for primary actions, buttons, and high-impact visual blocks.
- **Secondary**: Solid Black (`#000000`). Used for heavy borders, typography, and dark blocks.
- **Background**: Pure White (`#FFFFFF`). Used for the main canvas.
- **Accent**: Light Gray (`#F4F4F5`). Used for subtle background shifts or secondary surfaces.

## 2. Typography
- **Font**: Inter (sans-serif).
- **Headings**: Must be `font-black`, `uppercase`, and tightly tracked (e.g., `tracking-tighter`, `leading-none`). Use massive sizes (`text-5xl` to `text-7xl`) for heroes.
- **Micro-copy/Labels**: Must be `text-xs`, `font-extrabold`, `uppercase`, and widely tracked (`tracking-widest`).

## 3. UI Component Styling (Brutalism)
Do not use soft, rounded UI elements or glassmorphism.
- **Borders**: All inputs, cards, and buttons MUST have thick borders (`border-2 border-border`).
- **Shadows**: Do not use soft blur shadows. Use hard, solid drop shadows (e.g., `shadow-[4px_4px_0px_0px_var(--color-border)]`).
- **Interactions**: On hover or active states, elements should physically shift (e.g., `translate-y-[2px]`) or cast hard shadows (e.g., `focus:shadow-[4px_4px_0px_0px_var(--color-primary)]`).
- **Border Radius**: Always use sharp corners (`rounded-none`). Do not use `rounded-md` or `rounded-lg`.

## 4. Imagery & Visuals
- Use high-contrast, edgy editorial photography (often black & white or stark color palettes).
- Use `mix-blend-mode: multiply` to seamlessly blend images with solid white backgrounds into colored geometric blocks.
- Graphic layouts should feel like a poster: asymmetrical, blocky, and raw.
