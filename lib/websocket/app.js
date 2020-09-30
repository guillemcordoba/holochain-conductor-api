/**
 * Defines AppWebsocket, an easy-to-use websocket implementation of the
 * Conductor API for apps
 *
 *    const client = AdminWebsocket.connect(
 *      'ws://localhost:9000',
 *      signal => console.log('got a signal:', signal)
 *    )
 *
 *    client.callZome({...})  // TODO: show what's in here
 *      .then(() => {
 *        console.log('DNA successfully installed')
 *      })
 *      .catch(err => {
 *        console.error('problem installing DNA:', err)
 *      })
 */
import msgpack from '@msgpack/msgpack';
import { WsClient } from './client';
import { catchError } from './common';
import { requesterTransformer } from '../api/common';
export class AppWebsocket {
    constructor(client) {
        this._requester = (tag, transformer) => requesterTransformer(req => this.client.request(req).then(catchError), tag, transformer);
        this.appInfo = this._requester('AppInfo');
        this.callZome = this._requester('ZomeCallInvocation', callZomeTransform);
        this.client = client;
    }
    static connect(url, signalCb) {
        return WsClient.connect(url, signalCb).then(client => new AppWebsocket(client));
    }
}
const callZomeTransform = {
    input: (req) => {
        req.payload = msgpack.encode(req.payload);
        return req;
    },
    output: (res) => {
        return msgpack.decode(res);
    }
};
//# sourceMappingURL=app.js.map