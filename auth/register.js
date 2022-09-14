const form = {
    username: '',
    name: '',
    password: '',
    roles: ['user']
}

const errorMessage = document.getElementsByClassName('error')[0]

function changeValue(event) {
    form[event.target.name] = event.target.value
}

async function register(event) {
    event.preventDefault()

    const response = await fetch('https://azam-app-tj-js.herokuapp.com/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    if (data?.access_token) {
        localStorage.setItem('access_token', JSON.stringify(data.access_token))
        window.location.href = '../index.html'
    }

    if (data?.message) {
        errorMessage.innerHTML = data.message
        setTimeout(() => errorMessage.innerHTML = '', 2000)
    }
}