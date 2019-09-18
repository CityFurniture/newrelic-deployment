const https = require('https')

const NR_APP_ID   = process.env.PLUGIN_APP_ID
const NR_API_KEY  =  process.env.PLUGIN_API_KEY

const NR_USER         = (process.env.DRONE_COMMIT_AUTHOR) ? process.env.DRONE_COMMIT_AUTHOR : 'Drone CI'
const NR_REVISION     = (process.env.DRONE_COMMIT_SHA) ? process.env.DRONE_COMMIT_SHA : 'No Text In Revision'
const NR_CHANGE_LOG   = (process.env.DRONE_COMMIT_MESSAGE) ? process.env.DRONE_COMMIT_MESSAGE : 'No Text In Changelog'
const NR_DESCRIPTION  = (process.env.DRONE_COMMIT_MESSAGE) ? process.env.DRONE_COMMIT_MESSAGE : 'No Text In Description'

if (!NR_APP_ID) throw Error("'Newrelic APP_ID is required'")
if (!NR_API_KEY) throw Error("'Newrelic API_KEY is required'")

// POST Request, no library needed, lighter the better.
const data = JSON.stringify({
  deployment: {
    revision: NR_REVISION,
    changelog: NR_CHANGE_LOG,
    description: NR_DESCRIPTION,
    user: NR_USER
  }
})

const options = {
  hostname: 'api.newrelic.com',
  port: 443,
  path: `/v2/applications/${NR_APP_ID}/deployments.json`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'X-Api-Key': NR_API_KEY
  }
}

let responseString = '';
const req = https.request(options, (res) => {
  res.on('data', (chunk) => {
    responseString += chunk;
  });

  res.on('end', () => {
    const responseObj = JSON.parse(responseString)
    console.log(`Newrelic Deployment ID: ${responseObj.deployment.id}`)
    console.log(`Newrelic Deployment revision: ${responseObj.deployment.revision}`)
    console.log(`Newrelic Deployment changelog: ${responseObj.deployment.changelog}`)
    console.log(`Newrelic Deployment description: ${responseObj.deployment.description}`)
    console.log(`Newrelic Deployment user: ${responseObj.deployment.user}`)
    console.log(`Newrelic Deployment timestamp: ${responseObj.deployment.timestamp}`)
    // your code here if you want to use the results !
  });
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
