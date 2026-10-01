/* ═══════════════════════════════════════════════
   FAQ TOGGLE
═══════════════════════════════════════════════ */
function toggleFaq(qEl){
  const item=qEl.closest('.faq-item');
  item.classList.toggle('open');
}

/* ═══════════════════════════════════════════════
   TOGGLE SWITCH
═══════════════════════════════════════════════ */
function toggleSwitch(el){
  el.classList.toggle('on');
  el.classList.toggle('off');
  toast(el.classList.contains('on')?'✅ Setting enabled':'🔕 Setting disabled');
}
