import gql from 'graphql-tag';

export const getInformation = gql`
  query Information {
    information {
      fullName
      address
      phone
      email
      avatar
    }
  }
`;
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
  query GetBooks(
    $limit: Float!
    $page: Float!
    $condition: BookSearchCondition
  ) {
    getBooks(limit: $limit, page: $page, condition: $condition) {
      items {
        id
        title
        thumbnail
        salePrice
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
export const getBook = gql`
  query GetBook($id: String!, $limit: Float, $page: Float) {
    getBook(id: $id, limit: $limit, page: $page) {
      reviews {
        totalPages
        totalItem
        currentPage
        itemsPerPage
        items {
          id
          rating
          content
          accounts {
            id
            fullName
            avatar
          }
        }
      }
      book {
        id
        title
        thumbnail
        description
        price
        salePrice
        publishDate
        rating
        category {
          categoryID
          name
        }
        author {
          id
          name
        }
      }
    }
  }
`;
export const getCategories = gql`
  query GetCategories {
    getCategories {
      categoryID
      name
    }
  }
`;
export const getAuthors = gql`
  query GetAuthors {
    getAuthors {
      id
      name
    }
  }
`;

export const updateCart = gql`
  mutation UpdateCart(
    $bookId: String!
    $quantity: Float!
    $isReplace: Boolean!
  ) {
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
`;
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
          salePrice
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
`;
export const getPromotion = gql`
  query GetPromotions {
    getPromotions {
      id
      code
      startDate
      endDate
      level
      validationRule {
        ... on OrderLevelValidationRule {
          limit
          percentage
        }
        ... on ProductLevelValidationRule {
          productIdList
          discountValuePerProduct
        }
      }
    }
  }
`;

export const createOrder = gql`
  mutation CreateOrder(
    $fullName: String!
    $address: String!
    $phone: String!
    $email: String!
    $paymentMethod: PaymentMethod!
    $orderItems: [OrderItemInput!]!
    $promotionId: String
    $applicationContext: ApplicationContext
  ) {
    createOrder(
      order: {
        fullName: $fullName
        address: $address
        phone: $phone
        email: $email
        paymentMethod: $paymentMethod
        orderItems: $orderItems
        promotionId: $promotionId
        applicationContext: $applicationContext
      }
    ) {
      order {
        orderID
        status
        paymentMethod
      }
      link
    }
  }
`;
export const captureOrder = gql`
mutation CaptureOrder($token: String!, $orderId: String!) {
    captureOrder(token: $token, orderId: $orderId)
}
`
export const clearCart = gql`
  mutation ClearCart {
    clearCart {
      id
      accountId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const createReview = gql`
  mutation CreateReview(
    $productId: String!
    $rating: Float!
    $content: String!
  ) {
    createReview(productId: $productId, rating: $rating, content: $content) {
      rating
      content
      id
      accounts {
        id
        fullName
      }
    }
  }
`;
export const getBookOnSale = gql`
  query getBookOnSale {
    getBookOnSale {
      id
      title
      salePrice
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
  }
`;
export const getAboutPage = gql`
  query GetAboutPage {
    getAboutPage
  }
`;
export const getBooksWithCondition = gql`
  query GetBooksWithCondition($condition: Float!, $limit: Float!) {
    getBooksWithCondition(condition: $condition, limit: $limit) {
      id
      title
      thumbnail
      description
      price
      salePrice
      publishDate
      rating
      author {
        id
        name
      }
      category {
        categoryID
        name
      }
    }
  }
`;
export const getOrdersByAccount = gql`
query FindOrdersByAccountId($status: String!) {
    findOrdersByAccountId(status: $status) {
        orderID
        fullName
        address
        phone
        email
        total
        status
        paymentMethod
        orderCode
        orderItems {
            orderItemID
            bookId
            extendPrice
            orderID
            quantity
            price
            createdAt
            updatedAt
        }
        promotion {
            id
            code
            startDate
            endDate
            createdAt
            updatedAt
            level
            validationRule {
               ... on OrderLevelValidationRule {
                    limit
                    percentage
                }
                ... on ProductLevelValidationRule {
                    productIdList
                    discountValuePerProduct
                }
            }
        }
    }
}
`
export const getDetailOrder = gql`
query GetDetailOrder($orderId: String!) {
    getDetailOrder(orderId: $orderId) {

        orderID
        fullName
        address
        phone
        email
        orderCode
        total
        status
        paymentMethod
        createdAt
        updatedAt
        cancelePendingDate
        cancelledDate
        deliveredDate
        deliveringDate
        orderItems {
            orderItemID
            bookId
            extendPrice
            orderID
            quantity
            price
            createdAt
            updatedAt
            book {
                id
                title
                thumbnail
                description
                price
                salePrice
                publishDate
                rating
            }
        }
    }
}
`
export const updateOrderStatus = gql`
mutation UpdateOrderStatus($orderId: String!, $orderStatus: String!) {
    updateOrderStatus(orderId: $orderId, orderStatus: $orderStatus)
}
`
