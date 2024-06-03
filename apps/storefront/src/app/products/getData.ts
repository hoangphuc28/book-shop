import clientWithoutAuth from "../../utils/api/graphQL/apolloClientWithoutAuth";
import { getBooks, getCategories, getAuthors } from "../../utils/api/graphQL/query";

export const loadBooks = async (page = 1, limit = 10, categories: string[], authors: string[], query: string, rating: string, sort: string) => {
  const bookQuery = await clientWithoutAuth.query({
    query: getBooks,
    variables: {
      page: page,
      limit: limit,
      condition: {
        category: categories,
        author: authors,
        query: query,
        rating: rating,
        sort: sort
      }
    }
  });
  return {
    booksData: bookQuery.data.getBooks,
  };
};
export const loadCategories = async () => {
  const categoryQuery = await clientWithoutAuth.query({ query: getCategories });
  return {
    categories: categoryQuery.data.getCategories,
  }
}
export const loadAuthors = async () => {
  const authorsQuery = await clientWithoutAuth.query({ query: getAuthors });

  return {
    authors: authorsQuery.data.getAuthors,

  }
}
