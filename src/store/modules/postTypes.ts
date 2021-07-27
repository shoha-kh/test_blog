
export interface PostsInterface extends Object {
  data: PostInterface[]
  loading: boolean
  links?: []
  meta?: string
}

export interface PostInterface extends Object {
  id: string
  title: string
  body: string
  user?: object
}