import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const CountryDetails = (props) => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  const getCountryName = (alpha3Code) => {
    const country = props.countries.filter((c) => {
      return c.alpha3Code === alpha3Code;
    });
    return country.length > 0 ? country[0].name.official : '';
  };

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries/' + id)
      .then((result) => {
        setCountry(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="col-7">
      {country && (
        <>
          <h1 className="text-center">
            <img
              src={`https://flagcdn.com/80x60/${country.alpha2Code
                .toString()
                .toLowerCase()}.png`}
              alt={country.alpha3Code}
            />
            <br />

            {country.name.official}
          </h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{country.capital.join(',')}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {country.area} km
                  <sup>2</sup>
                </td>
              </tr>
              {country.borders.length ? (
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul>
                      {country.borders.map((c) => {
                        return (
                          <li key={`borders${c}`}>
                            <Link to={`/${c}`}>{getCountryName(c)}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CountryDetails;
