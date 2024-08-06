const TokenValidator = require("twilio-flex-token-validator").functionValidator;

const queueConfigAssetPath = "/queueConfig.json";
const getQueueConfig = () => {
  return JSON.parse(Runtime.getAssets()[queueConfigAssetPath].open());
};

const getCorsResponseHeaders = () => {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

const getAssetUrl = (context) => {
  const { DOMAIN_NAME, ASSET_URL } = context;
  // If running localhost use the asset URL from the .env file, otherwise use the DOMAIN_NAME
  const assetUrl = DOMAIN_NAME.includes("localhost")
    ? ASSET_URL
    : `https://${DOMAIN_NAME}`;

  return assetUrl;
};

const getTwiml = (context, queueName, queueConfig) => {
  const config = queueConfig[queueName] || queueConfig["Default"];

  const twiml = new Twilio.twiml.VoiceResponse();

  if (config.type === "PLAY") {
    twiml.play(`${getAssetUrl(context)}/${config.fileName}`);
  } else if (config.type === "SAY") {
    twiml.say(config.text);
  }

  return twiml;
};

exports.handler = TokenValidator(async function (context, event, callback) {
  try {
    const response = getCorsResponseHeaders();
    const { callSid, queueName } = event;

    const twilioClient = context.getTwilioClient();

    const twiml = getTwiml(context, queueName, getQueueConfig());

    const call = await twilioClient
      .calls(callSid)
      .update({ twiml: twiml.toString() });

    response.appendHeader("Content-Type", "application/json");
    response.setBody({});
    return callback(null, response);
  } catch (error) {
    console.error("Error leaving voicemail", error);
    return callback(error);
  }
});
