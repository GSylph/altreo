import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, MINT_SIZE, createInitializeMintInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

export interface MintNFTAccounts {
  mint: PublicKey;
  tokenAccount: PublicKey;
  mintAuthority: PublicKey;
  rent: PublicKey;
}

export const ID = new PublicKey('YOUR_PROGRAM_ID');

export class MintNFT {
  program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  async mintNFT(
    mintKeypair: anchor.web3.Keypair,
    payer: PublicKey,
    metadata: string,
  ): Promise<string> {
    const tokenAccount = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      payer
    );

    const accounts: MintNFTAccounts = {
      mint: mintKeypair.publicKey,
      tokenAccount,
      mintAuthority: payer,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    };

    const tx = await this.program.methods
      .mintNft(metadata)
      .accounts({
        ...accounts,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([mintKeypair])
      .rpc();

    return tx;
  }
} 