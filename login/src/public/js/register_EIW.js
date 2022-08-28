const form = document.getElementById('registerForm');

form.addEventListener('submit', evt => {
        evt.preventDefault();
        const femail = document.getElementById('email');
        const fpassword = document.getElementById('password');
        const ffirst_name = document.getElementById('first_name');
        const flast_name = document.getElementById('last_name');
        const fage = document.getElementById('age');
    
        const email = femail.value;
        const password = fpassword.value;
        const first_name = ffirst_name.value;
        const last_name = flast_name.value;
        const age = fage.value;
    
        const user = {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            age: age
        };
    
        fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(result => result.json())
            .then(json => console.log(json));    
})