const users = [];

// Join user to chat
const userJoin = (id, username, room) => {
  const user = {id, username, room};

  users.push(user);

  return user;
}
//get the current user
const getCurrentUser = (id) => {
  return users.find(user => user.id === id);
}
//user leaves chat
const userLeave = (id) => {
  const index = users.findIndex(user => user.id === id)
  //if match splice 1 user in index and return user 
  if (index !== -1){
    return users.splice(index, 1)[0];
  }
}
//get room users
const getRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};