import { Socket } from 'phoenix';

export default function initSocket() {
  let socket = new Socket('/socket', {params: {token: localStorage.getItem('token')}})
  socket.connect()
  
  let id = 1;
  let channel = socket.channel('group:' + id, {});
  
  channel.join()
    .receive('ok', resp => console.log('Join sucessfully group: ' + id, resp))
    .receive('error', resp => console.log('Unable to join', resp));
}
