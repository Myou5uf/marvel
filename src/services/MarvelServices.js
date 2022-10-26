import axios from "axios";

export default class MarvelServices {
    static _apiBase = "https://gateway.marvel.com:443/v1/public/";
    static _apiKey = "apikey=14c80cf078481fb3ded0db419a38bd66";
    static _limit = 9;

    static async getCharacters(limit = 9, offset = 210) {
        const response = await axios.get(`${MarvelServices._apiBase}characters?limit=${limit}&offset=${offset}&${MarvelServices._apiKey}`);
        if(response.status !== 200){
            throw new Error(`Could not fetch ${MarvelServices._apiBase}characters?limit=${limit}&offset=${offset}&apikey=14..., status: ${response.status}`);
        }
        return response.data.data.results.map(character => MarvelServices._transformCharacter(character));
    }

    static async getCharacter(id) {
        const response = await axios.get(`${MarvelServices._apiBase}characters/${id}?${MarvelServices._apiKey}`);
        if(response.status !== 200){
            throw new Error(`Could not fetch ${MarvelServices._apiBase}characters/${id}?apikey=14..., status: ${response.status}`);
        }
        return MarvelServices._transformCharacter(response.data.data.results[0]);
    }

    static _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
}