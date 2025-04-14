import { clusterApiUrl, Connection } from '@solana/web3.js';

export const SOLANA_NETWORK = 'devnet';
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);
export const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');

export const NETWORK_CONFIG = {
  'mainnet-beta': {
    name: 'Mainnet Beta',
    url: clusterApiUrl('mainnet-beta'),
    explorer: 'https://explorer.solana.com',
  },
  devnet: {
    name: 'Devnet',
    url: clusterApiUrl('devnet'),
    explorer: 'https://explorer.solana.com/?cluster=devnet',
  },
  testnet: {
    name: 'Testnet',
    url: clusterApiUrl('testnet'),
    explorer: 'https://explorer.solana.com/?cluster=testnet',
  },
}; 