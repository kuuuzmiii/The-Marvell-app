import {useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import MarvelServices from '../../services/Service';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const {loading,error,getAllCharters} = MarvelServices();

    const [charList,setCharList] = useState([]);
    const [loadedCharters,setLoadedCharters] = useState(false);
    const [offset,setOffset] = useState(210);
    const [endChars,setEndChars] = useState(false);
    const [showItem,setShowItem] = useState(false);

    MarvelServices();

    useEffect(()=>{
        onRequestCharaters(offset,true);
    },[]);

    const onRequestCharaters = (offset,initial) => {
        initial ? setLoadedCharters(false) : setLoadedCharters(true);
        getAllCharters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let endedChars = false;
        
        if(newCharList.length < 9){
            endedChars = true;
        }

        setCharList(charList => [...charList,...newCharList]);
        setLoadedCharters(false);
        setOffset(offset => offset+9);
        setEndChars(endChars => endedChars);
    }

    const itemRef = useRef([]);
    
    const itemFocusRef = (id) => {
        itemRef.current.forEach(item=>{
            item.classList.remove("char__item_selected")
        })
        itemRef.current[id].classList.add("char__item_selected");
    }

    function renderItems(arr) {

        const items =  arr.map((item,i) => {
            let styleImg = 'cover';
            if(item.styleImg === 'contain'){
                styleImg = 'unset'
            }

            return (
                <CSSTransition
                 key={item.id}
                 timeout={1500}
                 classNames="char__item">
                    <li 
                        className="char__item"
                        ref={(elem) => itemRef.current[i] = elem}
                        onClick={()=>{
                                    props.charId(item.id);
                                    itemFocusRef(i)}
                        }>
                            <img src={item.thubnaill} alt={item.name} style={{objectFit:styleImg}}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        return (
            
                <ul className="char__grid">
                    <TransitionGroup component={null}>
                    {items}
                    </TransitionGroup>    
                </ul>
        )
    }


    const items = renderItems(charList);

    const spinner = loading && !loadedCharters ? <Spinner/> : null;
    const errors = error ? <ErrorMessage/> : null;
     
    return (
        <div className="char__list">
            {spinner}
            {errors}
            {items}
            <button 
                className="button button__main button__long"
                disabled={loadedCharters}
                style = {{"display" : endChars ? "none" : "block"}}
                onClick={()=> onRequestCharaters(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    charId:PropTypes.func
}
export default CharList;