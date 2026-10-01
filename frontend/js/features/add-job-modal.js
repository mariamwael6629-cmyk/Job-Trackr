/* ═══════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════ */
function openModal(){document.getElementById('modal').classList.add('open');document.getElementById('f-company').focus()}
function closeModal(){document.getElementById('modal').classList.remove('open')}
function handleOverlayClick(e){if(e.target===document.getElementById('modal'))closeModal()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

async function addJob(){
  const company=document.getElementById('f-company').value.trim();
  const role=document.getElementById('f-role').value.trim();
  if(!company||!role){toast('⚠️ Company and role are required');return}
  const payload={
    company,role,
    status:document.getElementById('f-status').value,
    type:document.getElementById('f-type').value,
    location:document.getElementById('f-location').value||'Not specified',
    sal_min:parseInt(document.getElementById('f-salmin').value)||0,
    sal_max:parseInt(document.getElementById('f-salmax').value)||0,
    notes:document.getElementById('f-notes').value,
    url:document.getElementById('f-url').value,
  };
  try{
    const created=await apiFetch('/api/applications',{method:'POST',body:JSON.stringify(payload)});
    jobs.unshift(mapApplication(created));
    ['f-company','f-role','f-location','f-salmin','f-salmax','f-notes','f-url'].forEach(id=>{document.getElementById(id).value=''});
    closeModal();
    toast('✅ Application saved!');
    renderJobs();renderKanban();
    document.getElementById('nav-count').textContent=jobs.length;
    document.getElementById('chip-all').textContent=`(${jobs.length})`;
    updateKpis();
  }catch(err){
    toast(`⚠️ ${err.message}`);
  }
}
