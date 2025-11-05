/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.costaspanishclass.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/server-sitemap.xml'],
    alternateRefs: [
        { href: 'https://www.costaspanishclass.com/es', hreflang: 'es' },
        { href: 'https://www.costaspanishclass.com/en', hreflang: 'en' },
    ],
};
