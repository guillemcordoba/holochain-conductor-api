/**
 * Defines AdminWebsocket, an easy-to-use websocket implementation of the
 * Conductor Admin API
 *
 *    const client = AdminWebsocket.connect(
 *      'ws://localhost:9000',
 *      signal => console.log('got a signal:', signal)
 *    )
 *
 *    client.generateAgentPubKey()
 *      .then(agentPubKey => {
 *        console.log('Agent successfully generated:', agentPubKey)
 *      })
 *      .catch(err => {
 *        console.error('problem generating agent:', err)
 *      })
 */
import { WsClient } from './client';
import { catchError } from './common';
import { requesterTransformer } from '../api/common';
export class AdminWebsocket {
    constructor(client) {
        this._requester = (tag, transformer) => requesterTransformer(req => this.client.request(req).then(catchError), tag, transformer);
        // the specific request/response types come from the Interface
        // which this class implements
        this.activateApp = this._requester('ActivateApp');
        this.attachAppInterface = this._requester('AttachAppInterface');
        this.deactivateApp = this._requester('DeactivateApp');
        this.dumpState = this._requester('DumpState', dumpStateTransform);
        this.generateAgentPubKey = this._requester('GenerateAgentPubKey');
        this.installApp = this._requester('InstallApp');
        this.listDnas = this._requester('ListDnas');
        this.client = client;
    }
    static connect(url, signalCb) {
        return WsClient.connect(url, signalCb).then(client => new AdminWebsocket(client));
    }
}
const dumpStateTransform = {
    input: (req) => req,
    output: (res) => {
        return JSON.parse(res);
    }
};
//# sourceMappingURL=admin.js.map