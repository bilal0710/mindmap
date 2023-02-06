import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {ApolloLink, DefaultOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from "@apollo/client/link/context";

import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from "@apollo/client/utilities";


const uri = 'http://localhost:3333/graphql';

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    }
  }));
  // Create an http link:
  const http = httpLink.create({
    uri: uri,
  })

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: 'ws://localhost:3333/',
    options: {
      reconnect: true
    }
  })

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
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const connection = split(
    // split based on operation type
    ({query}) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    ws,
    http
  );
  const link = ApolloLink.from([basic, auth, connection]);

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
export class GraphQLModule {
}
