export const GA_TRACKING_ID = 'G-NB17WWG523'

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
