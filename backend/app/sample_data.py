"""
Preloaded Sample Resumes and Job Descriptions for 1-Click Demonstration.
Covers 12 diverse industry roles across engineering, data, cloud, mobile, and security.
"""

SAMPLE_JOBS = [
    {
        "id": "job-1",
        "title": "Full Stack Software Engineer",
        "company": "StripeScale Technologies",
        "department": "Engineering",
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
        "department": "Engineering",
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
        "department": "Data & AI",
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
        "department": "Frontend",
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
    },
    {
        "id": "job-5",
        "title": "Cloud DevOps & Site Reliability Lead (SRE)",
        "company": "TerraScale Cloud Infrastructure",
        "department": "Cloud & DevOps",
        "experience_level": "Senior",
        "required_skills": ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Linux", "GitHub Actions"],
        "preferred_skills": ["Go", "Python", "Prometheus", "Elasticsearch", "System Design"],
        "description": """
About the Role:
TerraScale is seeking a Cloud DevOps and Site Reliability Engineer to spearhead our cloud infrastructure automation, multi-region Kubernetes deployments, and zero-downtime release pipelines.

Responsibilities:
- Author and maintain Infrastructure as Code (IaC) modules using Terraform on AWS.
- Manage multi-cluster Kubernetes environments with GitOps and ArgoCD.
- Build automated CI/CD deployment pipelines with security scanning and canary rollouts.
- Establish SLOs, SLIs, and monitoring dashboards with Prometheus, Grafana, and Datadog.

Requirements:
- 4+ years in DevOps, SRE, or Cloud Infrastructure engineering.
- Production proficiency with AWS cloud architecture and Kubernetes orchestration.
- Mastery of Terraform, Linux systems administration, and automated CI/CD.
"""
    },
    {
        "id": "job-6",
        "title": "Mobile Application Engineer (React Native / iOS)",
        "company": "PulseMobility Health",
        "department": "Mobile",
        "experience_level": "Mid-Level",
        "required_skills": ["React Native", "TypeScript", "JavaScript", "REST API", "Git", "HTML/CSS"],
        "preferred_skills": ["iOS Development", "Android Development", "Redux", "CI/CD"],
        "description": """
About the Role:
Join PulseMobility to build high-performance, accessible cross-platform mobile apps for digital health and patient telemetry monitoring.

Responsibilities:
- Build cross-platform mobile features using React Native, TypeScript, and modern state managers.
- Optimize app rendering performance, offline synchronization, and background battery usage.
- Integrate native device APIs (camera, Bluetooth, biometrics) and secure local storage.
- Publish and manage app builds through iOS TestFlight and Google Play Console.

Requirements:
- 2+ years of professional React Native or mobile development experience.
- Strong TypeScript/JavaScript foundations with clean UI/UX implementation.
- Experience consuming RESTful APIs and handling offline-first state architecture.
"""
    },
    {
        "id": "job-7",
        "title": "Application Security & DevSecOps Specialist",
        "company": "CyberShield Defense",
        "department": "Security",
        "experience_level": "Mid-Level",
        "required_skills": ["Application Security", "OWASP", "Python", "Linux", "Docker", "CI/CD"],
        "preferred_skills": ["Penetration Testing", "SIEM / SOC", "AWS", "Git", "SOC 2 / Compliance"],
        "description": """
About the Role:
CyberShield is hiring an Application Security Specialist to embed automated security testing into our software development lifecycle and conduct vulnerability assessments.

Responsibilities:
- Conduct threat modeling, architecture reviews, and code audits against OWASP Top 10 vulnerabilities.
- Integrate SAST, DAST, and dependency scanning into automated CI/CD pipelines.
- Investigate security alerts, triage bug bounty findings, and coordinate remediation.
- Partner with engineering teams to promote secure coding guidelines and encryption standards.

Requirements:
- 2+ years in Application Security (AppSec) or cybersecurity operations.
- Strong knowledge of web application security risks (XSS, SQLi, CSRF, SSRF, AuthN/AuthZ).
- Familiarity with CI/CD automation, container security, and script-level Python/Bash.
"""
    },
    {
        "id": "job-8",
        "title": "Data Platform & Analytics Engineer",
        "company": "DataVanguard Analytics",
        "department": "Data & AI",
        "experience_level": "Mid-Level",
        "required_skills": ["Python", "SQL", "Apache Spark", "Snowflake", "dbt", "Airflow"],
        "preferred_skills": ["PostgreSQL", "AWS", "Databricks", "Kafka", "Docker"],
        "description": """
About the Role:
Build and optimize our centralized data warehouse and real-time analytical processing pipelines powering business intelligence and ML models.

Responsibilities:
- Develop robust, idempotent batch and streaming ETL pipelines using Apache Spark and Python.
- Model dimensional data marts and transformations in Snowflake using dbt.
- Orchestrate complex pipeline dependencies and scheduling with Apache Airflow.
- Implement data quality assertions, schema validation, and pipeline health monitoring.

Requirements:
- 2+ years of experience in data engineering or analytical platform design.
- Advanced SQL proficiency (window functions, query plan optimization).
- Hands-on experience with modern data stacks: Snowflake, dbt, Spark, and Airflow.
"""
    },
    {
        "id": "job-9",
        "title": "QA Automation Lead & SDET",
        "company": "QualiTech Global",
        "department": "Engineering",
        "experience_level": "Mid-Level",
        "required_skills": ["Python", "JavaScript", "Test-Driven Development (TDD)", "CI/CD", "Git", "REST API"],
        "preferred_skills": ["Docker", "Linux", "Agile / Scrum", "FastAPI"],
        "description": """
About the Role:
We are looking for a Software Development Engineer in Test (SDET) to architect automated end-to-end testing frameworks and elevate product quality across our cloud apps.

Responsibilities:
- Design and execute scalable automated test suites (API, UI, integration, regression) in Python and TypeScript.
- Embed automated tests into GitHub Actions CI pipelines with parallel test execution.
- Collaborate with software engineers to enforce Test-Driven Development (TDD) practices.
- Monitor test flakiness, latency, and report automated coverage metrics to leadership.

Requirements:
- 3+ years in software test automation or quality engineering.
- Proficient in Python or JavaScript/TypeScript test frameworks (Pytest, Playwright, Cypress).
- Experience testing RESTful microservices, asynchronous message queues, and databases.
"""
    },
    {
        "id": "job-10",
        "title": "Technical Product Manager (Core Infrastructure)",
        "company": "HyperGrid Cloud Systems",
        "department": "Product",
        "experience_level": "Senior",
        "required_skills": ["Agile / Scrum", "System Design", "API Design", "Clean Code", "SQL"],
        "preferred_skills": ["Microservices", "Cloud & DevOps", "AWS", "Python"],
        "description": """
About the Role:
HyperGrid is seeking a Technical Product Manager to bridge developer experience, cloud infrastructure roadmaps, and business customer requirements.

Responsibilities:
- Define technical product requirements, API contracts, and architectural roadmaps for developer tools.
- Lead sprint planning, grooming, and retrospectives in an agile engineering environment.
- Analyze system metrics, API adoption trends, and error telemetry using SQL and dashboarding tools.
- Engage directly with engineering leads and enterprise clients to resolve architectural trade-offs.

Requirements:
- 3+ years in Technical Product Management or combined software engineering + PM background.
- Deep comfort discussing distributed systems, API design principles, and cloud infrastructure.
- Exceptional cross-functional leadership, user story authoring, and analytical acumen.
"""
    },
    {
        "id": "job-11",
        "title": "Embedded Systems & Firmware Engineer",
        "company": "AeroMotion Robotics",
        "department": "Engineering",
        "experience_level": "Mid-Level",
        "required_skills": ["C++", "Linux", "System Design", "Git", "Clean Code"],
        "preferred_skills": ["Python", "Docker", "Test-Driven Development (TDD)", "Shell/Bash"],
        "description": """
About the Role:
AeroMotion builds autonomous robotics and aerial telemetry units. We are looking for an Embedded C++ Engineer to write deterministic real-time firmware and sensor fusion drivers.

Responsibilities:
- Architect low-latency firmware in modern C++ on embedded Linux and RTOS architectures.
- Implement communication protocols (CAN, SPI, I2C, UART) for sensor data ingestion.
- Profile memory usage, thread safety, and deterministic execution cycles.
- Integrate hardware-in-the-loop (HIL) automated test fixtures.

Requirements:
- 2+ years of embedded software or firmware engineering experience.
- Strong proficiency in modern C++ and low-level Linux systems programming.
- Familiarity with hardware interfaces, memory profiling, and real-time constraints.
"""
    },
    {
        "id": "job-12",
        "title": "Enterprise Solutions Architect",
        "company": "OmniCloud Enterprise Advisory",
        "department": "Cloud & DevOps",
        "experience_level": "Senior",
        "required_skills": ["AWS", "Microservices", "System Design", "API Design", "PostgreSQL", "Docker", "Kubernetes"],
        "preferred_skills": ["Azure", "Google Cloud", "Kafka", "Terraform", "Redis"],
        "description": """
About the Role:
OmniCloud guides Fortune 500 enterprises through cloud transformations. We need an Enterprise Solutions Architect to design resilient cloud-native architectures.

Responsibilities:
- Author comprehensive High-Level and Low-Level architecture design documents for enterprise clients.
- Modernize legacy monolithic systems into decoupled microservices and event-driven backbones.
- Evaluate cloud cost optimization, disaster recovery, data sovereignty, and security posture.
- Advise CTOs, VPs of Engineering, and lead development squads through technical execution.

Requirements:
- 6+ years of software architecture and cloud engineering experience.
- Deep mastery of distributed systems design, microservices patterns, and multi-cloud architectures.
- Proven track record communicating technical trade-offs to executive stakeholders.
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
        "title": "Software Engineer (Full Stack & Systems)",
        "email": "sarah.jenkins.cs@outlook.com",
        "phone": "(512) 402-9811",
        "linkedin": "linkedin.com/in/sarahjenkins-cs",
        "github": "github.com/sjenkins-code",
        "years_experience": 1.5,
        "raw_text": """
SARAH JENKINS
Austin, TX | sarah.jenkins.cs@outlook.com | (512) 402-9811 | linkedin.com/in/sarahjenkins-cs | github.com/sjenkins-code

PROFESSIONAL SUMMARY
Dynamic Software Engineer with strong foundations in full-stack web applications, REST APIs, relational databases, and algorithmic problem solving. Experienced in React, TypeScript, Python, and automated CI/CD deployments.

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
Software Engineer | Austin Tech Innovations | 2023 - 2024
- Built responsive UI components in React and TypeScript for customer billing portal, improving load speed by 25%.
- Wrote automated unit tests in Python, raising test coverage to 85% and reducing regression defects by 30%.
- Collaborated in daily agile standups, sprint planning, and code reviews across 2 engineering pods.

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
