import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

const uri = environment.apiUrl;
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const authenticationLink = setContext((operation, context) => {
    const token = localStorage.getItem('accessToken');
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) { }
  });

  const link = ApolloLink.from([authenticationLink, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

// import { ApolloLink, InMemoryCache } from "@apollo/client/core";
// import { HttpLink } from "apollo-angular/http";
// import { Apollo } from "apollo-angular";
// import { setContext } from "@apollo/client/link/context";
// import { onError } from "@apollo/client/link/error";
// import { environment } from "src/environments/environment";
// import { AuthService } from "./shared/services/auth.service";


// export class GraphQLModule {
//   constructor(
//     private apollo: Apollo,
//     private httpLink: HttpLink,
//     private authService: AuthService
//   ) {
//     const uri = environment.apiUrl;

//     const authenticationLink = setContext((_, { headers }) => {
//       const currentUser = this.authService.currentUserValue;


//       if (currentUser) {
//         headers.Authorization = `Bearer ${currentUser.access_token}`;
//       }
      
//       return {
//         ...headers 
//       }
//     });

//     const errorLink = onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         const [error] = graphQLErrors
//       }
//     });

//     const link = ApolloLink.from([
//       authenticationLink,
//       errorLink.concat(this.httpLink.create({
//         uri(operation): string {
//           return uri;
//         }
//       }))
//     ]);

//     this.apollo.create({
//       link,
//       cache: new InMemoryCache({
//         addTypename: false
//       })
//     });
//   }
// }