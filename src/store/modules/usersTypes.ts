
export interface UsersInterface extends Object {
  data: UserInterface[]
  loading: boolean
  links?: []
  meta?: string
}

export interface UserInterface extends Object {
  id: string
  name: string
  username: string
}