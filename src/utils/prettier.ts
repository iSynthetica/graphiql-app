export function prettifyGraphQLQuery(query: string | undefined) {

  if (!query) {
    return query;
  }
  const lines = query.split('\n');
  let prettifiedQuery = '';
  let indentationLevel = 0;


  lines.forEach((line) => {
    if (indentationLevel < 0) {
        return query;
    }
    const trimmedLine = line.trim();

    if (trimmedLine !== '') {
      if (trimmedLine.endsWith('}')) {
        indentationLevel -= 2;
      }

      const cleanedLine = trimmedLine.replace(/\s*([\{\}])\s*/g, ' $1');

      prettifiedQuery += ' '.repeat(indentationLevel) + cleanedLine + '\n';

      if (cleanedLine.includes('{')) {
        indentationLevel += 2;
      }
    }
  });
  return prettifiedQuery;
}
