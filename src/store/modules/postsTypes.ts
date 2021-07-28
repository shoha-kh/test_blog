
export interface PostsInterface extends Object {
  data: PostInterface[]
  loading: boolean
  links: any
}

type link = {
  page: number
  limit: number
}

export interface PostInterface extends Object {
  id: string
  title: string
  body: string
  user?: object
}