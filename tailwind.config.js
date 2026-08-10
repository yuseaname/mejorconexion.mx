/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/adsense-base/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        /* New warm editorial semantic tokens */
        paper: '#FDFBF7',
        surface: '#FFFFFF',
        ink: '#1F2937',
        'ink-muted': '#6B7280',
        brand: { 50: '#EFF6FF', 100: '#DBEAFE', 500: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF' },
        accent: { 50: '#FFFBEB', 100: '#FEF3C7', 500: '#D97706', 600: '#D97706' },
        success: { 50: '#F0FDFA', 600: '#0D9488', 700: '#0F766E' },
        caution: { 50: '#FEF2F2', 600: '#DC2626', 700: '#B91C1C' },
        earth: '#C2410C',
        /* Legacy scales kept for migration compatibility */
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
          500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a',
        },
        gray: {
          50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB', 400: '#9CA3AF',
          500: '#6B7280', 600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
        },
      },
    },
  },
  plugins: [],
}