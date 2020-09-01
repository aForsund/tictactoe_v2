const newGameInput = document.querySelector('#newGame');
const startGameInput = document.querySelector('#startGame');
const registerForm = document.querySelector('#form');


const input = document.getElementById('#form');
const username = document.getElementById('username');
const password = document.getElementById('password');

registerForm.addEventListener('submit', e => {

    //e.preventDefault();
    console.log(username.value, password.value);
});

const registerUser = async (username, password) => {
    

}
const checkInputs = () => {
    let error = true;
    const usernameValue = username.value;
    const passwordValue = password.value;
}
