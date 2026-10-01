/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function initials(s){return s.substring(0,2).toUpperCase()}
function fmtSalary(a,b){if(!a&&!b)return'—';if(a&&b)return`$${Math.round(a/1000)}K–$${Math.round(b/1000)}K`;return a?`$${Math.round(a/1000)}K+`:''}
function fmtDate(d){return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
function tagCls(t){return t==='remote'?'tag-remote':t==='onsite'?'tag-onsite':'tag-hybrid'}
function capitalise(s){return s.charAt(0).toUpperCase()+s.slice(1)}
