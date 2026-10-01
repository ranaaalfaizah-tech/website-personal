/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx,html}'],
  theme: { extend: { colors: { brand: { cyan:'#00AEEF', blue:'#0077C8', navy:'#003366', white:'#FFFFFF', ice:'#F0F8FF', soft:'#E6F4F8' }, neonCyan:'#00f2fe', neonBlue:'#4facfe' }, fontFamily:{poppins:['Poppins','sans-serif'],inter:['Inter','sans-serif']}, boxShadow:{glowCyan:'0 0 25px -5px rgba(0,242,254,.5)',glowBlue:'0 0 25px -5px rgba(79,172,254,.5)'} } }, plugins: []
}
