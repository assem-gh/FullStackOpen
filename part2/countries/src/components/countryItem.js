import CountryIView from './countryView'
import { useState } from 'react'


const CountryItem = ({ country }) => {
    console.log(country)
    const [display, setdisplay] = useState(false)
    const showHandler = () => setdisplay(!display)
    return (
        <li>
            {country.name} <button onClick={showHandler}>Show</button>
            {display && <CountryIView {...country} />}
        </li>
    )
}

export default CountryItem