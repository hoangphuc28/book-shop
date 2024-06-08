
import clientWithoutAuth from "../utils/api/graphQL/apolloClientWithoutAuth";
import { getBookOnSale, getBooksWithCondition
} from "../utils/api/graphQL/query";

export const loadBookOnSale = async () => {
  const bookQuery = await clientWithoutAuth.query({
    query: getBookOnSale});
  return {
    booksData: bookQuery.data.getBookOnSale
  };
};

export const loadBooksWithCondition = async (condition: number, limit: number) => {
  const bookQuery = await clientWithoutAuth.query({
    query: getBooksWithCondition,
    variables: {
      condition: condition,
      limit: limit,
    }
  });
  return {
    booksData: bookQuery.data.getBooksWithCondition
  };
};
