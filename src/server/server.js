const server = require('http').createServer();
const io = require('socket.io')(server);

/*
  users code
  0 - no user present
  1 - only white present
  2 - bothw white and black present
  3 - only black present
*/
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
  for(i=1; ;i++){
    if(!rooms.hasOwnProperty(i)){
      roomId = i;
      break;
    }
  }
  return roomId;
}

io.on('connection', (socket) => {
  console.log('a user connected');
  // console.log(roomNo);
  socket.on('create room',(state)=>{
    var roomNo = getRoomId();
    console.log(roomNo)
    socket.join(roomNo);
    socket.emit('room created',roomNo);
    rooms[roomNo] = {
      state,
      user1:true,
      user2:false 
    }
    socket.emit('user',1,rooms[roomNo].state);  
    // roomNo+=1;
  });

  socket.on('send roomId',(roomId)=>{    
    if(roomId in rooms){
      console.log(roomId+' room present');
      socket.join(roomId);
      rooms[roomId] = {...rooms[roomId],user2:true}; 
      socket.emit('user',2,rooms[roomId].state);
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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});  

server.listen(PORT, () => {
  console.log('listening on :' + PORT);
});
