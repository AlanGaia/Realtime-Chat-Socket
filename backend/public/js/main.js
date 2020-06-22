const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


//GET USERNAME and Room from Query string 
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

const socket = io();

// Join chatroom
socket.emit('joinRoom', {username, room});

//Get room and Users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
})


//Output message to DOM
const outputMessage = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `
  <p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`;

  chatMessages.appendChild(div);
};

// Add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room;
}

// Add users to DOM
const outputUsers = (users) => {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}
//message from server
socket.on("message", (message) => {
  outputMessage(message);

  //Scroll Down Chat Message - Show the last One
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);

  //Clear Text Input after submit message
  e.target.elements.msg.value = ''; 
  e.target.elements.msg.focus();
});
