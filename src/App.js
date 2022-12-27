import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';

import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';

import axios from 'axios';
function App() {
  const [countries, setCounties] = useState([]);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then((result) => {
        const sortedCounties = result.data.sort((a,b) => (a.alpha2Code > b.alpha2Code) ? 1 : ((b.alpha2Code > a.alpha2Code) ? -1 : 0))
        setCounties(sortedCounties);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route
              path="/:id"
              element={<CountryDetails countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
