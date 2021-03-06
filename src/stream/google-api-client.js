const fetch = require('../fetch')
const sanitiseResponse = require('./sanitise-response')

module.exports = function (getAccessToken) {
  return async function (url, serviceAccountCredentials) {
    const accessToken =
      getAccessToken && serviceAccountCredentials
        ? await getAccessToken(serviceAccountCredentials)
        : null
    const response = await fetch(
      url,
      'GET',
      accessToken && {
        Authorization: `Bearer ${accessToken}`
      }
    )
    return response.body.pipe(sanitiseResponse())
  }
}
