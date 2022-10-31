import axios from "axios";

export default class MarvelServices {
    static _apiBase = "https://gateway.marvel.com:443/v1/public/";
    static _apiKey = "apikey=14c80cf078481fb3ded0db419a38bd66";

    static async getCharacters(limit = 9, offset = 210) {
        const response = await axios.get(`${MarvelServices._apiBase}characters?limit=${limit}&offset=${offset}&${MarvelServices._apiKey}`);
        return response.data.data.results.map(character => MarvelServices._transformCharacter(character));
    }

    static async getCharacter(id) {
        const response = await axios.get(`${MarvelServices._apiBase}characters/${id}?${MarvelServices._apiKey}`);
        return MarvelServices._transformCharacter(response.data.data.results[0]);
    }

    static async getComics(limit = 8, offset = 210) {
        const response = await axios.get(`${MarvelServices._apiBase}comics?limit=${limit}&offset=${offset}&${MarvelServices._apiKey}`);
        return response.data.data.results.map(comics => MarvelServices._transformComics(comics));
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

    static _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            issueNumber: comics.issueNumber,
            description: comics.description,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            homepage: comics.urls[0].url,
            price: comics.prices[0].price
        }
    }
}