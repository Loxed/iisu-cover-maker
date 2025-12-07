import { useEffect, useRef } from 'react';

const DotGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const time = (elapsed / 20) % 1; // 20 second cycle

      const { width, height } = canvas;
      const targetDots = 128;
      const spacing = width / targetDots;
      const dotRadius = spacing * 0.1;
      const offset = spacing * 0.5;

      ctx.fillStyle = 'hsl(0, 0%, 92%)';
      ctx.fillRect(0, 0, width, height);

      for (let x = offset; x < width; x += spacing) {
        for (let y = offset; y < height; y += spacing) {
          const wave = Math.sin((x + y) * 0.002 + time * 2 * Math.PI);
          const opacity = wave * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ display: 'block' }}
    />
  );
};

export default DotGridBackground;
