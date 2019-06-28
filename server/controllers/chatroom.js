const socketio = require('socket.io');

class ChatRoom {
    // newUser = (data) => {
    //     let msgObj = {
    //         username: "server",
    //         message: `${data.username} has joined the server from ${socket.handshake.address}`
    //     };

    //     messages.push(msgObj);

    //     currentUsers[socket.id] = data.username;
    //     console.log(`new user: ${socket.id}`);
    //     console.log(currentUsers);

    //     socket.broadcast.emit('receive_new_message', msgObj);
    // }
}
module.exports = new ChatRoom();




