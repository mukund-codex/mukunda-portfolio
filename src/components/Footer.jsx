import { ArrowUp } from "lucide-react";
import { labels } from "../config/site.js";
import { brandName, socialLinks } from "../lib/derived.js";
import SocialIcon from "./SocialIcon.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">
          © {new Date().getFullYear()} {brandName}
        </p>
        {socialLinks.length > 0 && (
          <ul className="site-footer__socials">
            {socialLinks.map((link) => (
              <li key={link.key}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <SocialIcon name={link.key} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <a href="#top" className="site-footer__top">
          {labels.backToTop} <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
