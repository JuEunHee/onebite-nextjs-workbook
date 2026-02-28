import Head from "next/head"

export default function SEO({
    title,
    description,
    image
}: {
    title: string;
    description?: string;
    image?: string;
}) {
    const siteTitle = `${title} | ONEBITE`;
    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* 오픈 그래프 (카톡, 페북 공유 시 노출) */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="video.movie" /> {/* 영화 서비스 특화 타입 */}

            {/* 트위터 카드 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* 파비콘 */}
            <link rel="icon" href="/favicon.ico" sizes="48x48" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            <meta key="og:title" property="og:title" content={siteTitle} />
        </Head>
    )
}