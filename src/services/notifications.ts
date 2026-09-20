// Web Audio & Browser Notification service for GoMetro

class NotificationService {
  private audioCtx: AudioContext | null = null;

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play pleasant chime using Web Audio API
  public playChime(type: 'two_stops' | 'next_stop' | 'arrival' | 'transfer' | 'generic' = 'generic') {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (type === 'two_stops') {
        // Signature two-tone ascending alert (C5 -> E5 -> G5)
        this.playTone(523.25, now, 0.2, 'sine');
        this.playTone(659.25, now + 0.18, 0.25, 'sine');
        this.playTone(783.99, now + 0.38, 0.45, 'sine');
      } else if (type === 'next_stop') {
        // Urgent alert: high chime pair
        this.playTone(880.00, now, 0.15, 'triangle');
        this.playTone(880.00, now + 0.2, 0.3, 'sine');
      } else if (type === 'arrival') {
        // Celebratory major triad
        this.playTone(523.25, now, 0.25, 'sine');
        this.playTone(659.25, now + 0.15, 0.25, 'sine');
        this.playTone(783.99, now + 0.3, 0.3, 'sine');
        this.playTone(1046.50, now + 0.45, 0.6, 'sine');
      } else if (type === 'transfer') {
        // Double warning tone
        this.playTone(587.33, now, 0.2, 'sine');
        this.playTone(440.00, now + 0.22, 0.35, 'sine');
      } else {
        this.playTone(659.25, now, 0.25, 'sine');
      }

      // Vibration if mobile supported
      if ('vibrate' in navigator) {
        navigator.vibrate([150, 80, 150]);
      }
    } catch (e) {
      console.warn('Audio chime playback error:', e);
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Request browser push notification permissions
  public async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Send system notification
  public sendSystemNotification(title: string, body: string, icon: string = '/favicon.svg') {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon,
          badge: icon,
          tag: 'gometro-journey-alert'
        });
      } catch (e) {
        console.warn('Notification display error:', e);
      }
    }
  }
}

export const notificationService = new NotificationService();
