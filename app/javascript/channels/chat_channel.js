import consumer from "./consumer"

const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    window.receiveData(data);
  }
});

if (!window.receiveData)
  window.receiveData = (data) => {};

window.sendChatMessage = ({body, name}) => {
  const now = new Date();
  chatChannel.send({created_at: now, body, name});
  return now;
}
