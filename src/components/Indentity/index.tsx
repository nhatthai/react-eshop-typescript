import React from "react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { Profile } from "../Profile";
import './styles.scss';
import { useAuth0 } from "@auth0/auth0-react";

export const Identity = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="esh-identity">
        <section className="esh-identity-section">
            { !isAuthenticated && <LoginButton></LoginButton> }
        </section>
        
        { 
            isAuthenticated && 
            <>
            <Profile></Profile>

            <section className="esh-identity-drop">
                <div className="esh-identity-item">
                <div className="esh-identity-name">My orders</div>
                </div>

                <LogoutButton></LogoutButton>
            </section>
            </>
        }           
        </div>
    );
}
