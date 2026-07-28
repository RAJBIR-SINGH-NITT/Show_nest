export const db = {
  query: async (sql: string, params?: unknown[]) => {
    console.log('DB Query:', sql, params)
    return []
  },
}
