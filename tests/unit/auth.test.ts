import { describe, it, expect } from 'vitest'
import { getRoleFromEmail } from '../../apps/web/src/shared/auth/roleService'

describe('vendor role detection', () => {
  it('recognizes the demo vendor email as a vendor', () => {
    expect(getRoleFromEmail('vendor@shownest.com')).toBe('vendor')
  })
})
