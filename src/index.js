import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryDiv: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    refs.countryDiv.innerHTML = '';
    if (!e.srcElement.value.trim()) {
        return Notiflix.Notify.info('Enter the name of the country');
    }
    const name = e.srcElement.value;

    fetchCountries(name)
        .then(e => {
            refs.countryList.innerHTML = '';
            if (e.length > 10) {
                return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            };
            e.length === 1 ? countryCard(e) : countryCards(e)
        })
        .catch(error => {
            refs.countryList.innerHTML = '';
            refs.countryDiv.innerHTML = '';

            Notiflix.Notify.failure('Oops, there is no country with that name')
        });
}



function countryCards(el) {
    const cards = el.map(e => {
        return `<li class="country-item">
                    <img src="${e.flags.svg}" alt="flag of ${e.name.official}" width="50px" height="increment">
                    <h2 class="country-mini-name">${e.name.official}</h2>
                </li>
        `
    });
    refs.countryList.innerHTML = cards.join('');
}

function countryCard(el) {
    const e = el[0];
    const lang = [];

    for (const key in e.languages) {
        lang.push(e.languages[key])
    }

    refs.countryList.innerHTML = '';
    refs.countryDiv.innerHTML = `<li class="country-item-card">
    <div class="country-name">
    <img src="${e.flags.svg}" alt="flag of ${e.name.official}" width="50px" height="increment">
    <h2>${e.name.official}</h2>
    </div>
    <ul class="country-card">
    <li>
        <p><span>Capital: </span>${e.capital[0]}</p>
    </li>
    <li>
        <p><span>Population: </span>${e.population}</p>
    </li>
    <li>
        <p><span>Languages: </span>${lang.join(", ")}</p>
    </li>
    </ul>
</li>
`;
}