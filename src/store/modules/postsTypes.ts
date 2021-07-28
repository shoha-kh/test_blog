
export interface PostsInterface extends Object {
  data: PostInterface[]
  links: any
  loading: boolean
}

// type link = {
//   page: number
//   limit: number
// }

export interface PostInterface extends Object {
  id: string
  title: string
  body: string
  user?: object
}