The following parameters are used to configure the plugin's behavior:

* **api_key** - Newrelic API Key
* **app_id** - Newrelic App ID
* **user** - (optional) Newrelic User, default: `DRONE_COMMIT_AUTHOR`, fallback: "Drone CI"
* **revision** - (optional) Newrelic Revision default: `DRONE_COMMIT_SHA`, fallback: "No Text In Revision"
* **change_log** - (optional) Newrelic ChangeLog default: `DRONE_COMMIT_MESSAGE`, fallback: "No Text In Changelog"
* **description** - (optional) Newrelic Description default: `DRONE_COMMIT_MESSAGE`, fallback: "No Text In Description"

The following is a sample newrelic-deployment configuration in your
.drone.yml file:

```yaml
---
kind: pipeline
name: newrelic-deployment

steps:
- name: Newrelic - Push Deployment
  image: cityfurniture/drone-newrelic-deployment
  settings:
    app_id: YOUR_APP_ID
    api_key: YOUR_API_KEY
```
