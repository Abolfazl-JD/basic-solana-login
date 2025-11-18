import { Injectable } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import * as nacl from 'tweetnacl';

@Injectable()
export class Web3Provider {
  constructor() {}

  async verifySolanaSignIn(
    address: string,
    signedMessage: any,
    nounce: any,
  ): Promise<any> {
    try {
      const publicKeyBytes = new PublicKey(address).toBytes();
      const encoder = new TextEncoder();
      const messageBytes = encoder.encode(nounce);
      const signedMessageBytes = new Uint8Array(
        Buffer.from(signedMessage, 'base64'),
      );
      const result = nacl.sign.detached.verify(
        messageBytes,
        signedMessageBytes,
        publicKeyBytes,
      );
      console.log('result', result);
      return result;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }
}
