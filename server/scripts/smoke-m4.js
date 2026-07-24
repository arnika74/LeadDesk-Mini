import 'dotenv/config'

const base = 'http://localhost:5000/api'
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function req(method, path, { body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text }
  }

  return { status: res.status, json }
}

async function main() {
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  }

  console.log('1) Health')
  let r = await req('GET', '/health')
  assert(r.status === 200, `health failed: ${JSON.stringify(r.json)}`)

  console.log('2) Login success')
  r = await req('POST', '/auth/login', { body: { email, password } })
  assert(
    r.status === 200 && r.json.data?.token,
    `login failed: ${JSON.stringify(r.json)}`,
  )
  const token = r.json.data.token

  console.log('3) Login bad password -> 401')
  r = await req('POST', '/auth/login', {
    body: { email, password: 'wrong-password-999' },
  })
  assert(r.status === 401, `expected 401 for bad login, got ${r.status}`)

  console.log('4) Admin leads without token -> 401')
  r = await req('GET', '/admin/leads')
  assert(r.status === 401, `expected 401 unprotected, got ${r.status}`)

  console.log('5) Create lead')
  r = await req('POST', '/leads', {
    body: {
      name: 'Milestone Four',
      email: 'm4.lead@example.com',
      budget: 'Less than ₹25,000',
      message: 'Created during Milestone 4 API tests.',
    },
  })
  assert(
    r.status === 201 && r.json.data?.id,
    `create lead failed: ${JSON.stringify(r.json)}`,
  )
  const leadId = r.json.data.id

  console.log('6) Stats with token')
  r = await req('GET', '/admin/stats', { token })
  assert(
    r.status === 200 && typeof r.json.data?.total === 'number',
    `stats failed: ${JSON.stringify(r.json)}`,
  )

  console.log('7) List leads search + pagination')
  r = await req('GET', '/admin/leads?search=Milestone&page=1&limit=5', {
    token,
  })
  assert(
    r.status === 200 && Array.isArray(r.json.data) && r.json.meta,
    `list failed: ${JSON.stringify(r.json)}`,
  )
  assert(
    r.json.data.some((l) => l.id === leadId),
    'created lead not found in search',
  )

  console.log('8) Update status')
  r = await req('PATCH', `/admin/leads/${leadId}`, {
    token,
    body: { status: 'CONTACTED' },
  })
  assert(
    r.status === 200 && r.json.data?.status === 'CONTACTED',
    `patch failed: ${JSON.stringify(r.json)}`,
  )

  console.log('9) Invalid status -> 400')
  r = await req('PATCH', `/admin/leads/${leadId}`, {
    token,
    body: { status: 'DONE' },
  })
  assert(r.status === 400, `expected 400 for bad status, got ${r.status}`)

  console.log('ALL TESTS PASSED')
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
