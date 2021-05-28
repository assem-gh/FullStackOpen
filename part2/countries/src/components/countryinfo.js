import Weather from './weather'
const CountryInfo = ({ name, capital, population, languages, flag }) => {
    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>populatin {population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={flag} alt='flag' className='image' />
            <Weather capital={capital} />
        </>
    )
}
export default CountryInfo