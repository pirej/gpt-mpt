"use client";
import { Inter } from "@next/font/google";

import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const pingGpt = () => {
    // ------------
    const endpoint = "https://api.openai.com/v1/engines";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };

    axios
      .get(endpoint, { headers })
      .then((response) => {
        console.log("errrrrrrrrr", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // ------------
  };
  const handleClick = () => {
    pingGpt();
    console.log("clicked");
  };

  return (
    <div>
      <h2>Helooo</h2>
      <button onClick={() => handleClick()}>ClickME</button>
    </div>
  );
}
