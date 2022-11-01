import React, {useEffect, useState} from 'react';
import "./SingleComicPage.scss";
import {useParams} from "react-router";
import {useHttp} from "../hooks/useHttp";
import MarvelServices from "../services/MarvelServices";
import ErrorMessage from "../components/errorMessage/errorMessage";
import Spinner from "../components/spinner/Spinner";
import {Link} from "react-router-dom";


const SingleComicsPage = () => {

    const {id} = useParams();
    const [comic, setComic] = useState(null);
    const [updateComic, loading, error, comicClearError] = useHttp(async (comicID) => {
        if (!comicID) {
            return;
        }
        comicClearError();
        const comic = await MarvelServices.getComics(comicID);
        setComic(comic);
    });

    useEffect(() => {
        updateComic(id);
    }, [id]);

    const errorMessage = error ? <ErrorMessage error={error}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};


const View = ({comic}) => {
    return (
        <div className="single-comic">
            <img src={comic?.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{comic.price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComicsPage;