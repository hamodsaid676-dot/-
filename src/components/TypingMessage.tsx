import { useState, useEffect } from 'react';

export default function TypingMessage({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText(''); // Reset on text change
    
    // Chunk size: types 4 characters at a time for highly responsive, fast and elegant streaming appearance
    const chunkSize = 4;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + chunkSize));
        i += chunkSize;
      } else {
        setDisplayedText(text); // Ensure exactly matches final text
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
}
