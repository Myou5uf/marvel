import React from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCharacterId: null,
            visibleBgImage: false,
        }
    }

    setSelectedCharacterId = (id) => {
        this.setState({
            selectedCharacterId: id
        })
    }

    setVisibleBgImage = (visible) => {
        this.setState({
            visibleBgImage: visible
        })
    }


    render() {
        const {selectedCharacterId, visibleBgImage} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList selectedCharacterId={selectedCharacterId} setSelectedCharacterId={this.setSelectedCharacterId} setVisibleBgImage={this.setVisibleBgImage}/>
                       <ErrorBoundary>
                           <CharInfo selectedCharacterId={selectedCharacterId}/>
                       </ErrorBoundary>
                    </div>
                    <img style={visibleBgImage ? null : {display: "none"}} className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;



/*

echo "# marvel" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/Myou5uf/marvel.git
git push -u origin master


*/