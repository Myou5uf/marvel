import React, {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const [visibleBgImage, setVisibleBgImage] = useState(false);

    const changeSelectedCharacterId = (id) => {
        setSelectedCharacterId(id);
    }

    const changeVisibleBgImage = (visible) => {
        setVisibleBgImage(visible);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList selectedCharacterId={selectedCharacterId}
                              setSelectedCharacterId={changeSelectedCharacterId}
                              setVisibleBgImage={changeVisibleBgImage}/>
                    <ErrorBoundary>
                        <CharInfo selectedCharacterId={selectedCharacterId}/>
                    </ErrorBoundary>
                </div>
                <img style={visibleBgImage ? null : {display: "none"}} className="bg-decoration" src={decoration}
                     alt="vision"/>
            </main>
        </div>
    )
}

export default App;