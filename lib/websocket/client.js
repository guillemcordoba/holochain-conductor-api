var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Websocket from 'isomorphic-ws';
import * as msgpack from '@msgpack/msgpack';
import { nanoid } from 'nanoid';
/**
 * A Websocket client which can make requests and receive responses,
 * as well as send and receive signals
 *
 * Uses Holochain's websocket WireMessage for communication.
 */
export class WsClient {
    constructor(socket) {
        this.socket = socket;
        this.pendingRequests = {};
        // TODO: allow adding signal handlers later
    }
    emitSignal(data) {
        const encoded = msgpack.encode({
            type: 'Signal',
            data: msgpack.encode(data),
        });
        this.socket.send(encoded);
    }
    request(data) {
        const id = nanoid();
        const encodedMsg = msgpack.encode({
            id,
            type: 'Request',
            data: msgpack.encode(data),
        });
        const promise = new Promise((fulfill) => {
            this.pendingRequests[id] = { fulfill };
        });
        this.socket.send(encodedMsg);
        return promise;
    }
    close() {
        this.socket.close();
        return this.awaitClose();
    }
    awaitClose() {
        return new Promise(resolve => this.socket.on('close', resolve));
    }
    static connect(url, signalCb) {
        return new Promise((resolve, reject) => {
            const socket = new Websocket(url);
            socket.onopen = () => {
                const hw = new WsClient(socket);
                socket.onmessage = (encodedMsg) => __awaiter(this, void 0, void 0, function* () {
                    console.log(encodedMsg.data);
                    let data = encodedMsg.data;
                    // If data is not a buffer, it will be a blob
                    if (!Buffer || !Buffer.isBuffer(data)) {
                        data = yield data.arrayBuffer();
                    }
                    const msg = msgpack.decode(data);
                    if (signalCb && msg.type === 'Signal') {
                        signalCb(msgpack.decode(msg.data));
                    }
                    else if (msg.type === 'Response') {
                        const id = msg.id;
                        if (hw.pendingRequests[id]) {
                            // resolve response
                            hw.pendingRequests[id].fulfill(msgpack.decode(msg.data));
                        }
                        else {
                            console.error(`Got response with no matching request. id=${id}`);
                        }
                    }
                    else {
                        console.error(`Got unrecognized Websocket message type: ${msg.type}`);
                    }
                });
                resolve(hw);
            };
        });
    }
}
//# sourceMappingURL=client.js.map