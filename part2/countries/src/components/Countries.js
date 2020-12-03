import React from 'react';
import CountryDetail from "./CountryDetail";
import CountryListItem from "./CountryListItem";

const Countries = ({countries, clickedCountry, handleClickingCountry}) => {
  if (clickedCountry !== 0) { //no country clicked
    return <CountryDetail country={clickedCountry}/>
  }

  if (countries.length > 10) {
    return (
        <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length === 1) {
    return <CountryDetail country={countries[0]}/>
  } else {
    return (
        countries.map(country => (
            <CountryListItem key={country.name}
                             country={country}
                             handleClick={handleClickingCountry}/>)
        )
    )
  }

}

export default Countries;