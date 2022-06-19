import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchList from "../charSearchList/CharSearchList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPages = () => {

    const [charId,setCharId] = useState(null);

    const onUpdateChar = (id) => {
        setCharId(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
            <ErrorBoundary>
                <CharList charId={(id)=> onUpdateChar(id)}/>
            </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={charId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchList/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}


export default MainPages;