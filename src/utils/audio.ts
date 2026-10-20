/**
 * Web Audio API synthesized chime for notifications.
 * Works seamlessly without needing external assets or network requests.
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (err) {
    console.warn('Web Audio API not supported or blocked:', err);
    return null;
  }
}

/**
 * Plays a pleasant crystal bell chime (e.g. for reminders, timers, check-offs)
 */
export function playChime(frequency: number = 587.33, secondaryFreq: number = 880) { // D5, A5
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Tone 1
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(frequency, now);

  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.25, now + 0.03);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 1.2);

  // Tone 2 (harmony)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(secondaryFreq, now + 0.08);

  gain2.gain.setValueAtTime(0, now + 0.08);
  gain2.gain.linearRampToValueAtTime(0.18, now + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start(now + 0.08);
  osc2.stop(now + 1.5);
}

/**
 * Plays a completion celebration jingle
 */
export function playSuccessChime() {
  playChime(523.25, 659.25); // C5, E5
  setTimeout(() => {
    playChime(783.99, 1046.50); // G5, C6
  }, 180);
}
