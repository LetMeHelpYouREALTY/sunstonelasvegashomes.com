"use client";

import { useEffect } from "react";

export function HomeTimeGreeting() {
  useEffect(() => {
    const el = document.getElementById("timeOfDay");
    if (!el) return;
    const hour = new Date().getHours();
    let msg = "Good morning, Trilogy Sunset";
    if (hour >= 12 && hour < 18) msg = "Good afternoon, Trilogy Sunset";
    else if (hour >= 18 || hour < 5) msg = "Good evening, Trilogy Sunset";
    el.textContent = msg;
    sessionStorage.setItem("backUrl", "/");
  }, []);

  return (
    <p className="mb-2 text-xl opacity-85" id="timeOfDay">
      Good morning, Trilogy Sunset
    </p>
  );
}
