const socket = io('http://localhost:3000')
const form = document.getElementById('form')
const container = document.getElementById('container')
const input = document.getElementById('input')

const name = prompt('Enter your name')
displayMessage('You Joined')
socket.emit('new-user', name)

socket.on('message', data => {
    displayMessage(`${data.name}: ${data.message}`)
})

socket.on('user-joined', name => {
    displayMessage(`${name} joined`)
})

socket.on('user-left', name => {
    displayMessage(`${name} left`)
})

form.addEventListener('submit',e => {
    e.preventDefault()
    const message = input.value
    displayMessage(`You: ${message}`)
    socket.emit('send-message', message)
    input.value = ''
})

function displayMessage(message) {
    const divElement = document.createElement('div')
    divElement.innerText = message
    container.appendChild(divElement)
}