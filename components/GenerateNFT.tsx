import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { mintNFT } from '../utils/mint';
import { toast } from 'react-hot-toast';

interface GenerateNFTProps {
  challengeId: string;
  challengeName: string;
  difficulty: string;
}

export const GenerateNFT: FC<GenerateNFTProps> = ({
  challengeId,
  challengeName,
  difficulty,
}) => {
  const { publicKey, connected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleMintNFT = async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    try {
      const metadata = {
        name: `${challengeName} Completion Badge`,
        symbol: 'ALTREO',
        description: `Awarded for completing the ${challengeName} challenge`,
        image: `/challenges/${challengeId}.png`,
        attributes: [
          {
            trait_type: 'Challenge',
            value: challengeName,
          },
          {
            trait_type: 'Difficulty',
            value: difficulty,
          },
        ],
      };

      const tx = await mintNFT(metadata);
      toast.success('NFT minted successfully! 🎉');
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold text-white">
        🏆 Challenge Completed!
      </h3>
      {!connected ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-300">Connect your wallet to claim your NFT</p>
          <WalletMultiButton />
        </div>
      ) : (
        <button
          onClick={handleMintNFT}
          disabled={isLoading}
          className={`px-6 py-2 text-white rounded-lg transition-all ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90'
          }`}
        >
          {isLoading ? 'Minting...' : 'Generate NFT'}
        </button>
      )}
    </div>
  );
}; 