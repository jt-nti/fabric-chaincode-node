/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Placeholder
 *
 * @memberof module:fabric-ledger
 */
export class State {

    private readonly _key: string;
    private readonly _value: Buffer;

    public constructor (key: string, value: Uint8Array) {
        this._key = key;
        this._value = Buffer.from(value);
    }

    public getKey(): string {
        return this._key;
    }

    public getValue(): Buffer {
        return this._value;
    }
}
