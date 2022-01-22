import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import Product from '../Product';
import api from '../../api';
import {GxButton} from "@garpix/garpix-web-components-react";
import { useIntl } from "react-intl";


const getSuggestionValue = (suggestion) => {
  return suggestion.title;
}

const renderSuggestion = (suggestion) => {
  return <Product product={suggestion} size="row-small" />
}


const Search = () => {
  const { formatMessage } = useIntl()
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const loadSuggestions = (value) => {
    if (isLoading) return false;
    setLoading(true)

    api.getSearch({ q: value })
      .then(data => {
        setLoading(false);
        setSuggestions(data);

      })
      .catch(error => {
        console.log(error, 'error')
      })
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    loadSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const handleSubmit = e => {
    e.preventDefault()
  }
  const placeholder = formatMessage({id: "select_your_product"})

  return (
    <div className="search-box-view">
      <form onSubmit={handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: placeholder,
            value,
            onChange: onChange
          }}
          onSuggestionSelected={() => {
            setValue('')
          }}
        />
        <GxButton variant="light" size="sm"  className="submit">
        </GxButton>
      </form>
    </div>
  )
}

export default React.memo(Search);
