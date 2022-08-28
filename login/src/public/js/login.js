const form = document.getElementById('loginForm');

let theStatus = "";

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
        .then(json => theStatus = json)
        .finally(() => {
            if (theStatus.status === 'success') {
                let port = location.port;
                location.replace(`http://localhost:${port}/`)
            }
            else {
                let port = location.port;
                location.replace(`http://localhost:${port}/register`)
            }
        })
        .catch(err => console.log(err));


}) 
