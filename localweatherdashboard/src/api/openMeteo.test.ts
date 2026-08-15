import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchOpenMeteo } from './openMeteo'

function buildFetchResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response
}

describe('fetchOpenMeteo', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resolves with the parsed JSON body on a successful request', async () => {
    const body = { current: {}, daily: {} }
    vi.mocked(fetch).mockResolvedValue(buildFetchResponse(body))

    await expect(fetchOpenMeteo()).resolves.toEqual(body)
  })

  it('throws with the status code when the response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue(buildFetchResponse(null, false, 503))

    await expect(fetchOpenMeteo()).rejects.toThrow('503')
  })

  it('throws a clean error when the response body is not valid JSON', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.reject(new SyntaxError('Unexpected token')),
    } as Response)

    await expect(fetchOpenMeteo()).rejects.toThrow('Failed to parse Open-Meteo response')
  })

  it('aborts the request once the timeout elapses', async () => {
    vi.mocked(fetch).mockImplementation((_url, init) => {
      const signal = (init as RequestInit).signal!
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason))
      })
    })

    // A near-zero timeout override keeps this test fast and avoids relying on fake timers
    // intercepting AbortSignal.timeout's internal (non-JS-timer) scheduling.
    await expect(fetchOpenMeteo(undefined, 1)).rejects.toBeDefined()
  })
})
