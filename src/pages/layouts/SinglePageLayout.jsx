import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarvelServices from "../../services/MarvelServices";
import { useHttp } from "../../hooks/useHttp";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import Spinner from "../../components/spinner/Spinner";
import AppBanner from "../../components/appBanner/AppBanner";

const SinglePageLayout = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const [updateData, loading, error, clearError] = useHttp(async () => {
        clearError();
        switch (dataType) {
            case "comic":
                const comic = await MarvelServices.getComics(id);
                setData(comic);
                break;
            case "character":
                const character = await MarvelServices.getCharacter(id);
                setData(character);
                break;
            default:
                setData({});
        }
    });

    useEffect(() => {
        updateData();
    }, [id]);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePageLayout;
