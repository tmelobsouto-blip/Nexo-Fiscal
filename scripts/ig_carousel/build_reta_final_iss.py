"""Gera o carrossel “Reta Final ISS Curitiba” no formato da skill /instagram-carousel.

Uso: python3 -I scripts/ig_carousel/build_reta_final_iss.py
Saída: posts/reta-final-iss/carousel.html (prévia na moldura do Instagram, 420 px; export em 1080 × 1350).
Paleta e fontes do sistema NEXO (src/ds/tokens.ts); fontes e imagem embutidas em base64.
"""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "posts/reta-final-iss/carousel.html"

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
TOTAL = 2


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


BOOK = f"""<svg width="88" height="117" viewBox="0 0 300 400" style="display:block;flex-shrink:0;">
<polygon points="272,8 292,18 292,398 272,392" fill="{LIGHT_BG}" stroke="{BRAND_DARK}" stroke-width="3"/>
<rect x="0" y="0" width="272" height="392" fill="{BRAND_DARK}" stroke="#26332C" stroke-width="3"/>
<rect x="14" y="16" width="6" height="360" fill="{BRAND_LIGHT}"/>
<text x="36" y="42" font-family="Inter" font-weight="800" font-size="15" fill="{WHITE}">NEXO Fiscal</text>
<rect x="36" y="54" width="212" height="2" fill="#26332C"/>
<text x="36" y="184" font-family="Inter" font-weight="900" font-size="33" letter-spacing="-1.2" fill="{WHITE}">Reta Final</text>
<text x="36" y="222" font-family="Inter" font-weight="900" font-size="33" letter-spacing="-1.2" fill="{BRAND_LIGHT}">ISS Curitiba.</text>
<rect x="36" y="246" width="196" height="6" fill="#26332C"/><rect x="36" y="260" width="180" height="6" fill="#26332C"/><rect x="36" y="274" width="120" height="6" fill="#26332C"/>
<rect x="36" y="338" width="212" height="2" fill="#26332C"/>
<text x="36" y="362" font-family="Inter" font-weight="700" font-size="14" fill="{WHITE}">Tiago Souto</text>
</svg>"""


def slide_hero(proof_uri: str) -> str:
    return f"""
<div class="slide" style="background:{LIGHT_BG};">
  <div style="position:absolute;left:36px;right:36px;top:36px;z-index:2;">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      {logo(False)}
      <span class="mono" style="font-size:10px;font-weight:600;letter-spacing:2px;color:{BRAND_PRIMARY};text-transform:uppercase;">ISS Curitiba</span>
    </div>
    <h1 class="serif" style="margin:22px 0 0;font-size:29px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{BRAND_DARK};">
      Sua revisão de ISS Curitiba já inclui as <span style="color:{BRAND_PRIMARY};">LCs&nbsp;de&nbsp;2025?</span>
    </h1>
    <p class="sans" style="margin:12px 0 0;font-size:14px;line-height:1.5;color:{MUTED};">
      273 questões inéditas, escritas sobre o texto atual da lei. Nada de prova&nbsp;antiga.
    </p>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:52px;z-index:2;">
    <span class="mono" style="display:block;font-size:10px;font-weight:600;letter-spacing:2px;color:{BRAND_PRIMARY};margin-bottom:8px;">PÁGINA REAL DO MATERIAL</span>
    <div style="height:176px;border:1px solid {LIGHT_BORDER};border-radius:4px;overflow:hidden;background:{WHITE};">
      <img src="{proof_uri}" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block;">
    </div>
  </div>
  {swipe_arrow(True)}
  {progress_bar(0, TOTAL, True)}
</div>"""


FEATURES = [
    ("273 questões inéditas", "no padrão FAFIPA, sobre o texto pós-2025"),
    ("Lei seca limpa", "112 remissões traduzidas na própria linha"),
    ("Comentário alternativa por alternativa", "com Box Pegadinha e STF/STJ"),
]


def slide_cta() -> str:
    items = "".join(
        f'<div style="display:flex;align-items:flex-start;gap:12px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.16);">'
        f'{check(BRAND_LIGHT)}<div><span class="sans" style="display:block;font-size:14px;font-weight:700;color:{WHITE};">{t}</span>'
        f'<span class="sans" style="display:block;font-size:12px;line-height:1.4;color:rgba(255,255,255,0.75);">{d}</span></div></div>'
        for t, d in FEATURES
    )
    return f"""
<div class="slide" style="background:{BRAND_SOLID};">
  <div style="position:absolute;left:36px;right:36px;top:36px;z-index:2;">
    {logo(True)}
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-top:18px;">
      <h2 class="serif" style="margin:0;font-size:29px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{WHITE};">
        Chegou a reta final do <span style="color:{BRAND_LIGHT};">ISS&nbsp;Curitiba.</span>
      </h2>
      {BOOK}
    </div>
    <div style="margin-top:14px;border-top:1px solid rgba(255,255,255,0.16);">{items}</div>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:52px;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;">
    <div>
      <div class="serif" style="font-size:34px;font-weight:900;letter-spacing:-1.2px;line-height:1;color:{WHITE};">R$&nbsp;39,90</div>
      <div class="sans" style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px;">Cartão ou Pix à vista</div>
    </div>
    <div style="display:inline-flex;align-items:center;gap:8px;padding:12px 18px;background:{LIGHT_BG};color:{BRAND_DARK};font-weight:800;font-size:14px;border-radius:4px;">
      Link na bio&nbsp;→
    </div>
  </div>
  {progress_bar(1, TOTAL, False)}
</div>"""


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


def build() -> str:
    proof = ROOT / "posts/reta-final-iss/assets/questao-c1.png"
    proof_uri = f"data:image/png;base64,{b64(proof)}"
    slides = slide_hero(proof_uri) + slide_cta()
    dots = "".join(f'<span class="dot{" on" if i == 0 else ""}"></span>' for i in range(TOTAL))
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reta Final ISS Curitiba · carrossel</title>
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
  <div class="ig-caption"><b>nexofiscalbr</b> Chegou a reta final do ISS Curitiba: questões inéditas e a legislação atualizada pelas LCs 146, 148 e 149/2025.
    <div class="ig-time">HÁ 2 HORAS</div></div>
</div>
<script>
(() => {{
  const track = document.querySelector('.carousel-track');
  const viewport = document.querySelector('.carousel-viewport');
  const dots = [...document.querySelectorAll('.dot')];
  const total = {TOTAL};
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


if __name__ == "__main__":
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build(), encoding="utf-8")
    print("ok", OUT.relative_to(ROOT), f"{OUT.stat().st_size // 1024} KB")
