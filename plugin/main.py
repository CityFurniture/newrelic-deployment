#!/usr/bin/env python
"""
Newrelic - Deployment Record
"""
import drone
import requests


def main():
    """
    The main entrypoint for the plugin.
    """
    # Retrives plugin input from stdin/argv, parses the JSON, returns a dict.
    payload = drone.plugin.get_input()
    # vargs are where the values passed in the YaML reside.
    vargs = payload['vargs']
    buildInfo = payload['build']

    # URL for Newrelic V2 API
    NR_BASE_URL = "https://api.newrelic.com/v2/applications/"

    # Rest of Newrelic needed params
    NR_APP_ID       = vargs['app_id']
    if not bool(NR_APP_ID):
      raise Exception('Newrelic app_id is required')

    NR_URI_COMPONENTS = [NR_BASE_URL, NR_APP_ID, '/deployments.json']
    NR_FINAL_URL = ''.join(NR_URI_COMPONENTS)

    NR_API_KEY      = vargs['api_key']
    if not bool(NR_API_KEY):
      raise Exception('Newrelic api_key is required')

    NR_REVISION     = buildInfo['commit']

    NR_CHANGE_LOG   = vargs['change_log']
    if not bool(NR_CHANGE_LOG):
      NR_CHANGE_LOG = buildInfo['message']

    NR_DESCRIPTION  = vargs['description']
    if not bool(NR_DESCRIPTION):
      NR_DESCRIPTION = buildInfo['message']

    NR_USER         = vargs['user']
    if not bool(NR_USER):
      NR_USER = 'Drone.io'


    # Formulate the POST request.
    data = {
      'deployment': {
        'revision': NR_REVISION,
        'changelog': NR_CHANGE_LOG,
        'description': NR_DESCRIPTION,
        'user': NR_USER
      }
    }

    response = requests.post(NR_FINAL_URL, json=data, headers={'content-type': 'application/json','X-Api-Key': NR_API_KEY})
    response.raise_for_status()

if __name__ == "__main__":
    main()

# curl -X POST 'https://api.newrelic.com/v2/applications/${APP_ID}/deployments.json' \
#      -H 'X-Api-Key:${APIKEY}' -i \
#      -H 'Content-Type: application/json' \
#      -d \
# '{
#   "deployment": {
#     "revision": "REVISION",
#     "changelog": "Added: /v2/deployments.rb, Removed: None",
#     "description": "Added a deployments resource to the v2 API",
#     "user": "datanerd@example.com"
#   }
# }'
