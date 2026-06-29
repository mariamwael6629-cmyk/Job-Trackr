from datetime import date

from sqlalchemy.orm import Session

from app.models import Application, User
from app.security import hash_password

DEMO_EMAIL = "ahmed.hassan@email.com"
DEMO_PASSWORD = "password123"

DEMO_APPLICATIONS = [
    dict(company="Google", role="Software Engineer III", status="interview", location="Mountain View, CA", type="hybrid", sal_min=180000, sal_max=240000, applied_date=date(2025, 4, 28), notes="Referral from ex-colleague. Technical round scheduled next week.", url="https://careers.google.com"),
    dict(company="Stripe", role="Product Designer", status="applied", location="San Francisco, CA", type="hybrid", sal_min=140000, sal_max=190000, applied_date=date(2025, 5, 2), notes="Cold application. Strong portfolio match.", url="https://stripe.com/jobs"),
    dict(company="Notion", role="Senior UX Designer", status="reviewing", location="New York, NY", type="remote", sal_min=130000, sal_max=175000, applied_date=date(2025, 4, 20), notes="Initial screening call passed. Moved to design review.", url="https://notion.so/careers"),
    dict(company="Linear", role="Senior Designer", status="offer", location="Remote", type="remote", sal_min=135000, sal_max=165000, applied_date=date(2025, 4, 1), notes="Offer received — $140K base + equity. Deadline May 15.", url="https://linear.app"),
    dict(company="Netflix", role="Design Systems Lead", status="interview", location="Los Gatos, CA", type="onsite", sal_min=200000, sal_max=280000, applied_date=date(2025, 4, 15), notes="System design interview next week with VP Design.", url="https://jobs.netflix.com"),
    dict(company="Figma", role="Staff Designer", status="interview", location="San Francisco, CA", type="hybrid", sal_min=160000, sal_max=220000, applied_date=date(2025, 4, 22), notes="Portfolio review stage — 2 rounds left.", url="https://figma.com/careers"),
    dict(company="Airbnb", role="UX Researcher", status="rejected", location="Remote", type="remote", sal_min=110000, sal_max=150000, applied_date=date(2025, 3, 30), notes="Moved forward with internal candidate.", url="https://airbnb.com/careers"),
    dict(company="Spotify", role="Product Designer", status="rejected", location="Stockholm, Sweden", type="hybrid", sal_min=95000, sal_max=130000, applied_date=date(2025, 3, 15), notes="Skills mismatch per rejection email.", url="https://spotify.com/jobs"),
    dict(company="Amazon", role="Senior SDE", status="applied", location="Seattle, WA", type="hybrid", sal_min=170000, sal_max=250000, applied_date=date(2025, 5, 5), notes="Applied via LinkedIn. Expected timeline: 2-3 weeks.", url="https://amazon.jobs"),
    dict(company="Tesla", role="Frontend Engineer", status="reviewing", location="Austin, TX", type="onsite", sal_min=130000, sal_max=180000, applied_date=date(2025, 4, 28), notes="Technical screen passed. Awaiting hiring manager round.", url="https://tesla.com/careers"),
    dict(company="Meta", role="Product Designer", status="applied", location="Menlo Park, CA", type="hybrid", sal_min=175000, sal_max=240000, applied_date=date(2025, 5, 6), notes="Applied to multiple Meta design roles.", url="https://meta.com/careers"),
    dict(company="Apple", role="UX Designer", status="hired", location="Cupertino, CA", type="onsite", sal_min=150000, sal_max=210000, applied_date=date(2025, 2, 15), notes="Accepted! Starting July 1. Badge pickup June 28.", url="https://apple.com/jobs"),
]


def seed_demo_data(db: Session) -> None:
    """Idempotent: only seeds if the demo user doesn't already exist."""
    existing = db.query(User).filter(User.email == DEMO_EMAIL).first()
    if existing:
        return

    user = User(
        name="Ahmed Hassan",
        email=DEMO_EMAIL,
        hashed_password=hash_password(DEMO_PASSWORD),
        location="Cairo, Egypt",
        plan="Pro",
    )
    db.add(user)
    db.flush()

    for job in DEMO_APPLICATIONS:
        db.add(Application(owner_id=user.id, **job))

    db.commit()
