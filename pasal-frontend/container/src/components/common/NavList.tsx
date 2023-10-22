import React, { Fragment, ReactNode } from "react";
import ArrowDown from "../../assets/svg/arrow-down.svg";
import { Link } from "react-router-dom";
import { splitTitleToUrl } from "../../pure-functions/splitTitleToUrl";
interface NavListInterface {
    row: any;
    i: number;
    setSelectedMenu: Function
}

interface LinkMenuInterface {
    children: ReactNode;
    childrens: any[];
    title:string;
}
const LinkMenu = ({title, childrens, children}: LinkMenuInterface) => {

    if(childrens.length > 0) {
        return childrens;
    }
    return <Link to={`/${title}`}>
        {children}
    </Link>
}
export default function NavList({ row, i, setSelectedMenu }: NavListInterface) {
    return (
        <>
            <li className="item base-list" key={i} onClick={() => row.children.length === 0 ? setSelectedMenu(row.title) : null}>
                <input type="radio" name="ci-root-menu" id={`cio-product-li-${i}`} className="major-list" />

                <label className="title-icon" htmlFor={`cio-product-li-${i}`}>
                    {/* {row.children.length === 0 && <LinkMenu title={row.title}>

                    </LinkMenu>>} */}
                    {row.children.length === 0 && <Link to={`/${row.title}`}>
                        <span className="icon">
                            {row.icon}
                        </span>
                        <span className="title">{row.title}</span>
                        {
                            row.children.length > 0 && <span className="arrow">
                                <ArrowDown />
                            </span>

                        }
                    </Link>}

                    {row.children.length > 0 && <>
                        <span className="icon">
                            {row.icon}
                        </span>
                        <span className="title">{row.title}</span>
                        
                            <span className="arrow">
                                <ArrowDown />
                            </span>

                        
                            </>}

                </label>
                <ul className="sub--ul">
                    {row.children.map((list: any, j: number) => <Fragment key={`${i}-${j}`}>
                        <input type="radio" name="sub-menu-checkbox" id={`ci-title-${i}-${j}`} className="sub-menu-checkbox" />
                        
                        {/* splitTitleToUrl */}
                        <Link to={ `/${row.title.toLowerCase()}${splitTitleToUrl(list.title)}`}>
                        <label htmlFor={`ci-title-${i}-${j}`} onClick={() => row.children.length > 0 ? setSelectedMenu(`${row.title}_${list.title}`) : null}>
                            <li className="sub--li" >{list.title}</li>
                        </label>
                        </Link>
                        
                    </Fragment>)}
                </ul>
            </li>
        </>
    )
}