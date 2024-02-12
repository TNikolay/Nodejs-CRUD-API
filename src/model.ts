export interface IUserData {
  username: string
  age: number
  hobbies: string[]
}
export interface IUser extends IUserData {
  id: string
}

export function isUserData(user: unknown): user is IUserData {
  return user !== null && typeof user === 'object' && 'username' in user && typeof user.username === 'string' && 'age' in user && typeof user.age === 'number' && user.age >= 0 && 'hobbies' in user && Array.isArray(user.hobbies) && user.hobbies.every(v => typeof v === 'string')
}
