import { Requester } from "./common";
import { CellId, CapSecret, AgentPubKey, AppId, InstalledApp } from "./types";
export declare type CallZomeRequestGeneric<Payload> = {
    cap: CapSecret;
    cell_id: CellId;
    zome_name: string;
    fn_name: string;
    payload: Payload;
    provenance: AgentPubKey;
};
export declare type CallZomeResponseGeneric<Payload> = Payload;
export declare type CallZomeRequest = CallZomeRequestGeneric<any>;
export declare type CallZomeResponse = CallZomeResponseGeneric<any>;
export declare type AppInfoRequest = {
    app_id: AppId;
};
export declare type AppInfoResponse = InstalledApp;
export interface AppApi {
    appInfo: Requester<AppInfoRequest, AppInfoResponse>;
    callZome: Requester<CallZomeRequest, CallZomeResponse>;
}
