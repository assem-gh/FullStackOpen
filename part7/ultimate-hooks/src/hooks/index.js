import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset=()=>setValue('')

  return {
    type,
    value,
    onChange,
    reset
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    setResources([...resources, res.data]);
  };

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get(baseUrl);
      setResources(res.data);
    };
    getAll();
  }, [baseUrl]);

  const service = {
    create,
  };

  return [resources, service];
};
