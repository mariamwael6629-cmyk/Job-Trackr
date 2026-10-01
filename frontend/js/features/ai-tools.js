/* ═══════════════════════════════════════════════
   AI TOOLS — proxied through the backend, which holds
   the Anthropic API key server-side. Titles + fallbacks
   are kept here too so the UI still works offline.
═══════════════════════════════════════════════ */
const AI_TITLES={
  resume:'📄 Resume Analysis',match:'🎯 Job Match Score',cover:'✍️ Cover Letter Opening',
  interview:'🎙️ Interview Prep',keywords:'🔑 ATS Keyword Analysis',salary:'💰 Salary Negotiation Guide'
};
const AI_FALLBACKS={
  resume:`ATS Score: 82/100 — Well-structured but needs optimization.\n\n• Missing keywords: "design systems", "accessibility", "cross-functional", "Figma prototyping"\n• Tip 1: Quantify every achievement — replace "improved conversion" with "increased conversion by 34% over 3 months"\n• Tip 2: Lead with a 2-line summary statement aligned to your target role\n• Tip 3: Move skills section above experience — ATS parses it first`,
  match:`Job Match Score: 78% — Strong candidate with a few gaps to address.\n\n✅ Matching: UI/UX design, Figma, user research\n✅ Matching: Collaboration with engineers, product thinking\n❌ Gap: No B2B SaaS experience mentioned\n❌ Gap: Missing "design system" work in portfolio\n\n💡 Recommendation: Apply — strong base fit. Address the gaps in your cover letter.`,
  cover:`Here's a tailored opening paragraph:\n\n"When I redesigned the onboarding flow at my previous company, we reduced time-to-value from 11 minutes to under 3 — and I've been chasing that same kind of impact ever since. [Company]'s obsession with crafting tools that feel invisible yet indispensable is exactly the design philosophy I've spent the last 5 years practicing. I'd love to bring that same rigor to your team."`,
  interview:`1. "Tell me about a time you advocated for the user when stakeholders pushed back." → Probes: conviction, communication, product empathy\n\n2. "Describe a project where the data surprised you mid-design." → Probes: adaptability, research mindset\n\n3. "How do you manage design decisions under tight deadlines?" → Probes: prioritization, trade-off reasoning\n\n4. "Tell me about a design that failed. What did you learn?" → Probes: self-awareness, growth mindset`,
  keywords:`Missing keywords: design systems, accessibility (WCAG), component library, cross-functional, B2B SaaS, agile/scrum, stakeholder management\n\nPower verbs to add: "Spearheaded", "Reduced", "Drove" (replace: "Helped", "Worked on", "Was responsible for")\n\nFormatting tips:\n• Use standard section headers (Experience, Skills, Education — not creative names)\n• Avoid tables and text boxes — ATS can't parse them`,
  salary:`Market Range (SF, Senior Designer, 5 YOE):\n• P25: $130K | P50: $155K | P75: $185K + equity\n\nOpener script: "Based on my research and the market data for this role in SF, I was expecting something in the $160–175K range. Is there flexibility there?"\n\nTactics:\n• Always let them make the first offer\n• Negotiate total comp, not just base (RSUs, sign-on, PTO)\n• Use competing offers as leverage — even an early-stage one counts\n\n❌ Never say: "I need this job" or give a number first`,
};

async function runAI(type){
  const resultEl=document.getElementById('ai-result');
  const bodyEl=document.getElementById('ai-result-body');
  const titleEl=document.getElementById('ai-result-title');
  const cursor=document.getElementById('ai-cursor');

  resultEl.classList.add('open');
  titleEl.textContent=AI_TITLES[type];
  bodyEl.textContent='';
  cursor.style.display='inline-block';
  resultEl.scrollIntoView({behavior:'smooth',block:'nearest'});

  try{
    const data=await apiFetch(`/api/ai/run/${type}`,{method:'POST'});
    cursor.style.display='none';
    typewriterEffect(bodyEl,data.text||AI_FALLBACKS[type]);
  }catch(e){
    cursor.style.display='none';
    typewriterEffect(bodyEl,AI_FALLBACKS[type]);
  }
}

function typewriterEffect(el,text){
  let i=0;
  const speed=14;
  el.textContent='';
  const t=setInterval(()=>{
    el.textContent=text.substring(0,i);
    i+=2;
    if(i>text.length){clearInterval(t);el.textContent=text}
  },speed);
}
