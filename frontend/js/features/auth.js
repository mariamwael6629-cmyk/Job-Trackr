/* ═══════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════ */
async function initAuth(){
  if(authToken){
    try{
      const user=await apiFetch('/api/auth/me');
      await onAuthenticated(user);
      return;
    }catch(e){
      localStorage.removeItem('jobtrackr_token');
      authToken=null;
    }
  }
  showAuthOverlay();
}

function showAuthOverlay(){
  document.getElementById('auth-overlay').classList.add('open');
  document.getElementById('app-root').style.display='none';
}
function hideAuthOverlay(){
  document.getElementById('auth-overlay').classList.remove('open');
  document.getElementById('app-root').style.display='';
}

async function onAuthenticated(user){
  currentUser=user;
  hideAuthOverlay();
  updateUserUI();
  try{
    await loadApplications();
  }catch(e){
    toast(`⚠️ Could not load applications: ${e.message}`);
  }
  renderJobs();renderKanban();
  document.getElementById('nav-count').textContent=jobs.length;
  document.getElementById('chip-all').textContent=`(${jobs.length})`;
  updateKpis();
}

function userInitials(name){
  return name.split(' ').filter(Boolean).map(p=>p[0]).join('').substring(0,2).toUpperCase()||'?';
}

function updateUserUI(){
  const initials=userInitials(currentUser.name);
  const firstName=currentUser.name.split(' ')[0];
  document.getElementById('sidebar-avatar').textContent=initials;
  document.getElementById('sidebar-username').textContent=currentUser.name;
  document.getElementById('sidebar-plan').textContent=`✦ ${currentUser.plan} Plan`;
  document.getElementById('profile-avatar').textContent=initials;
  document.getElementById('profile-name').textContent=currentUser.name;
  document.getElementById('profile-email').textContent=currentUser.location?`${currentUser.email} · ${currentUser.location}`:currentUser.email;
  document.getElementById('dash-greeting').textContent=`Welcome back, ${firstName} 👋`;
}

function updateKpis(){
  const total=jobs.length;
  const interviews=jobs.filter(j=>j.status==='interview').length;
  const offers=jobs.filter(j=>j.status==='offer'||j.status==='hired').length;
  const successRate=total?Math.round((offers/total)*100):0;
  document.getElementById('stat-total').textContent=total;
  document.getElementById('stat-interviews').textContent=interviews;
  document.getElementById('stat-offers').textContent=offers;
  document.getElementById('stat-success').textContent=successRate+'%';
  document.getElementById('kpi-total').textContent=total;
  document.getElementById('kpi-interviews').textContent=interviews;
  document.getElementById('kpi-offers').textContent=offers;
  document.getElementById('kpi-success').textContent=successRate+'%';
}

function showAuthError(msg){
  const el=document.getElementById('auth-error');
  el.textContent=msg;el.style.display='block';
}
function hideAuthError(){
  document.getElementById('auth-error').style.display='none';
}

function toggleAuthMode(){
  const loginForm=document.getElementById('login-form');
  const registerForm=document.getElementById('register-form');
  const showingLogin=loginForm.style.display!=='none';
  loginForm.style.display=showingLogin?'none':'';
  registerForm.style.display=showingLogin?'':'none';
  document.getElementById('auth-title').textContent=showingLogin?'Create your account':'Welcome back';
  document.getElementById('auth-toggle-prompt').textContent=showingLogin?'Already have an account?':"Don't have an account?";
  document.getElementById('auth-toggle-link').textContent=showingLogin?'Log in':'Sign up';
  hideAuthError();
}

async function handleLogin(e){
  e.preventDefault();
  hideAuthError();
  const btn=document.getElementById('login-submit');
  const email=document.getElementById('login-email').value.trim();
  const password=document.getElementById('login-password').value;
  btn.disabled=true;btn.textContent='Logging in…';
  try{
    const data=await apiFetch('/api/auth/login',{method:'POST',body:new URLSearchParams({username:email,password})});
    authToken=data.access_token;
    localStorage.setItem('jobtrackr_token',authToken);
    await onAuthenticated(data.user);
    toast(`👋 Welcome back, ${data.user.name.split(' ')[0]}!`);
  }catch(err){
    showAuthError(err.message);
  }finally{
    btn.disabled=false;btn.textContent='Log In';
  }
}

async function handleRegister(e){
  e.preventDefault();
  hideAuthError();
  const btn=document.getElementById('register-submit');
  const name=document.getElementById('reg-name').value.trim();
  const email=document.getElementById('reg-email').value.trim();
  const password=document.getElementById('reg-password').value;
  btn.disabled=true;btn.textContent='Creating account…';
  try{
    const data=await apiFetch('/api/auth/register',{method:'POST',body:JSON.stringify({name,email,password})});
    authToken=data.access_token;
    localStorage.setItem('jobtrackr_token',authToken);
    await onAuthenticated(data.user);
    toast(`🎉 Account created — welcome, ${data.user.name.split(' ')[0]}!`);
  }catch(err){
    showAuthError(err.message);
  }finally{
    btn.disabled=false;btn.textContent='Create Account';
  }
}

function handleLogout(){
  authToken=null;currentUser=null;jobs=[];
  localStorage.removeItem('jobtrackr_token');
  document.getElementById('login-form').reset();
  document.getElementById('register-form').reset();
  showAuthOverlay();
  navigate('landing',document.querySelector('.nav-item[data-page="landing"]'));
  toast('👋 Logged out');
}
