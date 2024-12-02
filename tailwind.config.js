// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   presets: [require("nativewind/tailwind/native")],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
