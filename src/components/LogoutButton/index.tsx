import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="esh-identity-item">
      <div className="esh-identity-name" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</div>
    </div>
  );
};
