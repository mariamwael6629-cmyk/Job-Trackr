/* ═══════════════════════════════════════════════
   DATA STORE
═══════════════════════════════════════════════ */
const BRAND_COLORS = {
  google:'#4285F4', apple:'#555', meta:'#0084ff', stripe:'#635bff',
  notion:'#6B46C1', netflix:'#e50914', figma:'#f24e1e', airbnb:'#ff5a5f',
  linear:'#5b5bd6', spotify:'#1db954', amazon:'#ff9900', tesla:'#cc0000',
  microsoft:'#00a4ef', adobe:'#ff0000', slack:'#4a154b', zoom:'#2d8cff',
};
function brandColor(name){
  const key=name.toLowerCase().split(' ')[0];
  return BRAND_COLORS[key]||'#1E3A5F';
}

let jobs=[];
let activeFilter='all';
