const loginButton = document.querySelector('#login-button')
const form = document.querySelector('.form')

const usernameField = document.querySelector('#username')
const passwordField = document.querySelector('#password')
const commentField = document.querySelector('#comment')

const onlineStatus = document.querySelector('#online-status')
const loginSwitcher = document.querySelector('#login-switcher')

if (loginSwitcher !== null) {
    if (localStorage.getItem('loggedin') !== null) {
        onlineStatus.innerText = localStorage.getItem('loggedin') + ' is playing 🎮'
        loginSwitcher.innerText = 'Log off'
    }


    loginSwitcher.addEventListener('click', e => {
        if (localStorage.getItem('loggedin') !== null) {
            window.localStorage.removeItem('loggedin')
        }
    })
}

loginButton.addEventListener('click', e => {
    if (localStorage.getItem(usernameField.value) === passwordField.value) {
        console.log(localStorage.getItem(usernameField.value))
        commentField.innerText = 'Welcome, ' + usernameField.value
        window.localStorage.setItem('loggedin', usernameField.value)
    } else {
        commentField.innerText = 'Username or password are invalid!'
    }
});
