/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Plain HTML/CSS/JS in out/, for hosts without Node.js (e.g. Hostinger shared hosting).
  output: "export",
  // Static hosting has no image optimiser; images are served as they are in public/img.
  images: { unoptimized: true },
};

export default nextConfig;
