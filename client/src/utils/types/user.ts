export interface User {
  id: number
  name: string
  role: 'admin' | 'sub' | 'user'
}
