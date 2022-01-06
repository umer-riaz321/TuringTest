import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  PAGINATED_LIST = gql`
    query PaginatedCalls($offset: Float, $limit: Float) {
      paginatedCalls(offset: $offset, limit: $limit) {
        nodes {
          id
          direction
          from
          to
          duration
          via
          is_archived
          call_type
          created_at
          notes {
            id
            content
          }
        }
        totalCount
        hasNextPage
      }
    }
  `;

  constructor(private apiService: ApiService) { }

  getPaginatedList(body: any): any {
    return this.apiService.gql(this.PAGINATED_LIST, { ...body });
  }
}
