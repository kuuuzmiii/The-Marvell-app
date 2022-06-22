/* eslint-disable default-case */
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import MarvelServices from '../../services/Service';
import setContent from '../../utils/setState';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {clearError, getComic,getCharters,process,setProcess} = MarvelServices();

    useEffect(()=>{
        onUpdateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])


    const onUpdateData = () =>{
        clearError();
        
        switch (dataType) {
            case 'character':
                getCharters(id)
                      .then(onDataLoaded)
                      .then(()=>setProcess('confirm'));
                break;
            case 'comic':
                getComic(id)
                      .then(onDataLoaded)
                      .then(()=>setProcess('confirm'));

        }
    }

    const onDataLoaded =(data) =>{
        setData(data);
    }

    return (
        <>  
            <AppBanner/>
            {setContent(process,Component,data)}
        </>
    )
}


export default SinglePage;