import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer.tsx";
import Header from "../components/shared/Header.tsx";
import {useState} from "react";

const RootLayout = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);

        console.log("Term set => ", searchTerm);
    };

    return (
        <>
            <Header onSearch={handleSearch}/>
            <div className="main-container container">
                <Outlet context={searchTerm}/>
            </div>
            <Footer/>
        </>
    )
}

export default RootLayout
