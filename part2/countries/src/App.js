import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryItem from './components/countryItem'
import CountryInfo from './components/countryinfo'


function App() {
    const [search, setSearch] = useState('')
    const [countries, setcountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])


    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setcountries(response.data)
            })
         }, [])

    const changeHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value) {
            const regex = new RegExp(e.target.value, 'i')
            const newFilteredcountries = countries.filter(country => country.name.match(regex))
            setFilteredCountries(newFilteredcountries);
        } else setFilteredCountries([])
    }

    return (
        <div className="App">
            find countries : <input value={search} onChange={changeHandler} />

            {filteredCountries.length === 1 && <CountryInfo  {...filteredCountries[0]} />}
            { filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map((country, i) => <CountryItem key={i} country={country} />)}
            {  filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}

        </div>
    );
}

export default App;
