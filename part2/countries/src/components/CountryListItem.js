import React from 'react'

const CountryListItem = ({country, handleClick}) => {
  const handleButtonClick = () => handleClick(country)

  return (
      <div key={country.name}>
        {country.name}
        <button onClick={handleButtonClick}>
          show
        </button>
      </div>
  )
}

export default CountryListItem