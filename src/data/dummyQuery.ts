export const dummyQuery = `query ($limit: Int!) {
  categories(limit: $limit) {
    id
    name
    slug
    parent
    description
    display
    image
    menu_order
    count
  }
}
`;
