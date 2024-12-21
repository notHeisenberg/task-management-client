import axios from 'axios';

const API_CONFIG = {
  baseURL: import.meta.env.VITE_RAPID_API_URL,
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
  }
};

export const submitCode = async (language_id, source_code, stdin = '') => {
  const options = {
    ...API_CONFIG,
    method: 'POST',
    params: { base64_encoded: 'true', fields: '*' },
    data: {
      language_id,
      source_code: btoa(source_code),
      stdin: btoa(stdin),
    }
  };

  return axios.request(options);
};

export const checkSubmission = async (token) => {
  const options = {
    ...API_CONFIG,
    method: 'GET',
    url: `${import.meta.env.VITE_RAPID_API_URL}/${token}`,
    params: { base64_encoded: 'true', fields: '*' },
  };

  return axios.request(options);
}; 