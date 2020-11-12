import React from 'react';
import logo from './logo.svg';
import './App.css';
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance.jsx'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2
        },
        {
          name: 'BitcoinCash',
          ticker: 'BCH',
          price: 298.99
        }
      ]
    }
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Coin Exchange 
          </h1>
        </header> 
        <AccountBalance amount={this.state.balance} />
        <table className="coin-table">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Ticker:</th>
              <th>Price:</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.coinData.map( ({name, ticker, price}) => 
                <Coin key={ticker} name={name}  ticker={ticker} price={price} />
              )
            }
         
          </tbody>
        </table>   
      </div>
    );
  }
  /*
  key={value.ticker} -- Unique key or use uuid package
  {
    this.state.coinData.map(value => 
      <Coin key={value.ticker} name={value.name}  ticker={value.thicker} price={value.price} />
    )
  }

  --OR

  this.state.coinData.map(({name, ticker, price}) => 
                <Coin key={value.ticker} name={name}  ticker={ticker} price={price} />
              )
  -----OR
  {
              this.state.coinData.map(value => 
                <Coin key={value.ticker} {...value} />
              )
            }
         
  -- OR          
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[0].ticker} price ={this.state.coinData[0].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[1].ticker} price ={this.state.coinData[1].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[2].ticker} price ={this.state.coinData[2].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[3].ticker} price ={this.state.coinData[3].price} /> 
  */
  
  
}

export default App;
