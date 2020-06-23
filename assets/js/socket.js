import { Socket } from 'phoenix';

let socket = new Socket('/socket', {params: {token: localStorage.getItem('token')}})
socket.connect();

let channel = socket.channel('group:1', {});
channel.join()
  .receive('ok', () => console.log('Joined successfully'))
  .receive('error', () => console.log('Unable to join'));

export {
  socket,
  channel
};
