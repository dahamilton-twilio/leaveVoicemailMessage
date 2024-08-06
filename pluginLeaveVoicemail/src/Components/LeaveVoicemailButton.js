import { VoicemailIcon } from "@twilio-paste/icons/esm/VoicemailIcon";
import { IconButton, styled, Actions } from "@twilio/flex-ui";
import { useState } from "react";

const IconContainer = styled.div`
  margin: 0.8em;
`;

const LeaveVoicemailButton = (props) => {
  const { task } = props;
  const { attributes, queueName } = task;
  const { direction, conference } = attributes;
  const callSid = conference.participants["customer"];

  const [leaveVoiceMailClicked, setLeaveVoiceMailClicked] = useState(false);

  console.log(props);

  const handleLeaveVoicemailClick = () => {
    console.log("Leave voicemail clicked");
    setLeaveVoiceMailClicked(true);
    Actions.invokeAction("LeaveVoicemail", {
      callSid,
      queueName,
    });
  };

  if (direction !== "outbound") {
    return null;
  } else {
    return (
      <IconContainer>
        <IconButton
          icon={<VoicemailIcon decorative={false} title="Leave Voicemail" />}
          disabled={leaveVoiceMailClicked}
          title="Leave Voicemail"
          variant="secondary"
          onClick={handleLeaveVoicemailClick}
        />
      </IconContainer>
    );
  }
};

export default LeaveVoicemailButton;
