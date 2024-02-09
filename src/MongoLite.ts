import { IUser, IUserData } from './model.js'

const MOCK_USERS: IUser[] = [
  {
    id: '1',
    username: '111',
    age: 1,
    hobbies: [],
  },
  {
    id: '2',
    username: '222',
    age: 22,
    hobbies: ['safari', 'needlework'],
  },
  {
    id: '3',
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
    // console.log(JSON.stringify(this.db))
    return this.db
  }

  getUser(id: string): IUser | undefined {
    return this.db.find(v => v.id == id)
  }

  addUser(user: IUserData): IUser {
    const newUser: IUser = { id: 'newid', username: user.username, age: user.age, hobbies: user.hobbies }
    this.db.push(newUser)
    return newUser
  }
}
