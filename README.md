# Rohi Somon Dashboard

A modern, responsive administrative dashboard for managing gas station points, built with Vue 3, Pinia, and Tailwind CSS.

## 🚀 Features

- **Points Management**: View, add, and manage gas station points.
- **Interactive Map Picker**: Visual coordinate selection using Leaflet.
- **Form Validation**: Robust validation using Zod and VeeValidate.
- **Modern UI**: Consistent 6px border-radius, professional color palette, and responsive grid layouts.
- **Architecture**: Follows Feature-Sliced Design (FSD) for professional-grade maintainability.

## 🛠 Tech Stack

- **Vue 3** (Composition API)
- **Pinia** (State Management)
- **Tailwind CSS 4**
- **TypeScript**
- **Leaflet** (Maps)
- **Vite** (Build Tool)

## 📦 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run in development mode**:

   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/app`: Global app setup (styles, router, main entry).
- `src/pages`: Main page components.
- `src/widgets`: Composite UI blocks.
- `src/features`: Interactive business logic.
- `src/entities`: Business domain models and stores.
- `src/shared`: Reusable UI components, API clients, and utils.
