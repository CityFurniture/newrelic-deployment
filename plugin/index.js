const https = require('https')

console.log(process.env)
const NR_APP_ID   = '270444811' // process.env.app_id''
const NR_API_KEY  =  'dabbe9389c668085fc8857f66151622e' // process.env.api_key

let NR_USER     = 'Rabea Still testing' //process.env.user
if (!NR_USER) NR_USER = 'Drone.io'

const NR_REVISION = "Change log deployment graphql testing"
const NR_CHANGE_LOG = NR_REVISION
const NR_DESCRIPTION = NR_REVISION

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

const req = https.request(options, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
