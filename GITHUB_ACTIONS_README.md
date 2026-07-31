-------- FOLDER STRUCTURE ---------
github-actions-deployment-pipeline/
├── .github/
│   ├── actions/
│   │   └── generate-report/
│   │       └── action.yml
│   └── workflows/
│       └── pipeline.yml
└── README.md
# Multi-Environment Deployment Report Pipeline

A GitHub Actions CI/CD pipeline demonstrating environment-gated deployments,
reusable composite actions, and matrix-based parallel execution.

## What it does

On every push/PR to `main` (or manual trigger), the pipeline:
1. Generates a unique version string (timestamp + commit SHA)
2. Runs a matrix job across three environments — `dev`, `staging`, `prod` —
   each producing a deployment report via a shared composite action
3. Combines all environment reports into a single versioned artifact

## Key concepts demonstrated

- **GitHub Environments** — `prod` requires manual approval before running;
  `staging` has a wait timer; `dev` runs immediately. Configured via
  Settings → Environments, referenced in the workflow via `environment:`.
- **Composite actions** — report-generation logic is written once
  (`.github/actions/generate-report`) and reused across all three
  environment legs, avoiding duplication.
- **Matrix builds** — one job definition fans out into three parallel
  runs, one per environment.
- **Job outputs / cross-job data passing** — the version string is
  generated once and shared across all downstream jobs via `needs`.
- **Artifacts** — each environment's report is uploaded individually,
  then downloaded and merged into one final report.
- **Concurrency control** — overlapping runs on the same branch cancel
  the older one automatically.
- **Least-privilege permissions** — `GITHUB_TOKEN` is scoped to
  read-only, since no write access is needed.

## Pipeline flow

\`\`\`
push/PR/manual trigger
        │
        ▼
   version job (generates version string)
        │
        ▼
   report job × 3 (matrix: dev / staging / prod)
     ├─ dev     → runs immediately
     ├─ staging → waits (timer)
     └─ prod    → requires manual approval
        │
        ▼
   combine job (merges all reports into one artifact)
\`\`\`

## Setup notes

Requires three GitHub Environments configured under
Settings → Environments: `dev`, `staging`, `prod`, with `prod` set to
require a reviewer.

## Possible extensions

- Add real Terraform validation per environment (in progress)
- Run `report` jobs inside a Docker container for environment consistency
- Add OIDC-based cloud authentication instead of static secrets