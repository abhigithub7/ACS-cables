import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'ACS Cables - Premium Cable & Wire Solutions in India',
  description = 'ACS Cables offers premium quality cables, wires, and electrical solutions in India. Explore our wide range of products including power cables, LAN cables, CCTV cables, coaxial cables, printer cables, and computer accessories. Best prices with GST billing.',
  keywords = 'ACS Cables, cable supplier India, wire manufacturer, electrical cables, power cables, LAN cables, CCTV cables, coaxial cables, printer cables, computer accessories, network cables, cable dealer India, best cable shop, GST billing cables',
  ogImage = '/og-image.jpg',
  ogUrl = '',
  canonicalUrl = '',
  ogType = 'website',
}) => {
  const siteUrl = 'https://www.acscables.in'
  const fullUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl
  const fullCanonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="ACS Cables" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* JSON-LD BreadcrumbList */}
      {ogUrl && ogUrl !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": title.replace(' - ACS Cables', '').trim(),
                "item": fullUrl
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
