import "../../styles/StarRating.css";
import { Star } from 'lucide-react';
import { useState } from 'react';

function StarRating({ value = 0, onChange, interactive = false }) {
  const [hovered, setHovered] = useState(null); // hovered pode ser null ou um valor tipo 2.5
  // Garante que value está entre 0 e 5, e só aceita .0 ou .5
  let rating = Math.max(0, Math.min(5, Math.round(value * 2) / 2));
  const displayRating = hovered !== null ? hovered : rating;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let fillType;
    if (displayRating >= i) {
      fillType = 'full';
    } else if (displayRating + 0.5 === i) {
      fillType = 'half';
    } else {
      fillType = 'empty';
    }
    stars.push(
      <span
        key={i}
        style={{ position: 'relative', display: 'inline-block', cursor: interactive ? 'pointer' : 'default', width: 28 }}
        onMouseMove={interactive ? (e) => {
          const { left, width } = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - left;
          if (x < width / 2) {
            setHovered(i - 0.5);
          } else {
            setHovered(i);
          }
        } : undefined}
        onMouseLeave={interactive ? () => setHovered(null) : undefined}
        onClick={interactive && onChange ? (e) => {
          const { left, width } = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - left;
          if (x < width / 2) {
            onChange(i - 0.5);
          } else {
            onChange(i);
          }
        } : undefined}
        data-testid={`star-${i}`}
      >
        {fillType === 'full' && (
          <Star fill="#FFD700" color="#FFD700" strokeWidth={1.5} />
        )}
        {fillType === 'half' && (
          <Star fill="url(#half-gradient)" color="#FFD700" stroke="#FFD700" strokeWidth={1.5}>
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </Star>
        )}
        {fillType === 'empty' && (
          <Star fill="none" color="#FFD700" strokeWidth={1.5} />
        )}
      </span>
    );
  }
  const displayValue = (hovered !== null ? hovered : value).toFixed(1);
  return <div style={{ display: 'flex', gap: 2 }}>{stars} <span className='star-value' style={{ minWidth: 28, textAlign: 'center', display: 'inline-block' }}>{displayValue}</span></div>;
}

export default StarRating;
