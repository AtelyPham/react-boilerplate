/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { DocumentNode } from 'graphql';
import { ClientError, GraphQLClient } from 'graphql-request';

type P = Parameters<GraphQLClient['request']>;
export type Document = P[0];
export type Variables = P[1];
export type RequestHeaders = P[2];

export const graphqlRequestBaseQuery = (
  options: FetchBaseQueryArgs & { url: string },
): BaseQueryFn<
  { document: string | DocumentNode; variables?: any },
  unknown,
  Pick<ClientError, 'name' | 'message' | 'stack'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> => {
  const client = new GraphQLClient(options.url);

  return async ({ document, variables }, obj) => {
    if (typeof options.prepareHeaders === 'function') {
      const headers = await options.prepareHeaders(new Headers({}), obj);

      Object.entries(headers).forEach(([key, val]) =>
        client.setHeader(key, val),
      );
    }

    try {
      return { data: await client.request(document, variables), meta: {} };
    } catch (error) {
      if (error instanceof ClientError) {
        const { name, message, stack, request, response } = error;
        return { error: { name, message, stack }, meta: { request, response } };
      }
      throw error;
    }
  };
};
