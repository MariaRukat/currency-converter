import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { H2 } from './styledElements/H2';
import { Button } from './styledElements/Button';
import { Loader } from './styledElements/Loader';
import { FormStyles } from './styledElements/FormStyles';
import { API_KEY, API_URL } from '../utils/apiConstants';

const initialValues = {
  currFrom: 'PLN',
  amount: 0,
  currTo: 'EUR'
};

const validate = values => {
  const errors = {};

  if (values.currFrom === values.currTo) {
    errors.currFrom = 'Wybrałeś dwie takie same waluty.';
  }
  if (values.amount <= 0) {
    errors.amount = 'Podaj kwotę większą od 0.';
  }
  const amountIsNum = (new RegExp('[0-9]')).test(values.amount);
  if (!amountIsNum) {
    errors.amount = 'Wpisz liczbę.';
  }

  return errors;
};

export const CurrencyConverter = props => {
  const history = useHistory();
  const { currenciesList } = props;

  const onSubmit = async values => {
    const { currFrom, currTo, amount } = values;
    const query = `${currFrom}_${currTo}`;
    const response = await fetch(
      `${API_URL}/api/v7/convert?q=${query}&compact=ultra&apiKey=${API_KEY}`
    );
    const data = await response.json();

    const result = data[query] * Number(amount);
    const fixedResult = result.toFixed(2);

    props.addToHistory({
      currFrom,
      currTo,
      amountFrom: amount,
      result: fixedResult,
      date: new Date().getTime()
    });

    history.push('/history');
  };

  return (
    <>
      <H2>Przelicznik walut</H2>

      {!currenciesList.length && <Loader />}

      {!!currenciesList.length && (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit }) => (
            <FormStyles onSubmit={handleSubmit}>
              <label>Z waluty:</label>
              <Field name="currFrom">
                {({ input, meta}) => (
                  <div className="inputBox">
                    <select {...input} >
                      {currenciesList.map(currency => (
                        <option value={currency.id} key={currency.id}>
                          {currency.id} ({currency.currencyName})
                        </option>
                      ))}
                    </select>
                    {meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <label>Kwota:</label>
              <Field name="amount">
                {({ input, meta }) => (
                  <div className="inputBox">
                    <input {...input} type="number"/>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <label>Na walutę:</label>
              <Field name="currTo">
                {({ input, meta}) => (
                    <div className="inputBox">
                      <select {...input} >
                        {currenciesList.map(currency => (
                            <option value={currency.id} key={currency.id}>
                              {currency.id} ({currency.currencyName})
                            </option>
                        ))}
                      </select>
                      {meta.error && <span>{meta.error}</span>}
                    </div>
                )}
              </Field>

              <div/>
              <Button type="submit">Konwertuj</Button>
            </FormStyles>
          )}
        />
      )}
    </>
  );
};

CurrencyConverter.propTypes = {
  addToHistory: PropTypes.func.isRequired,
  currenciesList: PropTypes.arrayOf(PropTypes.object).isRequired
};
