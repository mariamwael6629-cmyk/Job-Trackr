import httpx

from app.config import settings

AI_PROMPTS = {
    "resume": "You are a senior resume coach and ATS specialist with 10+ years of experience at top tech companies. Analyze a software engineer/product designer's resume as if reviewing it for FAANG roles. Provide: (1) An ATS Score out of 100 with one-line justification. (2) Top 3 missing keywords for modern tech roles. (3) 3 specific, actionable improvement tips. Be direct, expert, and genuinely helpful. Keep total response under 200 words.",
    "match": "You are an expert talent recruiter. As if reviewing a senior product designer's profile against a job description at a top SaaS company, provide: (1) A Job Match Score as a percentage with a brief reason. (2) Top 3 matching qualifications. (3) Top 2 skill gaps. (4) One sentence recommendation on whether to apply. Be specific and encouraging. Under 180 words.",
    "cover": 'You are an expert career writer who has helped thousands of candidates land roles at top tech companies. Write a compelling opening paragraph (3-4 sentences) for a cover letter from a senior designer applying to a cutting-edge SaaS startup. Start with a specific, memorable hook — not "I am excited to apply." Make it personal, confident, and specific. Under 120 words.',
    "interview": "You are an expert interview coach. Give 4 tailored behavioral interview questions for a senior software engineer / product designer role at a top tech company. Format each as: Question + (one sentence tip on what the interviewer is probing for). Number them 1-4. Be specific and insightful. Under 220 words.",
    "keywords": "You are an ATS optimization expert. Provide a keyword analysis for a designer/engineer's resume targeting top tech roles. List: (1) 6 high-impact missing keywords. (2) 3 strong power verbs to replace weak ones. (3) 2 formatting tips for ATS compatibility. Be specific and actionable. Under 180 words.",
    "salary": "You are a compensation and negotiation expert with data from 10,000+ tech offers. Give salary negotiation guidance for a senior product designer in San Francisco with 5 years of experience. Provide: (1) Current market range with percentiles. (2) One specific negotiation opener line. (3) 3 negotiation tactics. (4) One thing never to say. Under 200 words.",
}

AI_TITLES = {
    "resume": "📄 Resume Analysis",
    "match": "🎯 Job Match Score",
    "cover": "✍️ Cover Letter Opening",
    "interview": "🎙️ Interview Prep",
    "keywords": "🔑 ATS Keyword Analysis",
    "salary": "💰 Salary Negotiation Guide",
}

AI_FALLBACKS = {
    "resume": 'ATS Score: 82/100 — Well-structured but needs optimization.\n\n• Missing keywords: "design systems", "accessibility", "cross-functional", "Figma prototyping"\n• Tip 1: Quantify every achievement — replace "improved conversion" with "increased conversion by 34% over 3 months"\n• Tip 2: Lead with a 2-line summary statement aligned to your target role\n• Tip 3: Move skills section above experience — ATS parses it first',
    "match": "Job Match Score: 78% — Strong candidate with a few gaps to address.\n\n✅ Matching: UI/UX design, Figma, user research\n✅ Matching: Collaboration with engineers, product thinking\n❌ Gap: No B2B SaaS experience mentioned\n❌ Gap: Missing \"design system\" work in portfolio\n\n💡 Recommendation: Apply — strong base fit. Address the gaps in your cover letter.",
    "cover": "Here's a tailored opening paragraph:\n\n\"When I redesigned the onboarding flow at my previous company, we reduced time-to-value from 11 minutes to under 3 — and I've been chasing that same kind of impact ever since. [Company]'s obsession with crafting tools that feel invisible yet indispensable is exactly the design philosophy I've spent the last 5 years practicing. I'd love to bring that same rigor to your team.\"",
    "interview": '1. "Tell me about a time you advocated for the user when stakeholders pushed back." → Probes: conviction, communication, product empathy\n\n2. "Describe a project where the data surprised you mid-design." → Probes: adaptability, research mindset\n\n3. "How do you manage design decisions under tight deadlines?" → Probes: prioritization, trade-off reasoning\n\n4. "Tell me about a design that failed. What did you learn?" → Probes: self-awareness, growth mindset',
    "keywords": 'Missing keywords: design systems, accessibility (WCAG), component library, cross-functional, B2B SaaS, agile/scrum, stakeholder management\n\nPower verbs to add: "Spearheaded", "Reduced", "Drove" (replace: "Helped", "Worked on", "Was responsible for")\n\nFormatting tips:\n• Use standard section headers (Experience, Skills, Education — not creative names)\n• Avoid tables and text boxes — ATS can\'t parse them',
    "salary": 'Market Range (SF, Senior Designer, 5 YOE):\n• P25: $130K | P50: $155K | P75: $185K + equity\n\nOpener script: "Based on my research and the market data for this role in SF, I was expecting something in the $160–175K range. Is there flexibility there?"\n\nTactics:\n• Always let them make the first offer\n• Negotiate total comp, not just base (RSUs, sign-on, PTO)\n• Use competing offers as leverage — even an early-stage one counts\n\n❌ Never say: "I need this job" or give a number first',
}

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"


async def run_ai_tool(tool_type: str) -> tuple[str, str]:
    """Returns (text, source) where source is 'claude' or 'fallback'."""
    if not settings.anthropic_api_key:
        return AI_FALLBACKS[tool_type], "fallback"

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.post(
                ANTHROPIC_URL,
                headers={
                    "x-api-key": settings.anthropic_api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": settings.anthropic_model,
                    "max_tokens": 1000,
                    "messages": [{"role": "user", "content": AI_PROMPTS[tool_type]}],
                },
            )
            resp.raise_for_status()
            data = resp.json()
            text = "".join(block.get("text", "") for block in data.get("content", []))
            return (text or AI_FALLBACKS[tool_type]), ("claude" if text else "fallback")
    except (httpx.HTTPError, KeyError, ValueError):
        return AI_FALLBACKS[tool_type], "fallback"
