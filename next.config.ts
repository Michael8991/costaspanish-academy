import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

// Indica la ruta de tu archivo de configuración de i18n
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {

};
export default withNextIntl(nextConfig);
