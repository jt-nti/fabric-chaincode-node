/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {State} from './State';

import {ChaincodeStub, ChaincodeSupportClient} from 'fabric-shim-api';

/**
 * A Ledger has one public Collection, the world state.
 */
export enum CollectionNames {
    WORLDSTATE = ''
}

/**
 * Holds a set of States on the Ledger.
 *
 * @memberof module:fabric-ledger
 */
export class Collection {

    private readonly _collectionName: string;

    private readonly _channelId: string;
    private readonly _handler: ChaincodeSupportClient;
    private readonly _txId: string;

    public constructor (stub: ChaincodeStub, name: string) {
        this._collectionName = name;
        this._handler = stub.getHandler();
        this._channelId = stub.getChannelID();
        this._txId = stub.getTxID();
    }

    /**
	 * Returns the state of the specified <code>key</code> from the state collection.
     *
     * @async
     * @param {string} key the name of the key to read from state collection
     * @returns {Promise<State>} Promise for the current state from state collection
     */
    public async getState(key: string): Promise<State> {
        const value: Uint8Array = await this._handler.handleGetState(this._collectionName, key, this._channelId, this._txId);

        return new State(key, value);
    }

    /**
     *
	 * Deletes the state of the specified <code>key</code> from the state collection.
	 * @async
	 * @param {string} key the name of the key to delete from the state collection
	 * @returns {Promise} Promise will be resolved when the peer has successfully handled the state delete request
	 * or rejected if any errors
	 */
    public async deleteState(key: string): Promise<void> {
        await this._handler.handleDeleteState(this._collectionName, key, this._channelId, this._txId);
    }
}
