import React, { useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import MyForm from "../components/myForm/MyForm";
import { Helmet } from "react-helmet";

const CharactersPage = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const [visibleBgImage, setVisibleBgImage] = useState(false);

    const changeSelectedCharacterId = (id) => setSelectedCharacterId(id);
    const changeVisibleBgImage = (visible) => setVisibleBgImage(visible);

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar />
            <div className="char__content">
                <CharList
                    selectedCharacterId={selectedCharacterId}
                    setSelectedCharacterId={changeSelectedCharacterId}
                    setVisibleBgImage={changeVisibleBgImage}
                />
                <div>
                    <ErrorBoundary>
                        <CharInfo selectedCharacterId={selectedCharacterId} />
                    </ErrorBoundary>
                    <div className="char__form" style={{ marginTop: "30px" }}>
                        <ErrorBoundary>
                            <MyForm />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
            <img
                style={visibleBgImage ? null : { display: "none" }}
                className="bg-decoration"
                src={decoration}
                alt="vision"
            />
        </>
    );
};

export default CharactersPage;
