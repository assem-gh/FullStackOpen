import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
        .then((res) => {
          if (res.data.status === 404) throw new Error();
          setCountry({ found: true, data: res.data[0] });
        })
        .catch(() => setCountry({ found: false }));
    }
  }, [name]);

  return country;
};
