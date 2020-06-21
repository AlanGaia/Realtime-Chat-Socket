const chatForm = document.getElementById("chat-form");

const socket = io();

//Output message to DOM
const outputMessage = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
  <p class="meta">Mary <span>9:15pm</span></p>
  <p class="text">${msg}</p>`;
  document.querySelector('.chat-messages').appendChild(div);


};

//message from server
socket.on("message", (message) => {
  outputMessage(message);
});

//message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);
});
