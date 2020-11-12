import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'


const Td = styled.td
`
    border: 1px solid #cccccc;
    width: 25 vh;
`;

export default class Coin extends Component {
    constructor(props){
        super(props);
        this.state = {
            price: this.props.price
        }
        this.handeClick = this.handeClick.bind(this);
    }
    /* 
    componentDidMount(){
        const callback =() => {
            //set the state to a new random value
            const randomPercentage = 0.995 + Math.random() * 0.01;
            
            this.setState( function(oldState){
                return{
                    price: oldState.price * randomPercentage
                };
            });
        }
        setInterval(callback, 1000);
    }
    */
    handeClick(event){
        //Prevent the default action of submitting the form
        event.preventDefault();

        const randomPercentage = 0.995 + Math.random() * 0.01;
        this.setState( function(oldState){
            return{
                price: oldState.price * randomPercentage
            };
        });
    }
    render() {
        return(            
            <tr>            
              <Td>{this.props.name}</Td>
              <Td>{this.props.ticker}</Td>
              <Td>${this.state.price}</Td>
              <Td>
                  <form action="#" method="POST">
                      <button onClick={this.handeClick}>Refresh</button>
                  </form>
                </Td>           
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}


