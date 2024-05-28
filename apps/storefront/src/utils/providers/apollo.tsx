'use client'
import { ApolloProvider } from "@apollo/client";
import client from "../api/graphQL/apolloClient";

export default function ApolloCustomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
