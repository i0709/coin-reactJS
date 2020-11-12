import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './AccountBalance.css';

export default class AccountBalance extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <section className="AccountBalance">
             ${this.props.amount}   
            </section>
        );
    }
}



AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}
