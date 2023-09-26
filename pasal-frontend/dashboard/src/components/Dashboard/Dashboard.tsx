import React, {useState} from "react"
import PriceSVG from "../../assets/svg/price.svg";
import PositiveGrowth from "../../assets/svg/positive-growth.svg";
import AnalyticCard from "../common/AnalyticCard";
import Profile from "../Profile";
import Seetings from "../Settings/Setting";


type Props = {
  showProfileSideModel:boolean;
  setShowProfileSideModel:Function;
  setShowSettingModel:Function;
  showSettingModel:boolean;
}

export const analyticsData = [
  {
    title: "89,935",
    titleText: "Total Revanue",
    amount: "10.2",
    weekGrowth: "+1.101% this week",
    Icon: <PriceSVG />,
    growthIcon: (<PositiveGrowth />),
  },
  {
    title: "89,935",
    titleText: "Total Revanue",
    amount: "10.2",
    weekGrowth: "+1.101% this week",
    Icon: <PriceSVG />,
    growthIcon: (<PositiveGrowth />),
  },
  {
    title: "89,935",
    titleText: "Total Revanue",
    amount: "10.2",
    weekGrowth: "+1.101% this week",
    Icon: <PriceSVG />,
    growthIcon: (<PositiveGrowth />),
  },
  {
    title: "89,935",
    titleText: "Total Revanue",
    amount: "10.2",
    weekGrowth: "+1.101% this week",
    Icon: <PriceSVG />,
    growthIcon: (<PositiveGrowth />),
  }
]


export default function Dashboard({setShowSettingModel, showSettingModel, showProfileSideModel, setShowProfileSideModel}: Props) {
  
  return (
    <>
     <Seetings showModel ={showSettingModel} setShowModel = {setShowSettingModel}/>
      <Profile showModel={showProfileSideModel} setShowModel={setShowProfileSideModel}/>
      { showProfileSideModel === true}
      <div className="ci--dashboard">
        <div className="ci--dashboard__title">
          Welcome Back, Hello World
        </div>
        <div className="ci--dashboard__staticstic">
          {analyticsData.map((item, i) => <AnalyticCard
            key={i}
            title={item.title}
            Icon={item.Icon}
            titleText={item.titleText}
            growthIcon={item.growthIcon}
            amount={item.amount}
            weekGrowth={item.weekGrowth}
          />)}
        </div>
        <div className="ci--dashboard__graphs">
          Show your graphs here
        </div>

      </div>
      

    </>
  )
}