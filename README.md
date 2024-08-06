# LeaveVoicemailMessage POC

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

**The software is still in a developmental or beta stage and may contain bugs, defects, or other issues that could cause it to malfunction or fail.**

## Overview

Twilio Flex Plugin and serverless functions to demonstrate how to add button to Flex UI that will disconnect the agent from an outbound call and Play or Say a message which is dependent on the queue the outbound call was made from.

## Install

For the Play message a publicly reachable endpoint is needed to host the wav file. I would recommend installing the serverless functions/assets even for local deployment so that Twilio can reach the wav file in the services assets.

### Install Serverless

- In the serverless folder copy .env-template to .env but note that setting ASSET_URL is only required when developing and running locally.

Move to the root folder of serverlessLeaveVoicemail and run:

```
npm install
twilio serverless:deploy
```

https://www.twilio.com/docs/labs/serverless-toolkit/deploying

After the initial deployment (so that the wav file is reachable) you can update the ASSET_URL to the url that was generated when you deployed the service.

### Run Serverless locally for development

```
twilio serverless:start --port 3001
```

https://www.twilio.com/docs/labs/serverless-toolkit/developing#starting-a-local-development-server

I would recommend the --port 3001 option when running the functions locally and letting the flex ui plugin that you can run locally use port 3000.

### Run the Flex UI plugin locally

- In the plugin folder copy .env-template to .env and update the url to be the serverless functions endpoint (Either http:/localhost:3001 or the deployed service)

Move to the root of the plugin folder

```
npm install
twilio flex:plugins:start
```

twilio flex:plugins:start

### Update the queue config

The queueConfig.json file in the serverless asset folder maps the queue name the call was made from to the Say or Play that is used. Update this to match your queue naming.
