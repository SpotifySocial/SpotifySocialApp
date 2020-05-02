import React from 'react';
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import MailchimpSubscribe from "react-mailchimp-subscribe"

import InviteForm from '../InviteForm/InviteForm'

import './Invite.scss';

ReactModal.setAppElement(document.getElementById('root'))
export const Invite = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal
      isOpen
      onRequestClose={hideModal}
      className="invite--modal"
      overlayClassName="invite--overlay"
    >
      <h1 className="invite--header">Invite a Buddy</h1>
      <p>Invite a friend to be your new music buddy</p>
      <MailchimpSubscribe
        url={process.env.REACT_APP_MAILCHIMP_URL}
        render={({ subscribe, status, message }) => (
          <InviteForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
      <button onClick={hideModal} className="invite--close" aria-label="Close Modal" />
    </ReactModal>
  ));

  return <button onClick={showModal} className="invite--button">Invite a Buddy</button>;
}

export default Invite;
