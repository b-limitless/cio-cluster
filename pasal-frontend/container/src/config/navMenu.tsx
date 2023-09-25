import React from "react";
import ProductIcon from "../assets/svg/product-icon.svg";
import DashboardIcon from "../assets/svg/dashboard.svg";
import PricingIcon from "../assets/svg/pricing.svg";
import ArrowDown from "../assets/svg/arrow-down.svg";
import Users from "../assets/svg/users.svg";
import Payments from "../assets/svg/users.svg";

export const menuIcons = {
    product: <ProductIcon />,
    dashboard: <DashboardIcon />,
    pricing: <PricingIcon />, 
    users: <Users />, 
    payments: <Payments/>

}

export enum menuEnum {
    Dashboard = "Dashboard",
    Products_Febric = "Products_Febric",
    Product_Shirts = "Product_Shirts",
    Product_Pants = "Product_Pants",
    Product_Thread = "Product_Thread",
    Auth_Signin = "Auth_Signin",
    Auth_Signup = "Auth_Signup", 
    Users = "Users", 
    Orders="Orders",
    Payments="Payments"
}

const keys = [...Object.keys(menuEnum)] as const;

export type menuIds = typeof keys[number];

export const sideNavConfig = [
    {
        title: "Dashboard", icon: menuIcons.dashboard,
        children: [],
        component: <div></div>
    },
    {
        title: "Products", icon: menuIcons.product,
        children: [{ title: "Febric", component: "" }, { title: "Thread", component: "" }, { title: "Shirts", component: "" }, { title: "Pants", component: "" }]
    },
    {
        title: "Orders", icon: menuIcons.pricing,
        children: []
        // children: [{ title: "Pricing one" }, { title: "Pricing Two" }]
    },
    {
        title: "Users", icon: menuIcons.users,
        children: []
    }, 
    {
        title: "Payments", icon: menuIcons.payments,
        children: []
    }
];


