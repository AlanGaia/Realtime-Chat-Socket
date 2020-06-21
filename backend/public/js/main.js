const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');


const socket = io();

//Output message to DOM
const outputMessage = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `
  <p class="meta">Mary <span>9:15pm</span></p>
  <p class="text">${msg}</p>`;

  chatMessages.appendChild(div);
};

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
