import React, { useEffect } from "react";
import ArrowRight from "../../assets/svg/arrow-right.svg";
import { menuIds } from "../../config/navMenu";
import SideMenu from "./SideMenu";
import { request } from "../../utils/request";
interface ContainerInterface {
    setSelectedMenu: Function,
    selectedMenu: menuIds,
    setShowSettingModel:Function, 
    showSettingModel:boolean;
    children: any;
    [x:string]:any;
    
}
export default function Container({setShowSettingModel, showSettingModel, children, setSelectedMenu, selectedMenu, setShowProfileSideModel }: ContainerInterface) {
    
    useEffect(() => {
        const currentUser = async() => {
            try {
                const whoeIsLoggedIn = await request({
                    url: '/api/users/currentuser', 
                    method: 'get'
                });
                console.log('whoeIsLoggedIn', whoeIsLoggedIn);
            } catch(err) {
                console.log('error current user', err);
            }
        }
        currentUser()
    }, [])
   
    return (
        <>
            <input type="radio" id="toggle-menu-checkbox" className="toggle-menu-checbox" name="toggle-menu-checkbox" />
            <label htmlFor="toggle-menu-checkbox" >
                <div className="toggal-menu">
                    <ArrowRight />
                </div>
            </label>
            { }
            <div className="container">
                <div className="left side--navbar hide">
                    <SideMenu
                        setSelectedMenu={setSelectedMenu}
                        setShowProfileSideModel={setShowProfileSideModel}
                        setShowSettingModel={setShowSettingModel}
                        showSettingModel={showSettingModel}
                    />
                </div>
                <div className="right services">
                   
                    {children}
                </div>
            </div>
        </>
    )
}