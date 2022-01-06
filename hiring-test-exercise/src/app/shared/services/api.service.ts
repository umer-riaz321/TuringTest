import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  gql(query: any, variables = null): any {
    const queryOptions = { query } as any;
    variables ? queryOptions.variables = variables : null;
    return this.apollo.watchQuery(queryOptions);
  }

  mutate(mutation: any, variables: any): Observable<any> {
    return this.apollo.mutate({ mutation, variables });
  }

  post(path: string, body: any): Observable<any> {
    const url = path;
    return this.http.post<any>(url, { ...body });
  }
}
