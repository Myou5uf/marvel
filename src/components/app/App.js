import React, { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const ErrorPage = lazy(() => import("../../pages/ErrorPage"));
const CharactersPage = lazy(() => import("../../pages/CharactersPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SingleComicsPage = lazy(() => import("../../pages/singleComicPage/SingleComicsPage"));
const SingleCharacterPage = lazy(() => import("../../pages/singleCharacterPage/SingleChracterPage"));
const SinglePageLayout = lazy(() => import("../../pages/layouts/SinglePageLayout"));

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/marvel" element={<CharactersPage />} />
                            <Route
                                path="/characters/:id"
                                element={<SinglePageLayout Component={SingleCharacterPage} dataType="character" />}
                            />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route
                                path="/comics/:id"
                                element={<SinglePageLayout Component={SingleComicsPage} dataType="comic" />}
                            />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
