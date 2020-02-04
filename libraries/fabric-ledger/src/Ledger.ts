/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {Collection, CollectionNames} from './Collection';

import {Context} from 'fabric-contract-api';
import {ChaincodeStub} from 'fabric-shim-api';

/**
 * Entrypoint for the Ledger API.
 *
 * @memberof module:fabric-ledger
 */
export class Ledger {

    private readonly _stub: ChaincodeStub;

    private constructor (ctx: Context) {
        this._stub = ctx.stub;
    }

    /**
     * Get a Ledger instance which represents the current ledger state.
     *
     * @param {Context} ctx The transaction context
     * @returns {Promise<Ledger>} A new Ledger instance
     */
    public static async getLedger (ctx: Context): Promise<Ledger> {
        return new Ledger(ctx);
    }

    /**
     * Get a Collection instance for the named collection.
     *
     * @param {string} collectionName The name of the collection
     * @returns {Promise<Collection>} A new Collection instance
     */
    public async getCollection (collectionName: string): Promise<Collection> {
        return new Collection(this._stub, collectionName);
    }

    /**
     * Get a Collection instance representing the default world state.
     *
     * @returns {Promise<Collection>} A new Collection instance
     */
    public async getDefaultCollection (): Promise<Collection> {
        return this.getCollection(CollectionNames.WORLDSTATE);
    }
}
