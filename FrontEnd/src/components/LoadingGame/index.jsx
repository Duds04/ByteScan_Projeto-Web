import { useState, useEffect, useRef } from "react";
import "../../styles/LoadingGame.css";

// Jogo simples: clique para pegar o quadrado
export default function LoadingGame({ loading = true }) {
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [time, setTime] = useState(15); // segundos
  const intervalRef = useRef();
  const [loaderText, setLoaderText] = useState("Carregando.");

  useEffect(() => {
    setScore(0);
    setTime(15);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Loader text animation
  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderText((prev) => {
        if (prev === "Carregando.") return "Carregando..";
        if (prev === "Carregando..") return "Carregando...";
        return "Carregando.";
      });
    }, 600);
    return () => clearInterval(loaderInterval);
  }, []);

  function moveSquare() {
    setPos({
      x: Math.random() * 80 + 5,
      y: Math.random() * 80 + 5,
    });
    setScore((s) => s + 1);
  }

  function restartGame() {
    setScore(0);
    setTime(15);
    setPos({ x: 50, y: 50 });
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  return (
    <div className="loading-game-overlay">
      <div className="loading-game-center">
        <div className={`loading-game-modal${!loading ? ' loading-game-modal-compact' : ''}`}>
          {loading && (
            <div className="loader-container">
              <div className="loader" />
              <div className="loader-text">{loaderText}</div>
            </div>
          )}
          <div className="loading-game-container">
            <span className="loading-game-title">Mini Jogo: Clique no quadrado!</span>
            <div className="loading-game-header">
              <span>Pontuação: {score}</span>
              <span>Tempo: {time}s</span>
            </div>
            <div className="loading-game-area">
              {time > 0 ? (
                <div
                  className="loading-square"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={moveSquare}
                />
              ) : (
                <div className="loading-game-over">
                  Game-Over! <br />Sua pontuação: {score}
                  <button className="restart-btn" onClick={restartGame}>Reiniciar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
