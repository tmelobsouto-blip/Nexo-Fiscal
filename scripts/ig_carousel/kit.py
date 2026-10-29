"""Peças da skill /instagram-carousel com os tokens da NEXO: fontes embutidas, barra de progresso,
seta, logo, ícones e a moldura do Instagram (420 px) usada na prévia e no export."""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Os 6 tokens da skill, mapeados para a marca. O “brand gradient” vira verde sólido (marca sem degradê).
BRAND_PRIMARY = "#176B49"
BRAND_LIGHT = "#36CD89"
BRAND_DARK = "#0B110E"
LIGHT_BG = "#F8F9F6"
LIGHT_BORDER = "#D8E1DA"
DARK_BG = "#0B110E"
BRAND_SOLID = BRAND_PRIMARY
MUTED = "#55645C"
WHITE = "#FFFFFF"

def b64(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode()


def font_faces() -> str:
    faces = []
    for w in (400, 500, 600, 700, 800, 900):
        faces.append(
            f"@font-face{{font-family:'Inter';font-weight:{w};font-style:normal;"
            f"src:url(data:font/woff2;base64,{b64(ROOT / f'public/fonts/inter-latin-{w}-normal.woff2')}) format('woff2');}}"
        )
    for w in (500, 600):
        faces.append(
            f"@font-face{{font-family:'Noto Sans Mono';font-weight:{w};font-style:normal;"
            f"src:url(data:font/woff2;base64,{b64(ROOT / f'public/fonts/noto-sans-mono-latin-{w}-normal.woff2')}) format('woff2');}}"
        )
    return "\n".join(faces)


def progress_bar(index: int, total: int, light: bool, on_brand: bool = False) -> str:
    pct = (index + 1) / total * 100
    track = "rgba(11,17,14,0.08)" if light else "rgba(255,255,255,0.18)"
    fill = BRAND_PRIMARY if light else WHITE
    label = "rgba(11,17,14,0.35)" if light else "rgba(255,255,255,0.6)"
    return (
        f'<div style="position:absolute;bottom:0;left:0;right:0;padding:16px 28px 20px;z-index:10;display:flex;align-items:center;gap:10px;">'
        f'<div style="flex:1;height:3px;background:{track};border-radius:2px;overflow:hidden;">'
        f'<div style="height:100%;width:{pct:.0f}%;background:{fill};border-radius:2px;"></div></div>'
        f'<span class="mono" style="font-size:11px;color:{label};font-weight:500;">{index + 1}/{total}</span></div>'
    )


def swipe_arrow(light: bool) -> str:
    stroke = "rgba(11,17,14,0.3)" if light else "rgba(255,255,255,0.45)"
    return (
        '<div style="position:absolute;right:0;top:0;bottom:0;width:48px;z-index:9;display:flex;align-items:center;justify-content:center;">'
        f'<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="{stroke}" stroke-width="2.5" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    )


def logo(on_dark: bool) -> str:
    circle = BRAND_DARK if on_dark else BRAND_PRIMARY
    name = WHITE if on_dark else BRAND_DARK
    return (
        '<div style="display:flex;align-items:center;gap:10px;">'
        f'<div style="width:40px;height:40px;border-radius:20px;background:{circle};display:flex;align-items:center;justify-content:center;'
        f'font-weight:900;font-size:17px;color:{WHITE};letter-spacing:-0.5px;">N<span style="color:{BRAND_LIGHT};">.</span></div>'
        f'<span style="font-size:13px;font-weight:700;letter-spacing:0.5px;color:{name};">NEXO Fiscal</span></div>'
    )


def check(color: str) -> str:
    return (
        f'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;margin-top:2px;">'
        f'<path d="M5 12.5l4.5 4.5L19 7.5" stroke="{color}" stroke-width="3" stroke-linecap="square"/></svg>'
    )


ICONS = {
    "heart": "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
    "comment": "M20 11.5a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 11.5zM20 20l-3-2.6",
    "send": "M21 4L3 11l7 3 3 7 8-17zM10 14l11-10",
    "save": "M6 3h12v18l-6-4.5L6 21z",
}


def icon(name: str) -> str:
    return (
        f'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{BRAND_DARK}" stroke-width="1.9" '
        f'stroke-linejoin="round" stroke-linecap="round"><path d="{ICONS[name]}"/></svg>'
    )


def page(slides: str, total: int, caption: str, title: str) -> str:
    dots = "".join(f'<span class="dot{" on" if i == 0 else ""}"></span>' for i in range(total))
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<style>
{font_faces()}
*{{box-sizing:border-box;}}
body{{margin:0;padding:32px 0;background:#EDF3EE;display:flex;justify-content:center;font-family:'Inter',sans-serif;color:{BRAND_DARK};}}
.serif,.sans{{font-family:'Inter',sans-serif;}}
.mono{{font-family:'Noto Sans Mono',monospace;}}
.ig-frame{{width:420px;background:{WHITE};border:1px solid {LIGHT_BORDER};border-radius:4px;overflow:hidden;}}
.ig-header{{display:flex;align-items:center;gap:10px;padding:10px 12px;}}
.ig-avatar{{width:32px;height:32px;border-radius:16px;background:{BRAND_PRIMARY};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:{WHITE};}}
.ig-handle{{font-size:13px;font-weight:700;}} .ig-sub{{font-size:11px;color:{MUTED};}}
.carousel-viewport{{width:420px;aspect-ratio:4/5;overflow:hidden;position:relative;cursor:grab;touch-action:pan-y;user-select:none;}}
.carousel-track{{display:flex;height:100%;transition:transform .35s ease;}}
.slide{{width:420px;height:525px;flex-shrink:0;position:relative;overflow:hidden;}}
.ig-dots{{display:flex;justify-content:center;gap:5px;padding:10px 0 2px;}}
.dot{{width:6px;height:6px;border-radius:3px;background:{LIGHT_BORDER};}} .dot.on{{background:{BRAND_PRIMARY};}}
.ig-actions{{display:flex;align-items:center;gap:14px;padding:6px 12px;}} .ig-actions .grow{{flex:1;}}
.ig-caption{{padding:2px 12px 14px;font-size:13px;line-height:1.45;}}
.ig-time{{font-size:10px;letter-spacing:0.5px;color:{MUTED};margin-top:6px;}}
</style></head>
<body>
<div class="ig-frame">
  <div class="ig-header"><div class="ig-avatar">N<span style="color:{BRAND_LIGHT};">.</span></div>
    <div><div class="ig-handle">nexofiscalbr</div><div class="ig-sub">NEXO Fiscal</div></div></div>
  <div class="carousel-viewport"><div class="carousel-track">{slides}
  </div></div>
  <div class="ig-dots">{dots}</div>
  <div class="ig-actions">{icon("heart")}{icon("comment")}{icon("send")}<span class="grow"></span>{icon("save")}</div>
  <div class="ig-caption"><b>nexofiscalbr</b> {caption}
    <div class="ig-time">HÁ 2 HORAS</div></div>
</div>
<script>
(() => {{
  const track = document.querySelector('.carousel-track');
  const viewport = document.querySelector('.carousel-viewport');
  const dots = [...document.querySelectorAll('.dot')];
  const total = {total};
  let index = 0, startX = null, dx = 0;
  const go = (i) => {{
    index = Math.max(0, Math.min(total - 1, i));
    track.style.transition = 'transform .35s ease';
    track.style.transform = 'translateX(' + (-index * 420) + 'px)';
    dots.forEach((d, k) => d.classList.toggle('on', k === index));
  }};
  viewport.addEventListener('pointerdown', (e) => {{ startX = e.clientX; dx = 0; track.style.transition = 'none'; viewport.setPointerCapture(e.pointerId); }});
  viewport.addEventListener('pointermove', (e) => {{ if (startX === null) return; dx = e.clientX - startX; track.style.transform = 'translateX(' + (-index * 420 + dx) + 'px)'; }});
  const end = () => {{ if (startX === null) return; startX = null; go(Math.abs(dx) > 60 ? index + (dx < 0 ? 1 : -1) : index); }};
  viewport.addEventListener('pointerup', end);
  viewport.addEventListener('pointercancel', end);
}})();
</script>
</body></html>"""
