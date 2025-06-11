import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
        background: "#252562", // cor mais escura
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        boxShadow: "0 2px 12px #a251fe44",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s",
      }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp color="#e4cfff" size={28} />
    </button>
  );
}