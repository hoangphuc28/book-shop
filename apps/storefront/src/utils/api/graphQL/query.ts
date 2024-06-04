import gql from "graphql-tag";

export const getInformation = gql`
query Information {
  information {
      fullName
      address
      phone
      email
      avatar
  }
}`;
export const updateInformation = gql`
  mutation SaveAccount($fullName: String!, $phone: String!, $address: String!) {
    saveAccount(fullName: $fullName, phone: $phone, address: $address) {
      fullName
      phone
      address
    }
  }
`;
export const getBooks = gql`
query GetBooks($limit: Float!, $page: Float!, $condition: BookSearchCondition) {
  getBooks(limit: $limit, page: $page, condition: $condition) {
    items {
      id
      title
      thumbnail
      category {
          categoryID
          name
      }
      author {
          id
          name
      }
      description
      price
      publishDate
      rating
    }
    currentPage
    itemsPerPage
    totalItem
    totalPage
  }
}
`;
export const getCategories = gql`
query GetCategories {
  getCategories {
      categoryID
      name
  }
}`
export const getAuthors = gql`
query GetAuthors {
  getAuthors {
      id
      name
  }
}
`
export const updateCart = gql`
mutation UpdateCart ($bookId: String!, $quantity: Float!, $isReplace: Boolean!){
  updateCart(bookId: $bookId, quantity: $quantity, isReplace: $isReplace) {
      id
      accountId
      createdAt
      updatedAt
      amount
      cartItem {
        id
        quantity
        createdAt
        updatedAt
        book {
            id
            title
            thumbnail
            description
            price
            publishDate
            rating
        }
    }
  }
}
`
export const getCart = gql`
query GetCart {
  getCart {
      amount
      id
      accountId
      createdAt
      updatedAt
      cartItem {
          quantity
          book {
              id
              title
              thumbnail
              description
              price
              publishDate
              rating
              author {
                  id
                  name
              }
          }
      }
  }
}

`

