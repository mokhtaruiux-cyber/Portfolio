module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2f6bff',
      },
      zIndex: {
        top: '1000',
        nav: '100',
        overlay: '90',
        floating: '70',
      },
    },
  },
  plugins: [],
};
