/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/
'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const utils = require('./utils');
const {LONG_STEP, LONGEST_STEP} = utils.TIMEOUTS;

describe('Chaincode crosschaincode', () => {
    const suite = 'crosschaincode';
    const suite2 = 'crosschaincode2';

    before(async function () {
        this.timeout(LONG_STEP);

        await utils.installAndInstantiate(suite, 'org.mynamespace.crosschaincode:instantiate');
        await utils.installAndInstantiate(suite2, 'org.mynamespace.crosschaincode2:instantiate');
    });

    describe('Invoke', () => {

        it.only('should invoke chaincode', async function () {
            this.timeout(LONGEST_STEP);

            const payload = await utils.query(suite, 'org.mynamespace.crosschaincode:invokeChaincode', ['getKey', 'key1']);
            expect(JSON.parse(payload)).to.equal('crosschaincode2');
        });

        it.only('should throw an error when invoking chaincode', async function () {
            this.timeout(LONGEST_STEP);

            const payload = await utils.query(suite, 'org.mynamespace.crosschaincode:invokeChaincodeError', ['getKey']);
            expect(payload).to.match(/Incorrect no. of parameters/);
        });

    });

});
