/* ═══════════════════════════════════════════════
   APPLICATIONS TABLE
═══════════════════════════════════════════════ */
function renderJobs(){
  const data=activeFilter==='all'?jobs:jobs.filter(j=>j.status===activeFilter);
  const tbody=document.getElementById('jobs-body');
  if(!data.length){
    tbody.innerHTML=`<tr><td colspan="6"><div class="empty"><div class="empty-ico">📋</div><div class="empty-title">No applications found</div><div class="empty-desc">Add your first application or try a different filter.</div></div></td></tr>`;
    return;
  }
  tbody.innerHTML=data.map(j=>{
    const c=brandColor(j.company);
    return`<tr>
      <td><div class="co-cell">
        <div class="co-logo" style="background:${c}22;color:${c}">${initials(j.company)}</div>
        <div><div class="co-name">${j.company}</div><div class="co-role">${j.role}</div></div>
      </div></td>
      <td><span class="status s-${j.status}">${capitalise(j.status)}</span></td>
      <td><span style="font-size:12px;color:var(--text2)">${j.location}</span> <span class="tag ${tagCls(j.type)}">${j.type}</span></td>
      <td class="salary-cell">${fmtSalary(j.salMin,j.salMax)}</td>
      <td class="date-cell">${fmtDate(j.date)}</td>
      <td><div class="actions-cell">
        <button class="btn btn-ghost btn-sm" onclick="toast('✏️ Editing ${j.company}...')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteJob(${j.id})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
}
function filterJobs(status,el){
  activeFilter=status;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderJobs();
}
async function deleteJob(id){
  const j=jobs.find(x=>x.id===id);
  try{
    await apiFetch(`/api/applications/${id}`,{method:'DELETE'});
    jobs=jobs.filter(x=>x.id!==id);
    toast(`🗑️ Removed ${j?.company||'application'}`);
    renderJobs();renderKanban();
    document.getElementById('nav-count').textContent=jobs.length;
    document.getElementById('chip-all').textContent=`(${jobs.length})`;
    updateKpis();
  }catch(err){
    toast(`⚠️ ${err.message}`);
  }
}
