/* ═══════════════════════════════════════════════
   API CLIENT
═══════════════════════════════════════════════ */
const API_BASE=''; // relative — assumes the backend serves this frontend (recommended). See README.
let authToken=localStorage.getItem('jobtrackr_token')||null;
let currentUser=null;

async function apiFetch(path,options={}){
  const headers=options.headers?{...options.headers}:{};
  if(authToken) headers['Authorization']=`Bearer ${authToken}`;
  if(options.body && !(options.body instanceof URLSearchParams)) headers['Content-Type']='application/json';
  const res=await fetch(API_BASE+path,{...options,headers});
  if(res.status===204) return null;
  let data=null;
  try{data=await res.json()}catch(e){/* empty body */}
  if(!res.ok){
    const detail=data&&data.detail;
    const msg=Array.isArray(detail)?detail.map(d=>d.msg).join(', '):(detail||`Request failed (${res.status})`);
    throw new Error(msg);
  }
  return data;
}

function mapApplication(a){
  return{...a,salMin:a.sal_min,salMax:a.sal_max,date:a.applied_date};
}

async function loadApplications(){
  const data=await apiFetch('/api/applications');
  jobs=data.map(mapApplication);
}
