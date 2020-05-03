import React from 'react';

import './InviteForm.scss';

export const Form = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
    });

  return (
    <div className="invite-form">
      <div className="invite-form--details">
        <input
          ref={node => (email = node)}
          type="email"
          placeholder="Email address"
          className="invite-form--input"
        />
        {status === "success" ? (
          <button onClick={submit} className="invite-form--button">
            Invite Sent!
          </button>
        ) : (
          <button onClick={submit} className="invite-form--button">
            Invite
          </button>
        )}
      </div>
      {status === "sending" && <div className="invite-form--message">Sending...</div>}
      {status === "error" && (
        <div
          className="invite-form--error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="invite-form--message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
}

export default Form;
