import { useState } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { labels, site } from "../config/site.js";
import { brandName, has, sectionNumber, socialLinks, whatsappLink } from "../lib/derived.js";
import { Reveal } from "../lib/motion.jsx";
import Magnetic from "./Magnetic.jsx";
import SocialIcon from "./SocialIcon.jsx";

const { contact, preferences } = site;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Static-site form: validates, then hands the message to the visitor's email app. */
function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => setValues({ ...values, [field]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Please write at least a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      event.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field = (name, label, props = {}) => {
    const Tag = props.as || "input";
    const { as, ...rest } = props;
    return (
      <div className={`field${errors[name] ? " has-error" : ""}`}>
        <label htmlFor={`f-${name}`}>{label}</label>
        <Tag
          id={`f-${name}`}
          name={name}
          value={values[name]}
          onChange={update(name)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `f-${name}-error` : undefined}
          {...rest}
        />
        {errors[name] && (
          <p id={`f-${name}-error`} className="field__error">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {field("name", labels.name, { type: "text", autoComplete: "name" })}
      {field("email", labels.email, { type: "email", autoComplete: "email" })}
      {field("message", labels.message, { as: "textarea", rows: 5 })}
      <button type="submit" className="btn btn--accent">
        {labels.send} <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <p className="contact-form__note">{labels.formNote}</p>
    </form>
  );
}

export default function Contact() {
  const wa = whatsappLink(`Hi ${brandName}, I found your portfolio and would like to talk about a project.`);
  const showForm = preferences.showContactForm && has(contact.email);

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("contact")}</p>
          <h2 id="contact-title" className="section-title section-title--xl">
            {labels.contactHeading}
            <span className="accent">.</span>
          </h2>
        </Reveal>

        <div className={`contact__layout${showForm ? "" : " contact__layout--single"}`}>
          <Reveal className="contact__info">
            <p className="contact__text">{labels.contactText}</p>
            {has(contact.email) && (
              <Magnetic strength={0.15}>
                <a className="contact__email" href={`mailto:${contact.email}`}>
                  <Mail size={22} aria-hidden="true" /> {contact.email}
                </a>
              </Magnetic>
            )}
            {wa && (
              <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            )}
            {socialLinks.length > 0 && (
              <ul className="socials" aria-label="Social profiles">
                {socialLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <SocialIcon name={link.key} /> <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          {showForm && (
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
