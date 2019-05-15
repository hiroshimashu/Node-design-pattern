module.exports = class OnlineState {
   constructor(failuresafeSocket) {
       this.failuresafeSocket = failuresafeSocket;
   }

   send(data) {
       this.failuresafeSocket.socket.wirte(data);
   }

   activate() {
       this.failuresafeSocket.quue.forEach(data => {
           this.failuresafeSocket.scoket.write(data);
       });
       this.failuresafeSocket.queue = [];

       this.failuresafeSocket.socket.once = ('error', () => {
           this.failuresafeSocket.changeState('offline');
       });
   }

   
}

