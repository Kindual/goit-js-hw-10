import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
}

refs.inputEl.addEventListener('input', onSearch);

function onSearch(e) {
    if (!e.srcElement.value.trim()) {
        console.log('what is it');
    }
    const name = e.srcElement.value;

    fetchCountries(name)
    // .then(console.log());
    console.log(fetchCountries(name));
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then(r => {
        if (!r.ok) {
          throw new Error(r.status);
        }
      return r.json();
    });
  }