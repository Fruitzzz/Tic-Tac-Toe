const users = []

const addUser = ({ id, name, room, tags }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = users.find((user) => user.room === room && user.name === name)

  if(!name || !room) return { error: 'Username and room are required.' }
  if(existingUser) return { error: 'Username is taken.' }
  const user = {
    id,
    name,
    room,
    symbol: '✕',
    turn: '✕',
    field: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    tags
  }

  users.push(user);
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if(index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => users.find((user) => user.id === id)

module.exports = { addUser, removeUser, getUser, users}