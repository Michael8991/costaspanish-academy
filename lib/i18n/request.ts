import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale || "en";

    const common = (await import(`../../messages/${currentLocale}/common.json`)).default;
    const home = (await import(`../../messages/${currentLocale}/home.json`)).default;
    const contact = (await import(`../../messages/${currentLocale}/contact.json`)).default;
    const courses = (await import(`../../messages/${currentLocale}/courses.json`)).default;
    const filters = (await import(`../../messages/${currentLocale}/filters.json`)).default;
    const coursesCatalog = (await import(`../../messages/${currentLocale}/coursesCatalog.json`)).default;
    const coursePage = (await import(`../../messages/${currentLocale}/coursePage.json`)).default;
    const preinscription = (await import(`../../messages/${currentLocale}/preinscription.json`)).default;

    return {
        locale: currentLocale,
        messages: {
            common,
            home,
            contact,
            courses,
            filters,
            coursesCatalog,
            coursePage,
            preinscription,
        },
    };
});
