import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const GraphqlProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: import.meta.env.VITE_HOST_URL,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};