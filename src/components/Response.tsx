import React from "react";
import styles from "./Response.module.css";

interface ResponseProps {
  answer: string;
}

const Response = ({ answer }: ResponseProps) => {
  return (
    <div className={styles.response}>
      <h3>{answer}</h3>
    </div>
  );
};

export default Response;
