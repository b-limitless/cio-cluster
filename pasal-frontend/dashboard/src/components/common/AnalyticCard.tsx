import React from 'react'

interface AnalyticCardInterface {
    title: string;
    Icon: HTMLElement | SVGElement | any;
    titleText: string;
    amount: number | string;
    weekGrowth: string;
    growthIcon: HTMLElement | SVGElement | any;
}

export default function AnalyticCard({ title, Icon, titleText, amount, weekGrowth, growthIcon }: AnalyticCardInterface) {
    return (
        <div className="col">
            <div className="row price">
                <div className="price--title">{title}</div>
                <div className="price--icon">{Icon}</div>
            </div>
            <div className="row col--title">
                <div className="col--title__text">
                    {titleText}
                </div>
            </div>
            <div className="row indicator">
                <div className="indicator--growth">
                    <span className="indicator--growth__sign">
                        {growthIcon}
                    </span>
                    <span className="indicator--growth__amount">
                        {amount}
                    </span>
                    <span className="indicator--growth__week">
                        {weekGrowth}
                    </span>
                </div>
            </div>
        </div>
    )
}