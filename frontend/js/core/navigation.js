/* ═══════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════ */
const PAGE_TITLES={landing:'Home',dashboard:'Dashboard',applications:'Applications',kanban:'Kanban Board','ai-tools':'AI Tools',profile:'Profile'};
function navigate(page,navEl){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const p=document.getElementById('page-'+page);
  if(p) p.classList.add('active');
  if(navEl) navEl.classList.add('active');
  document.getElementById('topbar-title').textContent=PAGE_TITLES[page]||'';
  closeSidebar();
  window.scrollTo({top:0,behavior:'smooth'});
  if(page==='dashboard') setTimeout(initCharts,80);
  if(page==='kanban') renderKanban();
  if(page==='applications'){renderJobs();document.getElementById('nav-count').textContent=jobs.length}
}

/* ═══════════════════════════════════════════════
   SIDEBAR MOBILE
═══════════════════════════════════════════════ */
function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('backdrop').classList.add('show');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
}
