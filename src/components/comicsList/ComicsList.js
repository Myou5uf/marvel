import React, {useState} from "react";
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useHttp} from "../../hooks/useHttp";

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [comicsFetching, loading, error] = useHttp(() => {

    });


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;