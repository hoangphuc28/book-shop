import { captureOrder } from "../../../utils/api/graphQL/query";
import clientWithoutAuth from "../../../utils/api/graphQL/apolloClientWithoutAuth";

export const captureOrderMutation = async (token: string, orderId: string) => {
  const captureOrderMuationResponse = await clientWithoutAuth.query({ query: captureOrder, variables: {
    token: token,
    orderId: orderId
  } });
  return {
    data: captureOrderMuationResponse.data,
  }
}
