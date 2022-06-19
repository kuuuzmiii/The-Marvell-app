import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import MarvelServices from '../../services/Service';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error ,clearError, getComic, getCharterName} = MarvelServices();

    useEffect(()=>{
        onUpdateData();
    },[id])


    const onUpdateData = () =>{
        clearError();
        
        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'character':
                getCharterName(id)
                      .then(onDataLoaded);
                break;
            case 'comic':
                getComic(id)
                      .then(onDataLoaded);
        }
    }

    const onDataLoaded =(id) =>{
        setData(id);
    }

    const errorMessge = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null; 
    return (
        <>  
            <AppBanner/>
            {errorMessge}
            {spinner}
            {content}
        </>
    )
}


export default SinglePage;