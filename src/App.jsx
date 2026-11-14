
import { useEffect, useState } from 'react'
import './App.css'

// Change these to your own details
const PROJECT = {
  name: 'CI/CD Project',
  repo: 'https://github.com/NishaPatel785/cicd-react-demo',
  live: 'https://cicd-react-demo-y4lx.vercel.app/',
  author: 'Nisha Patel',
}

const STAGES = [
  {
    name: 'Push to GitHub',
    note: 'Code pushed to develop branch',
    logs: [
      '$ git add .',
      '$ git commit -m "Update project"',
      '$ git push origin develop',
      'Code pushed successfully',
    ],
  },
  {
    name: 'Install Dependencies',
    note: 'GitHub Actions installs packages',
    logs: [
      '$ npm ci',
      'Dependencies installed successfully',
    ],
  },
  {
    name: 'Build',
    note: 'Check and build React application',
    logs: [
      '$ npm run build',
      'React application built successfully',
      'Build completed',
    ],
  },
  {
    name: 'Preview Deploy',
    note: 'Vercel creates a preview deployment',
    logs: [
      'Deploying develop branch to Vercel',
      'Preview deployment ready',
    ],
  },
  {
    name: 'Merge to Main',
    note: 'Approved code merged into main',
    logs: [
      '$ git checkout main',
      '$ git merge develop',
      '$ git push origin main',
      'Production code updated',
    ],
  },
  {
    name: 'Production Deploy',
    note: 'Vercel deploys the main branch',
    logs: [
      'Deploying main branch to Vercel',
      'Production deployment ready',
      'Live website updated',
    ],
  },
]

const STEPS = [
  [
    'Develop',
    'Write and update code in the develop branch.',
  ],
  [
    'Push to GitHub',
    'Push your changes to GitHub to trigger the workflow.',
  ],
  [
    'Continuous Integration (CI)',
    'GitHub Actions installs dependencies using npm ci and builds the React app using npm run build.',
  ],
  [
    'Preview Deployment',
    'Vercel creates a preview deployment so changes can be checked before production.',
  ],
  [
    'Merge to Main',
    'After testing, merge the develop branch into main.',
  ],
  [
    'Continuous Deployment (CD)',
    'Vercel automatically deploys the updated main branch to your live website.',
  ],
]

const STACK = ['React', 'Vite', 'Git', 'GitHub', 'GitHub Actions', 'Vercel']

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  const [done, setDone] = useState(reduceMotion ? STAGES.length : 0)

  useEffect(() => {
    if (done >= STAGES.length) return

    const t = setTimeout(() => setDone((d) => d + 1), 1200)
    return () => clearTimeout(t)
  }, [done])

  const finished = done >= STAGES.length

  const status = (i) =>
    i < done ? 'done' : i === done ? 'active' : 'pending'

  const logs = STAGES
    .slice(0, Math.min(done + 1, STAGES.length))
    .flatMap((s) => s.logs)

  return (
    <div className="page">
      <header className="top">
        <span className="brand">{PROJECT.name}</span>

        <nav>
          <a href={PROJECT.repo} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={PROJECT.live} target="_blank" rel="noreferrer">
            Live site
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>
            Push code.
            <br />
            It ships itself.
          </h1>

          <p className="lead">
            A React application with an automated CI/CD pipeline.
            GitHub Actions installs dependencies and builds the application,
            while Vercel handles preview and production deployments.
          </p>

          <div className="actions">
            <a
              className="btn primary"
              href={PROJECT.repo}
              target="_blank"
              rel="noreferrer"
            >
              View the code
            </a>

            <a
              className="btn"
              href={PROJECT.live}
              target="_blank"
              rel="noreferrer"
            >
              Open live site
            </a>
          </div>
        </section>

        <section className="run" aria-label="Pipeline run">
          <div className="run-head">
            <h2>Pipeline Demo</h2>

            <span className={'badge ' + (finished ? 'ok' : 'busy')}>
              {finished ? 'Completed' : 'Running'}
            </span>
          </div>

          <ol className="pipeline">
            {STAGES.map((s, i) => (
              <li key={s.name} className={'stage ' + status(i)}>
                <span className="node" aria-hidden="true">
                  {i < done ? '✓' : ''}
                </span>

                <span className="stage-name">{s.name}</span>

                <span className="stage-note">{s.note}</span>
              </li>
            ))}
          </ol>

          <pre className="terminal" aria-label="Pipeline log">
            {logs.map((l, i) => (
              <span
                key={i}
                className={l.startsWith('$') ? 'cmd' : 'out'}
              >
                {l + '\n'}
              </span>
            ))}

            {finished && (
              <span className="success">
                CI/CD demo completed successfully
              </span>
            )}
          </pre>

          <button
            className="btn replay"
            onClick={() => setDone(0)}
            disabled={!finished}
          >
            Run again
          </button>
        </section>

        <section className="how">
          <h2>How the CI/CD pipeline works</h2>

          <ol>
            {STEPS.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="stack">
          <h2>Built with</h2>

          <ul>
            {STACK.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <span>Made by {PROJECT.author}</span>

        <a href={PROJECT.repo} target="_blank" rel="noreferrer">
          Source on GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
