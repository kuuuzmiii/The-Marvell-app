import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';


const setState = (process,Component,data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'error':
            return <ErrorMessage/>
        case 'confirm':
            return <Component data={data}/>
        default:
            throw new Error('Appeared error')
    }
}

export default setState;