const imgUrl = 'https://dog.ceo/api/breeds/image/random/7';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

let breeds = [];

const fetchImages = () => {
  fetch(imgUrl)
    .then((resp) => resp.json())
    .then((json) => {
      json.message.forEach((element) => {
        const dogImg = document.createElement('img');
        dogImg.src = element;
        dogImg.style.width = '400px';
        document.getElementById('dog-image-container').appendChild(dogImg);
      });
    });
};

const fetchBreeds = () => {
  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((results) => {
      breeds = Object.keys(results.message);
      renderBreeds(breeds);
      document
        .getElementById('breed-dropdown')
        .addEventListener('change', (e) => {
          renderBreeds(
            breeds.filter((breed) => breed.startsWith(e.target.value))
          );
        });
    });
};

const clearBreeds = (element) => {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
};

const renderBreeds = (breeds) => {
  let ul = document.getElementById('dog-breeds');
  clearBreeds(ul);
  breeds.forEach((breed) => {
    let li = document.createElement('li');
    li.textContent = breed;
    li.addEventListener('click', (e) => {
      e.target.style.color = 'lightgreen';
    });
    ul.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
  fetchBreeds();
});
