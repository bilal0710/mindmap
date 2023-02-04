// We use the gql tag to parse our query string into a query document
import {gql} from "apollo-angular";

const QUERY_ALL_MESSAGES = gql`
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
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname,
        email,

      }
    }
  }
`

const QUERY_ALL_USERS = gql`
  query users{
    users{
      id,
      firstname,
      lastname,
      email,
    }
  }
`

const QUERY_ONE_CHATROOM = gql`
  query Chatroom($id: String!){
    chatroom(id: $id)
    {
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname,
        email,

      }
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

const MUTATION_UPDATE_CHATROOM = gql`
    mutation updateRoom($id : String!, $name: String!, $users: [String!]!, $privateRoom: Boolean!){
        updateChatroom(
            updateChatroomInput: {
                id: $id,
                name:$name,
                privateRoom: $privateRoom,
                users: $users
            }
        ){
            name,
            type,
            users{
                id,
                firstname,
                lastname
            }
        }
    }
`

const MUTATION_CREATE_CHATROOM = gql`
  mutation createRoom($name: String!, $users: [String!]!, $privateRoom: Boolean!){
    createChatroom(
      createChatroomInput: {
        name:$name,
        privateRoom: $privateRoom,
        users: $users
      }
    ){
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname
      }
    }
  }
`

const MUTATION_DELETE_CHATROOM = gql`
  mutation deleteChatroom ($roomId:String!){
    removeChatroom(
      id:$roomId
    ){
      id
    }
  }
`
