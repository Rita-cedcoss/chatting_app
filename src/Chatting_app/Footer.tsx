import React, { forwardRef } from "react";
type FooterProps = {
  sendMg: () => void;
};
type Ref = HTMLInputElement;
const Footer = forwardRef<Ref, FooterProps>((props, inpRef) => {
  return (
    <div className="footer position-fixed bottom-0 pb-1">
      <div className="input-group mb-0">
        <input
          type="text"
          ref={inpRef}
          className="form-control"
          placeholder="Type message"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn bgColor text-light"
          onClick={props.sendMg}
          type="button"
          id="button-addon2"
          style={{ paddingTop: ".55rem" }}
        >
          Button
        </button>
      </div>
    </div>
  );
});

export default Footer;
