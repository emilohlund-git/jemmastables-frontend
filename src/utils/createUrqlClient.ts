import { dedupExchange, fetchExchange } from "@urql/core";
import {
  DeleteHorseMutation,
  DeleteHorseMutationVariables,
  HorseDocument,
  HorseQuery,
  HorsesQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
  UserDocument,
  UserQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";

function invalidateAllHorses(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "horses");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "horses", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteHorse: (result, args, cache, info) => {
            cache.invalidate({ __typename: 'Horse', id: (args as DeleteHorseMutationVariables).id });
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, UserQuery>(
              cache,
              { query: UserDocument },
              _result,
              () => ({ user: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, UserQuery>(
              cache,
              { query: UserDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    user: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, UserQuery>(
              cache,
              { query: UserDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    user: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
