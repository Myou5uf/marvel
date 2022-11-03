import React from "react";
import "./SingleComicPage.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleComicsPage = ({ data }) => {
    const { title, description, pageCount, thumbnail, price } = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={description} />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicsPage;
