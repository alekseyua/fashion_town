import BaseApiForSocket from './BaseApiForSocket';

class SocketApi extends BaseApiForSocket {
  constructor(BASE_URI_FOR_SOCKET) {
    super(BASE_URI_FOR_SOCKET);
  }

  init = (hash_id = '', api) => {
    this.init(true, BASE_URI_FOR_SOCKET, api, hash_id);
  };

  addEvent = (eventName, callback) => {
    this.on(eventName, callback);
  };

  removeEvent = (eventName) => {
      this.removeEventSocket(eventName)
  }

  emitData = (event = 'connect', data, key) => {
    this.emit(event, data, key);
  };
}

export default SocketApi;
//! дефолтные события тут что б не забыть их
// startSceneVLS = (hash_id = '') => {
//     this.on('open', this.onOpen);
//     this.on('connect', this.onConnect);
//     this.on('disconnect', this.onDisconnect);
//     this.on('error', this.onError);
//   };
