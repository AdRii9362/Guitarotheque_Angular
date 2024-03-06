export interface User {
    id: number
    isAdmin : boolean
    nickname : string
    email : string
  }
  
  export interface RegisterForm extends User {
    password : string
  }