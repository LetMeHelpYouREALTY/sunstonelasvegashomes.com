"use client";

import { useEffect } from "react";

export function HomeTimeGreeting() {
  useEffect(() => {
    const el = document.getElementById("timeOfDay");
    if (!el) return;
    const hour = new Date().getHours();
    let msg = "Good morning, Sunstone home shoppers";
    if (hour >= 12 && hour < 18) msg = "Good afternoon, Sunstone home shoppers";
    else if (hour >= 18 || hour < 5) msg = "Good evening, Sunstone home shoppers";
    el.textContent = msg;
    sessionStorage.setItem("backUrl", "/");
  }, []);

  return (
    <p className="mb-2 text-xl opacity-85" id="timeOfDay">
      Good morning, Sunstone home shoppers
    </p>
  );
}
