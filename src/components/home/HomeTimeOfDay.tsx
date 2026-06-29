"use client";

import { useEffect, useState } from "react";

export default function HomeTimeOfDay() {
  const [message, setMessage] = useState("Good morning, Trilogy Sunset");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 18) {
      setMessage("Good afternoon, Trilogy Sunset");
    } else if (hour >= 18 || hour < 5) {
      setMessage("Good evening, Trilogy Sunset");
    }
  }, []);

  return <p className="time-of-day">{message}</p>;
}
