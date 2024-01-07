import { prettifyGraphQLQuery } from '../src/utils/prettier';

describe('prettifyGraphQLQuery', () => {
  it('should return an empty string if the query is undefined', () => {
    const query = undefined;
    const result = prettifyGraphQLQuery(query);
    expect(result).toBe('');
  });

  it('should return the same query if it has no indentation', () => {
    const query = 'query { name }';
    const result = prettifyGraphQLQuery(query);
    expect(result).toBe(query);
  });

  it('should prettify the query with proper indentation', () => {
    const query = `
      query {
        user {
          id
          name
          email
        }
      }
    `;
    const expected = `
      query {
        user {
          id
          name
          email
        }
      }
    `;
    const result = prettifyGraphQLQuery(query);
    expect(result).toBe(expected);
  });

  it('should handle nested blocks correctly', () => {
    const query = `
      query {
        user {
          id
          name
          address {
            street
            city
          }
        }
      }
    `;
    const expected = `
    query {
      user {
        id
        name
        address {
          street
          city
        }
      }
    }`;
    const result = prettifyGraphQLQuery(query);
    expect(result).toBe(expected);
  });
  test('should handle undefined input gracefully', () => {
    const result = prettifyGraphQLQuery(undefined);
    expect(result).toBeUndefined();
  });
});
