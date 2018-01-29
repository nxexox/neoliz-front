import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
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

/// Возвращает значение по выбранному элементу.
const getSuggestionValue = suggestion => suggestion.text;

/// Функция, которая рендерит каждый элемент саджеста.
const renderSuggestion = (suggestion) => (
    <div className="BlockMiniSearch__suggestion-item" >
      {suggestion.highlitedText}
    </div>
);

/// Возвращает отрендеренный список элементов саджеста. Включая контейнер.
const renderSuggestionsContainer = ({ containerProps, children, query }) => {
  return (
      children ?
        <div {...containerProps} className="BlockMiniSearch__suggestion-container">
          {children}
        </div>
      : null
  );
};

/// Возвращает отрендеренный компонент инпута.
const renderInputComponent = inputProps => (
    <div className="border-yellow BlockMiniSearch__input-container row">
      <div className="col-lg-11 col-sm-11 col-xs-11 no-padding-horizontal">
        <input { ...inputProps } />
      </div>
      <div className="col-lg-1 col-sm-1 col-xs-1 no-padding-horizontal">
        <span className={inputProps.value ? "BlockMiniSearch__clear-icon--open" : "BlockMiniSearch__clear-icon--close"}>
        </span>
      </div>
    </div>
);

export default class InputSearch extends Component {
  constructor(props){
    super(props);

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

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
    console.log('Вы начали поиск с запросом: ', suggestionValue);
  };
  
  /// Функция, по обновлению данных для саджеста.
  /// value - значение с инпута.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  /// Чистит саджест от элементов..
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
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
      <div className="BlockMiniSearch row">
        <div className="col-lg-3 col-sm-2 col-xs-1"></div>
        <div className="col-lg-6 col-sm-8 col-xs-10 BlockMiniSearch__search-container">
          <div className="row">
            <div className="col-xs-10 no-padding-horizontal">
              <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
                renderSuggestion={renderSuggestion}
                highlightFirstSuggestion={true}
              />
            </div>
            <div className="col-xs-2 no-padding-rigth">
              <div className="row no-margin-left">
                <div className="col-xs-10 no-padding-horizontal">
                  <button type="button" className="border-yellow search yellow text-black">Найти</button>
                </div>
                <div className="col-xs-2 no-padding-horizontal">
                  <div className="BlockMiniSearch__triangle-right"></div>
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
