/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Modern blue primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: {
          900: '#0f172a', // Dark navy headings
          800: '#1e293b',
          700: '#334155',
        },
        slate: {
          500: '#64748b', // Slate gray secondary text
          100: '#f1f5f9',
          200: '#e2e8f0', // Light-gray borders
          50: '#f8fafc',  // Very light gray page background
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

