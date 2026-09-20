import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Play,
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Award,
  Clock,
  QrCode,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  PartyPopper
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { VoucherReward } from '../types';

declare global {
  interface Window {
    onFlappyVoucherWin?: (data: { score: number; voucherCode: string; reward: string; timestamp: string }) => void;
    onFlappyVoucherLose?: (data: { score: number; timestamp: string }) => void;
  }
}

export const GamesSection: React.FC<{ onReturnToMainMenu: () => void }> = ({ onReturnToMainMenu }) => {
  const [activeGameTab, setActiveGameTab] = useState<'flappy' | 'snake' | 'history'>('flappy');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [recentVouchers, setRecentVouchers] = useState<VoucherReward[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load saved vouchers from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vietinbank_vouchers');
      if (saved) {
        setRecentVouchers(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveVoucher = (voucher: VoucherReward) => {
    setRecentVouchers((prev) => {
      const updated = [voucher, ...prev.filter((v) => v.code !== voucher.code)].slice(0, 10);
      try {
        localStorage.setItem('vietinbank_vouchers', JSON.stringify(updated));
        localStorage.setItem('vietinbank_latest_voucher', JSON.stringify(voucher));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold">
          <PartyPopper className="w-4 h-4 text-[#ED1C24]" />
          Mini Game Giải Trí Tại Quầy Giao Dịch
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Chờ Vui – Chơi Hay – Nhận Quà Liền Tay
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Giải trí trong lúc chờ phục vụ tại VietinBank Hội An. Vượt qua thử thách để nhận ngay Voucher nước Mót Hội An thanh mát!
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto">
        <button
          id="tab-game-flappy"
          onClick={() => setActiveGameTab('flappy')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeGameTab === 'flappy'
              ? 'bg-[#005596] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gamepad2 className="w-4 h-4" /> Flappy Bird
        </button>

        <button
          id="tab-game-snake"
          onClick={() => setActiveGameTab('snake')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeGameTab === 'snake'
              ? 'bg-[#005596] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4" /> Rắn Săn Mồi
        </button>

        <button
          id="tab-game-history"
          onClick={() => setActiveGameTab('history')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeGameTab === 'history'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" /> Mã Quà ({recentVouchers.length})
        </button>
      </div>

      {/* Tab 1: Flappy Bird */}
      {activeGameTab === 'flappy' && (
        <FlappyBirdGame
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onSaveVoucher={saveVoucher}
          onCopyCode={handleCopyCode}
          copiedCode={copiedCode}
          onReturnHome={onReturnToMainMenu}
        />
      )}

      {/* Tab 2: Snake Game */}
      {activeGameTab === 'snake' && (
        <SnakeGame
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onSaveVoucher={saveVoucher}
          onCopyCode={handleCopyCode}
          copiedCode={copiedCode}
          onReturnHome={onReturnToMainMenu}
        />
      )}

      {/* Tab 3: Voucher History */}
      {activeGameTab === 'history' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Mã Quà Tặng Đã Nhận Tại Quầy
            </h3>
            <span className="text-xs text-slate-500">Được lưu trên thiết bị của Quý khách</span>
          </div>

          {recentVouchers.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-600 text-sm font-medium">
                Quý khách chưa có mã voucher nào. Hãy chơi Flappy Bird hoặc Rắn săn mồi để rinh quà!
              </p>
              <button
                onClick={() => setActiveGameTab('flappy')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#005596] text-white rounded-xl text-xs font-bold hover:bg-[#004275]"
              >
                Chơi Flappy Bird ngay <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentVouchers.map((v, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border-2 border-amber-200 bg-linear-to-br from-amber-50/70 to-white flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {v.game} (Điểm: {v.score})
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(v.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-[#005596] tracking-widest font-mono">
                      {v.code}
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      🎁 Phần quà: <span className="text-[#ED1C24]">{v.rewardText}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Đưa mã cho giao dịch viên</span>
                    <button
                      onClick={() => handleCopyCode(v.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                    >
                      {copiedCode === v.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Sao chép mã
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
 * SUB-COMPONENT: FLAPPY BIRD GAME
 * Container ID: flappy-voucher-game (per specification)
 * ========================================================================= */
interface FlappyGameProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSaveVoucher: (voucher: VoucherReward) => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
  onReturnHome: () => void;
}

const FlappyBirdGame: React.FC<FlappyGameProps> = ({
  soundEnabled,
  onToggleSound,
  onSaveVoucher,
  onCopyCode,
  copiedCode,
  onReturnHome
}) => {
  // Game Configuration constants
  const WIN_SCORE = 20;
  const GRAVITY = 0.38;
  const JUMP_FORCE = -6.8;
  const PIPE_SPEED = 2.4;
  const PIPE_GAP = 145; // Generous gap for comfortable customer play
  const VOUCHER_TEXT = 'Voucher 02 nước Mót Hội An';
  const BRAND_NAME = 'VietinBank';
  const GAME_TITLE = 'Chờ vui – Chơi hay – Nhận quà liền tay';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'win'>('start');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [generatedVoucher, setGeneratedVoucher] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Load high score
  useEffect(() => {
    try {
      const hs = localStorage.getItem('vietinbank_flappy_highscore');
      if (hs) setHighScore(parseInt(hs, 10));
    } catch {
      // ignore
    }
  }, []);

  // Motivational message based on score
  const getMotivationalText = (s: number) => {
    if (s < 5) return 'Khởi động nhẹ nhàng!';
    if (s < 10) return 'Tốt lắm, tiếp tục nào!';
    if (s < 15) return 'Một nửa chặng đường rồi!';
    if (s < 20) return 'Sắp nhận quà rồi!';
    return 'Xuất sắc!';
  };

  const generateVoucherCode = (): string => {
    const random6 = Math.floor(100000 + Math.random() * 900000);
    return `VB-${random6}`;
  };

  // Game Engine loop & state refs
  const gameRef = useRef({
    birdY: 180,
    birdVelocity: 0,
    pipes: [] as { x: number; top: number; bottom: number; passed: boolean }[],
    animFrameId: 0,
    hasWon: false,
    frameCounter: 0,
  });

  // Sound effects synthesizer
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // ignore audio context restrictions
    }
  };

  const jump = () => {
    if (gameState !== 'playing') return;
    gameRef.current.birdVelocity = JUMP_FORCE;
    playBeep(480, 'sine', 0.08);
  };

  const resetGame = () => {
    gameRef.current.birdY = 180;
    gameRef.current.birdVelocity = 0;
    gameRef.current.pipes = [];
    gameRef.current.hasWon = false;
    gameRef.current.frameCounter = 0;
    setScore(0);
    setGeneratedVoucher(null);
  };

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const endGame = (finalScore: number) => {
    setGameState('gameover');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    playBeep(180, 'sawtooth', 0.25);

    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('vietinbank_flappy_highscore', finalScore.toString());
      } catch {
        // ignore
      }
    }

    if (window.onFlappyVoucherLose) {
      window.onFlappyVoucherLose({
        score: finalScore,
        timestamp: new Date().toISOString()
      });
    }
  };

  const winGame = () => {
    if (gameRef.current.hasWon) return;
    gameRef.current.hasWon = true;
    setGameState('win');
    playBeep(650, 'triangle', 0.4);

    const newCode = generateVoucherCode();
    setGeneratedVoucher(newCode);

    onSaveVoucher({
      code: newCode,
      game: 'Flappy Bird VietinBank',
      score: WIN_SCORE,
      rewardText: VOUCHER_TEXT,
      createdAt: new Date().toISOString()
    });

    if (WIN_SCORE > highScore) {
      setHighScore(WIN_SCORE);
      try {
        localStorage.setItem('vietinbank_flappy_highscore', WIN_SCORE.toString());
      } catch {
        // ignore
      }
    }

    if (window.onFlappyVoucherWin) {
      window.onFlappyVoucherWin({
        score: WIN_SCORE,
        voucherCode: newCode,
        reward: VOUCHER_TEXT,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Main Canvas Render & Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localScore = score;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#bae6fd');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Distant clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(80, 80, 25, 0, Math.PI * 2);
      ctx.arc(105, 70, 32, 0, Math.PI * 2);
      ctx.arc(130, 80, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(320, 110, 20, 0, Math.PI * 2);
      ctx.arc(340, 100, 26, 0, Math.PI * 2);
      ctx.arc(365, 110, 20, 0, Math.PI * 2);
      ctx.fill();

      // Ground
      const groundH = 40;
      ctx.fillStyle = '#059669';
      ctx.fillRect(0, canvas.height - groundH, canvas.width, 10);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, canvas.height - groundH + 10, canvas.width, groundH - 10);

      if (gameState === 'playing') {
        const gm = gameRef.current;
        gm.frameCounter++;

        // Update bird physics
        gm.birdVelocity += GRAVITY;
        gm.birdY += gm.birdVelocity;

        // Spawn pipes
        if (gm.frameCounter % 90 === 0 && !gm.hasWon) {
          const minPipeH = 50;
          const maxPipeH = canvas.height - groundH - PIPE_GAP - minPipeH;
          const topH = Math.floor(Math.random() * (maxPipeH - minPipeH + 1)) + minPipeH;
          const bottomY = topH + PIPE_GAP;
          gm.pipes.push({
            x: canvas.width,
            top: topH,
            bottom: bottomY,
            passed: false
          });
        }

        // Draw and update pipes
        for (let i = gm.pipes.length - 1; i >= 0; i--) {
          const pipe = gm.pipes[i];
          pipe.x -= PIPE_SPEED;

          // Top Pipe (VietinBank Blue)
          const pipeGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + 55, 0);
          pipeGrad.addColorStop(0, '#005596');
          pipeGrad.addColorStop(0.5, '#0074c8');
          pipeGrad.addColorStop(1, '#003e6d');

          ctx.fillStyle = pipeGrad;
          ctx.fillRect(pipe.x, 0, 55, pipe.top);
          // Pipe cap
          ctx.fillStyle = '#003e6d';
          ctx.fillRect(pipe.x - 4, pipe.top - 20, 63, 20);

          // Bottom Pipe
          const bottomH = canvas.height - groundH - pipe.bottom;
          ctx.fillStyle = pipeGrad;
          ctx.fillRect(pipe.x, pipe.bottom, 55, bottomH);
          ctx.fillStyle = '#003e6d';
          ctx.fillRect(pipe.x - 4, pipe.bottom, 63, 20);

          // Check pass for scoring
          const birdX = 80;
          const birdR = 17;
          if (!pipe.passed && pipe.x + 55 < birdX - birdR) {
            pipe.passed = true;
            localScore += 1;
            setScore(localScore);
            playBeep(720, 'sine', 0.1);

            if (localScore >= WIN_SCORE) {
              winGame();
              return;
            }
          }

          // Collision detection
          if (
            birdX + birdR > pipe.x &&
            birdX - birdR < pipe.x + 55 &&
            (gm.birdY - birdR < pipe.top || gm.birdY + birdR > pipe.bottom)
          ) {
            endGame(localScore);
            return;
          }

          // Remove offscreen pipes
          if (pipe.x < -65) {
            gm.pipes.splice(i, 1);
          }
        }

        // Boundary checks (ceiling & floor)
        if (gm.birdY - 17 < 0) {
          gm.birdY = 17;
          gm.birdVelocity = 0;
        }
        if (gm.birdY + 17 >= canvas.height - groundH) {
          endGame(localScore);
          return;
        }
      }

      // Draw Mascot / VietinBank Card Bird
      const birdX = 80;
      const birdY = gameRef.current.birdY;
      ctx.save();
      ctx.translate(birdX, birdY);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (gameRef.current.birdVelocity * 3.5 * Math.PI) / 180));
      ctx.rotate(angle);

      // Card-like body with rounded corners
      ctx.fillStyle = '#ED1C24';
      ctx.beginPath();
      ctx.roundRect(-22, -15, 44, 30, 8);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Card chip (golden)
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-16, -6, 10, 12);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(-16, -6, 10, 12);

      // Wing (VietinBank Blue)
      ctx.fillStyle = '#005596';
      ctx.beginPath();
      ctx.ellipse(-2, 3, 10, 6, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(10, -5, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(12, -5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Beak (golden)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(18, -4);
      ctx.lineTo(26, -1);
      ctx.lineTo(18, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      if (gameState === 'playing') {
        gameRef.current.animFrameId = requestAnimationFrame(render);
      }
    };

    if (gameState === 'playing') {
      gameRef.current.animFrameId = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(gameRef.current.animFrameId);
    };
  }, [gameState, soundEnabled]);

  // Spacebar trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
          jump();
        } else if (gameState === 'start' || gameState === 'gameover') {
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div
      id="flappy-voucher-game"
      className={`relative bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden select-none transition-transform duration-100 ${
        isShaking ? 'translate-x-1 -translate-y-1 ring-2 ring-red-400' : ''
      }`}
    >
      {/* Game Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#005596] tracking-tight">
            {GAME_TITLE}
          </h3>
          <p className="text-xs text-slate-500">Mục tiêu: Đạt {WIN_SCORE} điểm nhận {VOUCHER_TEXT}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
            title={soundEnabled ? 'Tắt âm' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-600" /> Kỷ lục: {highScore}
          </div>
        </div>
      </div>

      {/* Score and Dynamic Encouragement Bar */}
      {gameState === 'playing' && (
        <div className="mb-3 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-[#005596] font-extrabold text-base sm:text-lg">
              Điểm: {score}/{WIN_SCORE}
            </span>
            <span className="text-[#ED1C24] font-bold animate-pulse">
              {getMotivationalText(score)}
            </span>
          </div>

          {/* Progress bar from 0 to 20 */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-linear-to-r from-[#005596] to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, (score / WIN_SCORE) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Canvas View Area */}
      <div
        className="relative w-full max-w-lg mx-auto aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-inner border border-slate-200 touch-manipulation cursor-pointer"
        onClick={() => {
          if (gameState === 'playing') jump();
        }}
      >
        <canvas
          ref={canvasRef}
          width={480}
          height={320}
          className="w-full h-full object-cover block"
        />

        {/* Overlay: Start Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#ED1C24] flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white">{GAME_TITLE}</h4>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xs mx-auto">
                Vượt qua 20 thử thách để nhận voucher 02 nước Mót Hội An
              </p>
            </div>

            <button
              id="btn-flappy-start"
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#005596] to-[#0074c8] text-white font-extrabold text-sm sm:text-base shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" /> Bắt đầu chơi
            </button>

            <span className="text-[11px] text-slate-300">
              Chạm màn hình hoặc nhấn Space để bay
            </span>
          </div>
        )}

        {/* Overlay: Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
              <RotateCcw className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg sm:text-xl font-extrabold text-red-400">
                Rất tiếc, bạn đã vượt qua {score}/{WIN_SCORE} thử thách
              </h4>
              <p className="text-xs sm:text-sm text-slate-200">
                Chỉ còn một chút nữa thôi, hãy thử lại nhé!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="btn-flappy-retry"
                onClick={startGame}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" /> Chơi lại
              </button>
              <button
                id="btn-flappy-home"
                onClick={onReturnHome}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              >
                Về màn hình chính
              </button>
            </div>
          </div>
        )}

        {/* Overlay: Victory Screen */}
        {gameState === 'win' && (
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/40 animate-pulse">
              <Trophy className="w-9 h-9" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h4 className="text-2xl sm:text-3xl font-black text-amber-400">Chúc mừng!</h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-snug">
                Bạn đã vượt qua 20 thử thách và đủ điều kiện nhận <span className="font-bold text-white">{VOUCHER_TEXT}</span>.
              </p>
            </div>

            {/* Prominent Voucher Gift Code */}
            {generatedVoucher && (
              <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl shadow-xl border-2 border-amber-400 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mã quà tặng của bạn</span>
                <div className="text-2xl sm:text-3xl font-black text-[#005596] tracking-widest font-mono">
                  {generatedVoucher}
                </div>
              </div>
            )}

            <p className="text-[11px] text-amber-200 max-w-xs">
              Vui lòng chụp màn hình hoặc đưa mã này cho nhân viên để nhận quà.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {generatedVoucher && (
                <button
                  id="btn-flappy-copy-code"
                  onClick={() => onCopyCode(generatedVoucher)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition-all active:scale-95"
                >
                  {copiedCode === generatedVoucher ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" /> Đã sao chép!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Sao chép mã
                    </>
                  )}
                </button>
              )}

              <button
                id="btn-flappy-play-again"
                onClick={startGame}
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors"
              >
                Chơi lại
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Instruction Hint */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Chạm vào vùng game để nhân vật bay lên. Tránh các đường ống ngân hàng!
        </span>
        <button
          onClick={onReturnHome}
          className="text-[#005596] font-semibold hover:underline"
        >
          Quay lại Menu chính
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * SUB-COMPONENT: VIETINBANK SNAKE CHALLENGE GAME
 * ========================================================================= */
interface SnakeGameProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSaveVoucher: (voucher: VoucherReward) => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
  onReturnHome: () => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({
  soundEnabled,
  onToggleSound,
  onSaveVoucher,
  onCopyCode,
  copiedCode,
  onReturnHome
}) => {
  const GRID_SIZE = 20;
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [milestoneNotice, setMilestoneNotice] = useState<string | null>(null);
  const [finalGiftSlip, setFinalGiftSlip] = useState<{
    score: number;
    reward: string;
    voucherCode: string;
    completedAt: string;
  } | null>(null);

  // Load high score
  useEffect(() => {
    try {
      const hs = localStorage.getItem('vietinbank_snake_highscore');
      if (hs) setHighScore(parseInt(hs, 10));
    } catch {
      // ignore
    }
  }, []);

  const snakeState = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    direction: 'RIGHT' as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
    nextDirection: 'RIGHT' as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
    food: { x: 15, y: 10 },
    intervalId: 0,
    awarded20: false,
    awarded40: false
  });

  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood: { x: number; y: number };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
      };
      const onSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  };

  const startSnakeGame = () => {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    snakeState.current.snake = initialSnake;
    snakeState.current.direction = 'RIGHT';
    snakeState.current.nextDirection = 'RIGHT';
    snakeState.current.food = generateFood(initialSnake);
    snakeState.current.awarded20 = false;
    snakeState.current.awarded40 = false;
    setScore(0);
    setMilestoneNotice(null);
    setFinalGiftSlip(null);
    setGameState('playing');
  };

  const endSnakeGame = (finalScore: number) => {
    setGameState('gameover');
    if (snakeState.current.intervalId) {
      clearInterval(snakeState.current.intervalId);
    }

    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('vietinbank_snake_highscore', finalScore.toString());
      } catch {
        // ignore
      }
    }

    // Determine reward slip
    let rewardText = 'Chưa đạt mốc nhận voucher';
    let code = '';
    if (finalScore >= 40) {
      rewardText = '02 voucher nước Mót Hội An';
      code = `VB-SNK${Math.floor(1000 + Math.random() * 9000)}`;
      onSaveVoucher({
        code,
        game: 'VietinBank Snake Challenge',
        score: finalScore,
        rewardText,
        createdAt: new Date().toISOString()
      });
    } else if (finalScore >= 20) {
      rewardText = '01 voucher nước Mót Hội An';
      code = `VB-SNK${Math.floor(1000 + Math.random() * 9000)}`;
      onSaveVoucher({
        code,
        game: 'VietinBank Snake Challenge',
        score: finalScore,
        rewardText,
        createdAt: new Date().toISOString()
      });
    }

    setFinalGiftSlip({
      score: finalScore,
      reward: rewardText,
      voucherCode: code,
      completedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  };

  // Direction changer
  const changeDirection = (newDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    const cur = snakeState.current.direction;
    if (newDir === 'UP' && cur !== 'DOWN') snakeState.current.nextDirection = 'UP';
    if (newDir === 'DOWN' && cur !== 'UP') snakeState.current.nextDirection = 'DOWN';
    if (newDir === 'LEFT' && cur !== 'RIGHT') snakeState.current.nextDirection = 'LEFT';
    if (newDir === 'RIGHT' && cur !== 'LEFT') snakeState.current.nextDirection = 'RIGHT';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection('RIGHT');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let currentScore = score;

    const tick = () => {
      const state = snakeState.current;
      state.direction = state.nextDirection;

      const head = { ...state.snake[0] };
      if (state.direction === 'UP') head.y -= 1;
      if (state.direction === 'DOWN') head.y += 1;
      if (state.direction === 'LEFT') head.x -= 1;
      if (state.direction === 'RIGHT') head.x += 1;

      // Wall collision
      const maxCols = CANVAS_WIDTH / GRID_SIZE;
      const maxRows = CANVAS_HEIGHT / GRID_SIZE;
      if (head.x < 0 || head.x >= maxCols || head.y < 0 || head.y >= maxRows) {
        endSnakeGame(currentScore);
        return;
      }

      // Self collision
      if (state.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        endSnakeGame(currentScore);
        return;
      }

      state.snake.unshift(head);

      // Check eat food
      if (head.x === state.food.x && head.y === state.food.y) {
        currentScore += 1;
        setScore(currentScore);
        state.food = generateFood(state.snake);

        // Milestone 20 check (no interrupt)
        if (currentScore >= 20 && !state.awarded20) {
          state.awarded20 = true;
          setMilestoneNotice('Chúc mừng! Quý khách đã đạt mốc 20 điểm (01 Voucher Mót Hội An)! Tiếp tục để săn 02 Voucher!');
          setTimeout(() => setMilestoneNotice(null), 4000);
        }

        // Milestone 40 check
        if (currentScore >= 40 && !state.awarded40) {
          state.awarded40 = true;
          setMilestoneNotice('Xuất sắc! Quý khách đã đạt mốc 40 điểm (02 Voucher Mót Hội An)!');
          setTimeout(() => setMilestoneNotice(null), 4000);
        }
      } else {
        state.snake.pop();
      }

      // Draw onto canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear & Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Grid subtle lines
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Draw Food (VietinBank Gift coin / token)
      ctx.fillStyle = '#ED1C24';
      ctx.beginPath();
      ctx.arc(
        state.food.x * GRID_SIZE + GRID_SIZE / 2,
        state.food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'V',
        state.food.x * GRID_SIZE + GRID_SIZE / 2,
        state.food.y * GRID_SIZE + GRID_SIZE / 2
      );

      // Draw Snake
      state.snake.forEach((segment, index) => {
        if (index === 0) {
          // Head (VietinBank Blue)
          ctx.fillStyle = '#005596';
          ctx.beginPath();
          ctx.roundRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2, 5);
          ctx.fill();

          // Eyes
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(segment.x * GRID_SIZE + 6, segment.y * GRID_SIZE + 6, 2, 0, Math.PI * 2);
          ctx.arc(segment.x * GRID_SIZE + 14, segment.y * GRID_SIZE + 6, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Body
          ctx.fillStyle = index % 2 === 0 ? '#0074c8' : '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2, 4);
          ctx.fill();
        }
      });
    };

    const interval = window.setInterval(tick, 130);
    snakeState.current.intervalId = interval;

    return () => clearInterval(interval);
  }, [gameState, score]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#005596]">VietinBank Snake Challenge</h3>
          <p className="text-xs text-slate-500">Chơi vui tại quầy – Săn voucher nước Mót Hội An</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Điểm: <span className="text-[#005596] text-sm">{score}</span>
          </div>
          <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl">
            Kỷ lục: {highScore}
          </div>
        </div>
      </div>

      {/* Milestone banner notification during game */}
      {milestoneNotice && (
        <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white p-3 rounded-xl text-center text-xs font-bold animate-bounce shadow-md">
          {milestoneNotice}
        </div>
      )}

      {/* Main Canvas & Game Over View */}
      <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block"
        />

        {gameState === 'start' && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold">VietinBank Snake Challenge</h4>
              <p className="text-xs text-slate-200">
                • Đạt 20 điểm nhận 01 voucher Mót Hội An<br />
                • Đạt 40 điểm nhận 02 voucher Mót Hội An
              </p>
            </div>
            <button
              id="btn-snake-start"
              onClick={startSnakeGame}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" /> Bắt đầu chơi
            </button>
          </div>
        )}

        {/* Game Over & Gift Confirmation Slip */}
        {gameState === 'gameover' && finalGiftSlip && (
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-5 text-center text-white space-y-3 overflow-y-auto animate-fadeIn">
            <div className="bg-white text-slate-900 rounded-2xl p-4 w-full max-w-xs shadow-2xl border-2 border-[#005596] space-y-2">
              <span className="text-[11px] font-black uppercase text-[#005596] tracking-wider block border-b pb-1">
                Phiếu Xác Nhận Quà Tặng
              </span>

              <div className="text-left space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Điểm cuối cùng:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{finalGiftSlip.score} điểm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mức quà:</span>
                  <span className="font-bold text-[#ED1C24]">{finalGiftSlip.reward}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian:</span>
                  <span className="text-slate-700">{finalGiftSlip.completedAt}</span>
                </div>

                {finalGiftSlip.voucherCode && (
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-center my-1">
                    <span className="text-[10px] text-slate-400 block font-bold">MÃ NHẬN QUÀ</span>
                    <span className="text-lg font-black text-[#005596] font-mono tracking-widest block">
                      {finalGiftSlip.voucherCode}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-slate-500 italic bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                “Vui lòng chụp màn hình hoặc thông báo với giao dịch viên để nhận quà.”
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                id="btn-snake-retry"
                onClick={startSnakeGame}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005596] text-white font-bold text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
              </button>
              {finalGiftSlip.voucherCode && (
                <button
                  onClick={() => onCopyCode(finalGiftSlip.voucherCode)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {copiedCode === finalGiftSlip.voucherCode ? 'Đã sao chép' : 'Sao chép mã'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch D-Pad Controls */}
      <div className="max-w-[220px] mx-auto grid grid-cols-3 gap-2 pt-2">
        <div />
        <button
          onClick={() => changeDirection('UP')}
          className="p-3 bg-slate-100 active:bg-[#005596] active:text-white rounded-xl flex items-center justify-center shadow-xs"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div />
        <button
          onClick={() => changeDirection('LEFT')}
          className="p-3 bg-slate-100 active:bg-[#005596] active:text-white rounded-xl flex items-center justify-center shadow-xs"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => changeDirection('DOWN')}
          className="p-3 bg-slate-100 active:bg-[#005596] active:text-white rounded-xl flex items-center justify-center shadow-xs"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
        <button
          onClick={() => changeDirection('RIGHT')}
          className="p-3 bg-slate-100 active:bg-[#005596] active:text-white rounded-xl flex items-center justify-center shadow-xs"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
