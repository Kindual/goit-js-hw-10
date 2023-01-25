

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(r => {
            if (!r.ok) {
                throw new Error(r.status);
            }
            return r.json();
        })
}