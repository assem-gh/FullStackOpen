import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'



const Country = ({ name, capital, population, languages, flag }) => {
    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>populatin {population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src={flag} alt='flag' className='image' />
        </>
    )
}
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
            setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }
        console.log('search', search, 'filterd: ', filteredCountries)
    }

    const renderCountryInfo = () => {
        switch (true) {
            case filteredCountries.length === 0:
                return;
            case filteredCountries.length === 1:
                return <Country {...filteredCountries[0]} />;
            case filteredCountries.length < 10:
                return filteredCountries.map(country => <li>{country.name}</li>);
            default:
                return <p>Too many matches, specify another filter</p>
        }
    }

    return (
        <div className="App">
            find countries : <input value={search} onChange={changeHandler} />
            {renderCountryInfo()}
        </div>
    );
}

export default App;
