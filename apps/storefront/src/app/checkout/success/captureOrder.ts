import { captureOrder } from "../../../utils/api/graphQL/query";
import clientWithoutAuth from "../../../utils/api/graphQL/apolloClientWithoutAuth";

export const captureOrderMutation = async (token: string) => {
  const captureOrderMuationResponse = await clientWithoutAuth.query({ query: captureOrder, variables: {
    token: token
  } });
  return {
    data: captureOrderMuationResponse.data,
  }
}
