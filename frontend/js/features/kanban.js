/* ═══════════════════════════════════════════════
   KANBAN
═══════════════════════════════════════════════ */
const COLS=[
  {id:'applied',label:'Applied',color:'#2563EB'},
  {id:'reviewing',label:'Reviewing',color:'#D97706'},
  {id:'interview',label:'Interview',color:'#059669'},
  {id:'offer',label:'Offer',color:'#7C3AED'},
  {id:'rejected',label:'Rejected',color:'#DC2626'},
  {id:'hired',label:'Hired',color:'#0891B2'},
];
let dragId=null;

function renderKanban(){
  const board=document.getElementById('kanban-board');
  board.innerHTML=COLS.map(col=>{
    const colJobs=jobs.filter(j=>j.status===col.id);
    return`<div class="k-col" data-col="${col.id}" ondragover="dragOver(event)" ondrop="drop(event,'${col.id}')">
      <div class="k-col-hd">
        <div class="k-dot" style="background:${col.color}"></div>
        <div class="k-title">${col.label}</div>
        <div class="k-count">${colJobs.length}</div>
      </div>
      <div class="k-cards">
        ${colJobs.map(j=>{
          const c=brandColor(j.company);
          return`<div class="k-card" draggable="true" data-id="${j.id}" ondragstart="dragStart(event,${j.id})" ondragend="dragEnd(event)">
            <div class="k-card-co">${j.company}</div>
            <div class="k-card-role">${j.role}</div>
            <div class="k-card-ft">
              <span class="k-card-date">${fmtDate(j.date)}</span>
              <div style="display:flex;align-items:center;gap:6px">
                <span class="tag ${tagCls(j.type)}">${j.type}</span>
                <div class="k-card-logo" style="background:${c}22;color:${c}">${initials(j.company)}</div>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <button class="k-add-btn" onclick="openModal()">+ Add card</button>
    </div>`;
  }).join('');
}
function dragStart(e,id){dragId=id;setTimeout(()=>e.target.classList.add('dragging'),0)}
function dragEnd(e){e.target.classList.remove('dragging')}
function dragOver(e){e.preventDefault()}
async function drop(e,col){
  e.preventDefault();
  const id=dragId;dragId=null;
  if(id==null) return;
  const j=jobs.find(x=>x.id===id);
  if(!j||j.status===col) return;
  const prevStatus=j.status;
  try{
    await apiFetch(`/api/applications/${id}`,{method:'PATCH',body:JSON.stringify({status:col})});
    j.status=col;renderKanban();toast(`✅ Moved to ${capitalise(col)}`);
    updateKpis();
  }catch(err){
    j.status=prevStatus;renderKanban();
    toast(`⚠️ ${err.message}`);
  }
}
