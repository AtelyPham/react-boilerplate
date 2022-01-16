import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { GRAPHQL_BASE_URL } from '../../constants';
import { graphqlRequestBaseQuery } from '../../utils';
import { RootState } from '../store';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResponse {
  user: User;
}

export const authApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: GRAPHQL_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    me: builder.query<UserResponse, void>({
      query: () => ({
        document: gql`
          query Me {
            me {
              firstName
              lastName
              email
            }
          }
        `,
      }),
    }),
  }),
});

export const { useMeQuery } = authApi;
