
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

let analyticsDataClient

try {
  analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key.replace(/\\n/g, '\n'),
    },
  })
} catch (e) {
  console.error(
    'Google Analytics API disabled due to missing Service Account Credentials'
  )
}

async function getData(id) {
  if (!analyticsDataClient) {
    throw new Error('Google Analytics API client is not initialized')
  }

  const propertyId = process.env.GA4_PROPERTY_ID

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2024-06-16',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
    dimensionFilterClauses: [
      {
        filters: [
          {
            operator: 'EXACT',
            dimensionName: 'pagePath',
            expressions: [`/${id}`],
          },
          {
            operator: 'EXACT',
            dimensionName: 'pagePath',
            expressions: [`/${id}/`],
          },
        ],
      },
    ],
  })

  console.log(
    'Google Analytics API Response:',
    JSON.stringify(response, null, 2)
  )

  const totalWithoutTrailingSlash =
    parseInt(response.rows[0]?.metricValues[0]?.value, 10) || 0
  const totalWithTrailingSlash =
    parseInt(response.rows[1]?.metricValues[0]?.value, 10) || 0

  return totalWithoutTrailingSlash + totalWithTrailingSlash
}

export default async function getViews(req, res) {
  const { id } = req.query

  try {
    const views = await getData(id)
    res.status(200).json({ views })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
