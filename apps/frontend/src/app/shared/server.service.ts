import {Injectable} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {LoginCredentials, LoginResponse} from "./types";

const login_Mutation = gql`
  mutation loginUser {
    login(
      email:"max@email.com",
      password: "123456"
    ){
      token
    }
  }
`
@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private apollo: Apollo) {
  }

  login(loginCredentials?: LoginCredentials) {
    return this.apollo.mutate<LoginResponse>({ mutation: login_Mutation });
  }
}

