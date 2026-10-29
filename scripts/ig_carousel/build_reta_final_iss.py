"""Gera o carrossel “Reta Final ISS Curitiba” no formato da skill /instagram-carousel.

Uso: python3 -I scripts/ig_carousel/build_reta_final_iss.py
Saída: posts/reta-final-iss/carousel.html (prévia na moldura do Instagram, 420 px; export em 1080 × 1350).
Paleta e fontes do sistema NEXO (src/ds/tokens.ts); fontes e imagem embutidas em base64.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from kit import BRAND_DARK, BRAND_LIGHT, BRAND_PRIMARY, BRAND_SOLID, LIGHT_BG, LIGHT_BORDER, MUTED, ROOT, WHITE, b64, check, handle, page  # noqa: E402

OUT = ROOT / "posts/reta-final-iss/carousel.html"
TOTAL = 2


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
  <div style="position:absolute;left:36px;right:36px;top:40px;z-index:2;">
    <h1 class="serif" style="margin:0;font-size:33px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{BRAND_DARK};">
      Sua revisão de ISS Curitiba já inclui as <span style="color:{BRAND_PRIMARY};">LCs&nbsp;de&nbsp;2025?</span>
    </h1>
    <p class="sans" style="margin:12px 0 0;font-size:15px;line-height:1.5;color:{MUTED};">
      273 questões inéditas, escritas sobre o texto atual da lei. Nada de prova&nbsp;antiga.
    </p>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:46px;z-index:2;">
    <div style="border:1px solid {LIGHT_BORDER};border-radius:4px;overflow:hidden;background:{WHITE};">
      <img src="{proof_uri}" style="width:100%;height:auto;display:block;">
    </div>
  </div>
  {handle(True)}
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
  <div style="position:absolute;left:36px;right:36px;top:40px;z-index:2;">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;">
      <h2 class="serif" style="margin:0;font-size:31px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{WHITE};">
        Chegou a reta final do <span style="color:{BRAND_LIGHT};">ISS&nbsp;Curitiba.</span>
      </h2>
      {BOOK}
    </div>
    <div style="margin-top:14px;border-top:1px solid rgba(255,255,255,0.16);">{items}</div>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:46px;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;">
    <div>
      <div class="serif" style="font-size:34px;font-weight:900;letter-spacing:-1.2px;line-height:1;color:{WHITE};">R$&nbsp;39,90</div>
      <div class="sans" style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px;">Cartão ou Pix à vista</div>
    </div>
    <div style="display:inline-flex;align-items:center;gap:8px;padding:12px 18px;background:{LIGHT_BG};color:{BRAND_DARK};font-weight:800;font-size:14px;border-radius:4px;">
      Link na bio&nbsp;→
    </div>
  </div>
  {handle(False)}
</div>"""


def build() -> str:
    proof = ROOT / "posts/reta-final-iss/assets/questao-c1.png"
    proof_uri = f"data:image/png;base64,{b64(proof)}"
    caption = "Chegou a reta final do ISS Curitiba: questões inéditas e a legislação atualizada pelas LCs 146, 148 e 149/2025."
    return page(slide_hero(proof_uri) + slide_cta(), TOTAL, caption, "Reta Final ISS Curitiba · carrossel")


if __name__ == "__main__":
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build(), encoding="utf-8")
    print("ok", OUT.relative_to(ROOT), f"{OUT.stat().st_size // 1024} KB")
