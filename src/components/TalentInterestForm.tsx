"use client";

import { useState } from "react";

export default function TalentInterestForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim();
    if (!email) return;
    try {
      const res = await fetch("/api/talent-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data?.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
      <form id="talentInterestForm" className="space-y-4" aria-describedby="talent-success" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" id="email" name="email" required placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" className="w-full rounded-lg bg-blue-600 text-white font-semibold py-2.5 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Notify Me First</button>
        <p id="talent-success" aria-live="polite" className={`text-sm h-5 ${status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-500"}`}>
          {status === "ok" ? "Thanks – we'll be in touch." : status === "error" ? "Something went wrong. Try again later." : ""}
        </p>
        <p className="text-xs text-gray-500">We only email when roles open. No spam.</p>
      </form>
    </div>
  );
}
