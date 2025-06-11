import { Instagram, Linkedin } from "lucide-react";
import "../../styles/Footer.css";

function Footer() {

  function returnPage(urls) {
    urls.map((url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
  return (
    <div className="footer">
      <div className="footer-icons">
        <Instagram
          onClick={() => {
            returnPage(["https://instagram.com"]);
          }}
        />
        <Linkedin />
        <img
          src="/discord-gray-icon-border.svg"
          alt="Discord"
          className="footer-discord-icon"
          onClick={() => {
            returnPage([
              "https://www.linkedin.com/in/maria-eduarda-de-pinho-braga-558057219/",
              "https://www.linkedin.com/in/arthur-ataide-ufv/",
              "https://www.linkedin.com/in/tarik-salles-paiva-977087269/",
            ]);
          }}
        />
      </div>
      <img className="footer-logo" src="/logo.png" alt="ByteScan" 
      onClick={() => {
            returnPage(["https://discord.com"]);
          }}/>
      <span className="cop">© 2025 ByteScan</span>
    </div>
  );
}

export default Footer;
