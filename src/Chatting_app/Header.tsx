import React from "react";
type headerProps = {
  LogoutWithGoogle: () => void;
};
const Header = (props: headerProps) => {
  return (
    <div
      className="card-header  d-flex justify-content-between align-items-center p-3"
      style={{ borderTop: "4px solid rgb(151 116 48)" }}
    >
      <h5 className="mb-0">Chat messages</h5>
      <div className="d-flex flex-row align-items-center">
        <span className="badge bgColor p-2" onClick={props.LogoutWithGoogle}>
          Log Out
        </span>
        <i className="fas fa-minus me-3 text-muted fa-xs"></i>
        <i className="fas fa-comments me-3 text-muted fa-xs"></i>
        <i className="fas fa-times text-muted fa-xs"></i>
      </div>
    </div>
  );
};

export default Header;
