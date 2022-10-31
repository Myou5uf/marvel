import React, {useEffect, useState} from "react";
import './charInfo.scss';
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/useHttp";

const CharInfo = ({selectedCharacterId}) => {
    const [character, setCharacter] = useState(null);
    const [updateCharacter, loading, error, charClearError] = useHttp(async (characterID) => {
        if (!characterID) {
            return;
        }
        charClearError();
        const character = await MarvelServices.getCharacter(characterID);
        setCharacter(character);
    });

    useEffect(() => {
        updateCharacter(selectedCharacterId);
    }, [selectedCharacterId]);

    const skeleton =  character || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage error={error}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;
    // this.foo.bar = 0; // testing for ErrorBoundary

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}


const View = ({character}) => {
    return (
        <>
            <div className="char__basics">
                <img
                    style={character.thumbnail?.includes("image_not_available") ? {objectFit: "contain"} : null}
                    src={character.thumbnail}
                    alt="abyss"
                />
                <div>
                    <div className="char__info-name">{character.name}</div>
                    <div className="char__btns">
                        <a href={character.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={character.wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {character.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {character.comics.length ? null : "There is no comics with this character"}
                {character.comics.map((item, index) =>
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                )}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectedCharacterId: PropTypes.number,
}

export default CharInfo;