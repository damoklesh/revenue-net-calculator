import { spawn } from 'node:child_process'
import { once } from 'node:events'
import http from 'node:http'
import process from 'node:process'

const host = '127.0.0.1'
const port = 4173
const projectRoot = process.cwd()
const previewArgs = [
  'node_modules/vite/bin/vite.js',
  'preview',
  '--configLoader',
  'runner',
  '--host',
  host,
]

function waitForPreview() {
  const deadline = Date.now() + 15_000

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(`http://${host}:${port}/`, (response) => {
        response.resume()
        resolve()
      })

      request.on('error', () => {
        if (Date.now() >= deadline) {
          reject(new Error('Timed out waiting for the Vite preview server.'))
          return
        }

        setTimeout(check, 100)
      })

      request.setTimeout(1_000, () => request.destroy())
    }

    check()
  })
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null) return

  child.kill('SIGTERM')

  await Promise.race([
    once(child, 'exit'),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])

  if (child.exitCode === null && process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], {
      stdio: 'ignore',
      windowsHide: true,
    })
  }
}

const preview = spawn(process.execPath, previewArgs, {
  cwd: projectRoot,
  stdio: 'inherit',
  windowsHide: true,
})

let exitCode = 1

try {
  await waitForPreview()

  const testRunner = spawn(
    process.execPath,
    ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)],
    { cwd: projectRoot, stdio: 'inherit', windowsHide: true },
  )

  const [code] = await once(testRunner, 'exit')
  exitCode = code ?? 1
} finally {
  await stopProcess(preview)
}

process.exitCode = exitCode
