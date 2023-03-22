import React from "react";
import styles from "./Response.module.css";

// interface ResponseProps {
//   answer: string;
// }

const Response = ({ item }: any) => {
  // console.log("item e:");

  return (
    <div className={styles.response}>
      <div className={styles.you}>
        <h3>You: {item.sesionQuestion}</h3>
      </div>
      <div className={styles.gpt}>
        <h3>GPT: {item.sesionAnswer}</h3>
      </div>
    </div>
  );
};

export default Response;
