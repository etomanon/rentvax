export interface User {
  id: number
  email: string
  role: 'admin' | 'sub' | 'user'
}
