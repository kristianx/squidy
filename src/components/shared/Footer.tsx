import React from 'react'
import squidLogo from "../../assets/squid.svg";
import styled from "styled-components";

const StyledFooter = styled.div`
    width: 100%;
    height: 144px;
    padding: 60px 0;
    margin-top: 30px;
    position: relative;
    background-color: var(--blue-light);
    box-shadow: inset 15px 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    p{
        text-align: center;
    }
    img{
        position: absolute;
        opacity: .15;
        width: 250px;
        height: auto;
        top: -40%;
        left: 5%;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <img src={squidLogo} alt="foter-logo"/>
            <p>Copyright 2024. All rights reserved.</p>
        </StyledFooter>
    )
}

export default Footer
