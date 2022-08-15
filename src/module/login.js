import { Api } from "./api.js";

// GETS DOS ELEMENTOS DAS PÁGINAS

const loginButton = document.getElementById('login--button');
const login = document.querySelectorAll('.input--login');

// LISTENERS DA PÁGINA

loginButton.addEventListener('click', getLogin);

// APRESENTA O PASSWORD

let btn = document.getElementById('lnr-eye');

btn.addEventListener('click', showPassword);

function showPassword() {
    let input = document.getElementById('login--password');
    if(input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }
}

// FUNÇÃO QUE CRIA O OBJETO E FAZ O LOGIN

async function getLogin () {
    const data = {}
    login.forEach(elem => {
        data[elem.name] = elem.value
    })
    Api.login(data);
    
    return data
}

console.log(Api.token)