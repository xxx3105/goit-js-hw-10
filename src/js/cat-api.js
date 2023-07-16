 import axios from "axios";

const API_KEY = 'live_zs0VSKlYHHktinStNoV4lBkZTkH9SgkK5VsZ4NhlEUQCCcB2qCGk3iC4Mf5suRDS';
axios.defaults.headers.common["x-api-key"] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Scheisse! Probier noch einmal!', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Scheisse! Probier noch einmal!', error);
      throw error;
    });
}


 