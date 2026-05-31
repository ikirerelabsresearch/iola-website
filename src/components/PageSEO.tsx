import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://ikirere.com'
const DEFAULT_IMAGE = `${BASE_URL}/iola-logo-space.png`
const SITE_NAME = 'Ikirere Orbital Labs Africa'

interface PageSEOProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  schema?: object | object[]
}

export default function PageSEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema,
}: PageSEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  )
}
