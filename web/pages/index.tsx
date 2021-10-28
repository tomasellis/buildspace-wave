import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import CONTRACT_ABI from "../public/utils/WavePortal.json";
import DisplayMessages from "./components/DisplayMessages";

const CONTRACT_ADDRESS = "0x1d5Db19b55fc464d1fD7D49f597b0DD251E92d0f";
const OLD_CONTRACT_ADDRESS = "0x496D3F45D82933568C0438E2ba2Cda11db69508F"; // this one has 4 waves, never forgetti

export default function Home() {
  const checkIfWalletIsConnected = async () => {
    // @ts-ignore
    const { ethereum } = window;

    if (ethereum) {
      console.log("Make sure you have metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        console.log("ACCOUNTS", accounts);
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

      return;
    } else {
      window.alert("Please install Metamask to get the full experience");
    }
  };

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      const firstHalf = accounts[0].slice(0, 6);
      const secondHalf = accounts[0].slice(-4);
      const fullUsername = "「" + firstHalf + "..." + secondHalf + "」";
      setCurrentUser(fullUsername);

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async (message: string) => {
    try {
      // @ts-ignore
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI.abi,
          signer
        );

        let count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await waveportalContract.wave(message);
        setMining(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        setMining(false);
        console.log("Mined -- ", waveTxn.hash);
        await getAllWaves();

        count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWaves = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI.abi,
          signer
        );

        // Get all the waves
        const waves: Wave[] = await waveportalContract.getAllWaves();
        console.log("GetAllWaves waves", waves);
        let wavesCleaned: WaveFront[] = [];

        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist! - GetAllWaves");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoWithoutMetamask = async () => {
    try {
      const infuraProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_INFURA_URL
      );

      const waveportalContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI.abi,
        infuraProvider
      );

      // Get all the waves
      const waves: Wave[] = await waveportalContract.getAllWaves();
      let wavesCleaned: WaveFront[] = [];

      waves.forEach((wave) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });

      setAllWaves(wavesCleaned);
    } catch (err) {
      console.log("Infura info", err);
    }
  };
  // Check wallet once when starting
  useEffect(() => {
    checkIfWalletIsConnected();
    getInfoWithoutMetamask();
  }, []);

  // Save the account
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [mining, setMining] = useState(false);
  const [allWaves, setAllWaves] = useState<WaveFront[] | []>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  return (
    <div className={styles.container}>
      <Head>
        <title>トムの🌊</title>
        <meta
          name="description"
          content="A site displaying whatever I meant by waves"
        />
        <link rel="icon" href="/waveIcon.ico" />
      </Head>

      <div className={styles.main}>
        <div className={styles.centerPiece}>
          <div className={styles.banner}>
            Now talking in: トム's 🌊 ROOM N°1
          </div>
          <DisplayMessages waves={allWaves} />
        </div>
        <div className={styles.message}>
          <textarea
            className={styles.messageInput}
            placeholder={"Write your message here! You can send HTML too :D"}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
          ></textarea>
          {currentAccount === "" ? (
            <button onClick={() => connectWallet()}>
              Connect your wallet with Metamask!
            </button>
          ) : mining === true ? (
            <Image
              src="/assets/vibingcat.gif"
              width="100px"
              height="100px"
            ></Image>
          ) : (
            <button onClick={() => wave(userMessage)}>
              Send that message, you got this 😎
            </button>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://www.youtube.com/watch?v=2kJBJYEJPVg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b className={styles.code}>Live, laugh, build</b>
        </a>
      </footer>
    </div>
  );
}

type Wave = {
  waver: string;
  message: string;
  timestamp: any;
};

type WaveFront = {
  address: string;
  message: string;
  timestamp: Date;
};
