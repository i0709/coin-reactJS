import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = styled.section
`
   font-size: 2rem;
   text-align: left;
   padding: 1.5rem 0 1.5rem 5rem;
`;


export default class AccountBalance extends Component {
    static propTypes = {
        prop: PropTypes
       
    }
    

    render() {
        const balanceText = this.props.showBalance ? <> Balance: ${this.props.amount} </>: null;
        const buttonText = this.props.showBalance ? 'Hide balance' : 'Show Balance';
        return (
        <Section>
            {balanceText}
            <button onClick={this.props.handleToggleShowBalance}>{buttonText}</button>                        
        </Section>        
        
        );
    }
}



AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}
