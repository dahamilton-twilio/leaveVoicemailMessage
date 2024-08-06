import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import LeaveVoicemailButton from "./Components/LeaveVoicemailButton";
import { registerLeaveVoicemailAction } from "./Actions/leaveVoicemail";

const PLUGIN_NAME = "LeaveVoicemailPlugin";

export default class LeaveVoicemailPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    registerLeaveVoicemailAction();

    flex.ParticipantCanvas.Content.add(
      <LeaveVoicemailButton key="leave-voicemail-button" />,
      {
        sortOrder: 100, // Place the button at the bottom of the canvas
      }
    );
  }
}
