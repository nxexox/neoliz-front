import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import InputSearch from '../MainSearchInput';
import './assets/style.css';


export default class Head extends Component {
  render(){
    return (
      <div className="head">
        <div className="head__container">
          <div className="no-margin-left row">
            <div className="head__logo--container">
              <div className="head__logo"></div>
            </div>
            <div className="col-xs-10">
              <form className="head__search-form">
                <InputSearch />
              </form>  
            </div>
          </div>
          <div className="no-margin-left row">
            <div className="col-xs-10 head__menu-container no-padding-left">
              <ul className="head__menu">
                <li className="head__menu-item head__menu-item--active">Поиск</li>
                <li className="head__menu-item">Картинки</li>
                <li className="head__menu-item">Всякая дичь</li>
                <li className="head__menu-item">Еще какой то пункт</li>
                <li className="head__menu-item">А тут просто котики</li>  
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
