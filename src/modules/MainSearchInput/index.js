import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './assets/style.css';


/// TODO: Сделать анимацию текста.
/// Сделать фокус при загрузке страницы на инпуте.

/// Пример элементов для саджеста. В зависимости от возвращаемых данных по апи
/// Тут будет своя структура, которую будем обрабатывать.
const languages = [
  {
    text: 'Текст 1',
  },
  {
    text: 'Текст 2',
  },
  {
    text: 'Текст 3',
  },
  {
    text: 'Текст 4',
  },
  {
    text: 'Текст 5',
  },
  {
    text: 'Текст 6',
  },
];

/// Функция, по поиску в саджесте элементов.
/// Должна возвращать всегда 5 элеметов.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  /// Фильтруем. Нет необходимости в будущем так делать.
  const resArray = inputLength === 0 ? [] : languages.filter(lang =>
    lang.text.toLowerCase().slice(0, inputLength) === inputValue
  );

  /// Делаем подсвечивание сопадений.
  resArray.forEach((item, index) => {
    item.highlitedText = <span><b>{item.text.slice(0, inputLength)}</b>{item.text.slice(inputLength)}</span>
  });
  return resArray;
};

export default class InputSearch extends Component {
  constructor(props){
    super(props);

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.cleanInput = this.cleanInput.bind(this);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  /// Происходит при изменение значения нипута.
  onChange = (event, { newValue }) => {
    this.setState({value: newValue});
  };

  /// Событие, выбора элемента в саджесте.
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('2 Вы начали поиск с запросом: ', suggestionValue);
  };
  
  /// Функция, по обновлению данных для саджеста.
  /// value - значение с инпута.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  /// Возвращает отрендеренный компонент инпута.
  renderInputComponent = inputProps => (
    <div className="no-margin-left border-yellow BlockMainSearch__input-container row">
      <div className="col-lg-11 col-sm-11 col-xs-11 no-padding-horizontal">
        <input { ...inputProps } ref={(input) => { this.searchInput = input; }} />
      </div>
      <div className="col-lg-1 col-sm-1 col-xs-1 no-padding-horizontal">
        <span className={inputProps.value ? "BlockMainSearch__clear-icon--open" : "BlockMainSearch__clear-icon--close"}
              onClick={this.cleanInput}>
        </span>
      </div>
    </div>
);

  /// Очищает инпут.
  cleanInput = (event) => {
    this.setState({value: ""});
    /// Ставим фокус, когда очистили.
    this.searchInput.focus();
  }

  /// Чистит саджест от элементов..
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  /// Возвращает значение по выбранному элементу.
  getSuggestionValue = suggestion => suggestion.text;

  /// Функция, которая рендерит каждый элемент саджеста.
  renderSuggestion = (suggestion) => (
      <div className="BlockMainSearch__suggestion-item" >
        {suggestion.highlitedText}
      </div>
  );

  /// Возвращает отрендеренный список элементов саджеста. Включая контейнер.
  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
        children ?
          <div {...containerProps} className="BlockMainSearch__suggestion-container">
            {children}
          </div>
        : null
    );
  };

  render() {
    // Назначаем пропсы для самого инпута.
    const inputProps = {
      value: this.state.value,
      placeholder: 'Введите слово "Текст"',
      onChange: this.onChange,
      className: 'search text-black no-border',
      type: 'text'
    };

    return (
      <div className="BlockMainSearch row">
        <div className="col-lg-6 col-sm-8 col-xs-10 BlockMainSearch__search-container">
          <div className="row">
            <div className="col-xs-10 no-padding-horizontal">
              <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderInputComponent={this.renderInputComponent}
                inputProps={inputProps}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                renderSuggestion={this.renderSuggestion}
                highlightFirstSuggestion={true}
              />
            </div>
            <div className="col-xs-2 no-padding-rigth">
              <div className="row no-margin-left">
                <div className="col-xs-10 no-padding-horizontal">
                  <button type="button" className="border-yellow search yellow text-black">Найти</button>
                </div>
                <div className="col-xs-2 no-padding-horizontal">
                  <div className="BlockMainSearch__triangle-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-2 col-xs-1"></div>
      </div>
    );
  };
};
