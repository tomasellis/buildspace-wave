import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import CONTRACT_ABI from "../public/utils/WavePortal.json";

const CONTRACT_ADDRESS = "0x496D3F45D82933568C0438E2ba2Cda11db69508F";

export default function Home() {
  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */

    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
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
      console.log("We have the ethereum object", ethereum);
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

  const wave = async () => {
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

        const waveTxn = await waveportalContract.wave();
        setMining(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        setMining(false);
        console.log("Mined -- ", waveTxn.hash);

        count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check wallet once when starting
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Save the account
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [mining, setMining] = useState(false);

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

      <main className={styles.main}>
        <div className={styles.centerPiece}>
          <div className={styles.banner}>
            Now talking in: トム's 🌊 ROOM N°1
          </div>
          <div className={styles.chatBox}>
            <div className={styles.messageContainer}>
              <span className={styles.chatDate} style={{ color: "grey" }}>
                [01.25.2155]
              </span>
              <span
                className={styles.chatMessage}
                style={{ backgroundColor: "red" }}
              >
                Jesus says, "Yoooooooo, its ya man, J-Boy in da
                houseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
              </span>
            </div>
            <div className={styles.messageContainer}>
              <span className={styles.chatDate} style={{ color: "grey" }}>
                [01.25.2221]
              </span>
              <span
                className={styles.chatMessage}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Jesus says, "Yoooooooo, its ya man, J-Boy in da house"
              </span>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <textarea
            className={styles.messageInput}
            placeholder={"Write your message here! You can send HTML too :D"}
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
            <button onClick={() => wave()}>
              Send that message, you got this 😎
            </button>
          )}
        </div>
      </main>

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
