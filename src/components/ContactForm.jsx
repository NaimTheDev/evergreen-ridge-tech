'use client';
import React, { useState } from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import Button from "./Button";
import { sendEmail, EMAILJS_TEMPLATES } from "@/lib/emailjs";


const ContactForm = () => {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields. Pretend success and stop.
    if (data.get("_gotcha")) {
      form.reset();
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      await sendEmail(EMAILJS_TEMPLATES.contact, {
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        phone: data.get("phone"),
        message: data.get("message"),
      });

      form.reset();
      setStatus("sent");
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
