import { Actions, Manager } from "@twilio/flex-ui";
import makeAPIRequest from "../Utils/makeAPIRequest";

const manager = Manager.getInstance();
const leaveVoicemailUrl = `${process.env.TWILIO_SERVERLESS_URL}/leaveVoicemail`;

export const registerLeaveVoicemailAction = () => {
  Actions.registerAction("LeaveVoicemail", (payload) => {
    const { callSid, queueName } = payload;
    console.log("Leave voicemail clicked", callSid, queueName);
    makeAPIRequest(leaveVoicemailUrl, "POST", {
      Token: manager.user.token,
      callSid,
      queueName,
    });
  });
};
