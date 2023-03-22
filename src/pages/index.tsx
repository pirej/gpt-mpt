import { useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentInput, setCurrentInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [session, setSession] = useState({
    question: "",
    answer: "",
  });

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
        const newAnswer: string = response.data.choices[0].message.content;
        setAnswers([...answers, newAnswer]);
      })
      .catch((error) => {
        console.log(error);
      });

    // ------------
  };

  console.log("answers se:", answers);
  console.log("questions se:", questions);

  const handleSubmit = (e: any) => {
    setQuestion(e.target.value);
    setQuestions([...questions, e.target.value]);
    setCurrentInput("");
    pingGpt();
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setQuestion(e.target.value);
      setQuestions([...questions, e.target.value]);
      setCurrentInput("");
      pingGpt();
    }
  };

  return (
    <>
      <Head>
        <title>GPT MPT..</title>
        <meta name="description" content="Created by me and you." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>GPT MPT</h2>
          <div className={styles.topSection}>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={currentInput}
            ></input>
            <div className={styles.btnWrap}>
              <button className={styles.send} onClick={(e) => handleSubmit(e)}>
                submit
              </button>
              <button
                className={styles.close}
                onClick={() => [
                  setQuestion(""),
                  setQuestions([]),
                  setAnswer(""),
                  setAnswers([]),
                  setCurrentInput(""),
                ]}
              >
                clear all
              </button>
            </div>
          </div>
          <br></br>
          {answer && (
            <div className={styles.response}>
              <h3>{answer}</h3>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
