import NftList from "./NftList";
import Scaffold from "./Scaffold";
import { HttpProvider, Web3 } from "web3";
import abi from "./abi/sarsa.json";
import { useState } from "react";

export default function Home2() {
    const [connectedAccount, setConnectedAccount] = useState(null);

    const provider = new HttpProvider(
        "https://sepolia.infura.io/v3/d6d31fd77d604b18a171665fc35d45d6"
    );
    const web3 = new Web3(window.ethereum);

    const contractAddress = "0x4B9E83Fa8f5C5C4402F49F2AbBBD61DDBA75c9b7";

    const defaultNftData = [
        {
            tokenId: 1,
            name: "Botson",
            imageUrl:
                "https://ipfs.io/ipfs/QmaG3Bqcy8mu1QwPmnp8gMEoN2N9fN99e2UGFKPgg7JLPv",
            brain: "https://www.google.com",
            description: "A bot that can do anything it sets it mind to",
            price: 100,
            training: 0,
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

    const [nftData, setNftData] = useState(defaultNftData);
    const miner = null;

    const mintRobot = async () => {
        console.log("Minting a new robot");

        const contract = new web3.eth.Contract(abi, contractAddress);
        contract.setProvider(provider);
        const symbol = await contract.methods.symbol().call();
        console.log(symbol);

        const x = await contract.methods.x().call();
        console.log(x);

        await mintNFT(contract, "image-uri", "brain-uri");
    };

    async function mintNFT(contract, imageURI, brainURI) {
        try {
            const transaction = contract.methods.createBot(imageURI, brainURI);
            const value = web3.utils.toWei("0.01", "ether");
            const options = {
                from: connectedAccount,
                value: value,
            };

            const receipt = await transaction.send(options);
            console.log("Transaction receipt:", receipt);
        } catch (error) {
            console.error("Error minting NFT:", error);
        }
    }

    async function connectMetamask() {
        //check metamask is installed
        if (window.ethereum) {
            // instantiate Web3 with the injected provider
            const web3 = new Web3(window.ethereum);

            //request user to connect accounts (Metamask will prompt)
            await window.ethereum.request({ method: "eth_requestAccounts" });

            //get the connected accounts
            const accounts = await web3.eth.getAccounts();

            //show the first connected account in the react page
            setConnectedAccount(accounts[0]);
        } else {
            alert("Please download metamask");
        }
    }

    function onTrain() {
        setNftData([
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
        ]);
    }

    return (
        <Scaffold>
            {!connectedAccount && (
                <button
                    type="button"
                    className="m-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => connectMetamask()}
                >
                    Connect to Metamask
                </button>
            )}

            {connectedAccount && <h2>{connectedAccount}</h2>}
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={mintRobot}
            >
                Mint a new Robot
            </button>
            <NftList
                nftData={nftData}
                onTrain={onTrain}
                mineLink={nftData[0].training === 0 ? "/mine1" : "/mine2"}
            />
        </Scaffold>
    );
}
