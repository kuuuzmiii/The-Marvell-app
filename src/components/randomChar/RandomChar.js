import {useState,useEffect} from 'react';
import MarvelServices from '../../services/Service';
import setState from '../../utils/setState';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const{clearError,getCharters,process,setProcess} = MarvelServices();

    const [char,setChar] = useState({});

    MarvelServices();
    
    useEffect(()=>{
        updateChar();
        const timeerID = setInterval(updateChar,3000);

        return () => {
            clearInterval(timeerID)
        }

    },[] );

    const onUpdateState = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.round(Math.random() * (1011400 - 1011000) + 1011000);
        getCharters(id)
            .then(onUpdateState)
            .then(()=> setProcess('confirm'));
    }

    return (
        <div className="randomchar">
            {setState(process,View,char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export const View = ({data}) => {
    const {name,description,thumbnail,homepage,wiki,styleImg} = data;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" 
                 style={{objectFit:styleImg}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;