import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale || "en";

    const common = (await import(`../../messages/${currentLocale}/common.json`)).default;
    const home = (await import(`../../messages/${currentLocale}/home.json`)).default;
    const contact = (await import(`../../messages/${currentLocale}/contact.json`)).default;

    return {
        locale: currentLocale,
        messages: {
            common,
            home,
            contact,
        },
    };
});
