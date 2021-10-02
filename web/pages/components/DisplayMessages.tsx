import React from "react";
import styles from "../../styles/Home.module.css";

type WaveFront = {
  address: string;
  message: string;
  timestamp: Date;
};

const DisplayMessages = ({ waves }: { waves: WaveFront[] }) => {
  let messages = [];

  for (let i = 0; i < waves.length; i++) {
    const string = `${generateUsername(waves[i].address)} says: "${
      waves[i].message
    }"`;
    messages.push(
      <div key={i} className={styles.messageContainer}>
        <p className={styles.chatDate} style={{ color: "grey" }}>
          {waves[i].timestamp.toDateString()}
        </p>
        <p
          className={styles.chatMessage}
          style={{ backgroundColor: "lightgrey" }}
          dangerouslySetInnerHTML={{ __html: string }}
        ></p>
      </div>
    );
  }

  return messages.length > 0 ? (
    <div className={styles.chatBox}>{messages}</div>
  ) : (
    <span>No messages</span>
  );
};

export default DisplayMessages;

const generateUsername = (address: string) => {
  const firstHalf = address.slice(0, 6);
  const secondHalf = address.slice(-4);
  const fullUsername = "「" + firstHalf + "..." + secondHalf + "」";
  return fullUsername;
};
