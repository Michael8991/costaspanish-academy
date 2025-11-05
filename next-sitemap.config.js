/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.costaspanishclass.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    additionalPaths: async (config) => {
        return [
            { loc: '/en', changefreq: 'daily', priority: 0.7 },
            { loc: '/es', changefreq: 'daily', priority: 0.7 },
            { loc: '/en/contactUs', changefreq: 'monthly', priority: 0.5 },
            { loc: '/es/contactUs', changefreq: 'monthly', priority: 0.5 },
            { loc: '/en/courses', changefreq: 'daily', priority: 0.7 },
            { loc: '/es/courses', changefreq: 'daily', priority: 0.7 },
        ];
    },
};
