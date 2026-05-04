import { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let scrollY = 0;

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ─── Color palette ───────────────────────────────────────
    const C = {
      accent: '#00d4ff',
      purple: '#7c3aed',
      green:  '#10b981',
      amber:  '#f59e0b',
      text:   '#94a3b8',
    };

    // ─── Floating code lines (bg left) ───────────────────────
    const CODE_SNIPPETS = [
      { text: '@RestController',              color: C.purple },
      { text: '@GetMapping("/api/users")',     color: C.accent },
      { text: 'return userService.findAll()',  color: C.green  },
      { text: '@PostMapping("/api/data")',     color: C.accent },
      { text: '.map(r -> new DTO(r))',         color: C.green  },
      { text: 'SELECT * FROM users',           color: C.amber  },
      { text: 'WHERE active = true',           color: C.amber  },
      { text: 'ResponseEntity.ok(result)',     color: C.green  },
      { text: 'axios.get("/api/health")',      color: C.accent },
      { text: 'useEffect(() => {',             color: C.purple },
      { text: "fetch('/api/projects')",        color: C.accent },
      { text: '.then(r => r.json())',          color: C.green  },
      { text: 'const [data, setData] = useState([])', color: '#e2e8f0' },
      { text: '@SpringBootApplication',        color: C.purple },
    ];

    const floatLines = CODE_SNIPPETS.map((l, i) => ({
      ...l,
      x: 40 + Math.random() * 340,
      baseY: 60 + i * 52 + Math.random() * 20,
      opacity: 0.10 + Math.random() * 0.14,
      speed: 0.14 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      size: 10 + Math.random() * 2,
    }));

    // ─── API packets ─────────────────────────────────────────
    const LABELS_OUT = ['GET /api', 'POST /users', 'PUT /data', 'GET /health', 'DELETE /cache'];
    const LABELS_IN  = ['200 OK', '201 Created', '{ data: [...] }', '{ status:"ok" }'];

    class Packet {
      constructor() { this.alive = false; this.respawn(true); }

      respawn(random) {
        this.alive = true;
        this.returning = false;
        this.progress = random ? Math.random() : 0;
        this.speed = 0.004 + Math.random() * 0.004;
        this.col = [C.accent, C.purple, C.green][Math.floor(Math.random() * 3)];
        this.size = 3 + Math.random() * 2;
        this.label = LABELS_OUT[Math.floor(Math.random() * LABELS_OUT.length)];
        this.showLabel = Math.random() > 0.3;
        this.waitFrames = 0;
        this._setSrc();
      }

      _setSrc() {
        const W = canvas.width, H = canvas.height;
        // src = laptop screen area, dst = server area
        this.sx = W * 0.42 + 100 + Math.random() * 20;
        this.sy = H * 0.50 - 20 + Math.random() * 60;
        this.dx = W * 0.82 - 20 + Math.random() * 20;
        this.dy = H * 0.45 - 30 + Math.random() * 60;
      }

      update() {
        if (this.waitFrames > 0) { this.waitFrames--; return; }
        this.progress += this.speed;
        if (this.progress >= 1) {
          if (!this.returning) {
            this.returning = true;
            this.progress = 0;
            this.waitFrames = 10 + Math.floor(Math.random() * 30);
            [this.sx, this.dx] = [this.dx, this.sx];
            [this.sy, this.dy] = [this.dy, this.sy];
            this.col = C.green;
            this.label = LABELS_IN[Math.floor(Math.random() * LABELS_IN.length)];
          } else {
            this.respawn(false);
          }
        }
      }

      draw(ctx) {
        if (this.waitFrames > 0) return;
        const t = ease(this.progress);
        const cpx = (this.sx + this.dx) / 2;
        const cpy = Math.min(this.sy, this.dy) - 55;
        const px = (1-t)*(1-t)*this.sx + 2*(1-t)*t*cpx + t*t*this.dx;
        const py = (1-t)*(1-t)*this.sy + 2*(1-t)*t*cpy + t*t*this.dy;

        // Faded trail
        const t0 = ease(Math.max(0, this.progress - 0.12));
        const px0 = (1-t0)*(1-t0)*this.sx + 2*(1-t0)*t0*cpx + t0*t0*this.dx;
        const py0 = (1-t0)*(1-t0)*this.sy + 2*(1-t0)*t0*cpy + t0*t0*this.dy;
        const grad = ctx.createLinearGradient(px0, py0, px, py);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, this.col + 'aa');
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Dot
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = this.col;
        ctx.shadowColor = this.col;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        if (this.showLabel && this.progress > 0.08 && this.progress < 0.88) {
          ctx.globalAlpha = 0.65;
          ctx.fillStyle = this.col;
          ctx.font = '9px monospace';
          ctx.fillText(this.label, px + 7, py - 4);
        }
        ctx.restore();
      }
    }

    function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    const packets = Array.from({ length: 12 }, () => new Packet());

    // ─── Terminal lines ───────────────────────────────────────
    const TERM_LINES = [
      { text: '$ mvn spring-boot:run',           color: C.accent },
      { text: 'Started in 2.4s on port 8080',    color: C.green  },
      { text: 'GET /api/users       200  12ms',   color: C.green  },
      { text: 'POST /api/data       201   8ms',   color: C.green  },
      { text: 'DB pool: 5/10 active',             color: C.amber  },
      { text: 'GET /api/health      200   2ms',   color: C.green  },
      { text: 'DELETE /cache        204   5ms',   color: C.accent },
      { text: '⚡ Heap: 245MB / 512MB',            color: C.text   },
    ];
    let termTick = 0;

    // ─── Screen code lines ────────────────────────────────────
    const SCREEN_LINES = [
      { text: '@GetMapping("/api")',      color: C.accent  },
      { text: 'public List<User>',        color: '#e2e8f0' },
      { text: '  getAll() {',             color: '#e2e8f0' },
      { text: '  return service',         color: C.green   },
      { text: '    .findAll();',          color: C.green   },
      { text: '}',                        color: '#e2e8f0' },
    ];

    // ─── Draw helpers ─────────────────────────────────────────
    function rr(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
      ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
      ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
      ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
      ctx.closePath();
    }

    function drawGrid(ctx, W, H, t) {
      ctx.save();
      ctx.strokeStyle = 'rgba(0,212,255,0.035)';
      ctx.lineWidth = 1;
      const sp = 60;
      const offY = (t * 10) % sp;
      for (let y = -sp + offY; y < H + sp; y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      for (let x = 0; x < W; x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      ctx.restore();
    }

    function drawLaptop(ctx, cx, cy, t) {
      const W = 290, H = 185;
      const lx = cx - W/2, ly = cy - H/2;

      // Screen glow
      ctx.save();
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 200);
      g.addColorStop(0, 'rgba(0,212,255,0.07)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, 200, 0, Math.PI*2); ctx.fill();

      // Screen frame
      ctx.fillStyle = 'rgba(6,13,24,0.97)';
      ctx.strokeStyle = 'rgba(0,212,255,0.4)';
      ctx.lineWidth = 1.5;
      rr(ctx, lx, ly, W, H, 8); ctx.fill(); ctx.stroke();

      // Display area
      ctx.fillStyle = '#020408';
      rr(ctx, lx+8, ly+8, W-16, H-26, 4); ctx.fill();

      // Code on screen with typing effect
      ctx.font = '9px monospace';
      SCREEN_LINES.forEach((line, i) => {
        const phase = (t * 0.5 - i * 0.4);
        const chars  = Math.min(line.text.length, Math.max(0, Math.floor(phase * 10)));
        const alpha  = 0.35 + Math.abs(Math.sin(t * 0.35 + i * 0.6)) * 0.5;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = line.color;
        ctx.fillText(line.text.slice(0, chars), lx+16, ly+22 + i*15);

        // Cursor blink on active line
        const active = i === Math.floor(t * 0.28) % SCREEN_LINES.length;
        if (active) {
          ctx.globalAlpha = Math.sin(t * 5) > 0 ? 0.85 : 0;
          ctx.fillStyle = C.accent;
          const tw = ctx.measureText(line.text.slice(0, chars)).width;
          ctx.fillRect(lx+16+tw, ly+13+i*15, 1.5, 10);
        }
      });
      ctx.globalAlpha = 1;

      // Webcam dot
      ctx.fillStyle = 'rgba(0,212,255,0.45)';
      ctx.beginPath(); ctx.arc(cx, ly+5, 2.5, 0, Math.PI*2); ctx.fill();

      // Keyboard base
      ctx.fillStyle = 'rgba(10,22,40,0.97)';
      ctx.strokeStyle = 'rgba(0,212,255,0.18)';
      ctx.lineWidth = 1;
      rr(ctx, lx-22, ly+H, W+44, 16, 4); ctx.fill(); ctx.stroke();

      // Keys
      ctx.fillStyle = 'rgba(0,212,255,0.06)';
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 13; col++) {
          rr(ctx, lx-15 + col*21, ly+H+3 + row*5.5, 19, 4, 1); ctx.fill();
        }
      }

      // Touchpad
      ctx.strokeStyle = 'rgba(0,212,255,0.1)';
      rr(ctx, cx-32, ly+H+3, 64, 10, 2); ctx.stroke();

      ctx.restore();
    }

    function drawServer(ctx, x, y, frame) {
      const sw = 62, sh = 110;
      ctx.save();

      // Glow
      const g = ctx.createRadialGradient(x, y, 5, x, y, 80);
      g.addColorStop(0, 'rgba(124,58,237,0.12)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, 80, 0, Math.PI*2); ctx.fill();

      // Body
      ctx.fillStyle = 'rgba(6,13,24,0.96)';
      ctx.strokeStyle = 'rgba(124,58,237,0.45)';
      ctx.lineWidth = 1.5;
      rr(ctx, x-sw/2, y-sh/2, sw, sh, 5); ctx.fill(); ctx.stroke();

      // Slots
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = 'rgba(124,58,237,0.1)';
        rr(ctx, x-sw/2+6, y-sh/2+8+i*24, sw-12, 16, 2); ctx.fill();
        ctx.strokeStyle = 'rgba(124,58,237,0.18)'; ctx.stroke();

        const active = (frame / 40 + i) % 2 < 1.4;
        ctx.fillStyle = active ? C.green : 'rgba(16,185,129,0.15)';
        ctx.shadowColor = C.green;
        ctx.shadowBlur = active ? 7 : 0;
        ctx.beginPath(); ctx.arc(x+sw/2-11, y-sh/2+16+i*24, 3.5, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = 'rgba(124,58,237,0.55)';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BACKEND', x, y+sh/2+13);
      ctx.textAlign = 'left';
      ctx.restore();
    }

    function drawTerminal(ctx, x, y, tick) {
      const pw = 248, ph = 175;
      ctx.save();

      ctx.fillStyle = 'rgba(2,4,8,0.93)';
      ctx.strokeStyle = 'rgba(16,185,129,0.32)';
      ctx.lineWidth = 1;
      rr(ctx, x, y, pw, ph, 6); ctx.fill(); ctx.stroke();

      // Title bar
      ctx.fillStyle = 'rgba(16,185,129,0.08)';
      rr(ctx, x, y, pw, 20, 6); ctx.fill();
      ctx.fillStyle = C.green;
      ctx.font = 'bold 9px monospace';
      ctx.fillText('● TERMINAL  —  Spring Boot', x+10, y+13);

      const visible = Math.min(TERM_LINES.length, Math.floor(tick / 80) + 1);
      TERM_LINES.slice(0, visible).forEach((line, i) => {
        ctx.globalAlpha = i === visible-1
          ? Math.min(1, (tick % 80) / 15)
          : 0.8 + (i % 2) * 0.1;
        ctx.fillStyle = line.color;
        ctx.font = '9px monospace';
        ctx.fillText(line.text, x+10, y+34+i*18);
      });

      // Cursor
      ctx.globalAlpha = Math.sin(tick * 0.18) > 0 ? 0.85 : 0;
      ctx.fillStyle = C.green;
      ctx.fillRect(x+10, y+34+visible*18-10, 6, 10);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawFloating(ctx, t) {
      const H = canvas.height;
      const fade = Math.max(0, 1 - scrollY / (H * 1.5));
      floatLines.forEach(line => {
        const drift = Math.sin(t * line.speed + line.phase) * 9;
        ctx.save();
        ctx.globalAlpha = line.opacity * fade;
        ctx.fillStyle = line.color;
        ctx.font = `${line.size}px monospace`;
        ctx.fillText(line.text, line.x, line.baseY + drift);
        ctx.restore();
      });
    }

    // ─── Main loop ────────────────────────────────────────────
    let frame = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      termTick++;

      const W = canvas.width, H = canvas.height;
      const t = frame * 0.016;
      const fade = Math.max(0, 1 - scrollY / (H * 1.1));

      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, W, H, t);

      ctx.save();
      ctx.globalAlpha = fade;

      drawFloating(ctx, t);

      const lapX = W * 0.42;
      const lapY = H * 0.50 + Math.sin(t * 0.4) * 5;
      const srvX = W * 0.82;
      const srvY = H * 0.45;

      drawServer(ctx, srvX, srvY, frame);
      packets.forEach(p => { p.update(); p.draw(ctx); });
      drawLaptop(ctx, lapX, lapY, t);
      drawTerminal(ctx, W * 0.57, H * 0.07, termTick);

      ctx.restore();
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
