import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserImage from "../assets/images/user.svg";

export const Profile = (): JSX.Element => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    console.log("Email", user.email);
  }

  console.log("isAuthenticated", isAuthenticated);

  return (
    <section className="esh-identity-section u-cursor-pointer pt-2 pb-2">
        <div className="esh-identity-name">{user?.email}</div>
        <img className="esh-identity-image ml-2" src={UserImage} alt="Logo"/>
    </section>
  );
};