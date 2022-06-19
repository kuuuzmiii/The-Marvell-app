import {Link} from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <div style={{
                textAlign:'center',
                objectFit:'contain',
                color:'#000000',
                fontWeight:'bold',
                fontSize:'24px',
                fontFamily:'"Roboto Condensed", sans-serif',
            }}>
            <ErrorMessage/>
            <Link to="/">Back to main page</Link>
        </div>
        
    )
}

export default Page404;