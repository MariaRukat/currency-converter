import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from './styledElements/H2';
import { Button } from './styledElements/Button';
import { ButtonContainer } from './styledElements/ButtonContainer';
import { EmptyList } from './styledElements/EmptyList';
import { Table } from './styledElements/Table';
import { STORAGE_KEY } from '../utils/localStorageKey';

export const HistoryConversions = props => {
  const { conversionsList, setConversionsHistory } = props;

  const resetHistory = () => {
    setConversionsHistory([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <>
      <H2>Historyczne konwersje</H2>
      {!conversionsList.length && <EmptyList />}
      {!!conversionsList.length && (
        <>
          <ButtonContainer>
            <Button light onClick={resetHistory}>
              Wyczyść historię
            </Button>
          </ButtonContainer>
          <Table>
            <thead>
              <tr>
                <th>Kwota</th>
                <th>Waluta źrodłowa</th>
                <th>Wynik</th>
                <th>Waluta docelowa</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {conversionsList.map(({ currFrom, currTo, amountFrom, result, date}) => {
                const dateFormatted = new Date(date).toLocaleString();
                return (
                  <tr key={date}>
                    <td className="numberCell">{amountFrom}</td>
                    <td>{currFrom}</td>
                    <td className="numberCell">{result}</td>
                    <td>{currTo}</td>
                    <td>{dateFormatted}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

HistoryConversions.propTypes = {
  conversionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setConversionsHistory: PropTypes.func.isRequired
};
