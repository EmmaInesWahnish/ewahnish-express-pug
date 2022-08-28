const socket = io();

let messages = document.getElementById('messages')
let form = document.getElementById('form');
let productForm = document.getElementById('productForm')
let input = document.getElementById('input');
let email = document.getElementById('email');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addMessage();
    if (input.value) {
        socket.emit('chat message', message);
        input.value = '';
        email.value = 'c@m';
    }
});

productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addProduct();
    if (title.value) {
        socket.emit('new product', message)
        title.value = '';
        price.value = '';
        thumbnail.value = '';
    }
});

socket.on('chat message', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('new user', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('old messages', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('new product', (msg) => {
    console.log(msg)
    renderProduct(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

function addMessage(e) {
    let today = new Date();
    let author ={
        email: document.getElementById("email").value,
        nombre: document.getElementById("name").value,
        apellido: document.getElementById("last_name").value,
        edad: document.getElementById("age").value,
        alias: document.getElementById("nickname").value,
        avatar: document.getElementById("avatar").value
    }

    let message = {
        timestamp: today,
        author: author,
        text: document.getElementById("input").value,
    };
    return message
}

function addProduct(e) {
    let message = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    return message
}

  function renderMessage(data) {
    let theDateTime = (data.timestamp).toString();
    const where = document.createElement('div')
    where.innerHTML = `<b>${data.author.email}</b>
                        <span id="theDate">${theDateTime}</span> 
                        <span id="name">${data.author.alias}</span> 
                        <i>${data.text}</i>
                        <img class="avatar" src="${data.author.avatar}"/>
                    <div>`;
    messages.appendChild(where);
  }

  function signOut(){
    
    const loginRoute = '/api/sessions/logout'

    fetch(loginRoute)
        .then(result => result.json())
        .then(json => theStatus = json)
        .finally(() => {
            if (theStatus.status === 'success') {
                let port = location.port;
                location.replace(`http://localhost:${port}/`)
            }
        })
        .catch(err => console.log(err));
  }

  function renderProduct(data) {
    document.getElementById('noHay').innerText ="";
    const productTable = document.getElementById('products')
    const where = document.createElement('tr')
    where.innerHTML = `<td>
                        ${data.id}
                    </td>
                    <td> 
                        ${data.title}
                    </td>
                    <td>
                        ${data.price}
                    </td> 
                    <td>
                        <img class="product_picture" src="${data.thumbnail}" >
                    </td>
                <tr>`;
    productTable.appendChild(where);
  }  