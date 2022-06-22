/* eslint-disable default-case */
import {useState,useEffect,useRef,useMemo} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import MarvelServices from '../../services/Service';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setState = (process,Component,loadedCharters) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return loadedCharters ? <Component/> : <Spinner/>
        case 'error':
            return <ErrorMessage/>
        case 'confirm':
            return <Component/>

    }
}

const CharList = (props) => {

    const {getAllCharters,process,setProcess} = MarvelServices();

    const [charList,setCharList] = useState([]);
    const [loadedCharters,setLoadedCharters] = useState(false);
    const [offset,setOffset] = useState(210);
    const [endChars,setEndChars] = useState(false);

    MarvelServices();

    useEffect(()=>{
        onRequestCharaters(offset,true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onRequestCharaters = (offset,initial) => {
        initial ? setLoadedCharters(false) : setLoadedCharters(true);
        getAllCharters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirm'));
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
                        ref={(elem) => itemRef.current[item.id] = elem}
                        onClick={()=>{
                                    props.charId(item.id);
                                    itemFocusRef(item.id)}
                        }>
                            <img src={item.thumbnail} alt={item.name} style={{objectFit:styleImg}}/>
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
    const elements = useMemo(()=>{
        return setState(process,()=>renderItems(charList),loadedCharters)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[process])
    return (
        <div className="char__list">
            {elements}
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