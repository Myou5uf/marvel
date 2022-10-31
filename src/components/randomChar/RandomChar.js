import React, {useEffect, useState} from "react";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import {useHttp} from "../../hooks/useHttp";

const RandomChar = () => {

    const [character, setCharacter] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    let timerId;
    const [randomFetching, randomLoading, randomError, randomClearError] = useHttp(async () => {
        randomClearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        const character = await MarvelServices.getCharacter(id);
        setCharacter(character);
    });

    const tryItButton = () => {
        randomFetching();
    }

    useEffect(() => {
        randomFetching();
        timerId = setInterval(randomFetching, 6000);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    const errorMessage = randomError ? <ErrorMessage error={randomError}/> : null;
    const spinner = randomLoading ? <Spinner/> : null;
    const content = !(randomLoading || randomError) ? <View character={character}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={tryItButton}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}

const View = ({character}) => {
    const {name, thumbnail, description, homepage, wiki} = character;

    return (
        <div className="randomchar__block">
            <img
                style={thumbnail?.includes("image_not_available") ? {objectFit: "contain"} : null}
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description.slice(0, 120) + "..." : "Нет описания"}

                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;