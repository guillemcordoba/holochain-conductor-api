import { Requester } from "./common";
import { AgentPubKey, MembraneProof, DnaProperties, AppId, CellId, CellNick, InstalledApp } from "./types";
export declare type ActivateAppRequest = {
    app_id: AppId;
};
export declare type ActivateAppResponse = null;
export declare type AttachAppInterfaceRequest = {
    port: number;
};
export declare type AttachAppInterfaceResponse = {
    port: number;
};
export declare type DeactivateAppRequest = {
    app_id: AppId;
};
export declare type DeactivateAppResponse = null;
export declare type DumpStateRequest = {
    cell_id: CellId;
};
export declare type DumpStateResponse = any;
export declare type GenerateAgentPubKeyRequest = void;
export declare type GenerateAgentPubKeyResponse = AgentPubKey;
export declare type InstallAppRequest = {
    app_id: AppId;
    agent_key: AgentPubKey;
    dnas: Array<InstallAppDnaPayload>;
};
export declare type InstallAppResponse = InstalledApp;
export declare type ListDnasRequest = void;
export declare type ListDnasResponse = Array<string>;
export interface AdminApi {
    activateApp: Requester<ActivateAppRequest, ActivateAppResponse>;
    attachAppInterface: Requester<AttachAppInterfaceRequest, AttachAppInterfaceResponse>;
    deactivateApp: Requester<DeactivateAppRequest, DeactivateAppResponse>;
    dumpState: Requester<DumpStateRequest, DumpStateResponse>;
    generateAgentPubKey: Requester<GenerateAgentPubKeyRequest, GenerateAgentPubKeyResponse>;
    installApp: Requester<InstallAppRequest, InstallAppResponse>;
    listDnas: Requester<ListDnasRequest, ListDnasResponse>;
}
declare type InstallAppDnaPayload = {
    path: string;
    nick: CellNick;
    properties?: DnaProperties;
    membrane_proof?: MembraneProof;
};
export {};
