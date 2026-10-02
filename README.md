# Jugalbandi

Jugalbandi builds on Resume Matcher. The current code supports resume creation, tailoring, editing, application tracking and PDF export. Private accounts and the planned document analyzer are not implemented or released yet.

Start with [the delivery handbook](plan/delivery/README.md), [current task tracker](plan/delivery/TRACKER.md), and [handoff](plan/delivery/HANDOFF.md). Original upstream documentation and credit follow; upstream links describe the foundation, not a Jugalbandi hosted service.

## Run locally and contribute

Jugalbandi is intended to be installed and run on your own computer. No Jugalbandi hosting account or deployment is required. A configured external AI provider can receive content; choose local-model processing if you need a local provider, and verify your configuration. Local installation is not an automatic offline guarantee.

- [Local setup](SETUP.md) and [developer quickstart](docs/agent/quickstart.md).
- [Current technology stack](#current-jugalbandi-stack-2026-10-01) and [verification evidence](plan/delivery/EVIDENCE.md).
- [Engineering instructions](AGENTS.md), [delivery handbook](plan/delivery/README.md) and [task tracker](plan/delivery/TRACKER.md).

Existing features include the resume editor, tailoring, application tracker, wizard and PDF export. Evidence-backed analysis is planned. The earlier private hosted beta is a conditional future option; invitations, managed accounts and hosting are not requirements for running today's local product. Full runtime verification still has the recorded backend and font-download blockers.

## Upstream foundation and attribution

The material below preserves Resume Matcher's history, contributors, screenshots and resources. Its star counts, release badge, donations, communities and published container images refer to upstream, not a hosted Jugalbandi service. Existing names in saved keys and package identifiers are retained for compatibility. Use the Jugalbandi setup and handbook above for current development decisions.

---

<div align="center">

[![Resume Matcher](assets/header.png)](https://www.resumematcher.fyi)

## Resume Matcher

[𝙹𝚘𝚒𝚗 𝙳𝚒𝚜𝚌𝚘𝚛𝚍](https://dsc.gg/resume-matcher) ✦ [𝚆𝚎𝚋𝚜𝚒𝚝𝚎](https://resumematcher.fyi) ✦ [𝙷𝚘𝚠 𝚝𝚘 𝙸𝚗𝚜𝚝𝚊𝚕𝚕](https://resumematcher.fyi/docs/installation) ✦ [𝙲𝚘𝚗𝚝𝚛𝚒𝚋𝚞𝚝𝚘𝚛𝚜](#contributors) ✦ [𝚂𝚙𝚘𝚗𝚜𝚘𝚛](#sponsors) ✦ [𝚃𝚠𝚒𝚝𝚝𝚎𝚛/𝚇](https://twitter.com/srbhrai) ✦ [𝙻𝚒𝚗𝚔𝚎𝚍𝙸𝚗](https://www.linkedin.com/company/resume-matcher/) ✦ [𝙲𝚛𝚎𝚊𝚝𝚘𝚛](https://srbhr.com)

**English** | [Español](README.es.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

The AI harness to build tailored resumes for each job application with Claude, ChatGPT, DeepSeek, Kimi, GLM, Gemma, and other LLMs. Supports both local and remote LLMs.

![Resume Matcher Demo](assets/Resume_Matcher_Demo_2.gif)

</div>

<br>

<div align="center">

![Stars](https://img.shields.io/github/stars/srbhr/Resume-Matcher?labelColor=F0F0E8&style=for-the-badge&color=1d4ed8)
![Apache 2.0](https://img.shields.io/github/license/srbhr/Resume-Matcher?labelColor=F0F0E8&style=for-the-badge&color=1d4ed8) ![Forks](https://img.shields.io/github/forks/srbhr/Resume-Matcher?labelColor=F0F0E8&style=for-the-badge&color=1d4ed8) ![version](https://img.shields.io/badge/Version-1.3%20Crescendolls%20-FFF?labelColor=F0F0E8&style=for-the-badge&color=1d4ed8)

[![Discord](https://img.shields.io/discord/1122069176962531400?labelColor=F0F0E8&logo=discord&logoColor=1d4ed8&style=for-the-badge&color=1d4ed8)](https://dsc.gg/resume-matcher) [![Website](https://img.shields.io/badge/website-Resume%20Matcher-FFF?labelColor=F0F0E8&style=for-the-badge&color=1d4ed8)](https://resumematcher.fyi) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Resume%20Matcher-FFF?labelColor=F0F0E8&logo=LinkedIn&style=for-the-badge&color=1d4ed8)](https://www.linkedin.com/company/resume-matcher/)

<a href="https://trendshift.io/repositories/565" target="_blank"><img src="https://trendshift.io/api/badge/repositories/565" alt="srbhr%2FResume-Matcher | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

![Vercel OSS Program](https://vercel.com/oss/program-badge.svg)

</div>

> \[!IMPORTANT]
>
> The project needs your help and support. If you can donate a small amount, that will help me to continue developing and improving Resume Matcher.

<div align="center">

[![Sponsor on GitHub](https://img.shields.io/github/sponsors/srbhr?style=for-the-badge&label=Sponsor&color=1d4ed8&labelColor=F0F0E8&logo=github&logoColor=black)](https://github.com/sponsors/srbhr) [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&color=1d4ed8&labelColor=F0F0E8&logoColor=black)](https://www.buymeacoffee.com/srbhr)

**Sponsoring for a company?** Put your logo in front of 27k+ developers → **[become a sponsor ↓](#sponsors)**

</div>

## Getting Started

Resume Matcher works by creating a master resume that you can use to tailor for each job application. Installation instructions here: [How to Install](#how-to-install)

### How It Works

1. **Upload** your master resume (PDF or DOCX)
2. **Paste** a job description you're targeting
3. **Review** AI-generated improvements and tailored content
4. **Cover Letter** and optional interview preparation for the job application
5. **Customize** the layout and sections to fit your style
6. **Export** as a professional PDF with your preferred template

### Stay Connected

[![Discord](assets/resume_matcher_discord.png)](https://dsc.gg/resume-matcher)

Join our [Discord](https://dsc.gg/resume-matcher) for discussions, feature requests, and community support.

[![LinkedIn](assets/resume_matcher_linkedin.png)](https://www.linkedin.com/company/resume-matcher/)

Follow us on [LinkedIn](https://www.linkedin.com/company/resume-matcher/) for updates.

![Star Resume Matcher](assets/star_resume_matcher.png)

Star the repo to support development and get notified of new releases.

## Sponsors

![sponsors](assets/sponsors.png)

Resume Matcher is free and open-source, kept alive by its sponsors and backers. If it helps you, please consider supporting its development.

### Companies backing Resume Matcher

Sponsor at a company tier and **your logo + link + blurb lands here** — in front of a community of **27k+ stars and 4.9k forks**, featured on [Trendshift](https://trendshift.io/repositories/565) and the [Vercel OSS Program](https://vercel.com/oss).

| Sponsor | Description |
|---------|-------------|
| [Apideck](https://apideck.com?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) | One API to connect your app to 200+ SaaS platforms (accounting, HRIS, CRM, file storage). Build integrations once, not 50 times. 🌐 [apideck.com](https://apideck.com?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) |
| [Vercel](https://vercel.com?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) | Resume Matcher is a part of Vercel OSS // Summer 2025 Program 🌐 [vercel.com](https://vercel.com?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) |
| [Cubic.dev](https://cubic.dev?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) | Cubic provides PR reviews for Resume Matcher 🌐 [cubic.dev](https://cubic.dev?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) |
| [Kilo Code](https://kilo.ai?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) | Kilo Code provides AI code reviews and coding credits to Resume Matcher 🌐 [kilo.ai](https://kilo.ai?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) |
| [ZanReal](https://zanreal.com/?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) | ZanReal is an AI-driven development company building scalable cloud solutions, from strategy and UX to DevOps, helping teams ship faster and turn ideas into production. 🌐 [zanreal.com](https://zanreal.com/?utm_source=resumematcher&utm_medium=github&utm_campaign=sponsors) |
| **✦ Your company here** | Reach 27k+ developers and 4.9k forks. **[Become a sponsor →](https://github.com/sponsors/srbhr)** |

Read the [Sponsorship Guide](https://resumematcher.fyi/docs/sponsoring) for tiers and details. Sponsors get a special thank-you in the README and on our website.

<a id="support-the-development-by-donating"></a>

### Support as an individual

![donate](assets/supporting_resume_matcher.png)

Every bit keeps Resume Matcher free and funds new features — and you'll be thanked in the README and on our website.

| Platform  | Link                                   |
|-----------|----------------------------------------|
| GitHub    | [![GitHub Sponsors](https://img.shields.io/github/sponsors/srbhr?style=for-the-badge&color=1d4ed8&labelColor=F0F0E8&logo=github&logoColor=black)](https://github.com/sponsors/srbhr) |
| Buy Me a Coffee | [![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&color=1d4ed8&labelColor=F0F0E8&logoColor=black)](https://www.buymeacoffee.com/srbhr) |

## Creators' Note

[![srbhr](assets/creators_note.png)](https://srbhr.com)

Thank you for checking out Resume Matcher. If you want to connect, collaborate, or just say hi, feel free to reach out!
~ **Saurabh Rai** ✨

You can follow me on:

- Website: [https://srbhr.com](https://srbhr.com)
- Linkedin: [https://www.linkedin.com/in/srbhr/](https://www.linkedin.com/in/srbhr/)
- Twitter: [https://twitter.com/srbhrai](https://twitter.com/srbhrai)
- GitHub: [https://github.com/srbhr](https://github.com/srbhr)

## Key Features

![resume_matcher_features](assets/features.png)

### Core Features

**Master Resume**: Create a comprehensive master resume to draw from your existing one.

![Job Description Input](assets/step_2.png)

### Resume Builder

![Resume Builder](assets/step_5.png)

Paste in a job description and get AI-powered resume tailored for that specific role.

You can:

- Modify suggested content
- Add/remove sections
- Rearrange sections via drag-and-drop
- Choose from multiple resume templates

### Cover Letter Generator

Generate tailored cover letters based on the job description and your resume.

![Cover Letter](assets/cover_letter.png)

### Interview Preparation

Generate structured, resume-grounded interview prep for saved tailored resumes. Use the Builder's Interview Prep tab on demand, or enable automatic generation in Settings.

### Resume Scoring & Keyword Highlighting

Analyze your resume against the job description with a match score, keyword highlighting, and suggestions for improvement.

![Resume Scoring and Keyword Highlight](assets/keyword_highlighter.png)

### PDF Export

Export your tailored resume and cover letter in PDF.

### Templates

| Template Name | Preview | Description |
|---------------|---------|-------------|
| **Classic Single Column** | ![Classic Template](assets/pdf-templates/single-column.jpg) | A traditional and clean layout suitable for most industries. [𝐕𝐢𝐞𝐰 𝐏𝐃𝐅](assets/pdf-templates/single-column.pdf) |
| **Modern Single Column** | ![Modern Template](assets/pdf-templates/modern-single-column.jpg) | A contemporary design with a focus on readability and aesthetics. [𝐕𝐢𝐞𝐰 𝐏𝐃𝐅](assets/pdf-templates/modern-single-column.pdf)|
| **Classic Two Column** | ![Classic Two Column Template](assets/pdf-templates/two-column.jpg) | A structured layout that separates sections for clarity. [𝐕𝐢𝐞𝐰 𝐏𝐃𝐅](assets/pdf-templates/two-column.pdf)|
| **Modern Two Column** | ![Modern Two Column Template](assets/pdf-templates/modern-two-column.jpg) | A sleek design that utilizes two columns for better organization. [𝐕𝐢𝐞𝐰 𝐏𝐃𝐅](assets/pdf-templates/modern-two-column.pdf)|

### Internationalization

- **Multi-Language UI**: Interface available in English, Spanish, Chinese, Japanese, and Portuguese (Brazilian)
- **Multi-Language Content**: Generate resumes and cover letters in your preferred language

### Roadmap

If you have any suggestions or feature requests, please feel free to open an issue on GitHub or discuss it on our [Discord](https://dsc.gg/resume-matcher) server.

- AI Canvas for crafting impactful, metric-driven resume content
- Email template generator for job applications
- Multi-job description optimization

<a id="how-to-install"></a>

## How to Install

![Installation](assets/how_to_install_resumematcher.png)

For detailed setup instructions, see **[SETUP.md](SETUP.md)** (English) or: [Español](SETUP.es.md), [简体中文](SETUP.zh-CN.md), [日本語](SETUP.ja.md).

### Prerequisites

| Tool | Version | Installation |
|------|---------|--------------|
| Python | 3.13+ | [python.org](https://python.org) |
| Node.js | 22+ | [nodejs.org](https://nodejs.org) |
| uv | Latest | [astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |

### Quick Start

Fastest for MacOS, WSL and Ubuntu users:

```bash
# Clone the repository
git clone https://github.com/msrishav-28/jugalbandi.git
cd jugalbandi

# Backend (Terminal 1)
cd apps/backend
cp .env.example .env        # Configure your AI provider
uv sync                      # Install dependencies
uv run app

# Frontend (Terminal 2)
cd apps/frontend
npm ci
npm run dev
```

Open **<http://localhost:3000>** and configure your AI provider in Settings.

### Supported AI Providers

| Provider | Local/Cloud | Notes |
|----------|-------------|-------|
| **Ollama** | Local | Free, runs on your machine |
| **OpenAI** | Cloud | GPT-5 Nano, GPT-4o |
| **Anthropic** | Cloud | Claude Haiku 4.5 |
| **Google Gemini** | Cloud | Gemini 3 Flash |
| **OpenRouter** | Cloud | Access to multiple models |
| **DeepSeek** | Cloud | DeepSeek Chat |

### Docker Deployment

Official Docker images are published for `linux/amd64` and `linux/arm64` on:

- `ghcr.io/srbhr/resume-matcher`
- `srbhr/resume-matcher`

Run on a single public port (`3000`) with API available at `/api`:

```bash
docker run --name resume-matcher \
  -p 3000:3000 \
  -v resume-data:/app/backend/data \
  ghcr.io/srbhr/resume-matcher:latest
```

Prefer pinning a version in production, for example `ghcr.io/srbhr/resume-matcher:1.3.0` or
`ghcr.io/srbhr/resume-matcher:1.3`.

Endpoints:

- App: <http://localhost:3000>
- API health check: <http://localhost:3000/api/v1/health>
- API docs: <http://localhost:3000/docs>

> **Using Ollama with Docker?** Use `http://host.docker.internal:11434` as the Ollama URL instead of `localhost`.

### Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI, Python 3.13+, LiteLLM |
| Frontend | Next.js 16, React 19, TypeScript |
| Database | SQLite (SQLAlchemy 2 + aiosqlite) |
| Styling | Tailwind CSS 4, Swiss International Style |
| PDF | Headless Chromium via Playwright |


### Current Jugalbandi stack (2026-10-01)

The rename and handbook currently live on `goldlens/baseline-and-first-checks`; a default-branch clone does not include unmerged work. Follow the [handoff](plan/delivery/HANDOFF.md) for the active checkout.

This is the implemented foundation, verified against the [frontend manifest](apps/frontend/package.json), [npm lock](apps/frontend/package-lock.json), [backend manifest](apps/backend/pyproject.toml) and source. Version ranges below are declarations, not claims about every installation.

| Layer | Current technology and responsibility |
|---|---|
| Website | Next.js 16 (declared ^16.3.3), React 19 (^19.2.4), strict TypeScript 5, App Router, Turbopack; Node.js runtime |
| UI and editing | Tailwind CSS 4, existing Swiss design system, custom UI components, Tiptap 3 rich text, dnd-kit drag/drop, Lucide icons; clsx/tailwind-merge utilities |
| Languages and browser state | JSON dictionaries for English, Spanish, Chinese, Japanese, Portuguese, French and Korean; React context/hooks and localStorage recovery drafts; no separate translation service |
| API server | Python >=3.13, FastAPI 0.128.4, Uvicorn 0.40.0; REST under /api/v1; Next.js forwards API traffic to Python |
| Validation/configuration | Pydantic 2.12.5, pydantic-settings 2.14.2, python-dotenv, python-multipart; DOMPurify allowlist for rendered rich text |
| Records/files | SQLite via SQLAlchemy 2.0.36 and aiosqlite 0.20.0, local data/uploads and JSON settings. TinyDB 4.8.2 remains for legacy import, not primary storage |
| AI integration | LiteLLM 1.86.2, existing prompt/structured-output and operation-budget code; configured adapters include OpenAI, OpenAI-compatible, Azure Foundry, Anthropic, OpenRouter, Gemini, DeepSeek, Groq and Ollama; availability depends on provider configuration |
| Document input/output | MarkItDown 0.1.4, pdfminer.six 20260107, python-docx 1.2.0; Playwright 1.58.0/Chromium renders internal print pages to PDF; Google Fonts in frontend and Noto CJK fonts in container |
| Credential storage | cryptography 50.0.0 / Fernet for stored provider keys. This does not supply user authentication or private-account isolation |
| Background work | Existing in-process asynchronous processing and database coordination; no deployed durable queue or independently operated worker service |
| Tests/quality | pytest, pytest-asyncio, HTTPX, respx; Vitest 4, React Testing Library, jsdom; ESLint 9, Prettier 3, TypeScript checks, Python locale-parity script, browser/evaluation harnesses |
| Packaging/delivery | npm with committed lockfile; uv and Python pyproject/Hatchling; Docker multi-stage build (Node 22 + Python 3.13), Docker Compose, shell startup script; GitHub Actions image publishing and optional local Git hooks |

**Planned separately:** PostgreSQL, private storage, invited account isolation, durable jobs/workers, geometry-based analysis, conditional OCR and governed peer comparisons. No hosted provider or queue framework is adopted merely by appearing in a plan. Jev and Laya are optional evaluation candidates, not installed application dependencies. See the [target architecture](plan/delivery/ARCHITECTURE.md).

**Validation limits:** see [dated evidence](plan/delivery/EVIDENCE.md), rather than treating a documented command as a passing check. The local frontend runtime used Node 24.17.0; the container uses Node 22. Backend dependencies currently lack a committed uv lock. No hosted beta is deployed.

## Join Us and Contribute

![how to contribute](assets/how_to_contribute.png)

We welcome contributions from everyone! Whether you're a developer, designer, or just someone who wants to help out. All the contributors are listed in the [about page](https://resumematcher.fyi/about) on our website and on the GitHub Readme here.

Check out the roadmap if you would like to work on the features that are planned for the future. If you have any suggestions or feature requests, please feel free to open an issue on GitHub and discuss it on our [Discord](https://dsc.gg/resume-matcher) server.

<a id="contributors"></a>

## Contributors

![Contributors](assets/contributors.png)

<a href="https://github.com/srbhr/Resume-Matcher/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=srbhr/Resume-Matcher" />
</a>

<br/>

<details>
  <summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://star-history.dera.page/svg?repos=srbhr/resume-matcher&theme=dark&type=Date">
    <img width="100%" src="https://star-history.dera.page/svg?repos=srbhr/resume-matcher&theme=dark&type=Date">
  </picture>
</details>

## Resume Matcher is a part of [Vercel Open Source Program](https://vercel.com/oss)

![Vercel OSS Program](https://vercel.com/oss/program-badge.svg)
