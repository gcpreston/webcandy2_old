let Group = {
  init(socket, setColor) {
    let channel = socket.channel('group:1', {});
    channel.join();
    
    channel.on('shout', (payload) => {
      setColor(payload.color.rgb);
    });
  }
}

export default Group;
