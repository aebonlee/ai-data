import { useEffect } from 'react'
import { siteConfig } from '../config/site'

export default function SEOHead({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.title
    document.title = fullTitle

    const desc = description || siteConfig.description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', fullTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)

    const twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute('content', fullTitle)

    const twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute('content', desc)
  }, [title, description])

  return null
}
