import { Api } from "./module/api.js";

// GET DOS ELEMENTOS DA PÁGINA

const user = {token: localStorage.getItem('Token'), user: localStorage.getItem('Id')}
const userImg = document.getElementById('img-login')
const nameUser = document.getElementById('nameUser')
const localPost = document.getElementById('post')
const postButton = document.getElementById('post__content__api')
const conteudPost = document.getElementById('content__to__api')
const logoutButton = document.getElementById('logout-button');
const esqbutton = document.getElementById('voltar')
const dirbutton = document.getElementById('frente')
const count = document.getElementById('count')

// RETORNOS DOS VALORES DE CADA MÉTODOS DA API - HEADER
let userUser = await Api.getUser(user.user)
userImg.src = userUser.avatarUrl;
nameUser.innerText = userUser.username;

// LISTENERS DOS BOTÕES DA PÁGINA
postButton.addEventListener('click', inputMyPost)
logoutButton.addEventListener('click', logout);
esqbutton.addEventListener('click', alteraPageBack)
dirbutton.addEventListener('click', alteraPageGo)


// LISTAGEM DOS POST POR PÁGINAS - SECTION
async function inputPost(elem) {
    const post = await Api.listPostPag(elem);
    const id = localStorage.getItem('Id')
    post.data.forEach(element => {
        if(element.owner.id != Api.id) {
            createItens(element, element.owner.username)
        } else {
            createItensUser(element, element.owner.username)
        }
    });
    
}

await inputPost(1)

// FUNÇÃO DE CRIAÇÃO DOS ELEMENTOS - OUTROS
function createItens(elem, user) {
    const container = document.createElement('div')
    const headerContainet = document.createElement('div')
    const imgUser = document.createElement('img')
    const userName = document.createElement('span')
    const content = document.createElement('div')
    const contentPost = document.createElement('p')
    
    imgUser.src = elem.owner.avatarUrl
    userName.innerText = user
    contentPost.innerText = elem.post
    
    container.classList.add('post__others')
    headerContainet.classList.add('post__other__header')
    imgUser.classList.add('post__other__header__img')
    content.classList.add('post__other__content')

    headerContainet.append(imgUser, user)
    content.append(contentPost)
    container.append(headerContainet, content)

    localPost.append(container)
}

// FUNÇÃO DE CRIAÇÃO DOS ELEMENTOS - PRÓPRIO
function createItensUser(elem, user) {
    const container = document.createElement('div')
    const headerContainet = document.createElement('div')
    const imgUser = document.createElement('img')
    const userName = document.createElement('span')
    const content = document.createElement('div')
    const contentPost = document.createElement('p')
    const divButtons = document.createElement('div')
    const edit = document.createElement('img')
    const deletes = document.createElement('img')
    const postButton = document.createElement('div')
    const id = document.createElement('p')

    imgUser.src = elem.owner.avatarUrl
    userName.innerText = user
    contentPost.innerText = elem.post
    edit.src = '../img/edit.svg'
    edit.alt = elem.id
    deletes.src = '../img/delete.svg'
    deletes.alt = elem.id

    container.classList.add('post__others')
    headerContainet.classList.add('post__other__header')
    imgUser.classList.add('post__other__header__img')
    content.classList.add('post__other__content__user')
    divButtons.classList.add('buttons__trash__edit')
    postButton.classList.add('div__content_buttons')
    edit.classList.add('button__post__content')
    deletes.classList.add('button__post__content')
    edit.setAttribute('id', 'edit__post__user')
    deletes.setAttribute('id', 'delete__post__user')
    contentPost.setAttribute('id', `${elem.id}`)

    divButtons.append(edit, deletes)
    headerContainet.append(imgUser, user, id)
    content.append(contentPost)
    postButton.append(content, divButtons)
    container.append(headerContainet, postButton)
    localPost.append(container)
}

// RELATIVO AO POST DO CONTEÚDO DA PÁGINA
async function inputMyPost () {
    let obj = {}
    obj.content = conteudPost.value
    await Api.createPost(obj)
    await location.reload('/redirection.html')
}

// RELATIVO A MUDANÇA DE PÁGINA
function alteraPageBack () {
    let cont = 1;
    if(count.innerText > 1) {
        cont = count.innerText;
        cont -= 1
        count.innerText = cont
    } else {
        alert('Você já está na primeira página')
    }
    localPost.innerHTML= ''
    inputPost(cont)
}

async function alteraPageGo () {
    let cont = 1;
    cont = count.innerText;
    let res = parseInt(cont) + 1
    count.innerText = res
    localPost.innerHTML= ''
    inputPost(cont)
}

// FUNÇÃO QUE ALTERA O POST
const editPostUser = await document.getElementById('edit__post__user')
const mostraModal = document.getElementById('backGroud')
const contentChange = document.getElementById('content__to__change');
const newContent = await document.getElementById('content__to__change')
const changePatch = await document.getElementById('post__content__change')

editPostUser.addEventListener('click', alteraPost)
changePatch.addEventListener('click', inputalteration)

async function alteraPost() {
    mostraModal.style.display = 'Flex'
    const obj = await Api.getPost(editPostUser.alt)
    const objPost = obj.data.find(x => x.id == editPostUser.alt)
    contentChange.placeholder = objPost.post
    contentChange.value = objPost.post
}



async function inputalteration () {
    let obj = {}
    obj.newContent = await contentChange.value
    await Api.patchPost(editPostUser.alt, obj)
    await location.reload('/redirection.html')
}

// FUNÇÃO QUE DELETA O POST
const deletePostUser = await document.getElementById('delete__post__user') 
deletePostUser.addEventListener('click', deletePost)

async function deletePost() {
    await Api.deletePost(deletePostUser.alt)
    await location.reload('/redirection.html')
}

// FUNÇÃO LOGOUT
function logout () {
    localStorage.removeItem("Token")
    localStorage.removeItem("Id")
    window.location = "index.html"
}


