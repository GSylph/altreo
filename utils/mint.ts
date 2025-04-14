import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

// Initialize Metaplex with your configuration
const connection = new Connection(clusterApiUrl('devnet'));

export const mintNFT = async (metadata: {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
}) => {
  try {
    const wallet = useWallet();
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

    // Upload metadata to Arweave
    const { uri } = await metaplex.nfts().uploadMetadata({
      ...metadata,
      seller_fee_basis_points: 0,
      properties: {
        files: [
          {
            uri: metadata.image,
            type: 'image/png',
          },
        ],
      },
    });

    // Create NFT using metadata
    const { nft } = await metaplex.nfts().create({
      uri,
      name: metadata.name,
      sellerFeeBasisPoints: 0,
      symbol: metadata.symbol,
    });

    return nft;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}; 