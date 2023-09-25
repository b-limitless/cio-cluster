import React from 'react';
import avatar from "../../assets/img/avatar.png";
import ArrowLeft from "../../assets/svg/arrow-left.svg";
import FaqIcon from "../../assets/svg/faq.svg";
import LogoIcon from "../../assets/svg/logo-icon.svg";
import LogoText from "../../assets/svg/logo-text.svg";
import logout from "../../assets/svg/logout.svg";
import rightArrowRound from "../../assets/svg/right-arrow-round.svg";
import Setting from "../../assets/svg/settings.svg";
import SwitchPro from "../../assets/svg/switch-pro.svg";
import { sideNavConfig } from '../../config/navMenu';
import NavList from './NavList';

interface SideMenuInterface {
  setSelectedMenu: Function
  setShowProfileSideModel:Function, 
  setShowSettingModel:Function, 
  showSettingModel:boolean;
}

enum sidebarNavClick  {
  profile="profile", 
  settings= "settings"
}

type sidebarNavClicktype = `${sidebarNavClick}`

export default function SideMenu({setShowSettingModel, showSettingModel, setSelectedMenu, setShowProfileSideModel }: SideMenuInterface) {
  
  const sideModelToggleHandler = (type:sidebarNavClicktype) => {
    if(type==sidebarNavClick.profile) {
      setShowSettingModel(false);
      setShowProfileSideModel((prevState:boolean) => !prevState);
      return;
    }

    if(type===sidebarNavClick.settings) {
      setShowProfileSideModel(false);
      setShowSettingModel((prevState:boolean) => !prevState);
      return;
    }
  }

  
  return (
    <div className="left-menu">
      <div className="menu-wrapper">
        <div className="top">
          <div className="row logo--arrow">
            <div className="item logo">
              <LogoIcon />
              <LogoText />
            </div>
            <div className="item arrow">
              <input type="radio" className="left-arrow-checkbox" name="toggle-menu-checkbox" id="left-arrow-checkbox" />
              <label htmlFor="left-arrow-checkbox">
                <ArrowLeft />
              </label>
            </div>
          </div>
          <div className="row navigation">
            <ul className="navigation--ul">
              {sideNavConfig.map((row, i) => <NavList row={row} i={i} key={i} setSelectedMenu={setSelectedMenu} />)}
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom--top">
            <div className="row switch--account">
              <div className="col icon">
                <SwitchPro/>
              </div>
              <div className="col details">
                <div className="details--item switch">Switch account
                  <br />to <span>Pro</span></div>
                <div className="details--item unlinited">Unlimited access to <br />biggest 3d models service <br />with highest quality</div>
                <div className="details--item ico-getpro">
                  <div className="get-pro">Get your Pro</div>
                  <div className="icon-right">
                    <img src={rightArrowRound} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row item" onClick={() => sideModelToggleHandler(sidebarNavClick.settings)}>
              <input type="radio"
                name="bottom-checkbox"
                id="settings"
                className="bottom-checkbox" />
              <label htmlFor="settings">
                <div className="icon">
                  <Setting />
                  { }
                </div>
              </label>
              <div className="text settings title">Settings</div>
            </div>
            <div className="row item">
              <input type="radio"
                name="bottom-checkbox"
                id="faq-checkbox"
                className="bottom-checkbox" />
              <label htmlFor="faq-checkbox">
                <div className="icon">
                  <FaqIcon />
                  { }
                </div>
              </label>
              <div className="text settings">FAQ</div>
            </div>
          </div>
          <div className="bottom--bottom" onClick={() => sideModelToggleHandler(sidebarNavClick.profile)}>
            <input type="checkbox" id="avatar-profile-info" className="avatar-profile-info" />
            <label htmlFor="avatar-profile-info" >
              <div className="col avatar">
                <img src={avatar} />
              </div>
            </label>
            <div className="profile-logout">
              <div className="col name--role">
                <div className="name">Bharat Shah</div>
                <div className="role">Administrator</div>
              </div>
              <div className="col logout">
                <img src={logout} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
