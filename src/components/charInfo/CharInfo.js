import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/Service';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char,setChar] = useState(null);

    const {loading,error,clearError,getCharters} = MarvelServices();

    useEffect(()=>{
        onUpdateChar();
    },[props.charId])


    const onUpdateChar = () =>{
        const {charId} = props;

        if(!charId){
            return;
        }

        getCharters(charId)
                      .then(onCharLoaded);
    }

    const onCharLoaded =(char) =>{
        clearError();
        setChar(char);
    }

    const skeleton = char || loading || error ?  null : <Skeleton/>;
    const errorMessge = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null; 

    return (
        <div className="char__info">
            {skeleton}
            {errorMessge}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name,description,thubnaill,homepage,wiki,styleImg,comics} = char;

    const onComics = comics.map((item,i) => {
                return(
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            })
    const render = (arr) => {
            if(arr.length > 10){
                arr = arr.splice(0,10)
            }
            if(arr.length === 0){
                return 'This character was not featured in the comics.'
            }
            return arr
    }
    return (
        <>
            <div className="char__basics">
                <img src={thubnaill} alt={name} style={{objectFit:styleImg}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    render(onComics)
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;