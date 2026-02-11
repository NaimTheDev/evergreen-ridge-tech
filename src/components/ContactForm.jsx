'use client';
import React, { useState } from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import Button from "./Button";


const ContactForm = () => {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        "https://formkeep.com/f/0c6efb5c2fbb",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        acceptCharset="UTF-8"
        encType="multipart/form-data"
      >
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
          />
          <TextInput label="Message" name="message" />
        </div>

        {/* Honeypot spam protection */}
        <input
          type="text"
          name="_gotcha"
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />

        <Button type="submit" className="mt-10" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Let’s work together"}
        </Button>

        {status === "sent" && (
          <p className="mt-4 text-sm text-green-700">
            Thank you. Your message has been sent.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-700">
            Something went wrong. Please email contact@evergreenridgetech.com directly.
          </p>
        )}
      </form>
    </FadeIn>
  );
};

export default ContactForm;
