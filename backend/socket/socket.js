const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  return io; // ✅ MUST return io
};

module.exports = initSocket;



// const socketIo = require("socket.io");
// const { setSocket } = require("../controllers/jobController");

// const initSocket = (server) => {
//   const io = socketIo(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   setSocket(io);

//   io.on("connection", (socket) => {
//     console.log("User connected");
//   });
// };

// module.exports = initSocket;
