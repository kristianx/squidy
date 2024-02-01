import React, { useState } from 'react';
import squidLogo from "../../assets/squid.svg";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    height: 80px;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    background-color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    z-index:10;
    box-shadow: 10px 5px 15px rgba(0, 0, 0, 0.05);
    img#main-logo{
        height: 60px;
        width: 60px;
        &:hover{
            scale: 1.1;
            transition: all 300ms ease-in-out;
        }
    }
    .header-search{
        padding: 10px;
        border-radius: 15px;
        border: 2px solid var(--grey-light);
        flex-grow: 1;
        max-width:400px;
    }
    .navigation{
        display: flex;
        gap: 10px;
        a{
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 600;
            color: var(--grey-light);
            &.selected{
                color: var(--body-text);
            }
        }
    }
    @media only screen and (max-width: 500px) {
        flex-wrap: wrap;
        height: 140px;
        gap: 0;
         .header-search{
             width: 100%;
             order: 2;
         }
    }


    
`;

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <>
            <StyledHeader id="main-nav">
                <NavLink to="/">
                    <img id="main-logo" src={squidLogo} alt="Logo"/>
                </NavLink>
                <input
                    className={"header-search"}
                    type="text"
                    placeholder="Search by user name..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <nav className="navigation">
                    <NavLink to="/" className={({isActive}) => (isActive ? "selected" : '')}>Home</NavLink>
                    <NavLink to="/images" className={({isActive}) => (isActive ? "selected" : '')}>Images</NavLink>
                </nav>
            </StyledHeader>
        </>
    )
}

export default Header
