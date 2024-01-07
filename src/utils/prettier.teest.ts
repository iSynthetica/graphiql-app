import '@testing-library/jest-dom';
import { prettifyGraphQLQuery } from './prettier';

describe('prettifyGraphQLQuery', () => {
  test('correct prettify', () => {
    const originalQuery = `
      query ($limit: Int!) {
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
      }
    `;

    const expectedPrettifiedQuery = `
        query ($limit: Int!) {
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
        }
      `;

    const result = prettifyGraphQLQuery(originalQuery);
    expect(result).toEqual(expectedPrettifiedQuery);
  });

  test('should handle undefined input gracefully', () => {
    const result = prettifyGraphQLQuery(undefined);
    expect(result).toBeUndefined();
  });
});
