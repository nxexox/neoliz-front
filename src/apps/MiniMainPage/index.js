import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import InputSearch from '../../modules/SearchInputMini';
import './assets/style.css';


export default class MiniMainPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container">
        <div className="miniMain__center">
          <form>
            <InputSearch/>
          </form>
        </div>
        <div className="miniMain__footer">
          <a href="https://ya.ru" className="miniMain__footer-logo" target="_blank"></a>
        </div>
      </div>
    )
  }
};
