import { randomUUID } from 'crypto'
import { IUser, IUserData } from './model.js'

const MOCK_USERS: IUser[] = [
  {
    id: '0455c20a-6377-4de1-a87a-c6c06e28508a',
    username: '111',
    age: 1,
    hobbies: [],
  },
  {
    id: '4222e4a5-2dc7-4da9-9869-1fc0cd5d76d5',
    username: '222',
    age: 22,
    hobbies: ['safari', 'needlework'],
  },
  {
    id: '8c94bb0f-ae9f-434f-90c7-314abcca2593',
    username: '333',
    age: 33,
    hobbies: ['ts', 'js'],
  },
]

export class MongoLite {
  private db: IUser[] = []

  constructor() {
    console.log('db!')
    this.db = [...MOCK_USERS]
    this.getUsers()
  }

  getUsers(): IUser[] {
    return this.db
  }

  getUser(id: string): IUser | undefined {
    return this.db.find(v => v.id == id)
  }

  addUser(data: IUserData): IUser {
    const newUser: IUser = { id: randomUUID(), username: data.username, age: data.age, hobbies: data.hobbies }
    this.db.push(newUser)
    return newUser
  }

  updateUser(id: string, data: IUserData): IUser | undefined {
    const index = this.db.findIndex(v => v.id == id)
    if (index === -1) return undefined
    this.db[index] = { id: this.db[index].id, ...data }
    return this.db[index]
  }

  deleteUser(id: string): boolean {
    const index = this.db.findIndex(v => v.id == id)
    if (index === -1) return false
    this.db.splice(index, 1)
    return true
  }
}
