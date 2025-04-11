/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Add custom animation for AI processing indicator
      animation: {
        'ai-pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Custom colors for Gemini-themed UI
      colors: {
        gemini: {
          primary: '#4285F4',
          secondary: '#34A853',
          accent: '#FBBC05',
        }
      }
    },
  },
  reactStrictMode: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Updated for Gemini
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // Add if using form elements
  ],
};
