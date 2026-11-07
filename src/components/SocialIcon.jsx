import { Dribbble, Github, Globe, Instagram, Linkedin, Youtube } from "lucide-react";

const ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram, youtube: Youtube, dribbble: Dribbble };

export default function SocialIcon({ name, size = 18 }) {
  const Icon = ICONS[name] || Globe;
  return <Icon size={size} aria-hidden="true" />;
}
