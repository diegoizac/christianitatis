import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export function SEO({
  title,
  description,
  canonical,
  image = "/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
}: SEOProps) {
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://christianitatis.com.br";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Christianitatis" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article específico */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          url: fullUrl,
          name: title,
          description: description,
          image: fullImage,
          ...(type === "article" && {
            author: {
              "@type": "Person",
              name: author,
            },
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
          }),
        })}
      </script>
    </Helmet>
  );
}
