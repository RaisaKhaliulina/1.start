import React, { useState } from "react";
import CardWrapper from "../../common/Card";
const withAuth = (Component) => (props) => {
    const [isAuth, setIsAuth] = useState();
    const handleLogIn = () => {
        console.log("LogIN");
        localStorage.setItem("user", "1");
        setIsAuth(Boolean(localStorage.getItem("user")));
    };
    const handleLogOut = () => {
        console.log("LogOUT");
        localStorage.removeItem("user");
        setIsAuth(Boolean(localStorage.getItem("user")));
    };
    return (
        <>
            <CardWrapper>
                <Component
                    {...props}
                    isAuth={isAuth}
                    onLogIn={handleLogIn}
                    onLogOut={handleLogOut}
                />
            </CardWrapper>
        </>
    );
};

export default withAuth;
