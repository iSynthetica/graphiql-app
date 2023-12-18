export const dummyQuery = `query ($limit: Int!) {
  products(limit: $limit) {
    id
    name
    slug
    permalink
    price
    categories {
      id
      name
      slug
    }
    images {
      id
      name
      src
    }
  }
}`;
