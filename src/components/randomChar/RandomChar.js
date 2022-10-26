import React from "react";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class RandomChar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: {},
            loading: true,
            error: false
        }
    }


    updateCharacter = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        try {
            this.setState({loading: true, error: false});
            const character = await MarvelServices.getCharacter(id);
            this.setState({character: character});
        } catch (error) {
            this.setState({error: error});
        } finally {
            this.setState({loading: false});
        }
    }

    tryItButton = () => {
        // clearInterval(this.timerID);
        this.updateCharacter();
        // this.timerID = setInterval(this.updateCharacter, 3000);
    }

    componentDidMount() {
        this.updateCharacter();
        // this.timerID = setInterval(this.updateCharacter, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {character, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage error={error}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View character={character}/> : null;



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
                    <button className="button button__main" onClick={this.tryItButton}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({character}) => {
    const {name, thumbnail, description, homepage, wiki} = character;

    return (
        <div className="randomchar__block">
            <img
                style={thumbnail.includes("image_not_available") ? {objectFit: "contain"} : null}
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