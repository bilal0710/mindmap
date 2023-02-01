
// We use the gql tag to parse our query string into a query document
import {gql} from "apollo-angular";

const QUERY_MESSAGES = gql`
  query Messages
  {
    messages{
      content
    }
  }
`

const QUERY_ALL_CHATROOM = gql`
  query Chatrooms
  {
    chatrooms{
      name,
      type
    }
  }
`

const MUTATION_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
  login(
    email:$email,
    password: $password
){
    token
  }
}
`

const MUTATION_SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $firstname: String = "",
    $lastname: String = "", $passwordRepeat: String!) {
    signup(
      firstname: $firstname,
      lastname: $lastname,
      email: $email ,
      password: $password,
      passwordRepeat: $passwordRepeat
    ){
      token
    }
  }
`
