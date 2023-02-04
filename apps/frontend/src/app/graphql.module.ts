import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {ApolloLink, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from "@apollo/client/link/context";

const uri = 'http://localhost:3333/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('mindmap_token');
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache({
    addTypename: false
  });

  return {
    link,
    cache,
    defaultOptions
  }
}
@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],

    },
  ],
})
export class GraphQLModule {}
