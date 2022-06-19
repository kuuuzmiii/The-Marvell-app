import {useHttp} from '../hooks/http.hooks';

const MarvelServices = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d6319692c75d314b95b50d422061fedf';
    const _baseOffset = 210;

    const getAllCharters = async (offset = _baseOffset) =>{
        const char = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return char.data.results.map(_transformChar)
    }
    const getCharters = async (id) => {
        const res = await  request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformChar(res.data.results[0])
    }
    const getAllComics = async(offset = 0)=>{
        const comics = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return comics.data.results.map(_transformComics);
    }
    const getComic = async (id) =>{
        const comic = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(comic.data.results[0])
    }
    const getCharterName = async (name) => {
        const char = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return  char.data.results.map(_transformChar);//_transformChar(char.data.results[0]);
    }
    const _transformChar = (res) => {
        const defauldImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        return {
            id:res.id,
            name:res.name,
            description:res.description ? `${res.description.slice(0,210)}...` : 'There is no description for this character.',
            thubnaill:`${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage:res.urls[1].url,
            wiki:res.urls[1].url,
            styleImg: res.thumbnail.path = defauldImg ? 'contain' : 'cover',
            comics:res.comics.items
        }
    }

    const _transformComics = (res) => {
        return {
            id:res.id,
            title:res.title,
            thumbnail:`${res.thumbnail.path}.${res.thumbnail.extension}`,
            price: res.prices[0].price,
            description: res.description || 'There is no description',
            language:  res.textObjects.language || 'en-us',
            pageCount: res.pageCount ? `${res.pageCount} p.` : 'No information about the number of pages',
        }
    }

    return {
        loading,
        error,
        clearError,
        getAllCharters,
        getCharters,
        getAllComics,
        getComic,
        getCharterName
    }
}

export default MarvelServices