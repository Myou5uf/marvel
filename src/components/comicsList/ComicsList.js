import React, {useEffect, useState} from "react";
import './comicsList.scss';
import {useHttp} from "../../hooks/useHttp";
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [limit, setLimit] = useState(8);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsFetching, loading, error] = useHttp(async (limit = 8, offset = 210, initial = false) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        const comics = await MarvelServices.getComics(limit, offset);
        setNewComics(comics);
        setNewComicsLoading(false);
    });

    useEffect(() => {
        comicsFetching(limit, offset, true);
    }, []);

    const setNewComics = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComicsList]);
        setOffset(offset => offset + limit);
        setComicsEnded(ended);
    }

    const errorMessage = error ? <ErrorMessage error={error}/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {comics.map((comicBook, index) => {
                    return (
                        <li className="comics__item" key={index}>
                            <a href={comicBook.homepage}>
                                <img src={comicBook.thumbnail} alt="ultimate war" className="comics__item-img"/>
                                <div className="comics__item-name">{comicBook.title}</div>
                                <div className="comics__item-price">{comicBook.price}</div>
                            </a>
                        </li>
                    )
                })}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{display: comicsEnded ? "none" : "block"}}
                onClick={() => comicsFetching(limit, offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;