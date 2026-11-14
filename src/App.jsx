import { useEffect, useState } from 'react'
import './App.css'

// ✏️ Change these to your own details
const PROJECT = {
  name: 'CI/CD Project',
  repo: 'https://github.com/your-username/your-repo',
  live: 'https://your-app.vercel.app',
  author: 'Your Name',
}

const STAGES = [
  { name: 'Commit', note: 'Code pushed to main', logs: ['$ git push origin main', 'GitHub received 1 commit'] },
  { name: 'Build', note: 'Install and bundle', logs: ['$ npm ci', '$ npm run build', 'Built in 2.1s'] },
  { name: 'Test', note: 'Lint and check', logs: ['$ npm run lint', 'All checks passed'] },
  { name: 'Deploy', note: 'Released on Vercel', logs: ['Deploying to Vercel', 'Live at ' + PROJECT.live.replace('https://', '')] },
]

const STEPS = [
  ['You push code', 'A commit to GitHub is the only manual step.'],
  ['The pipeline runs', 'The project is installed, built and checked automatically.'],
  ['Vercel goes live', 'If every check passes, the new version replaces the old one.'],
]

const STACK = ['React', 'Vite', 'GitHub', 'Vercel']

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  const [done, setDone] = useState(reduceMotion ? STAGES.length : 0)

  useEffect(() => {
    if (done >= STAGES.length) return
    const t = setTimeout(() => setDone((d) => d + 1), 1200)
    return () => clearTimeout(t)
  }, [done])

  const finished = done >= STAGES.length
  const status = (i) => (i < done ? 'done' : i === done ? 'active' : 'pending')
  const logs = STAGES.slice(0, Math.min(done + 1, STAGES.length)).flatMap((s) => s.logs)

  return (
    <div className="page">
      <header className="top">
        <span className="brand">{PROJECT.name}</span>
        <nav>
          <a href={PROJECT.repo} target="_blank" rel="noreferrer">GitHub</a>
          <a href={PROJECT.live} target="_blank" rel="noreferrer">Live site</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Push code.<br />It ships itself.</h1>
          <p className="lead">
            A React app with an automated pipeline: every push to GitHub is built, checked and
            deployed to Vercel without anyone clicking a button.
          </p>
          <div className="actions">
            <a className="btn primary" href={PROJECT.repo} target="_blank" rel="noreferrer">View the code</a>
            <a className="btn" href={PROJECT.live} target="_blank" rel="noreferrer">Open live site</a>
          </div>
        </section>

        <section className="run" aria-label="Pipeline run">
          <div className="run-head">
            <h2>Latest run</h2>
            <span className={'badge ' + (finished ? 'ok' : 'busy')}>
              {finished ? 'Passed' : 'Running'}
            </span>
          </div>

          <ol className="pipeline">
            {STAGES.map((s, i) => (
              <li key={s.name} className={'stage ' + status(i)}>
                <span className="node" aria-hidden="true">{i < done ? '✓' : ''}</span>
                <span className="stage-name">{s.name}</span>
                <span className="stage-note">{s.note}</span>
              </li>
            ))}
          </ol>

          <pre className="terminal" aria-label="Pipeline log">
            {logs.map((l, i) => (
              <span key={i} className={l.startsWith('$') ? 'cmd' : 'out'}>{l + '\n'}</span>
            ))}
            {finished && <span className="success">Deployment complete</span>}
          </pre>

          <button className="btn replay" onClick={() => setDone(0)} disabled={!finished}>
            Run again
          </button>
        </section>

        <section className="how">
          <h2>What happens on every push</h2>
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
            {STACK.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>
      </main>

      <footer>
        <span>Made by {PROJECT.author}</span>
        <a href={PROJECT.repo} target="_blank" rel="noreferrer">Source on GitHub</a>
      </footer>
    </div>
  )
}

export default App