"""
Skill Extraction Engine with Canonical Taxonomy & Alias Resolution.
Extracts technical, cloud, data, and soft skills from resumes and job descriptions.
"""

import re
from typing import Dict, List, Set, Tuple, Any

# Comprehensive taxonomy categorized for HR & recruiter clarity
TAXONOMY: Dict[str, Dict[str, List[str]]] = {
    "Languages": {
        "Python": ["python", "python3", "py"],
        "JavaScript": ["javascript", "js", "ecmascript"],
        "TypeScript": ["typescript", "ts"],
        "Java": ["java", "jvm"],
        "C++": ["c++", "cpp"],
        "C#": ["c#", "csharp", ".net c#"],
        "Go": ["golang", "go programming"],
        "Rust": ["rust", "rustlang"],
        "SQL": ["sql", "t-sql", "pl/sql"],
        "HTML/CSS": ["html", "html5", "css", "css3", "sass", "scss"],
        "Shell/Bash": ["bash", "shell scripting", "zsh", "powershell"],
        "Ruby": ["ruby", "ruby on rails"],
        "Kotlin": ["kotlin"],
        "Swift": ["swift"],
    },
    "Frontend": {
        "React": ["react", "react.js", "reactjs"],
        "Next.js": ["next.js", "nextjs"],
        "Vue.js": ["vue", "vue.js", "vuejs"],
        "Angular": ["angular", "angularjs", "angular 2+"],
        "Tailwind CSS": ["tailwind", "tailwindcss"],
        "Redux": ["redux", "redux toolkit", "rtk"],
        "Vite": ["vite", "vitejs"],
        "Webpack": ["webpack"],
    },
    "Backend": {
        "FastAPI": ["fastapi"],
        "Node.js": ["node.js", "nodejs", "node"],
        "Express": ["express", "express.js", "expressjs"],
        "Django": ["django", "django rest framework", "drf"],
        "Flask": ["flask"],
        "Spring Boot": ["spring boot", "spring framework", "spring"],
        "REST API": ["rest", "restful", "rest api", "restful apis"],
        "GraphQL": ["graphql", "apollo graphql"],
        "Microservices": ["microservices", "microservice architecture", "distributed systems"],
        "gRPC": ["grpc", "protocol buffers", "protobuf"],
    },
    "Cloud & DevOps": {
        "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudformation", "iam"],
        "Docker": ["docker", "containerization", "docker-compose"],
        "Kubernetes": ["kubernetes", "k8s"],
        "CI/CD": ["ci/cd", "ci cd", "continuous integration", "continuous deployment"],
        "GitHub Actions": ["github actions", "gh actions"],
        "Terraform": ["terraform", "iac", "infrastructure as code"],
        "Linux": ["linux", "ubuntu", "debian", "centos", "redhat"],
        "Azure": ["azure", "microsoft azure"],
        "Google Cloud": ["google cloud", "gcp", "google cloud platform"],
        "Git": ["git", "github", "gitlab", "version control"],
    },
    "Databases & Caching": {
        "PostgreSQL": ["postgresql", "postgres"],
        "MySQL": ["mysql"],
        "MongoDB": ["mongodb", "mongo"],
        "Redis": ["redis", "in-memory cache"],
        "SQLite": ["sqlite", "sqlite3"],
        "Elasticsearch": ["elasticsearch", "elastic search", "elk"],
        "Kafka": ["kafka", "apache kafka", "event streaming"],
        "RabbitMQ": ["rabbitmq", "message queue"],
    },
    "AI & Data Science": {
        "Machine Learning": ["machine learning", "ml", "supervised learning", "unsupervised learning"],
        "Deep Learning": ["deep learning", "neural networks", "cnn", "rnn", "lstm"],
        "PyTorch": ["pytorch", "torch"],
        "TensorFlow": ["tensorflow", "keras"],
        "Scikit-Learn": ["scikit-learn", "sklearn"],
        "NLP": ["natural language processing", "nlp", "llm", "large language models", "transformers"],
        "Pandas": ["pandas"],
        "NumPy": ["numpy"],
    },
    "Data Engineering & Analytics": {
        "Apache Spark": ["spark", "apache spark", "pyspark"],
        "Snowflake": ["snowflake", "snowflake data warehouse"],
        "Airflow": ["airflow", "apache airflow"],
        "dbt": ["dbt", "data build tool"],
        "Databricks": ["databricks"],
        "BigQuery": ["bigquery", "google bigquery"],
    },
    "Mobile & Cross-Platform": {
        "React Native": ["react native"],
        "Flutter": ["flutter", "dart"],
        "iOS Development": ["ios", "swiftui", "uikit"],
        "Android Development": ["android", "jetpack compose"],
    },
    "Security & Compliance": {
        "Application Security": ["appsec", "application security", "secure coding"],
        "OWASP": ["owasp", "owasp top 10"],
        "Penetration Testing": ["penetration testing", "pen testing", "vulnerability assessment"],
        "SIEM / SOC": ["siem", "soc", "incident response", "splunk"],
        "SOC 2 / Compliance": ["soc 2", "iso 27001", "gdpr", "hipaa"],
    },
    "Architecture & Methodologies": {
        "System Design": ["system design", "high level design", "low level design", "architecture"],
        "Agile / Scrum": ["agile", "scrum", "kanban", "sprints"],
        "Test-Driven Development (TDD)": ["tdd", "unit testing", "test driven development", "integration testing"],
        "Clean Code": ["clean code", "code review", "solid principles", "design patterns"],
        "API Design": ["api design", "openapi", "swagger"],
    }
}

# Precompile regex patterns for high-performance extraction
def _compile_patterns() -> List[Tuple[str, str, re.Pattern]]:
    patterns = []
    for category, skills in TAXONOMY.items():
        for canonical_name, aliases in skills.items():
            for alias in aliases:
                # Word boundary matching with punctuation escape
                escaped = re.escape(alias)
                # Ensure boundary logic accommodates symbols like C++, C#, .NET
                if alias in ["c++", "c#"]:
                    pattern = re.compile(rf"(?:^|\s|\b|/){escaped}(?:\s|$|\b|,|/|\.)", re.IGNORECASE)
                elif alias == "go":
                    # Disambiguate "go" programming language from ordinary word "go"
                    pattern = re.compile(r"\b(?:golang|go\s+programming|go\s+developer|go\s+backend)\b", re.IGNORECASE)
                else:
                    pattern = re.compile(rf"\b{escaped}\b", re.IGNORECASE)
                patterns.append((category, canonical_name, pattern))
    return patterns

COMPILED_PATTERNS = _compile_patterns()


def extract_skills(text: str) -> Tuple[List[str], Dict[str, List[str]]]:
    """
    Extracts canonical skills and categorizes them.
    Returns:
        (flat_skill_list, categorized_skills_dict)
    """
    if not text:
        return [], {}

    found_skills: Set[str] = set()
    categorized: Dict[str, List[str]] = {cat: [] for cat in TAXONOMY.keys()}

    for category, canonical_name, pattern in COMPILED_PATTERNS:
        if pattern.search(text):
            if canonical_name not in found_skills:
                found_skills.add(canonical_name)
                categorized[category].append(canonical_name)

    # Filter out empty categories
    cleaned_categorized = {k: sorted(v) for k, v in categorized.items() if v}
    return sorted(list(found_skills)), cleaned_categorized


def compare_skill_sets(
    candidate_skills: List[str],
    required_skills: List[str],
    preferred_skills: List[str]
) -> Dict[str, Any]:
    """
    Compares candidate skills against job requirements.
    Calculates matched, missing required, missing preferred, and bonus skills.
    """
    cand_set = set(candidate_skills)
    req_set = set(required_skills)
    pref_set = set(preferred_skills)

    matched = sorted(list(cand_set.intersection(req_set.union(pref_set))))
    missing_req = sorted(list(req_set - cand_set))
    missing_pref = sorted(list(pref_set - cand_set))
    bonus = sorted(list(cand_set - (req_set.union(pref_set))))

    # Weighted match ratio: required skills weigh 75%, preferred skills weigh 25%
    req_weight = 0.75
    pref_weight = 0.25

    req_score = (len(req_set - set(missing_req)) / len(req_set)) if req_set else 1.0
    pref_score = (len(pref_set - set(missing_pref)) / len(pref_set)) if pref_set else 1.0

    match_percentage = round((req_score * req_weight + pref_score * pref_weight) * 100, 1)

    return {
        "matched_skills": matched,
        "missing_required_skills": missing_req,
        "missing_preferred_skills": missing_pref,
        "bonus_skills": bonus,
        "match_percentage": match_percentage
    }
