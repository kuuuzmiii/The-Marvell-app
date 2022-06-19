import {lazy, Suspense} from 'react'

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../../spinner/Spinner';

const MainPages = lazy(() => import('../pages/MainPages'));
const ComicsPages = lazy(() => import('../pages/ComicPages'));
const Page404 = lazy(() => import('../pages/404'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharacterPage = lazy(() => import('../pages/LayoutSingleCharactersPage/SingleCharacterPage'));
const SingleComicPage = lazy(() => import('../pages/LayoutSingleComicPage/SingleComicPage'));

const App = ()=> {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback = {<Spinner/>}>
                        <Switch>
                            {/* <Route path="/" element={<MainPages/>}/>
                            <Route path="/comics" element={<ComicsPages/>}/> */}
                            <Route exact path="/">
                            <MainPages/> 
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPages/>
                            </Route>
                            <Route exact path="/character/:id">
                                <SinglePage Component={SingleCharacterPage} dataType='character'/>
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicPage} dataType='comic'/>
                            </Route>
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;