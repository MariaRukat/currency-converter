import React, { useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrencyConverter } from './CurrencyConverter';
import { HistoryConversions } from './HistoryConversions';
import { STORAGE_KEY } from '../utils/localStorageKey';
import { API_KEY, API_URL } from '../utils/apiConstants';
import { sortingHelper } from '../utils/sortingHelper';
import { ContainerConverter } from './styledElements/ContainerConverter';
import { ContainerHistory } from './styledElements/ContainerHistory';
import { ContainerHistoryHidden } from './styledElements/ContainerHistoryHidden';
import { testLocalStorage } from '../utils/testLocalStorage';
import { HistoryLink } from './styledElements/HistoryLink';

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

    if (testLocalStorage()){
      const listFromStorage = localStorage.getItem(STORAGE_KEY);
      if (listFromStorage !== null) {
        try {
          setConversionsHistory(JSON.parse(listFromStorage));
        } catch(e) {
          console.error(e);
        }
      }
    }

  }, []);

  const addToHistory = conversion => {
    const newList = [conversion, ...conversionsHistory];
    setConversionsHistory(newList);
    if (testLocalStorage()){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    }
  };

  return (
    <>
      <Route path="/">
        <ContainerConverter>
          <CurrencyConverter addToHistory={addToHistory} currenciesList={currenciesList}/>
        </ContainerConverter>
      </Route>
      <Switch>
        <Route exact path="/">
          <ContainerHistoryHidden>
            <HistoryLink lighter to="/history">Historia</HistoryLink>
          </ContainerHistoryHidden>
        </Route>
        <Route path="/history">
          <ContainerHistory>
            <HistoryConversions conversionsList={conversionsHistory} setConversionsHistory={setConversionsHistory}/>
          </ContainerHistory>
        </Route>
      </Switch>
    </>
  );
};
