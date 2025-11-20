import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to convert hex tokenId to decimal
const hexToDecimal = (hex) => parseInt(hex, 16);

const fetchNFTsWithMetadata = async (contractAddress) => {
  const url = `${process.env.PROVIDER_ENDPOINT}/getNFTsForCollection/`;

  try {
    // Step 1: Fetch NFT token IDs
    const response = await axios.get(url, {
      params: {
        contractAddress,
        withMetadata: false, // Fetch only token IDs
        startToken: "0",    // Use pagination if needed
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    // Step 2: Fetch metadata for each token
    const nfts = await Promise.all(
      response.data.nfts.map(async (nft) => {
        const tokenIdHex = nft.id.tokenId;
        const tokenIdDecimal = hexToDecimal(tokenIdHex); // Convert hex to decimal

        // Fetch metadata for each token
        const metadataUrl = `${process.env.PROVIDER_ENDPOINT}/getNFTMetadata/?contractAddress=${contractAddress}&tokenId=${tokenIdDecimal}`;
        
        const metadataResponse = await axios.get(metadataUrl, {
          headers: {
            'Accept': 'application/json',
          },
        });

        const metadata = metadataResponse.data;

        return {
          id: tokenIdDecimal,
          name: metadata?.metadata?.name || `Token #${tokenIdDecimal}`, // Fallback to token number if no name
          traits: metadata?.metadata?.attributes || [], // Fetch traits from metadata
          image: metadata?.metadata?.image || null, // Fetch image from metadata
        };
      })
    );

    return nfts;
  } catch (error) {
    console.error(`Error fetching NFTs: ${error}`);
    return [];
  }
};

// Example usage
const contractAddress = process.env.OPENSEA_TOKEN; // Your contract address
fetchNFTsWithMetadata(contractAddress).then((nfts) => {
  console.log(nfts);
});
