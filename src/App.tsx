import { useState } from 'react'
import {Route, Routes } from 'react-router-dom';

import squidLogo from './assets/squid.svg'
import './App.scss'
import {Home} from "./_root/pages";
import RootLayout from "./_root/RootLayout.tsx";
import Images from "./_root/pages/Images.tsx";
import SinglePost from "./_root/pages/SinglePost.tsx";

function App() {

  return (
    <main>
        <Routes>
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/images" element={<Images/>}/>
                <Route path="/post/:id" element={<SinglePost/>}/>
            </Route>
        </Routes>
    </main>
  )
}

export default App
