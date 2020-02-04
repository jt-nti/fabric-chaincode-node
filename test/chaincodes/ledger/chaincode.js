/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/
'use strict';

const {Contract} = require('fabric-contract-api');
const {Ledger} = require('fabric-ledger');

class LedgerTestContract extends Contract {

    constructor() {
        super('org.example.ledger');
        this.logBuffer = {output: []};
    }

    async instantiate(ctx) {
        const stub = ctx.stub;

        await stub.putState('string', Buffer.from('string'));
        const names = ['ann', 'beth', 'cory'];
        const colors = ['black', 'red', 'yellow'];
        for (const n in names) {
            for (const c in colors) {
                const compositeKey = stub.createCompositeKey('name~color', [names[n], colors[c]]);
                await stub.putState(compositeKey, names[n] + colors[c]);
            }
        }
        for (let i = 0; i < 5; i++) {
            await stub.putState(`key${i}`, Buffer.from(`value${i}`));
            await stub.putState(`jsonkey${i}`, Buffer.from(JSON.stringify({value: `value${i}`})));
        }
    }

    async getLedger(ctx) {
        const ledger = Ledger.getLedger(ctx);

        return ledger?'success':'fail';
    }

    async getKey(ctx) {
        const {params} = ctx.stub.getFunctionAndParameters();
        const key = params[0];
        console.log('KEY: ' + key);

        const ledger = await Ledger.getLedger(ctx);
        const collection = await ledger.getDefaultCollection();
        const state = await collection.getState(key);

        console.log('BORK: ' + state.getKey());

        const value = state.getValue().toString();
        console.log('VALUE: ' + value);

        return value;
    }
}
module.exports = LedgerTestContract;
