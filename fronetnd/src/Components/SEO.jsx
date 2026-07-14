import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'ACS Cables - Premium Cable & Wire Solutions in India',
  description = 'ACS Cables offers premium quality cables, wires, and electrical solutions in India. Explore our wide range of products including power cables, coaxial cables, and more.',
  keywords = 'ACS Cables, cables, wires, electrical cables, India, cable supplier',
  ogImage = '/logo.svg',
  ogUrl = '',
  canonicalUrl = '',
  ogType = 'website',
}) => {
  const siteUrl = 'https://acs-cables.vercel.app'
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
    </Helmet>
  )
}

export default SEO