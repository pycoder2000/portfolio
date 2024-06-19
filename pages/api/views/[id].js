const { google } = require('googleapis')

let jwt

try {
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
  const clientEmail = process.env.CLIENT_EMAIL
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
  const jwt = new google.auth.JWT(clientEmail, null, privateKey, scopes)
} catch (e) {
  console.error(
    'Google Analytics API disabled due to missing Service Account Credentials'
  )
}

async function getData(id) {
  await jwt.authorize()

  const result = await google.analyticsreporting('v4').reports.batchGet({
    auth: jwt,
    requestBody: {
      reportRequests: [
        {
          measurementID: 'G-NB17WWG523',
          dateRanges: [{ startDate: '2024-06-16', endDate: 'today' }],
          metrics: [{ expression: 'ga:pageviews' }],
          dimensions: [{ name: 'ga:pagePath' }],
          dimensionFilterClauses: [
            {
              filters: [
                {
                  operator: 'EXACT',
                  dimensionName: 'ga:pagePath',
                  expressions: [`/${id}`],
                },
                {
                  operator: 'EXACT',
                  dimensionName: 'ga:pagePath',
                  expressions: [`/${id}/`],
                },
              ],
            },
          ],
        },
      ],
    },
  })

  const totalWithoutTrailingSlash =
    parseInt(result.data.reports[0].data.rows[0].metrics[0].values[0], 10) || 0
  const totalWithTrailingSlash =
    parseInt(result.data.reports[0].data.rows[1]?.metrics[0].values[0], 10) || 0

  return totalWithoutTrailingSlash + totalWithTrailingSlash
}

export default async function getViews({ query: { id } }, res) {
  try {
    const views = await getData(id)
    res.status(200).json({ views })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
