import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Image from "next/image";
import Response from "@/components/Response";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentInput, setCurrentInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [session, setSession] = useState({
    sesionQuestion: "",
    sesionAnswer: "",
  });
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pingGpt = () => {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": inputRef.current!.value }],
      temperature: 0.7,
    };

    axios
      .post(endpoint, data, { headers })
      .then((response) => {
        setAnswer(response.data.choices[0].message.content);
        setSession((prevState) => ({
          ...prevState,
          sesionAnswer: response.data.choices[0].message.content,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (inputRef.current!.value.length > 0) {
      setQuestion(inputRef.current!.value);
      setCurrentInput("");
      pingGpt();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && inputRef.current!.value.length > 0) {
      setQuestion(inputRef.current!.value);
      setCurrentInput("");
      pingGpt();
    }
  };

  useEffect(() => {
    if (question.length > 0) {
      setSession((prevState) => ({
        ...prevState,
        sesionQuestion: question,
      }));
    }
  }, [question]);

  useEffect(() => {
    if (answer.length > 0) {
      setSession((prevState) => ({
        ...prevState,
        sesionAnswer: answer,
      }));
    }
  }, [answer]);

  useEffect(() => {
    if (session.sesionQuestion.length > 0 && session.sesionAnswer.length > 0) {
      setSessions([...sessions, session]);
      setSession({ sesionQuestion: "", sesionAnswer: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const messagesDiv = messagesRef.current;
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  });

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
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              marginTop: "5rem",
            }}
          >
            GPT MPT
          </h2>
          <div ref={messagesRef} className={styles.dialogWrapper}>
            {sessions?.map((item, idx) => {
              return <Response key={idx} item={item} />;
            })}
          </div>
          <div className={styles.topSection}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              onChange={() => setCurrentInput(inputRef.current!.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={currentInput}
            ></input>
            <div className={styles.btnWrap}>
              <button className={styles.send} onClick={handleSubmit}>
                <Image
                  width={30}
                  height={30}
                  src="/send.png"
                  alt="clear"
                ></Image>
              </button>
              <button
                className={styles.close}
                onClick={() => [
                  setCurrentInput(""),
                  setSession({ sesionQuestion: "", sesionAnswer: "" }),
                  setSessions([]),
                  setAnswer(""),
                  setQuestion(""),
                ]}
              >
                <Image
                  width={30}
                  height={30}
                  src="/delete.png"
                  alt="clear"
                ></Image>
              </button>
            </div>
          </div>
          <br></br>
        </div>
      </main>
    </>
  );
}
