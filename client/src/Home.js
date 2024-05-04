import NftList from "./NftList";
import Scaffold from "./Scaffold";

export default function Home() {
    const nftData = [
        {
            tokenId: 1,
            name: "Botson",
            imageUrl:
                "https://ipfs.io/ipfs/QmaG3Bqcy8mu1QwPmnp8gMEoN2N9fN99e2UGFKPgg7JLPv",
            brain: "https://www.google.com",
            description: "A bot that can do anything it sets it mind to",
            price: 100,
            training: 100,
        },
        {
            tokenId: 2,
            name: "Machina",
            imageUrl:
                "https://ipfs.io/ipfs/QmVCYBq5Sasjp99MD6YMKp7xJwSxpxXjTCf85ekKaReFng",
            brain: "https://www.google.com",
            description: "An upgraded bot",
            price: 100,
            training: 500,
        },
        {
            tokenId: 3,
            name: "Beast",
            imageUrl:
                "https://ipfs.io/ipfs/QmSjfLd4h7PzJQ9RARUpr4z5918qZ4ziK9RFUnNGLefsR1",
            brain: "https://www.google.com",
            description: "A battle hardened bot",
            price: 100,
            training: 1000,
        },
    ];

    const miner = null;

    return (
        <Scaffold>
            <NftList nftData={nftData} />
        </Scaffold>
    );
}
