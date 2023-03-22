import React from "react";
import styles from "./Response.module.css";

// interface ResponseProps {
//   answer: string;
// }

const Response = ({ item }: any) => {
  // console.log("item e:");

  return (
    <div className={styles.response}>
      <h3>You: {item.sesionQuestion}</h3>
      <h3>GPT: {item.sesionAnswer}</h3>
    </div>
  );
};

export default Response;
