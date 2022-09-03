const form = document.getElementById('registerForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();

    let data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("In register >>>> ", obj)
    const registerRoute = '/api/sessions/register'

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    };

    fetch(registerRoute, requestOptions)
        .then(result => result.json())
        .then(json => console.log(json))
        .finally(() => {
            let port = location.port;
            location.replace(`http://localhost:${port}/`)
        })
        .catch(err => console.log(err));
}) 