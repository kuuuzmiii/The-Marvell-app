import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import MarvelServices from '../../services/Service';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const {loading, error, getAllComics } = MarvelServices();

    const [comicsList,setComicsList] = useState([]);
    const [loadedComics,setLoadedComics] = useState(false);
    const [offset,setOffset] = useState(0);
    const [endComics,setEndComics] = useState(false);

    useEffect(()=>{
        onRequestComics(offset,true);
    },[]);

    const onRequestComics = (offset,initial) => {
        initial ? setLoadedComics(false) : setLoadedComics(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let endedComics = false;
        
        if(newComicsList.length < 8){
            endedComics = true;
        }

        setComicsList(charList => [...charList,...newComicsList]);
        setLoadedComics(false);
        setOffset(offset => offset+8);
        setEndComics(endedComics);
    }

    function renderItems(arr) {
        const items =  arr.map((item,i) => {

            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    };

    const items = renderItems(comicsList);

    const spinner = loading && !loadedComics ? <Spinner/> : null;
    const errors = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errors}
            {items}
            <button 
                className="button button__main button__long"
                disabled={loadedComics}
                style = {{"display" : endComics ? "none" : "block"}}
                onClick={()=> onRequestComics(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;