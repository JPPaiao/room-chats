const socket = io() 
const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get("username")
const room = urlSearch.get("name_room")
const textRomm = document.getElementById("room")
textRomm.innerText = `Sala - ${room}`

socket.emit("select_room", {
    username,
    room
}, messages => {
    messages.forEach(message => {
        createMessage(message)
    })
})

document.getElementById("message_input").addEventListener("keypress", e => {
    if (e.key === "Enter") {
        const message = e.target.value
        const data = {
            room,
            message,
            username
        }

        socket.emit("message", data)

        e.target.value = ""
    }
})

socket.on("message", data => {
    createMessage(data)
})

function createMessage(data) {
    const messageDiv = document.getElementById("message")
    
    messageDiv.innerHTML += `
        <div class="flex gap-2">
            <span class="font-bold">${data.username}</span>
            <span> - ${data.text}</span>
        </div>
        <div class="text-xs">${data.date}</div>
    `
}
