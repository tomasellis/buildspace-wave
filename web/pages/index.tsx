import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
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
                Jesus says, "Yoooooooo, its ya man, J-Boy in da house"
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
          <button>LETS GOOOOO</button>
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
