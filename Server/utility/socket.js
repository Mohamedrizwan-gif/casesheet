let io;

module.exports = {
    init: (httpServer) => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: 'http://localhost:3000',
                credential: true
            }
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('socket.io is not initialized');
        }
        return io;
    }
};