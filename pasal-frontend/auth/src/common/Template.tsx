import React from "react";

import facePNG from "../assets/img/face.png";
import LogoICON from "../assets/svg/logo-icon.svg";
import LogoText from "../assets/svg/logo-text.svg";
import "./template.scss";

interface TemplateInterface {
  children?: JSX.Element
}

export default function Template({ children }: TemplateInterface) {
  return (
    <div className="cio--template">

      <div className="left col">
        <div className="row logo">
          <span className="icon">
            <LogoICON />
          </span>
          <span className="text">
            <LogoText />
          </span>
        </div>
        <div className="row face">
          <img src={facePNG} alt="" />
        </div>
      </div>
      {children}
    </div>
  )
}