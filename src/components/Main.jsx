import React, { useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrencyConverter } from './CurrencyConverter';
import { HistoryConversions } from './HistoryConversions';
import { NoPage } from './NoPage';
import { STORAGE_KEY } from '../utils/localStorageKey';
import { API_KEY, API_URL } from '../utils/apiConstants';
import { sortingHelper } from '../utils/sortingHelper';

export const Main = () => {
  const [currenciesList, setCurrenciesList] = useState([]);
  const [conversionsHistory, setConversionsHistory] = useState([]);

  useEffect(() => {
    const getCurrenciesList = async () => {
      const response = await fetch(`${API_URL}/api/v7/currencies?apiKey=${API_KEY}`);
      const { results } = await response.json();

      const sortedResults = Object.values(results).sort(sortingHelper);
      setCurrenciesList(sortedResults);
    };
    getCurrenciesList();
  }, []);

  useEffect(() => {
    const listFromStorage = localStorage.getItem(STORAGE_KEY);
    if (listFromStorage !== null) {
      try {
        setConversionsHistory(JSON.parse(listFromStorage));
      } catch {}
    }
  }, []);

  const addToHistory = conversion => {
    const newList = [conversion, ...conversionsHistory];
    setConversionsHistory(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  return (
    <Switch>
      <Route exact path="/">
        <CurrencyConverter addToHistory={addToHistory} currenciesList={currenciesList}/>
      </Route>
      <Route path="/history">
        <HistoryConversions conversionsList={conversionsHistory} setConversionsHistory={setConversionsHistory}/>
      </Route>
      <Route>
        <NoPage />
      </Route>
    </Switch>
  );
};
