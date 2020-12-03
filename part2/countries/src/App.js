import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [clickedCountry, setClickedCountry] = useState(0)

  const filterCountries = (filterStr) => {
    let filtered
    if (filterStr === '') {
      filtered = []
    } else {
      filtered = countries.filter(country =>
          country.name.toLowerCase().includes(filterStr.trim().toLowerCase())
      )
      console.log('countries that contain', filterStr.trim(), 'are', filtered)
    }
    return filtered
  }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('response returned', response.data.length, 'countries')
      setCountries(response.data);
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountriesToShow(filterCountries(event.target.value))
    setClickedCountry(0) //reset
  }

  const handleClickingCountry = (country) => {
    setClickedCountry(country)
  }

  return (
      <div>
        <Filter value={filter} handleChange={handleFilterChange}/>
        <Countries countries={countriesToShow}
                   clickedCountry={clickedCountry}
                   handleClickingCountry={handleClickingCountry}/>
      </div>
  )

}

export default App