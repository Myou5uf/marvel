import React from "react";
import './charList.scss';
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

class CharList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            loading: true,
            error: false,
            newCharactersLoading: false,
            limit: 9,
            offset: 210,
            charactersEnded: false
        }
    }

    onRequest = async (limit, offset) => {
        try {
            this.setNewCharactersLoading();
            // this.setState({loading: true, error: false});
            const characters = await MarvelServices.getCharacters(limit, offset);
            this.setNewCharactersLoaded(characters);
            this.props.setVisibleBgImage(true);
        } catch (error) {
            this.setState({error: error});
        } finally {
            this.setState({loading: false, newCharactersLoading: false});
            this.props.setVisibleBgImage(true);
        }
    }

    setNewCharactersLoaded = (newCharactersList) => {
        let ended = false;
        if (newCharactersList.length < 9) {
            ended = true;
        }

        this.setState(({characters, limit, offset}) => ({
            characters: [...characters, ...newCharactersList],
            offset: offset + limit,
            charactersEnded: ended
        }))
    }

    componentDidMount() {
        this.onRequest();
    }

    setNewCharactersLoading = () => {
        this.setState({
            newCharactersLoading: true
        })
    }

    render() {
        const {characters, loading, error, newCharactersLoading, limit, offset, charactersEnded} = this.state;
        const {selectedCharacterId, setSelectedCharacterId} = this.props;
        const errorMessage = error ? <ErrorMessage error={error}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ?
            <View characters={characters} selectedCharacterId={selectedCharacterId}
                  setSelectedCharacterId={setSelectedCharacterId}/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newCharactersLoading}
                    onClick={() => this.onRequest(limit, offset)}
                    style={{display: charactersEnded ? "none" : "block"}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({characters, selectedCharacterId, setSelectedCharacterId}) => {

    return (
        <>
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
        </>
    )
}

CharList.propTypes = {
    setSelectedCharacterId: PropTypes.func,
    setVisibleBgImage: PropTypes.func
}

export default CharList;