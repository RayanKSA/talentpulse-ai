import { JobPosting, SampleResume, MatchAnalysisResult, ATSAuditReport, InterviewQuestion } from "./types";

// Preloaded jobs fallback for static GitHub Pages hosting
export const FALLBACK_JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Full Stack Software Engineer",
    company: "StripeScale Technologies",
    department: "Engineering",
    experience_level: "Mid-Level",
    required_skills: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "REST API"],
    preferred_skills: ["AWS", "Redis", "CI/CD", "Tailwind CSS", "Kubernetes"],
    description: "We are seeking a versatile Full Stack Software Engineer to build resilient customer-facing workflows and scalable backend microservices with Python, FastAPI, React, and PostgreSQL.",
  },
  {
    id: "job-2",
    title: "Senior Backend Distributed Systems Engineer",
    company: "Apex Fintech Solutions",
    department: "Engineering",
    experience_level: "Senior",
    required_skills: ["Python", "Go", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "System Design", "Microservices"],
    preferred_skills: ["AWS", "Terraform", "Docker", "gRPC", "CI/CD"],
    description: "Join our Payments Infrastructure team to engineer high-volume transactional pipelines processing millions of dollars daily using Kafka, Redis, and Kubernetes.",
  },
  {
    id: "job-3",
    title: "Machine Learning & NLP Engineer",
    company: "CognitiveFlow AI",
    department: "Data & AI",
    experience_level: "Mid-Level",
    required_skills: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "NLP", "Scikit-Learn", "Docker"],
    preferred_skills: ["FastAPI", "SQL", "Pandas", "AWS", "Git"],
    description: "Design and deploy state-of-the-art NLP models and retrieval-augmented generation (RAG) pipelines for enterprise search using PyTorch.",
  },
  {
    id: "job-4",
    title: "Junior Frontend Developer",
    company: "Nova Interactive Studio",
    department: "Frontend",
    experience_level: "Junior",
    required_skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Git"],
    preferred_skills: ["Next.js", "REST API", "Vite", "Agile / Scrum"],
    description: "Build responsive UI components in React and TypeScript. Connect client-side components to backend REST APIs.",
  },
  {
    id: "job-5",
    title: "Cloud DevOps & Site Reliability Lead (SRE)",
    company: "TerraScale Cloud Infrastructure",
    department: "Cloud & DevOps",
    experience_level: "Senior",
    required_skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Linux", "GitHub Actions"],
    preferred_skills: ["Go", "Python", "Prometheus", "Elasticsearch", "System Design"],
    description: "Spearhead our cloud infrastructure automation, multi-region Kubernetes deployments, and zero-downtime release pipelines on AWS.",
  },
  {
    id: "job-6",
    title: "Mobile Application Engineer (React Native / iOS)",
    company: "PulseMobility Health",
    department: "Mobile",
    experience_level: "Mid-Level",
    required_skills: ["React Native", "TypeScript", "JavaScript", "REST API", "Git", "HTML/CSS"],
    preferred_skills: ["iOS Development", "Android Development", "Redux", "CI/CD"],
    description: "Build cross-platform mobile features using React Native and TypeScript. Integrate native device APIs and optimize offline battery usage.",
  },
  {
    id: "job-7",
    title: "Application Security & DevSecOps Specialist",
    company: "CyberShield Defense",
    department: "Security",
    experience_level: "Mid-Level",
    required_skills: ["Application Security", "OWASP", "Python", "Linux", "Docker", "CI/CD"],
    preferred_skills: ["Penetration Testing", "SIEM / SOC", "AWS", "Git", "SOC 2 / Compliance"],
    description: "Conduct threat modeling, architecture reviews, and code audits against OWASP Top 10 vulnerabilities in automated pipelines.",
  },
  {
    id: "job-8",
    title: "Data Platform & Analytics Engineer",
    company: "DataVanguard Analytics",
    department: "Data & AI",
    experience_level: "Mid-Level",
    required_skills: ["Python", "SQL", "Apache Spark", "Snowflake", "dbt", "Airflow"],
    preferred_skills: ["PostgreSQL", "AWS", "Databricks", "Kafka", "Docker"],
    description: "Develop robust, idempotent batch and streaming ETL pipelines using Apache Spark and model dimensional data marts in Snowflake.",
  },
  {
    id: "job-9",
    title: "QA Automation Lead & SDET",
    company: "QualiTech Global",
    department: "Engineering",
    experience_level: "Mid-Level",
    required_skills: ["Python", "JavaScript", "Test-Driven Development (TDD)", "CI/CD", "Git", "REST API"],
    preferred_skills: ["Docker", "Linux", "Agile / Scrum", "FastAPI"],
    description: "Architect automated end-to-end testing frameworks and elevate product quality across our cloud apps.",
  },
  {
    id: "job-10",
    title: "Technical Product Manager (Core Infrastructure)",
    company: "HyperGrid Cloud Systems",
    department: "Product",
    experience_level: "Senior",
    required_skills: ["Agile / Scrum", "System Design", "API Design", "Clean Code", "SQL"],
    preferred_skills: ["Microservices", "Cloud & DevOps", "AWS", "Python"],
    description: "Define technical product requirements, API contracts, and architectural roadmaps for developer tools and distributed systems.",
  },
  {
    id: "job-11",
    title: "Embedded Systems & Firmware Engineer",
    company: "AeroMotion Robotics",
    department: "Engineering",
    experience_level: "Mid-Level",
    required_skills: ["C++", "Linux", "System Design", "Git", "Clean Code"],
    preferred_skills: ["Python", "Docker", "Test-Driven Development (TDD)", "Shell/Bash"],
    description: "Architect low-latency firmware in modern C++ on embedded Linux and RTOS architectures for autonomous telemetry units.",
  },
  {
    id: "job-12",
    title: "Enterprise Solutions Architect",
    company: "OmniCloud Enterprise Advisory",
    department: "Cloud & DevOps",
    experience_level: "Senior",
    required_skills: ["AWS", "Microservices", "System Design", "API Design", "PostgreSQL", "Docker", "Kubernetes"],
    preferred_skills: ["Azure", "Google Cloud", "Kafka", "Terraform", "Redis"],
    description: "Author comprehensive High-Level and Low-Level architecture design documents for enterprise clients transitioning to cloud-native microservices.",
  },
];

// Preloaded candidates fallback
export const FALLBACK_RESUMES: SampleResume[] = [
  {
    id: "cand-1",
    name: "Alex Chen",
    title: "Full Stack Software Engineer",
    email: "alex.chen.dev@gmail.com",
    phone: "(415) 892-3104",
    linkedin: "linkedin.com/in/alexchen-eng",
    github: "github.com/alexchen-dev",
    years_experience: 4.5,
    raw_text: `ALEX CHEN
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
Bachelor of Science in Computer Science | University of California, Berkeley | 2016 - 2020`,
  },
  {
    id: "cand-2",
    name: "Sarah Jenkins",
    title: "Software Engineer (Full Stack & Systems)",
    email: "sarah.jenkins.cs@outlook.com",
    phone: "(512) 402-9811",
    linkedin: "linkedin.com/in/sarahjenkins-cs",
    github: "github.com/sjenkins-code",
    years_experience: 1.5,
    raw_text: `SARAH JENKINS
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

WORK EXPERIENCE
Software Engineer | Austin Tech Innovations | 2023 - 2024
- Built responsive UI components in React and TypeScript for customer billing portal, improving load speed by 25%.
- Wrote automated unit tests in Python, raising test coverage to 85% and reducing regression defects by 30%.
- Collaborated in daily agile standups, sprint planning, and code reviews across 2 engineering pods.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin | 2020 - 2024`,
  },
  {
    id: "cand-3",
    name: "Marcus Vance",
    title: "Staff Cloud & DevOps Systems Architect",
    email: "m.vance.cloud@protonmail.com",
    phone: "(206) 555-7281",
    linkedin: "linkedin.com/in/marcus-vance-cloud",
    github: "github.com/marcusvance",
    years_experience: 8.0,
    raw_text: `MARCUS VANCE
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

EDUCATION
Bachelor of Science in Computer Engineering | University of Washington | 2014 - 2018`,
  },
  {
    id: "cand-4",
    name: "Priya Patel",
    title: "Machine Learning & NLP Specialist",
    email: "priya.patel.ai@gmail.com",
    phone: "(617) 492-1188",
    linkedin: "linkedin.com/in/priya-patel-ml",
    github: "github.com/priyapatel-ai",
    years_experience: 3.5,
    raw_text: `PRIYA PATEL
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

EDUCATION
Master of Science in Artificial Intelligence | Boston University | 2019 - 2021`,
  },
];

// Client-side skill dictionary
const CANONICAL_SKILLS = [
  "Python", "JavaScript", "TypeScript", "React", "FastAPI", "Docker", "AWS", "PostgreSQL",
  "Redis", "Kubernetes", "CI/CD", "GitHub Actions", "Node.js", "Express", "SQL", "HTML/CSS",
  "Tailwind CSS", "Next.js", "Kafka", "Linux", "Git", "Machine Learning", "Deep Learning",
  "PyTorch", "NLP", "Scikit-Learn", "Terraform", "Go", "Pandas", "NumPy", "REST API",
  "Microservices", "System Design", "Agile / Scrum", "Test-Driven Development (TDD)",
  "Clean Code", "React Native", "Snowflake", "Apache Spark", "Airflow", "dbt",
  "Application Security", "OWASP", "Penetration Testing"
];

export function clientExtractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];
  CANONICAL_SKILLS.forEach((skill) => {
    const sLower = skill.toLowerCase();
    if (sLower === "go") {
      if (/\b(?:golang|go programming|go backend)\b/i.test(text)) {
        matched.push("Go");
      }
    } else {
      const regex = new RegExp(`\\b${sLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (regex.test(lower)) {
        matched.push(skill);
      }
    }
  });
  return matched;
}

export function clientAuditResume(text: string): ATSAuditReport {
  const lower = text.toLowerCase();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const hasEmail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/.test(text);
  const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLink = /linkedin|github/.test(lower);

  const contactScore = (hasEmail ? 8 : 0) + (hasPhone ? 6 : 0) + (hasLink ? 6 : 0);

  const metricMatches = text.match(/(?:\b\d+(?:\.\d+)?%|\$\d+|\b\d+\s*(?:users|clients|requests|ms|hours))/gi) || [];
  const metricsCount = metricMatches.length;
  const metricScore = metricsCount >= 4 ? 25 : metricsCount >= 2 ? 16 : 8;

  const actionVerbs = ["architected", "engineered", "developed", "built", "reduced", "scaled", "automated", "spearheaded", "mentored", "implemented", "optimized"];
  let verbCount = 0;
  actionVerbs.forEach((v) => {
    if (new RegExp(`\\b${v}\\b`, "i").test(text)) verbCount++;
  });
  const verbScore = verbCount >= 6 ? 20 : verbCount >= 3 ? 15 : 8;

  const hasExp = /experience|work history/i.test(text);
  const hasEdu = /education|university|degree/i.test(text);
  const hasSkills = /skills|technologies/i.test(text);
  const secScore = (hasExp ? 7 : 0) + (hasEdu ? 7 : 0) + (hasSkills ? 6 : 0);

  const lengthScore = words >= 300 && words <= 900 ? 15 : words >= 200 ? 10 : 5;

  const totalScore = Math.min(100, contactScore + metricScore + verbScore + secScore + lengthScore);
  const grade = totalScore >= 88 ? "A" : totalScore >= 75 ? "B" : totalScore >= 60 ? "C" : "D";

  return {
    overall_score: totalScore,
    grade,
    summary: totalScore >= 75 ? "Resume is well-structured for ATS ingestion." : "Fair ATS compliance. Strengthen quantifiable impact metrics and action verbs.",
    metrics_count: metricsCount,
    action_verbs_count: verbCount,
    sections_score: secScore,
    checks: [
      {
        rule: "Contact Details Extracted",
        passed: contactScore >= 14,
        score: contactScore,
        max_score: 20,
        feedback: contactScore >= 14 ? "Contact channels verified." : "Ensure email, phone, and professional profiles are included.",
        impact: "High",
      },
      {
        rule: "Quantifiable Impact & Metrics",
        passed: metricsCount >= 2,
        score: metricScore,
        max_score: 25,
        feedback: `Detected ${metricsCount} metric data points.`,
        impact: "High",
      },
      {
        rule: "Action-Oriented Language",
        passed: verbCount >= 3,
        score: verbScore,
        max_score: 20,
        feedback: `Identified ${verbCount} power action verbs.`,
        impact: "Medium",
      },
      {
        rule: "Standard ATS Section Hierarchy",
        passed: secScore >= 14,
        score: secScore,
        max_score: 20,
        feedback: secScore >= 14 ? "Standard headings identified." : "Include distinct Experience, Education, and Skills headers.",
        impact: "High",
      },
      {
        rule: "Length & Content Density",
        passed: words >= 250 && words <= 1000,
        score: lengthScore,
        max_score: 15,
        feedback: `Word count is ${words} words.`,
        impact: "Low",
      },
    ],
  };
}

export function clientMatchResume(resumeText: string, job: JobPosting): MatchAnalysisResult {
  const resumeSkills = clientExtractSkills(resumeText);
  const reqSkills = job.required_skills.length > 0 ? job.required_skills : clientExtractSkills(job.description).slice(0, 6);
  const prefSkills = job.preferred_skills;

  const candSet = new Set(resumeSkills);
  const matched = reqSkills.filter((s) => candSet.has(s));
  const missingReq = reqSkills.filter((s) => !candSet.has(s));
  const missingPref = prefSkills.filter((s) => !candSet.has(s));
  const bonus = resumeSkills.filter((s) => !reqSkills.includes(s) && !prefSkills.includes(s));

  const skillScore = reqSkills.length > 0 ? Math.round((matched.length / reqSkills.length) * 100) : 80;
  const atsReport = clientAuditResume(resumeText);

  // Experience heuristic
  const expMatches = resumeText.match(/\b(20\d{2})\s*(?:-|–|to)\s*(20\d{2}|present)\b/gi) || [];
  const yearsExp = Math.min(15, Math.max(1, expMatches.length * 1.5));
  const expScore = job.experience_level?.toLowerCase().includes("senior") ? (yearsExp >= 4 ? 95 : 65) : 90;

  const overall = Math.min(100, Math.max(25, Math.round(skillScore * 0.55 + 20 * 0.25 + expScore * 0.2)));
  const verdict = overall >= 80 ? "Exceptional Match" : overall >= 65 ? "Strong Contender" : overall >= 50 ? "Moderate Fit" : "Low Match";
  const color = overall >= 80 ? "emerald" : overall >= 65 ? "blue" : overall >= 50 ? "amber" : "rose";

  // Synthesize interview questions
  const interviewQuestions: InterviewQuestion[] = [];
  if (missingReq.length > 0) {
    interviewQuestions.push({
      category: "Technical Skill Gap Probe",
      skill_targeted: missingReq[0],
      question: `How would you approach ramping up quickly on ${missingReq[0]}, and what prior analogous tools have you worked with?`,
      suggested_star_points: [
        "Situation: Delivering functionality with an unfamiliar stack.",
        "Task: Mastering foundational architecture and best practices quickly.",
        "Action: Reading documentation, prototyping small proof-of-concepts, asking targeted questions.",
        "Result: Production feature delivered within sprint cadence.",
      ],
      rationale: `Candidate did not explicitly list ${missingReq[0]} in resume.`,
    });
  }
  if (matched.length > 0) {
    interviewQuestions.push({
      category: "Technical Depth Probe",
      skill_targeted: matched[0],
      question: `Describe the most complex architectural challenge you tackled using ${matched[0]}. How did you ensure reliability and maintainability?`,
      suggested_star_points: [
        `Situation: High load or architectural limitation with ${matched[0]}.`,
        "Task: Designing a maintainable, high-throughput solution.",
        "Action: Applying design patterns, profiling bottlenecks, writing regression tests.",
        "Result: Scalable throughput and zero regressions.",
      ],
      rationale: `Verifies deep production fluency in declared proficiency ${matched[0]}.`,
    });
  }
  interviewQuestions.push({
    category: "Behavioral (STAR Method)",
    skill_targeted: "Engineering Ownership",
    question: "Tell me about a time you encountered an ambiguous requirement or unexpected outage in production. How did you diagnose and remediate it?",
    suggested_star_points: [
      "Situation: Ambiguous production incident or customer issue.",
      "Task: Isolating the root cause without delaying delivery.",
      "Action: Systematic triage, stakeholder communication, and hotfix deployment.",
      "Result: Service restored with blameless post-mortem and automated monitoring added.",
    ],
    rationale: "Assesses resilience under pressure and engineering ownership.",
  });

  // Extract name heuristic
  const lines = resumeText.split("\n").map((l) => l.trim()).filter(Boolean);
  const candidateName = lines.length > 0 && lines[0].length < 35 && !lines[0].includes("@") ? lines[0] : "Candidate";

  return {
    candidate_name: candidateName,
    job_title: job.title,
    overall_score: overall,
    fit_verdict: verdict,
    verdict_color: color,
    skills_score: skillScore,
    experience_score: expScore,
    ats_score: atsReport.overall_score,
    semantic_similarity: 0.32,
    skill_breakdown: {
      matched_skills: matched,
      missing_required_skills: missingReq,
      missing_preferred_skills: missingPref,
      bonus_skills: bonus.slice(0, 8),
      match_percentage: skillScore,
    },
    ats_audit: atsReport,
    interview_questions: interviewQuestions,
    summary_for_recruiter: `${candidateName} is evaluated as a ${verdict} (${overall}/100) for ${job.title}. Key technical strengths include ${matched.slice(0, 3).join(", ") || "core capabilities"}.${missingReq.length > 0 ? ` Primary development areas: ${missingReq.slice(0, 2).join(", ")}.` : " All core skills satisfied."}`,
  };
}
