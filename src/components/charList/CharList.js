import React, {useEffect, useState} from "react";
import './charList.scss';
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import {useHttp} from "../../hooks/useHttp";

const CharList = ({selectedCharacterId, setSelectedCharacterId, setVisibleBgImage}) => {

    const [characters, setCharacters] = useState([]);

    const [newCharactersLoading, setNewCharactersLoading] = useState(false);
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(210);
    const [charactersEnded, setCharactersEnded] = useState(false);

    const [charFetching, charLoading, charError] = useHttp(async (limit = 9, offset = 210, initial = false) => {
        initial ? setNewCharactersLoading(false) : setNewCharactersLoading(true);
        const characters = await MarvelServices.getCharacters(limit, offset);
        setNewCharactersLoaded(characters);
        setNewCharactersLoading(false);
        setVisibleBgImage(true);
    });

    useEffect(() => {
        charFetching(limit, offset, true);
    }, []);

    const setNewCharactersLoaded = (newCharactersList) => {
        let ended = false;
        if (newCharactersList.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newCharactersList]);
        setOffset(offset => offset + limit);
        setCharactersEnded(ended);
    }

    const errorMessage = charError ? <ErrorMessage error={charError}/> : null;
    const spinner = charLoading && !newCharactersLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <View characters={characters} selectedCharacterId={selectedCharacterId}
                  setSelectedCharacterId={setSelectedCharacterId}/>
            <button
                className="button button__main button__long"
                disabled={newCharactersLoading}
                onClick={() => charFetching(limit, offset, false)}
                style={{display: charactersEnded ? "none" : "block"}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

const View = ({characters, selectedCharacterId, setSelectedCharacterId}) => {

    return (
        <ul className="char__grid">
            {characters.map((character, index) => {
                    const classes = ["char__item"];
                    if (selectedCharacterId === character.id) classes.push("char__item_selected");
                    return (
                        <li
                            className={classes.join(" ")}
                            key={character.id}
                            tabIndex={index}
                            onClick={() => setSelectedCharacterId(character.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Tab" || e.key === "Enter") {
                                    setSelectedCharacterId(character.id);
                                }
                            }}
                        >
                            <img
                                style={character.thumbnail.includes("image_not_available") ? {objectFit: "unset"} : null}
                                src={character.thumbnail}
                                alt="abyss"
                            />
                            <div className="char__name">{character.name}</div>
                        </li>
                    )
                }
            )}
        </ul>
    )
}

CharList.propTypes = {
    setSelectedCharacterId: PropTypes.func,
    setVisibleBgImage: PropTypes.func
}

export default CharList;