"use client";
import { Inter } from "@next/font/google";

import axios from "axios";
import { useState } from "react";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const pingGpt = () => {
    // ------------
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": question }],
      temperature: 0.7,
    };

    axios
      .post(endpoint, data, { headers })
      .then((response) => {
        setAnswer(response.data.choices[0].message.content);
      })
      .catch((error) => {
        console.log(error);
      });

    // ------------
  };
  const handleClick = () => {
    pingGpt();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      pingGpt();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>GPT MPT</h2>
      <div className={styles.topSection}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={question}
        ></input>
        <h5
          className={styles.close}
          onClick={() => [setQuestion(""), setAnswer("")]}
        >
          X
        </h5>
      </div>
      <br></br>
      {answer && <h2>{answer}</h2>}
    </div>
  );
}
