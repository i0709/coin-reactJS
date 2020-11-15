import React, { Component } from 'react'
import logo from './logo.svg';
//import '../../App.css';
import styled from 'styled-components';

const Img = styled.img`
    eight: 8rem;
    pointer-events: none;
`;

const Header1 = styled.header`
    background-color: #282c34;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 36px;
    color: white;
`;

const H1 = styled.h1`
    font-size: 3rem;
`;

export default class Header extends Component {
    render() {
        return (
            <Header1>
                <Img src={logo} alt="logo" />
                <H1>
                    Coin Exchange 
                </H1>
            </Header1>       
        )
    }
}
