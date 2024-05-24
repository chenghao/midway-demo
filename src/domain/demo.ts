/**
 * This file is auto-generated by grpc-helper
 */

/* eslint-disable @typescript-eslint/no-namespace */

import * as grpc from "@midwayjs/grpc";

/* package protocol start */
export namespace protocol {
    export interface DemoService {
        get(data: DemoGetRequest): Promise<DemoGetResponse>;
        create(data: DemoCreateRequest): Promise<DemoCreateResponse>;
    }
    /**
     * DemoService client interface
     */
    export interface DemoServiceClient {
        get(options?: grpc.IClientOptions): grpc.IClientUnaryService<DemoGetRequest, DemoGetResponse>;
        create(options?: grpc.IClientOptions): grpc.IClientUnaryService<DemoCreateRequest, DemoCreateResponse>;
    }
    export interface DemoGetRequest {
        id?: number;
    }
    export interface DemoGetResponse {
        id?: number;
        name?: string;
        gender?: number;
    }
    export interface DemoCreateRequest {
        name?: string;
        gender?: number;
    }
    export interface DemoCreateResponse {
        id?: number;
    }
}
/* package protocol end */
