import React from "react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { Profile } from "../Profile";

export const Identity = (): JSX.Element => {

    return (
        <div className="esh-identity">
        <section className="esh-identity-section">
            <LoginButton></LoginButton>
        </section>

        <Profile></Profile>

        <section className="esh-identity-drop">
            <div className="esh-identity-item">
            <div className="esh-identity-name">My orders</div>
            </div>

            <LogoutButton></LogoutButton>
        </section>
        </div>
    );
}
