import { Socket } from 'socket.io';

export const handleRepartidorSockets = (socket: Socket, io) => {
  socket.on('location', async ({ latitude, longitude }) => {
    console.log(`Ubicación recibida de user ${socket.data.user.id}`, latitude, longitude);
    // await saveLocation(socket.data.user.id, latitude, longitude);

    // reenviar a todos los observadores
    io.emit('repartidor-location', {
      userId: socket.data.user.id,
      latitude,
      longitude
    });
  });
};