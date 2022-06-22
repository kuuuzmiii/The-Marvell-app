import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/Service';
import setState from '../../utils/setState';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char,setChar] = useState(null);

    const {clearError,getCharters,process,setProcess} = MarvelServices();

    useEffect(()=>{
        onUpdateChar();
    },[props.charId])


    const onUpdateChar = () =>{
        const {charId} = props;

        if(!charId){
            return;
        }

        getCharters(charId)
                      .then(onCharLoaded)
                      .then(() => setProcess('confirm'));
    }

    const onCharLoaded =(char) =>{
        clearError();
        setChar(char);
    }
    return (
        <div className="char__info">
            {setState(process,View,char)}
        </div>
    )
}

const View = ({data}) => {
    const {name,description,thumbnail,homepage,wiki,styleImg,comics} = data;

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
                <img src={thumbnail} alt={name} style={{objectFit:styleImg}}/>
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