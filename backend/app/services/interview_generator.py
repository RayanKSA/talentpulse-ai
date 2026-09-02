"""
Interview Question Generation Engine.
Synthesizes contextual technical gap probes and STAR behavioral questions
tailored to the specific candidate profile and job requirements.
"""

from typing import List
from backend.app.schemas.models import InterviewQuestion

# Question bank organized by skill / topic with STAR answering rubrics
SKILL_QUESTION_BANK = {
    "Docker": {
        "question": "Can you explain how you would containerize a multi-tier web application using Docker, and how you optimize image size and layer caching for CI/CD pipelines?",
        "points": [
            "Situation: Mentioning project scaling or local environment drift issues.",
            "Task: Creating a reproducible production image.",
            "Action: Using multi-stage builds, non-root users, and minimal base images (Alpine/Distroless).",
            "Result: Quantified build time reduction and secure deployment."
        ],
        "rationale": "Assesses foundational DevOps, container security, and production deployment maturity."
    },
    "Kubernetes": {
        "question": "How have you handled rolling updates, health probes (liveness vs. readiness), and zero-downtime deployments in a Kubernetes cluster?",
        "points": [
            "Situation: Deploying critical services with zero customer impact.",
            "Task: Designing reliable deployment manifests.",
            "Action: Configuring readiness probes, pod disruption budgets, and horizontal pod autoscaling.",
            "Result: High availability and graceful termination."
        ],
        "rationale": "Evaluates resilience engineering and microservice orchestration."
    },
    "PostgreSQL": {
        "question": "When a mission-critical PostgreSQL query begins degrading under high write load, what systematic profiling and indexing strategies do you employ?",
        "points": [
            "Situation: Database CPU spikes or slow query log warnings.",
            "Task: Identifying the bottleneck without locking production tables.",
            "Action: Running EXPLAIN ANALYZE, checking seq scans, adding composite or partial indexes, connection pooling.",
            "Result: P99 latency reduction and optimized throughput."
        ],
        "rationale": "Tests practical relational database troubleshooting and query planning."
    },
    "Redis": {
        "question": "How do you determine caching invalidation strategies (e.g., Cache-Aside, Write-Through) and guard against cache stampedes or thundering herd problems?",
        "points": [
            "Situation: High peak traffic hitting slow origin databases.",
            "Task: Designing an in-memory caching layer.",
            "Action: Setting appropriate TTLs, mutex locks for stampedes, and eviction policies (LRU).",
            "Result: Significant database load offload and sub-10ms response times."
        ],
        "rationale": "Validates system scaling and in-memory architecture depth."
    },
    "FastAPI": {
        "question": "How does FastAPI achieve high concurrency compared to traditional sync frameworks, and how do you organize dependency injection and async database sessions?",
        "points": [
            "Situation: High-throughput async API design.",
            "Task: Structuring clean, decoupled service layers.",
            "Action: Leveraging ASGI (Uvicorn), async def with async DB drivers (AsyncPG), and FastAPI Depends.",
            "Result: Scalable throughput handling thousands of QPS."
        ],
        "rationale": "Verifies modern async Python design patterns."
    },
    "React": {
        "question": "How do you diagnose and prevent unnecessary re-renders in large React component trees, and when is client state vs. server state (e.g. React Query) appropriate?",
        "points": [
            "Situation: Sluggish UI rendering with complex dashboard states.",
            "Task: Profiling component render cycles.",
            "Action: Profiler DevTools, useMemo/useCallback boundaries, normalizing state, separating UI state from server data.",
            "Result: 60fps responsiveness and cleaner maintainable code."
        ],
        "rationale": "Gauges frontend performance optimization and modern state architecture."
    },
    "AWS": {
        "question": "Describe an architecture you designed or managed on AWS. How did you balance cost, security (IAM least privilege), and fault tolerance?",
        "points": [
            "Situation: Building or migrating infrastructure to the cloud.",
            "Task: Meeting availability and budget SLAs.",
            "Action: VPC subnets, IAM role separation, auto-scaling groups, and CloudWatch alerting.",
            "Result: Predictable monthly spend and resilient uptime."
        ],
        "rationale": "Checks cloud architecture fundamentals and security posture."
    },
    "CI/CD": {
        "question": "Walk me through how you design an automated CI/CD pipeline from pull request to production deployment. How do you handle secrets and automated rollback?",
        "points": [
            "Situation: Manual error-prone deployments causing release anxiety.",
            "Task: Establishing automated pipelines with guardrails.",
            "Action: GitHub Actions with linting, unit/integration tests, staging deploys, and automated canary checks.",
            "Result: Deployment frequency increased from weeks to multiple times a day."
        ],
        "rationale": "Crucial for assessing software delivery cadence and automated QA maturity."
    }
}

DEFAULT_BEHAVIORAL_QUESTIONS = [
    {
        "category": "Behavioral (STAR Method)",
        "skill_targeted": "Conflict Resolution & Collaboration",
        "question": "Tell me about a time when you and another engineer or product manager strongly disagreed on a technical decision. How did you navigate the discussion and what was the outcome?",
        "points": [
            "Situation: Conflicting priorities or differing architectural philosophies.",
            "Task: Achieving consensus without delaying project deadlines.",
            "Action: Formulating pros/cons matrices, running small POCs, and listening empathetically to trade-offs.",
            "Result: Mutual buy-in and a robust solution that met business goals."
        ],
        "rationale": "Demonstrates team maturity, emotional intelligence, and objective problem-solving."
    },
    {
        "category": "Behavioral (STAR Method)",
        "skill_targeted": "Production Incident & Ownership",
        "question": "Can you describe a production bug, service outage, or critical mistake you were involved in? What steps did you take to mitigate it and what did you implement to ensure it never happens again?",
        "points": [
            "Situation: Unexpected production failure impacting real users.",
            "Task: Triaging and restoring service while under pressure.",
            "Action: Rollback or hotfix, transparent status communication, and leading a blameless post-mortem.",
            "Result: Added regression tests, monitoring alerts, and improved system resilience."
        ],
        "rationale": "Reveals accountability, poise under pressure, and continuous improvement mindset."
    }
]


def generate_interview_questions(
    job_title: str,
    matched_skills: List[str],
    missing_skills: List[str],
    experience_level: str
) -> List[InterviewQuestion]:
    """
    Generates an interview pack for hiring managers.
    Targets missing skills first, then tests depth in matched skills,
    and concludes with core engineering behavioral questions.
    """
    questions: List[InterviewQuestion] = []

    # 1. Technical Gap Probes (Target missing required skills)
    for skill in missing_skills[:2]:
        if skill in SKILL_QUESTION_BANK:
            entry = SKILL_QUESTION_BANK[skill]
            questions.append(InterviewQuestion(
                category="Technical Gap Exploration",
                skill_targeted=skill,
                question=f"[Skill Gap Probe for {skill}]: {entry['question']}",
                suggested_star_points=entry["points"],
                rationale=f"Candidate did not explicitly list {skill}. {entry['rationale']}"
            ))
        else:
            questions.append(InterviewQuestion(
                category="Technical Gap Exploration",
                skill_targeted=skill,
                question=f"[Skill Gap Probe for {skill}]: What experience do you have with {skill} or similar alternative tools, and how quickly have you picked up unfamiliar technologies in the past?",
                suggested_star_points=[
                    "Situation: Needing to deliver a feature with an unfamiliar technology.",
                    "Task: Learning the fundamentals and architecture patterns quickly.",
                    "Action: Reading documentation, building prototypes, leveraging prior analogous tools.",
                    "Result: Successful delivery on schedule."
                ],
                rationale=f"Verifies learning agility and conceptual transferability for {skill}."
            ))

    # 2. Technical Depth Probes (Target candidate's declared matched skills)
    for skill in matched_skills[:2]:
        if skill in SKILL_QUESTION_BANK:
            entry = SKILL_QUESTION_BANK[skill]
            questions.append(InterviewQuestion(
                category="Technical Depth Verification",
                skill_targeted=skill,
                question=f"[Core Proficiency - {skill}]: {entry['question']}",
                suggested_star_points=entry["points"],
                rationale=f"Validates senior-level mastery of declared skill {skill}."
            ))
            if len(questions) >= 4:
                break

    # 3. Behavioral STAR Questions
    for beh in DEFAULT_BEHAVIORAL_QUESTIONS:
        questions.append(InterviewQuestion(
            category=beh["category"],
            skill_targeted=beh["skill_targeted"],
            question=beh["question"],
            suggested_star_points=beh["points"],
            rationale=beh["rationale"]
        ))

    return questions
