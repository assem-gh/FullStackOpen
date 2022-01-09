import CountryInfo from './countryinfo'
import { useState } from 'react'


const CountryItem = ({ country }) => {
    const [display, setdisplay] = useState(false)
    const showHandler = () => setdisplay(!display)
    return (
        <li>
            {country.name} <button onClick={showHandler}>Show</button>
            {display && <CountryInfo {...country} />}
        </li>
    )
}

export default CountryItem