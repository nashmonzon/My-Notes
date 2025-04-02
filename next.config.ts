/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Configuración simplificada para Lit
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules\/lit-element|lit-html|@lit|lit/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default nextConfig;
