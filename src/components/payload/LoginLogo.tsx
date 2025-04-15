import Image from "next/image";
import React from "react";

import logo from "@/assets/blacklogo.png";
import logoDark from "@/assets/whitelogo.png";

export default function LoginLogo() {
    return (
        <div>
            <Image className="light-logo" src={logo} alt="" />
            <Image className="dark-logo" src={logoDark} alt="" />
        </div>
    );
}
