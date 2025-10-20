import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale || 'en';

    const common = (await import(`../../messages/${currentLocale}/common.json`)).default;

    return {
        locale: currentLocale,
        messages: {
            common,
        },
    };
});