import "../../styles/StarRating.css";
import { Star } from 'lucide-react';

function StarRating({ value = 0 }) {
  // Garante que value está entre 0 e 5, e só aceita .0 ou .5
  let rating = Math.max(0, Math.min(5, Math.round(value * 2) / 2));
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Estrela cheia
      stars.push(
        <Star key={i} fill="#FFD700" color="#FFD700" strokeWidth={1.5} />
      );
    } else if (rating + 0.5 === i) {
      // Meia estrela
      stars.push(
        <Star key={i} fill="url(#half-gradient)" color="#FFD700" stroke="#FFD700" strokeWidth={1.5}>
          <defs>
        <linearGradient id="half-gradient">
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
        </linearGradient>
          </defs>
        </Star>
      );
    } else {
      // Estrela com apenas a borda
      stars.push(
        <Star key={i} fill="none" color="#FFD700" strokeWidth={1.5} />
      );
    }
  }
  return <div style={{ display: 'flex', gap: 2 }}>{stars} <span className='star-value'>{value}</span></div>;
}

export default StarRating;
