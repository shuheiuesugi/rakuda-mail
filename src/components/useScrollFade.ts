"use client";
import { useEffect } from "react";

export function useScrollFade() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .fade-in-scale"
    );
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
