const api_key = config.API_KEY;
const giphy = new GiphyHTTP();

const getRandomGif = () => {
  giphy
    .getGif(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}`)
    .then((data) => {
      loadImage(data.data);
    })
    .catch((err) => console.log(err));
};

const getTrendingGifs = () => {
  giphy
    .getGif(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
    .then((data) => {
      clearGifs();
      data.data.forEach((gifs) => {
        loadImage(gifs);
      });
    })
    .then(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    })
    .catch((err) => console.log(err));
};

const getSearchGif = () => {
  giphy
    .getGif(
      `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${document
        .querySelector('#search')
        .value.replace(/ /g, '_')}`
    )
    .then((data) => {
      clearGifs();
      data.data.forEach((gifs) => {
        loadImage(gifs);
      });
    })
    .then(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    })
    .catch((err) => console.log(err));
};

const clearGifs = () => {
  document.querySelector('.giphy').textContent = '';
};

const loadImage = (data) => {
  const theGif = document.createElement('div');
  theGif.className = 'theGif';

  const gif = document.createElement('img');
  gif.setAttribute('src', data.images.original.webp);

  theGif.appendChild(gif);
  document.querySelector('.giphy').appendChild(theGif);

  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

document.querySelector('#randomGifBtn').addEventListener('click', getRandomGif);
document.querySelector('#searchGifBtn').addEventListener('click', getSearchGif);
document
  .querySelector('#trendingGifBtn')
  .addEventListener('click', getTrendingGifs);
document.querySelector('#clearBtn').addEventListener('click', clearGifs);
