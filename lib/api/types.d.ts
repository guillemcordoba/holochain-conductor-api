/// <reference types="node" />
export declare type AgentPubKey = {
    hash: Buffer;
    hash_type: Buffer;
};
export declare type AppId = string;
export declare type CapSecret = Buffer;
export declare type CellId = [Hash, AgentPubKey];
export declare type CellNick = string;
export declare type DnaProperties = any;
export declare type Hash = string;
export declare type InstalledApp = {
    app_id: AppId;
    cell_data: Array<InstalledCell>;
};
export declare type InstalledCell = [CellId, CellNick];
export declare type MembraneProof = Buffer;
export declare const fakeAgentPubKey: (x: any) => {
    hash: Buffer;
    hash_type: Buffer;
};
