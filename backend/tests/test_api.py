from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "capabilities" in data

def test_get_jobs():
    response = client.get("/api/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 3
    assert "title" in jobs[0]

def test_get_sample_resumes():
    response = client.get("/api/sample-resumes")
    assert response.status_code == 200
    resumes = response.json()
    assert len(resumes) >= 3
    assert "name" in resumes[0]

def test_parse_resume_raw_text():
    sample_text = """
    John Doe
    john@example.com | 123-456-7890 | github.com/johndoe
    Work Experience
    Backend Engineer | Cloud Inc | 2021 - 2024
    - Built Python APIs and managed Redis caches.
    Skills
    Python, FastAPI, Redis, Docker
    """
    response = client.post("/api/parse-resume", data={"raw_text": sample_text})
    assert response.status_code == 200
    data = response.json()
    assert data["contact"]["email"] == "john@example.com"
    assert "Python" in data["skills"]

def test_match_endpoint():
    sample_text = """
    Alice Wonderland
    alice@wonder.dev
    Experience
    Full Stack Developer | 2022 - Present
    - Developed React frontends and FastAPI backends with Docker.
    Skills
    React, Python, FastAPI, Docker, PostgreSQL
    """
    payload = {
        "resume_text": sample_text,
        "job_id": "job-1"
    }
    response = client.post("/api/match", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_score" in data
    assert "fit_verdict" in data
    assert "skill_breakdown" in data
    assert "ats_audit" in data

def test_recruiter_rank_endpoint():
    payload = {"job_id": "job-1"}
    response = client.post("/api/recruiter/rank", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "leaderboard" in data
    assert len(data["leaderboard"]) >= 2
    # Verify descending sort order by overall score
    scores = [c["overall_score"] for c in data["leaderboard"]]
    assert scores == sorted(scores, reverse=True)
