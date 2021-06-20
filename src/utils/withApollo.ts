import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

const client = new ApolloClient({
  uri: "https://jemmastables-server.herokuapp.com/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const withApollo = createWithApollo(client);
