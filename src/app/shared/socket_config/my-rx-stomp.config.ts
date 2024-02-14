import { RxStompConfig } from '@stomp/rx-stomp';
import { environment } from 'src/environments/environment';

export const myRxStompConfig: RxStompConfig = {

  // Which server?
  brokerURL: environment.WEBSOCKET_CONNECTION_URL,

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {},

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,

  // Wait in milliseconds before attempting auto reconnect
  reconnectDelay: 5000,

};
