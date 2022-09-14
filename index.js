const accessToken = JSON.parse(localStorage.getItem('access_token'))
let urlImage = ''

if (!accessToken) {
    window.location.href = './auth/login.html'
}

function logOut() {
    localStorage.removeItem('access_token')
}

window.onload = async function getProfile() {
    const respose = await fetch('https://azam-app-tj-js.herokuapp.com/profile', {
        headers: { Authorization: "Bearer " + accessToken }
    })

    const data = await respose.json()

    if (data?.username) {
        document.getElementsByClassName('user-name')[0].innerHTML = data?.name
        document.getElementsByClassName('user-email')[0].innerHTML = data?.username
    }

    if (data?.image && await isImg(data?.image)) {
        urlImage = "/" + data.image
        document.getElementsByClassName('img')[0].src = "https://azam-app-tj-js.herokuapp.com/" + data.image
    }
}

async function isImg(url) {
    try {
        await fetch("https://azam-app-tj-js.herokuapp.com/" + url)
        return true
    } catch (e) {
        return false
    }
}

async function uploadImage(event) {
    const files = event.target.files
    const formData = new FormData()
    formData.append('image', files[0])
    const response = await fetch("https://azam-app-tj-js.herokuapp.com/image" + urlImage, {
        method: urlImage ? 'PUT' : 'POST',
        headers: { Authorization: "Bearer " + accessToken },
        body: formData,
        redirect: 'follow'
    })

    const image = await response.text()

    if (image) {
        document.getElementsByClassName('img')[0].src = "https://azam-app-tj-js.herokuapp.com/" + image
        updateUser(image)
    }
}

async function updateUser(image) {
    await fetch('https://azam-app-tj-js.herokuapp.com/auth/update/user', {
        method: 'PUT',
        body: JSON.stringify({ image }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + accessToken
        }
    })
}