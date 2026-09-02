"""
Preloaded Sample Resumes and Job Descriptions for 1-Click HR & Recruiter Demonstration.
"""

SAMPLE_JOBS = [
    {
        "id": "job-1",
        "title": "Full Stack Software Engineer",
        "company": "StripeScale Technologies",
        "department": "Core Platform",
        "experience_level": "Mid-Level",
        "required_skills": ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "REST API"],
        "preferred_skills": ["AWS", "Redis", "CI/CD", "Tailwind CSS", "Kubernetes"],
        "description": """
About the Role:
We are seeking a versatile Full Stack Software Engineer to build resilient customer-facing workflows and scalable backend microservices. You will collaborate with product designers, frontend engineers, and DevOps leads to deliver mission-critical web applications.

Responsibilities:
- Design, implement, and maintain high-throughput REST APIs using Python and FastAPI.
- Architect dynamic, responsive user interfaces using React, TypeScript, and Tailwind CSS.
- Optimize complex database queries and migrations in PostgreSQL.
- Package services in Docker containers and deploy via automated CI/CD pipelines.
- Integrate Redis caching layers to reduce API P99 latency.

Requirements:
- 2+ years of professional experience building web applications.
- Strong proficiency with Python (FastAPI/Django) and modern TypeScript/React.
- Solid understanding of relational database schema design with PostgreSQL.
- Experience with Docker containerization and version control with Git.
- Exposure to cloud environments (AWS/GCP) and CI/CD pipelines is a strong plus.
"""
    },
    {
        "id": "job-2",
        "title": "Senior Backend Distributed Systems Engineer",
        "company": "Apex Fintech Solutions",
        "department": "Payments Infrastructure",
        "experience_level": "Senior",
        "required_skills": ["Python", "Go", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "System Design", "Microservices"],
        "preferred_skills": ["AWS", "Terraform", "Docker", "gRPC", "CI/CD"],
        "description": """
About the Role:
Join our Payments Infrastructure team to engineer high-volume transactional pipelines processing millions of dollars daily. We are building the next generation of event-driven distributed ledgers.

Responsibilities:
- Architect fault-tolerant microservices using Python and Go with gRPC communication.
- Scale event streaming platforms handling 50,000+ events/second using Apache Kafka and Redis.
- Orchestrate distributed microservices across multi-region Kubernetes clusters.
- Conduct deep architectural reviews, perform load testing, and resolve database concurrency deadlocks.
- Mentor junior and mid-level engineers in clean code and system design principles.

Requirements:
- 5+ years of software engineering experience focusing on backend distributed systems.
- Deep expertise in relational databases (PostgreSQL tuning) and in-memory caches (Redis).
- Hands-on experience with Kafka or RabbitMQ event streaming.
- Production Kubernetes and containerization experience.
- Strong background in concurrent programming and high-availability architecture.
"""
    },
    {
        "id": "job-3",
        "title": "Machine Learning & NLP Engineer",
        "company": "CognitiveFlow AI",
        "department": "Applied Research",
        "experience_level": "Mid-Level",
        "required_skills": ["Python", "Machine Learning", "Deep Learning", "PyTorch", "NLP", "Scikit-Learn", "Docker"],
        "preferred_skills": ["FastAPI", "SQL", "Pandas", "AWS", "Git"],
        "description": """
About the Role:
We are looking for an Applied Machine Learning Engineer to design and deploy state-of-the-art NLP models and retrieval-augmented generation (RAG) pipelines for enterprise search.

Responsibilities:
- Train, fine-tune, and evaluate transformer models using PyTorch and Hugging Face.
- Build production inference pipelines with FastAPI and Docker.
- Implement vector search, embedding models, and text classification workflows.
- Partner with data engineering to clean and process multi-gigabyte text corpora using Pandas and NumPy.

Requirements:
- 2+ years of experience applying machine learning algorithms to real-world datasets.
- Strong proficiency in Python, PyTorch, and Scikit-Learn.
- Practical experience with Natural Language Processing (NLP) and transformer architectures.
- Experience containerizing ML applications with Docker for cloud deployment.
"""
    },
    {
        "id": "job-4",
        "title": "Junior Frontend Developer",
        "company": "Nova Interactive Studio",
        "department": "Product UI/UX",
        "experience_level": "Junior",
        "required_skills": ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Git"],
        "preferred_skills": ["Next.js", "REST API", "Vite", "Agile / Scrum"],
        "description": """
About the Role:
Nova Studio is looking for an enthusiastic Junior Frontend Developer to join our growing design-tech team. You will turn Figma prototypes into silky-smooth, responsive web apps.

Responsibilities:
- Build modular, accessible UI components in React and TypeScript.
- Style intuitive user experiences using Tailwind CSS.
- Connect client-side components to backend REST APIs.
- Participate in code reviews, daily standups, and UI polish sprints.

Requirements:
- 0 to 2 years of experience or recent Computer Science graduate with personal projects.
- Solid grasp of React, JavaScript (ES6+), TypeScript, and CSS/Tailwind.
- Familiarity with Git, GitHub pull requests, and modern web developer tooling.
"""
    }
]

SAMPLE_RESUMES = [
    {
        "id": "cand-1",
        "name": "Alex Chen",
        "title": "Full Stack Software Engineer",
        "email": "alex.chen.dev@gmail.com",
        "phone": "(415) 892-3104",
        "linkedin": "linkedin.com/in/alexchen-eng",
        "github": "github.com/alexchen-dev",
        "years_experience": 4.5,
        "raw_text": """
ALEX CHEN
San Francisco, CA | alex.chen.dev@gmail.com | (415) 892-3104 | linkedin.com/in/alexchen-eng | github.com/alexchen-dev

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 4.5 years of experience architecting high-traffic web applications, scalable REST APIs, and responsive frontends. Proven track record reducing API latency by 45% and leading cross-functional migration to modern microservices.

TECHNICAL SKILLS
- Languages: Python, TypeScript, JavaScript, SQL, HTML/CSS, Shell/Bash
- Frontend: React, Next.js, Tailwind CSS, Redux, Vite
- Backend: FastAPI, Node.js, Express, REST API, Microservices
- Cloud & DevOps: Docker, AWS, CI/CD, GitHub Actions, Linux, Git
- Databases: PostgreSQL, Redis, MySQL

WORK EXPERIENCE
Senior Full Stack Developer | CloudScale Solutions | 2022 - Present
- Architected and deployed 12+ RESTful microservices using Python and FastAPI, handling over 2.5M daily requests with 99.98% uptime.
- Engineered modern single-page dashboard using React, TypeScript, and Tailwind CSS, improving user session duration by 35%.
- Implemented Redis caching strategy and optimized PostgreSQL database queries, reducing P99 latency by 48% across key endpoints.
- Spearheaded migration to Docker containerization and built GitHub Actions CI/CD pipeline, decreasing deployment time from 40 minutes to under 6 minutes.
- Mentored 4 junior engineers on clean code, unit testing, and design patterns.

Full Stack Developer | Nexa Digital Labs | 2020 - 2022
- Developed responsive web applications using React, Node.js, and Express for 8 enterprise clients.
- Designed database schemas in PostgreSQL and MySQL, writing automated migrations and database seeders.
- Automated end-to-end integration tests using Pytest and Jest, achieving 88% test coverage.
- Integrated third-party payment gateways (Stripe) and webhook listeners processing $850k in monthly transactions.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2016 - 2020
- Relevant Coursework: Data Structures & Algorithms, Distributed Systems, Database Management Systems.
"""
    },
    {
        "id": "cand-2",
        "name": "Sarah Jenkins",
        "title": "Junior Software Engineer / CS Graduate",
        "email": "sarah.jenkins.cs@outlook.com",
        "phone": "(512) 402-9811",
        "linkedin": "linkedin.com/in/sarahjenkins-cs",
        "github": "github.com/sjenkins-code",
        "years_experience": 1.0,
        "raw_text": """
SARAH JENKINS
Austin, TX | sarah.jenkins.cs@outlook.com | (512) 402-9811 | linkedin.com/in/sarahjenkins-cs | github.com/sjenkins-code

PROFESSIONAL SUMMARY
Enthusiastic Computer Science graduate with strong foundations in object-oriented programming, modern web frameworks, and algorithmic problem solving. Experienced in building full-stack applications with React, TypeScript, and Python.

TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, Java, SQL, HTML/CSS
- Frontend: React, Tailwind CSS, HTML5, CSS3, Vite
- Backend: FastAPI, REST API, Node.js
- Databases & Tools: PostgreSQL, SQLite, Git, GitHub, Linux, Agile / Scrum

FEATURED PROJECTS
DevPulse - Developer Productivity Tracker (Full Stack)
- Built interactive developer task management application using React, TypeScript, and Tailwind CSS.
- Developed backend REST API in FastAPI with PostgreSQL database integration, supporting JWT authentication.
- Deployed frontend to Vercel and backend to Render with automated GitHub Actions CI/CD workflows.

Algorithm Visualizer Platform
- Created interactive visualizer for sorting and graph algorithms in React and JavaScript.
- Reached 1,200 unique monthly visitors on GitHub Pages with 150+ GitHub stars.

WORK EXPERIENCE
Software Engineering Intern | Austin Tech Innovations | 2023 - 2023
- Built responsive UI components in React and TypeScript for customer billing portal.
- Wrote unit tests and assisted in debugging REST API endpoints in Python.
- Collaborated in daily agile standups and bi-weekly sprint planning meetings.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin | 2020 - 2024
- GPA: 3.82 / 4.0
- Honors: Dean's Honor Roll (4 consecutive semesters)
"""
    },
    {
        "id": "cand-3",
        "name": "Marcus Vance",
        "title": "Staff Cloud & DevOps Systems Architect",
        "email": "m.vance.cloud@protonmail.com",
        "phone": "(206) 555-7281",
        "linkedin": "linkedin.com/in/marcus-vance-cloud",
        "github": "github.com/marcusvance",
        "years_experience": 8.0,
        "raw_text": """
MARCUS VANCE
Seattle, WA | m.vance.cloud@protonmail.com | (206) 555-7281 | linkedin.com/in/marcus-vance-cloud | github.com/marcusvance

PROFESSIONAL SUMMARY
Senior Cloud & Infrastructure Architect with 8 years of experience designing high-scale multi-region cloud systems. Specialist in Kubernetes orchestration, Infrastructure as Code, Kafka streaming, and zero-downtime microservices.

TECHNICAL SKILLS
- Cloud & Orchestration: AWS, Kubernetes, Docker, Terraform, CI/CD, Linux, GitHub Actions
- Languages: Go, Python, Shell/Bash, SQL
- Data & Streaming: Kafka, Redis, PostgreSQL, Elasticsearch
- Architecture: Microservices, System Design, Distributed Systems, High Availability

WORK EXPERIENCE
Principal Cloud Infrastructure Architect | HyperScale Networks | 2021 - Present
- Designed and operated multi-cluster Kubernetes infrastructure on AWS supporting 15M daily active users.
- Automated cloud provisioning using Terraform, reducing environment spin-up time from 4 days to 18 minutes.
- Architected enterprise Kafka message bus handling 80,000 transactions per second with sub-20ms latency.
- Cut annual AWS cloud expenditure by $420k through spot instance orchestration and auto-scaling policies.

Senior DevOps Engineer | CloudBridge Systems | 2018 - 2021
- Led company-wide containerization initiative, migrating 45 monolith services to Docker and Kubernetes.
- Established enterprise CI/CD pipelines with automated security vulnerability scanning and canary deployments.
- Implemented centralized observability with Prometheus, Grafana, and Elasticsearch across 200+ microservices.

EDUCATION
Bachelor of Science in Computer Engineering | University of Washington | 2014 - 2018
"""
    },
    {
        "id": "cand-4",
        "name": "Priya Patel",
        "title": "Machine Learning & NLP Specialist",
        "email": "priya.patel.ai@gmail.com",
        "phone": "(617) 492-1188",
        "linkedin": "linkedin.com/in/priya-patel-ml",
        "github": "github.com/priyapatel-ai",
        "years_experience": 3.5,
        "raw_text": """
PRIYA PATEL
Boston, MA | priya.patel.ai@gmail.com | (617) 492-1188 | linkedin.com/in/priya-patel-ml | github.com/priyapatel-ai

PROFESSIONAL SUMMARY
Machine Learning Engineer with 3.5 years of industry experience developing NLP models, vector search engines, and high-throughput model inference pipelines. Published researcher with expertise in PyTorch and transformer fine-tuning.

TECHNICAL SKILLS
- ML & AI: Machine Learning, Deep Learning, PyTorch, Scikit-Learn, NLP, Transformers
- Languages: Python, SQL, Shell/Bash
- Data Tools: Pandas, NumPy, Scikit-Learn, Elasticsearch
- Deployment: Docker, FastAPI, Git, Linux, AWS

WORK EXPERIENCE
Machine Learning Engineer | Semantic Minds AI | 2022 - Present
- Fine-tuned transformer models for multi-class legal document classification, achieving 94.2% F1 score.
- Architected low-latency inference service using FastAPI and Docker, processing 650 inference requests per second.
- Reduced model memory footprint by 55% using 8-bit quantization and ONNX runtime optimizations.
- Built automated data cleaning and embedding generation pipelines using Pandas and PyTorch.

Data Scientist | Apex Analytics | 2021 - 2022
- Developed predictive churn forecasting models with Scikit-Learn, delivering an estimated $310k in customer retention.
- Created interactive dashboards and automated SQL extraction scripts for executive leadership.

EDUCATION
Master of Science in Artificial Intelligence | Boston University | 2019 - 2021
Bachelor of Science in Computer Science | University of Massachusetts Amherst | 2015 - 2019
"""
    }
]
