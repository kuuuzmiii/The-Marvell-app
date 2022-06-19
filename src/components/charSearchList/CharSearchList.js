import { useState } from 'react'; 
import { Formik, Field, Form, ErrorMessage as FromikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/Service';

import './charSearchList.scss';
import { string } from 'prop-types';

const CharSearchList = () => {
    const [nameChar,setNameChar] = useState(null);

    const {loading, error, clearError, getCharterName} = MarvelServices();

    const onChar = (charcter) => {
        setNameChar(charcter);
    }

    const onRequestCharacters = (name) => {
        clearError();

        getCharterName(name)
                    .then(res => {
                        onChar(res);
                        console.log(nameChar)
                    });
    }
    
    const errors = error ? <div className='char__search-critical-error'><ErrorMessage/></div> : null;
    const result = !nameChar ? null : nameChar.length > 0 ?
                           <div className="char__search-wrapper">
                                <div className='char__search-success'>This character has been found</div>
                                <Link to={`/comics/${nameChar[0].id}`}>
                                    <button className="button button__main" onClick={console.log(nameChar[0])}><div className="inner">Sign up</div></button>
                                </Link>
                           </div> : 
                           <div className='char__search-error'>There is no such character</div> 

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{name:''}}
                validationSchema={Yup.object({
                    name: Yup.string()
                            .min(2,'must be at least 2 characters long')
                            .required()
                            .required('This field is required')

                })}
                onSubmit={ values => {
                    onRequestCharacters(values.name);
                }}
            >
                <Form>
                    <label htmlFor="name" className="char__search-label">Or find a characters by name:</label>
                    <div className="char__search-wrapper">
                        <Field  name="name" type="text" />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled={loading} >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FromikErrorMessage name="name" className='char__search-error' component='div'/>
                </Form>
            </Formik>
            {result}
            {errors}
        </div>
    )
}

export default CharSearchList;