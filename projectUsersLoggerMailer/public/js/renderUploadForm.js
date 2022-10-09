import renderRegisterForm from './renderRegisterForm.js'
import renderHome from './renderHome.js'
const renderLoginForm = () => {

    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('login').innerHTML = "";
    document.getElementById('register').innerHTML = "";
    document.getElementById('logout').innerHTML = "";
    document.getElementById('root').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };

    let hide = function (elem) {
        elem.style.display = 'none';
    };

    hide(homePage)

    const uploadFile = document.getElementById('root');
    const uploadForm = document.createElement('div');
    uploadForm.setAttribute('class', 'jumbotron');
    uploadForm.innerHTML = `<h1 style="color:darkblue;">>File Upload</h1>
    <br>
    <form action="/uploadfile" enctype="multipart/form-data" method="POST">
        <div class="m-2">
          <input type="file" name="thisFile" />
        </div>
        <button type="submit" class="btn btn-success mt-3 mb-5">Upload</button> 
    </form>
    </div>`

    uploadFile.appendChild(uploadForm);

    const form = document.getElementById('uploadForm');

    let theStatus = "";

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        let data = new FormData(form);
        let obj = {};
        data.forEach((value, key) => obj[key] = value);
        const uploadRoute = '/api/sessions/login'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        };

        fetch(loginRoute, requestOptions)
            .then(result => result.json())
            .then(json => theStatus = json)
            .finally(() => {
                if (theStatus.status === 'success') {
                    renderHome();
                }
                else {
                    renderRegisterForm();
                }
            })
            .catch(err => console.log(err))

    })

}

export default renderLoginForm;