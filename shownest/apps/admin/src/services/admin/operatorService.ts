import { operatorsMock } from '@/mock/admin'

export interface OperatorRow {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'active' | 'suspended' | 'inactive'
  role: string
  venue: string
  notes: string
  lastActive: string
  contact: string
  activity: string
}

export function getOperators(): OperatorRow[] {
  return operatorsMock as OperatorRow[]
}

export function getOperatorById(id: string) {
  return operatorsMock.find((operator) => operator.id === id) as OperatorRow | undefined
}
