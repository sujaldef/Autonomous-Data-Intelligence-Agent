import { useEffect, useRef } from "react";

export default function WaveField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(152,70,95,0.6)";
      ctx.lineWidth = 1;

      const centerX = width * 0.75;
      const centerY = height * 0.5;

      for (let i = 0; i < 80; i++) {
        ctx.beginPath();

        for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
          const radius =
            80 +
            i * 6 +
            Math.sin(angle * 3 + t + i * 0.2) * 8;

          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.stroke();
      }

      t += 0.02;
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}