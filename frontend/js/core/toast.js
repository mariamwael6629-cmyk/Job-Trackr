/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
let toastTimer;
function toast(msg){
  const el=document.getElementById('toast-el');
  const parts=msg.split(' ');
  const icon=parts[0].match(/\p{Emoji}/u)?parts.shift():'✅';
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-text').textContent=parts.join(' ');
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
}
