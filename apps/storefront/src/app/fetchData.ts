
import clientWithoutAuth from "../utils/api/graphQL/apolloClientWithoutAuth";
import { getBookOnSale
} from "../utils/api/graphQL/query";

export const loadBookOnSale = async () => {
  const bookQuery = await clientWithoutAuth.query({
    query: getBookOnSale});
    console.log(bookQuery)
  return {
    booksData: bookQuery.data.getBookOnSale
  };
};
