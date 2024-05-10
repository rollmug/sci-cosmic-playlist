import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { ApolloWrapper } from "@/lib/apollo-provider";

export const generateStaticParams = () => {
    return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} data-theme="night">
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ApolloWrapper>
                        {children}
                    </ApolloWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}