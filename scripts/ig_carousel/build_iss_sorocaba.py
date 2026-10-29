"""Post “ISS Sorocaba: FCC escolhida” (2 slides) no formato da skill /instagram-carousel.

Uso: python3 -I scripts/ig_carousel/build_iss_sorocaba.py
Saída: posts/iss-sorocaba/carousel.html (prévia 420 px; export 1080 × 1350 com scripts/ig_carousel/export.cjs).

Fonte dos dados: texto enviado pelo dono do perfil em 29/10/2026, que cita o PNCP (homologação em 26/10/2026)
e o termo de referência. VALIDAR: conferir no PNCP; a busca só encontrou o concurso de 2022 (Vunesp, R$ 5.361,81).
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from kit import BRAND_DARK, BRAND_LIGHT, BRAND_PRIMARY, BRAND_SOLID, LIGHT_BG, LIGHT_BORDER, MUTED, ROOT, WHITE, handle, page  # noqa: E402

OUT = ROOT / "posts/iss-sorocaba/carousel.html"
TOTAL = 2
MUTED_DARK = "#93A39A"

STEPS = [("01", "Contrato", "assinatura com a FCC"), ("02", "Edital", "inscrições, taxa e datas; ainda sem data oficial")]
STATS = [("1", "vaga imediata"), ("R$&nbsp;8.144,93", "salário inicial"), ("30&nbsp;h", "por semana")]

# (disciplina, cor do segmento, cor do número); questões por edição
SUBJECTS = {
    "LP": ("Português", BRAND_LIGHT, BRAND_DARK),
    "MAT": ("Matemática", LIGHT_BG, BRAND_DARK),
    "RL": ("Rac. Lógico", MUTED_DARK, BRAND_DARK),
    "CE": ("Específicos", BRAND_DARK, WHITE),
}
EXAMS = [
    ("Previsto · termo de referência", [("LP", 15), ("MAT", 10), ("CE", 25)]),
    ("2022 · Vunesp", [("LP", 10), ("MAT", 10), ("RL", 5), ("CE", 25)]),
]

DOC = f"""<svg width="92" height="115" viewBox="0 0 120 150" style="display:block;flex-shrink:0;overflow:visible;">
<rect x="2" y="2" width="116" height="146" fill="{WHITE}" stroke="{BRAND_DARK}" stroke-width="3"/>
<rect x="14" y="16" width="60" height="7" fill="{BRAND_DARK}"/>
<rect x="14" y="30" width="92" height="2" fill="{BRAND_PRIMARY}"/>
<rect x="14" y="42" width="88" height="5" fill="{LIGHT_BORDER}"/><rect x="14" y="54" width="80" height="5" fill="{LIGHT_BORDER}"/>
<rect x="14" y="66" width="90" height="5" fill="{LIGHT_BORDER}"/><rect x="14" y="78" width="60" height="5" fill="{LIGHT_BORDER}"/>
<g transform="rotate(-12 64 112)">
  <rect x="8" y="94" width="112" height="40" fill="{LIGHT_BG}" stroke="{BRAND_PRIMARY}" stroke-width="4"/>
  <text x="64" y="112" text-anchor="middle" font-family="Inter" font-weight="900" font-size="12" letter-spacing="0.4" fill="{BRAND_PRIMARY}">HOMOLOGADA</text>
  <text x="64" y="127" text-anchor="middle" font-family="Noto Sans Mono" font-weight="600" font-size="10" fill="{BRAND_PRIMARY}">FCC · 26/10</text>
</g>
</svg>"""


def slide_hero() -> str:
    steps = "".join(
        f'<div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid {LIGHT_BORDER};">'
        f'<span class="mono" style="font-size:20px;font-weight:600;color:{BRAND_PRIMARY};min-width:30px;line-height:1;">{n}</span>'
        f'<div><span class="sans" style="display:block;font-size:14px;font-weight:700;color:{BRAND_DARK};">{t}</span>'
        f'<span class="sans" style="display:block;font-size:12px;line-height:1.4;color:{MUTED};">{d}</span></div></div>'
        for n, t, d in STEPS
    )
    stats = "".join(
        f'<div style="background:{WHITE};border:1px solid {LIGHT_BORDER};border-radius:4px;padding:10px 12px;">'
        f'<div class="serif" style="font-size:21px;font-weight:900;letter-spacing:-0.6px;line-height:1;color:{BRAND_DARK};white-space:nowrap;">{v}</div>'
        f'<div class="mono" style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:{MUTED};margin-top:6px;">{l}</div></div>'
        for v, l in STATS
    )
    return f"""
<div class="slide" style="background:{LIGHT_BG};">
  <div style="position:absolute;left:36px;right:36px;top:40px;z-index:2;">
    <h1 class="serif" style="margin:0;font-size:33px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{BRAND_DARK};">
      A <span style="color:{BRAND_PRIMARY};">FCC</span> foi escolhida como banca do ISS&nbsp;Sorocaba.
    </h1>
    <p class="sans" style="margin:12px 0 0;font-size:15px;line-height:1.5;color:{MUTED};">
      Homologação em 26/10/2026, registrada no PNCP. Faltam o contrato e o&nbsp;edital.
    </p>
    <div style="display:flex;align-items:center;gap:20px;margin-top:22px;">
      {DOC}
      <div style="flex:1;border-top:1px solid {LIGHT_BORDER};">{steps}</div>
    </div>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:46px;z-index:2;display:grid;grid-template-columns:0.7fr 1.5fr 0.8fr;gap:8px;">
    {stats}
  </div>
  {handle(True)}
</div>"""


def bar(label: str, parts: list) -> str:
    segs = "".join(
        f'<div style="width:{n / 50 * 100:.2f}%;background:{SUBJECTS[k][1]};display:flex;align-items:center;justify-content:center;'
        f'font-size:13px;font-weight:800;color:{SUBJECTS[k][2]};">{n}</div>'
        for k, n in parts
    )
    return (
        f'<div style="margin-top:16px;"><span class="mono" style="display:block;font-size:10px;font-weight:600;letter-spacing:1px;'
        f'text-transform:uppercase;color:rgba(255,255,255,0.75);margin-bottom:4px;">{label}</span>'
        f'<div style="display:flex;height:30px;gap:2px;border-radius:2px;overflow:hidden;">{segs}</div></div>'
    )


def slide_cta() -> str:
    legend = "".join(
        f'<span style="display:inline-flex;align-items:center;gap:5px;margin-right:11px;font-size:11px;white-space:nowrap;color:rgba(255,255,255,0.85);">'
        f'<span style="width:10px;height:10px;border-radius:2px;background:{c};border:1px solid rgba(255,255,255,0.35);"></span>{name}</span>'
        for name, c, _ in SUBJECTS.values()
    )
    bars = "".join(bar(label, parts) for label, parts in EXAMS)
    return f"""
<div class="slide" style="background:{BRAND_SOLID};">
  <div style="position:absolute;left:36px;right:36px;top:40px;z-index:2;">
    <h2 class="serif" style="margin:0;font-size:31px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;color:{WHITE};">
      Prova objetiva com <span style="color:{BRAND_LIGHT};">50&nbsp;questões.</span>
    </h2>
    <div style="margin-top:14px;">{bars}</div>
    <div style="margin-top:8px;white-space:nowrap;">{legend}</div>
    <p class="sans" style="margin:18px 0 0;font-size:15px;line-height:1.4;color:{WHITE};font-weight:700;">
      Português sobe de 10 para 15. Raciocínio Lógico deixa de ser disciplina&nbsp;própria.
    </p>
    <p class="sans" style="margin:16px 0 0;font-size:13px;line-height:1.45;color:rgba(255,255,255,0.85);">
      <span class="mono" style="font-size:10px;font-weight:600;letter-spacing:1px;color:{BRAND_LIGHT};">REQUISITOS</span>&nbsp;
      Superior em Ciências Contábeis, Economia, Administração de Empresas ou Direito, e&nbsp;CNH.
    </p>
  </div>
  <div style="position:absolute;left:36px;right:36px;bottom:46px;z-index:2;">
    <div style="display:flex;align-items:center;justify-content:center;padding:13px 18px;background:{LIGHT_BG};color:{BRAND_DARK};font-weight:800;font-size:14px;border-radius:4px;">
      Siga @nexofiscalbr para o edital
    </div>
  </div>
  {handle(False)}
</div>"""


def build() -> str:
    caption = "O Concurso ISS Sorocaba já tem banca: a FCC foi homologada em 26/10/2026."
    return page(slide_hero() + slide_cta(), TOTAL, caption, "ISS Sorocaba · FCC · carrossel")


if __name__ == "__main__":
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build(), encoding="utf-8")
    print("ok", OUT.relative_to(ROOT), f"{OUT.stat().st_size // 1024} KB")
