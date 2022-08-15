import { Api } from "./api.js";

// GET ELEMENT DAS PÁGINAS

const loginButton = document.getElementById('link--cadastro');
const divLogin = document.getElementById('div--login');
const divCadastro = document.getElementById('div--cadastro');
const cadastroButton = document.getElementById('cadastro--button');
const formCadastro = document.querySelectorAll('.input--cadastro');

// LISTENERS DO BOTÃO DE CADASTRO

loginButton.addEventListener('click', inputCadastro);
cadastroButton.addEventListener('click', createUser);

// FUNÇÃO PARA APRESENTAÇÃO DO CADASTRO

function inputCadastro() {
    divLogin.style.display = "none";
    divCadastro.style.display = "flex";
}

// FUNÇÃO QUE CRIA UM NOVO USUÁRIO

async function createUser () {
    const data = {};
    formCadastro.forEach(elem => {
        data[elem.name] = elem.value
    })
    Api.createUser(data);
    return data
}









export { inputCadastro };