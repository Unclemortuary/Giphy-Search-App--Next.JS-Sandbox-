const BASE_URL = 'https://api.giphy.com/v1/gifs/';
const API_KEY = 'api_key=RHZN27idONbQeH1U8T7IVQm7LWk5Jcsk';
const PAGING = 'limit=20';

export const fetchData = (search) => new Promise((resolve, reject) => {
    let innerSearch = 'nature';
    if (search && isInputValid(search)) {
        innerSearch = sanitizeInput(search);
    }
    fetch(`${BASE_URL}search?q=${innerSearch}&${API_KEY}&${PAGING}`)
        .then(data => data.json())
        .then(jsoned => resolve(jsoned));
});

function isInputValid(input) {
    const pattern = new RegExp(/`;|';|";|<script>/g);
    return !pattern.test(input);
};

function sanitizeInput(input) {
    return input.replace(/(\r\n|\n|\r)/gm, "");
};