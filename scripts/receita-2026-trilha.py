"""Trilha sintetizada do story Receita Federal 2026 (84 s, 12 cortes de 7 s).

Uso: python3 scripts/receita-2026-trilha.py public/audio/receita-2026-trilha.mp3
Gera tudo por síntese (sem amostras de terceiros). Precisa de numpy e ffmpeg.
"""
import subprocess
import sys
import tempfile
import wave

import numpy as np

SR = 44100
DUR = 84.0
SCENE = 7.0
BEAT = 0.5  # 120 BPM: 14 batidas por cena, o corte cai sempre na batida
rng = np.random.default_rng(7)
out = np.zeros(int(SR * DUR))


def add(sig, at, gain=1.0):
    i = int(at * SR)
    j = min(len(out), i + len(sig))
    out[i:j] += sig[: j - i] * gain


def env(n, decay):
    return np.exp(-np.arange(n) / (decay * SR))


def sweep(f0, f1, dur, decay):
    n = int(dur * SR)
    t = np.arange(n) / SR
    freq = f1 + (f0 - f1) * np.exp(-t / (dur / 5))
    return np.sin(2 * np.pi * np.cumsum(freq) / SR) * env(n, decay)


def noise(dur, decay, smooth=1):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    if smooth > 1:
        x = np.convolve(x, np.ones(smooth) / smooth, mode="same")
    return x * env(n, decay)


def click(freq, dur=0.03):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t) * env(n, 0.006)


def boom(at, gain=1.0):
    add(sweep(78, 30, 2.2, 0.7), at, 0.95 * gain)
    add(noise(0.25, 0.03, 6), at, 0.35 * gain)


def hit(at, gain=1.0):
    add(sweep(120, 46, 0.7, 0.16), at, 0.75 * gain)
    add(noise(0.08, 0.012, 2), at, 0.28 * gain)


def bed_level(t):
    if t < 2.0:
        return 0.0
    if 70.0 <= t < 77.0:
        return 0.35
    if t >= 80.0:
        return max(0.0, 1 - (t - 80.0) / 3.0)
    return 1.0


# Pulso: grave em cada batida, tique agudo no contratempo.
t = 2.0
while t < DUR:
    g = bed_level(t)
    if g > 0:
        add(sweep(90, 52, 0.3, 0.07), t, 0.32 * g)
        add(noise(0.03, 0.006, 1), t + BEAT / 2, 0.05 * g)
        if int(round(t / BEAT)) % 4 == 2:
            add(click(1320, 0.05), t + BEAT / 4, 0.05 * g)
    t += BEAT

# Drone grave com quinta, entra no corte para o prédio.
tt = np.arange(len(out)) / SR
level = np.array([bed_level(x) for x in np.arange(0, DUR, 0.01)])
level = np.interp(tt, np.arange(0, DUR, 0.01), level)
drone = (np.sin(2 * np.pi * 55 * tt) + 0.5 * np.sin(2 * np.pi * 82.5 * tt)) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.25 * tt))
out += drone * level * 0.055

# Cena 1: tela preta com som grave, batida no "RECEITA", batida no corte para o prédio.
boom(0.0)
hit(1.0, 1.1)
hit(2.0, 0.7)
# Cortes secos entre as cenas.
for k in range(1, 12):
    hit(k * SCENE)
# Cena 11: relógio.
for s in range(7):
    add(click(2400, 0.04), 70.0 + s + 0.5, 0.22)
    add(click(1800, 0.04), 70.0 + s + 1.0, 0.14)
# Cena 12: "RECEITA" de volta e entrada da marca; a trilha some.
hit(77.0, 1.1)
boom(78.8, 0.6)

peak = np.max(np.abs(out))
out = out / peak * 0.89
pcm = (out * 32767).astype(np.int16)
with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
    with wave.open(tmp.name, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-ac", "2", "-b:a", "160k", sys.argv[1]], check=True)
print("ok", sys.argv[1])
