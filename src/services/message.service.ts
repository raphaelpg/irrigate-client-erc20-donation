import config from '../config/config';
import { IMessage } from '../interfaces/Message';

const sendMessage = async (newMessage: IMessage) => {
  return fetch(config.server.serverUrl + config.server.sendMessage, {
    method: 'POST',
    body: JSON.stringify(newMessage),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
}

export default {
  sendMessage
}