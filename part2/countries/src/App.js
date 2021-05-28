import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryItem from './components/countryItem'
import CountryIView from './components/countryView'


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
        console.log('effect')
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
            { filteredCountries.length === 0 && <p></p>}
            {filteredCountries.length === 1 && <CountryIView {...filteredCountries[0]} />}
            { filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map(country => <CountryItem country={country} />)}
            {  filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}

        </div>
    );
}

export default App;
