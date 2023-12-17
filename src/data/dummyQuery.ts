export const dummyQuery = `query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
`;
