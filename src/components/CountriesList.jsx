import { Link } from 'react-router-dom';
const CountriesList = ({ countries }) => {
  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link
              key={country.alpha3Code}
              className="list-group-item list-group-item-action text-center"
              to={country.alpha3Code}
            >
              <img
                src={`https://flagcdn.com/80x60/${country.alpha2Code
                  .toString()
                  .toLowerCase()}.png`}
                alt={country.alpha3Code}
              />
              <br />

              {country.name.common}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
