const server = require('http').createServer();
const io = require('socket.io')(server);

var rooms = {
  111:{
    state:null,
    users:0
  }
};

const PORT = 3001;

// Search for available rooms
function getRoomId(){
  var roomId ;
  for(let i=1; ;i++){
    if(!rooms.hasOwnProperty(i)){
      roomId = i;
      break;
    }
  }
  return roomId;
}

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('create room',(state)=>{
    let roomNo = getRoomId();
    console.log('room '+roomNo+' created')
    socket.join(roomNo);
    socket.emit('room created',roomNo);

    // Assign randomly if user will be black or white 
    let user = Math.floor(Math.random() * 2)+1;
    console.log('colour assigned: '+user);
    rooms[roomNo] = {
      state,
      user1:(user===1)?true:false,
      user2:(user===2)?true:false 
    }
    socket.emit('user',user,rooms[roomNo].state);  
  });

  socket.on('send roomId',(roomId)=>{    
    if(roomId in rooms){
      console.log(roomId+' room present');
      socket.join(roomId);
      if(rooms[roomId].user1 && rooms[roomId].user2){
        // If both users are already connected, disconnect the socket
        console.log('room full'); //***MAKE USER FRIENDLY */
        socket.disconnect(true);
      }
      let user = (rooms[roomId].user1)?2:1;
      rooms[roomId] = {
        ...rooms[roomId],
        user1:true,
        user2:true
      }; 
      socket.emit('user',user,rooms[roomId].state);
      io.to(roomId).emit('second joined'); 
    }
    else{
      // When a room with this ID is not created 
      socket.disconnect(true);
    }
  });

  // When some move is made
  socket.on('move made',(state)=>{
    // Send all players belonging to same room the new state of the game
    let room = Object.keys(socket.rooms);
    console.log('Move made in room '+room[0]);
    io.to(room[0]).emit('board changed',state);  
  });

  socket.on('disconnect', (state) => {
    console.log(state);
    console.log('user disconnected');
  });
});  

server.listen(PORT, () => {
  console.log('listening on :' + PORT);
});
