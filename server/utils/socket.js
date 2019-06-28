const socketio = require('socket.io');

module.exports = function (server) {
    const io = socketio(server);

    var messages = [{ username: "server", message: "hello" }]; // {username: "", message: ""}
    var currentUsers = {};

    io.on('connection', (socket) => {
        socket.emit('get_all_messages', { messages: messages });

        socket.on('new_user', data => {
            let msgObj = {
                username: "server",
                message: `${data.username} has joined the server from ${socket.handshake.address}`
            };

            messages.push(msgObj);

            currentUsers[socket.id] = data.username;
            socket.broadcast.emit('receive_new_message', msgObj);
        });

        socket.on('send_new_message', data => {
            let newMsgObj = {
                username: data.username,
                message: data.message.substring(0, 255)
            };

            messages.push(newMsgObj);

            socket.broadcast.emit('receive_new_message', newMsgObj);
        });

        socket.on('disconnect', (data) => {
            if (currentUsers[socket.id]) {
                let newMsgObj = {
                    username: 'server',
                    message: `${currentUsers[socket.id]} has left the chat`
                };

                delete currentUsers[socket.id];

                messages.push(newMsgObj);

                io.emit('receive_new_message', newMsgObj);
            }
        });
    });
}