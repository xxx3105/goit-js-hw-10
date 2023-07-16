import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loaderContainer = document.querySelector('.loader-container');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

function showLoader() {
  loaderContainer.style.display = 'flex';
}

function hideLoader() {
  loaderContainer.style.display = 'none';
}

function showError() {
  errorElement.style.display = 'block';
}

function hideError() {
  errorElement.style.display = 'none';
}

hideLoader(); 

fetchBreeds()
  .then(data => {
    let listNamesKatze = '';

    data.forEach(cat => {
      const nameCat = cat.name;
      listNamesKatze += `<option>${nameCat}</option>`;
    });

    breedSelect.innerHTML = listNamesKatze;

    new SlimSelect({
      select: '#breed-select'
    });

    breedSelect.addEventListener('change', (event) => {
      const selectBreed = event.target.value;
      const selectedKatze = data.find(cat => cat.name === selectBreed);

      if (selectedKatze) {
        const breedId = selectedKatze.id;

        showLoader(); 

        fetchCatByBreed(breedId)
          .then(cats => {
            if (cats.length > 0) {
              const cat = cats[0];
              const name = cat.breeds[0].name;
              const description = cat.breeds[0].description;
              const imageURL = cat.url;
              const katzeTemperament = cat.breeds[0].temperament;

              catInfo.innerHTML = `
                <div class="table-of-cats">
                  <div class="container">
                    <img src="${imageURL}" alt="${name}" width="480">
                  </div>
                  <div class="container">
                    <h2><b>${name}</b></h2>
                    <p>${description}</p>
                    <p><b>Tempatament: </b>${katzeTemperament}</p>
                  </div>
                </div>
              `;

              catInfo.style.display = 'block';
            }
          })
          .catch(error => {
            console.error('Scheisse! Probier noch einmal!', error);
            Notiflix.Notify.failure('Scheisse! Probier noch einmal!');
          })
          .finally(() => {
            hideLoader(); 
          });
      }
    });
  })
  .catch(error => {
    Notiflix.Notify.failure('Scheisse! Probier noch einmal!');
  });
