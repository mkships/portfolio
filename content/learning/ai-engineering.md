---
# The AI engineering track shown at learn.mkanapaka.space/ai-engineering.
# Lesson ids are the keys that ticks, notes and questions are stored under, so never rename one.
# Dates are YYYY-MM-DD and stay private: readers see "Week 1", "Week 2", worked out from each
# block's `due` and the track's `starts`. `dates` is the range shown to me when editing is unlocked.
title: "AI engineering"
# The look of this track: "cool" (grey-blue, grotesk and mono) or "warm" (cream, orange, serif).
theme: "cool"
summary: "From a first LLM call to a working eval harness, built from scratch."
intro: "Five weeks from first LLM call to a working eval harness, with my notes and the things I haven’t understood yet."
starts: "2026-11-28"
ends: "2026-12-31"

phases:
  - id: "scrimba"
    name: "Scrimba AI Engineer Path"
    meta: ["about 20 h", "JavaScript"]
    start: "2026-11-28"
    end: "2026-12-07"
    href: "https://scrimba.com/ai-engineer-path-c02v"
    linkText: "Open the path"
    outcome: "Add LLM features, RAG and a tool-calling agent to a JavaScript app."
    blocks:
      - dates: "28–30 Nov"
        due: "2026-11-30"
        lessons:
          - { id: "sc-intro", title: "Intro to AI Engineering" }
          - { id: "sc-oss", title: "Open-source Models" }
      - dates: "1–3 Dec"
        due: "2026-12-03"
        lessons:
          - { id: "sc-embed", title: "Embeddings and Vector Databases" }
          - { id: "sc-popchoice", title: "Solo project: PopChoice", project: true }
      - dates: "4–5 Dec"
        due: "2026-12-05"
        lessons:
          - { id: "sc-agents", title: "Agents" }
          - { id: "sc-context", title: "Context Engineering" }
      - dates: "6–7 Dec"
        due: "2026-12-07"
        lessons:
          - { id: "sc-aisdk", title: "Vercel AI SDK" }
          - { id: "sc-mcp", title: "Model Context Protocol" }
          - { id: "sc-multimodal", title: "Multimodality" }
          - { id: "sc-deploy", title: "Deployment", optional: true, cut: true }

  - id: "python"
    name: "AI Python for Beginners"
    meta: ["4–6 h of an 11.5 h course", "skimmable", "runs alongside Scrimba"]
    start: "2026-11-28"
    end: "2026-12-04"
    href: "https://www.deeplearning.ai/courses/ai-python-for-beginners"
    linkText: "Open the course"
    outcome: "Read and write the Python the repo uses."
    blocks:
      - dates: "28–30 Nov"
        due: "2026-11-30"
        lessons:
          - { id: "py-m1", title: "Module 1: Basics of AI Python Coding", detail: "skim if you already code" }
          - { id: "py-m2", title: "Module 2: Automating Tasks with Python", detail: "skim if you already code" }
      - dates: "1–3 Dec"
        due: "2026-12-03"
        lessons:
          - { id: "py-m3", title: "Module 3: Working with Your Own Data and Documents" }
      - dates: "4 Dec"
        due: "2026-12-04"
        note: "If the script reads easily, you’re ready for the repo. If it doesn’t, go back to the module that covers what tripped you up."
        lessons:
          - { id: "py-m4", title: "Module 4: Extending Python with Packages and APIs" }
          - id: "py-check"
            title: "Readiness check: read the repo’s first script, 01_llm_call_anthropic.py"
            href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/01-simple-llm-call"

  - id: "repo1"
    name: "Repo 01: Foundations"
    meta: ["about 6 h", "quick after Scrimba"]
    start: "2026-12-08"
    end: "2026-12-10"
    href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations"
    linkText: "Open the module"
    outcome: "Build the agent loop from scratch in Python. The ideas repeat from Scrimba, so the lessons go quickly and the project is where the time goes."
    blocks:
      - dates: "8–9 Dec"
        due: "2026-12-09"
        lessons:
          - { id: "r1-llm", title: "Simple LLM Call", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/01-simple-llm-call" }
          - { id: "r1-prompt", title: "Prompt Engineering", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/02-prompt-engineering" }
          - { id: "r1-chat", title: "Chat", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/03-chat" }
          - { id: "r1-tools", title: "Tool Use", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/04-tool-use" }
          - { id: "r1-loop", title: "Agent Loop", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/05-agent-loop" }
      - dates: "10 Dec"
        due: "2026-12-10"
        lessons:
          - { id: "r1-project", title: "Project: Codebase Navigator", project: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/01-foundations/06-codebase-navigator" }

  - id: "repo2"
    name: "Repo 02: Effective Agent Patterns"
    meta: ["about 14 h"]
    start: "2026-12-11"
    end: "2026-12-16"
    href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents"
    linkText: "Open the module"
    outcome: "Know when to chain, route, parallelize or delegate, and combine the patterns in one agent."
    blocks:
      - dates: "11–12 Dec"
        due: "2026-12-12"
        lessons:
          - { id: "r2-chain", title: "Prompt Chaining", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/01-prompt-chaining" }
          - { id: "r2-route", title: "Routing", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/02-routing" }
          - { id: "r2-parallel", title: "Parallelization", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/03-parallelization" }
      - dates: "13–14 Dec"
        due: "2026-12-14"
        lessons:
          - { id: "r2-orch", title: "Orchestrator-Workers", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/04-orchestrator-workers" }
          - { id: "r2-eval", title: "Evaluator-Optimizer", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/05-evaluator-optimizer" }
          - { id: "r2-hitl", title: "Human in the Loop", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/06-human-in-the-loop" }
      - dates: "15–16 Dec"
        due: "2026-12-16"
        lessons:
          - { id: "r2-project", title: "Project: Content Writer", project: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/02-effective-agents/07-content-writer" }

  - id: "repo3"
    name: "Repo 03: Advanced Techniques"
    meta: ["about 16 h"]
    start: "2026-12-17"
    end: "2026-12-23"
    href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques"
    linkText: "Open the module"
    outcome: "Handle context, cost, memory, retrieval and guardrails in an agent that has left the prototype stage."
    blocks:
      - dates: "17–18 Dec"
        due: "2026-12-18"
        lessons:
          - { id: "r3-struct", title: "Structured Output", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/01-structured-output" }
          - { id: "r3-stream", title: "Streaming", cut: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/02-streaming" }
          - { id: "r3-context", title: "Context Engineering", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/03-context-engineering" }
      - dates: "19–21 Dec"
        due: "2026-12-21"
        lessons:
          - { id: "r3-cost", title: "Cost Optimization", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/04-cost-optimization" }
          - { id: "r3-memory", title: "Memory", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/05-memory" }
          - { id: "r3-rag", title: "RAG Techniques", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/06-rag-techniques" }
      - dates: "22–23 Dec"
        due: "2026-12-23"
        lessons:
          - { id: "r3-multi", title: "Multimodal", cut: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/07-multimodal" }
          - { id: "r3-guard", title: "Guardrails", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/03-advanced-techniques/08-guardrails" }

  - id: "repo4"
    name: "Repo 04: Testing & Evaluation"
    meta: ["about 18 h"]
    start: "2026-12-24"
    end: "2026-12-31"
    href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation"
    linkText: "Open the module"
    outcome: "Test, evaluate and trace an agent, to prove it works and catch regressions."
    blocks:
      - dates: "24–26 Dec"
        due: "2026-12-26"
        lessons:
          - { id: "r4-unit", title: "Unit Testing Agents", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/01-unit-testing-agents" }
          - { id: "r4-evals", title: "Evals", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/02-evals" }
          - { id: "r4-trace", title: "Tracing & Debugging", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/03-tracing-debugging" }
      - dates: "27–29 Dec"
        due: "2026-12-29"
        lessons:
          - { id: "r4-red", title: "Red Teaming & Safety", href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/04-red-teaming-safety" }
          - { id: "r4-bench", title: "Benchmarking", cut: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/05-benchmarking" }
          - { id: "r4-frameworks", title: "Eval Frameworks", cut: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/06-eval-frameworks" }
      - dates: "30–31 Dec"
        due: "2026-12-31"
        note: "Run the harness against one of my own agents, not only the sample."
        lessons:
          - { id: "r4-project", title: "Project: Eval Harness", project: true, href: "https://github.com/agenticloops-ai/agentic-ai-engineering/tree/main/04-testing-evaluation/07-eval-harness" }

  - id: "checkpoint"
    name: "Checkpoint"
    meta: ["30 minutes"]
    start: "2026-12-31"
    end: "2026-12-31"
    outcome: "Decide what comes next from where I actually stand."
    blocks:
      - dates: "31 Dec"
        due: "2026-12-31"
        lessons:
          - { id: "cp-projects", title: "Count the module projects I built myself, not just ran" }
          - { id: "cp-repo", title: "Check whether repo modules 5–7 (MCP, frameworks, production) have shipped", href: "https://github.com/agenticloops-ai/agentic-ai-engineering" }
          - { id: "cp-fde", title: "Decide on AI FDE" }

  - id: "fde"
    name: "AI FDE: Forward Deployed Engineer & Agentic AI Architect"
    meta: ["after the checkpoint", "about 30 h", "Udemy"]
    optional: true
    href: "https://www.udemy.com/course/ai-fde-forward-deployed-engineer-agentic-ai-architect/"
    linkText: "Open the course"
    outcome: "Ship a durable, secured, multi-agent system to the cloud. It covers what the repo’s unreleased modules 5–7 would, so it is only worth taking while those are missing."
    blocks:
      - label: "Week 1"
        lessons:
          - { id: "fde-w1", title: "Become an AI Engineer", detail: "mostly covered by the phases above, so it goes quickly" }
      - label: "Week 2"
        lessons:
          - { id: "fde-w2", title: "Become an AI Architect: evals, MCP, durable LangGraph workflows, swarms" }
      - label: "Week 3"
        lessons:
          - { id: "fde-w3", title: "Become an AI FDE: governance, security, gateways, AgentCore deployment" }
---

## If I fall behind

Cut in this order, so the parts I can’t get elsewhere survive. These lessons are tagged “Cut first” above.

1. Scrimba Deployment: skip it entirely. It is general deployment practice, not AI.
2. Repo module 3, Streaming and Multimodal: Scrimba already covers multimodality.
3. Repo module 4, Benchmarking and Eval Frameworks: keep Evals, Tracing and the Eval Harness.

Don’t cut module 2 or the eval harness. Those are the core of what the repo teaches.
