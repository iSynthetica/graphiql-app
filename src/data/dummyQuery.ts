export const dummyQuery = `query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}`;

const dummyVariablesObject = {
  limit: 2,
  page: 4,
};

export const dummyVariables = JSON.stringify(dummyVariablesObject, null, 2);

const dummyHeadersObject = {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  Authorization: 'Bearer 5b3b3c6d-9a6d-4d9a-8e2e-3d8f6aebd1b9',
};

export const dunmyHeaders = JSON.stringify(dummyHeadersObject, null, 2);
