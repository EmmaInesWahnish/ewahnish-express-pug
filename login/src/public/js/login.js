const form = document.getElementById('loginForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("In register >>>> ", obj)
    const loginRoute = '/api/sessions/login'

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    };

    fetch(loginRoute, requestOptions)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}) 
