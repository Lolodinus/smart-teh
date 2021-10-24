import algoliasearch from 'algoliasearch';

const applicationID = "1OY2X73BSD";
const searchOnlyAPIKey = "2b5c558e2b273ca5e0ccea23a6391975";
const adminAPIKey = "9cf54a7e7b5257ed5ad270662b2e8b30"

export const searchClient = algoliasearch(applicationID, adminAPIKey);
export const searchOnlyClient = algoliasearch(applicationID, searchOnlyAPIKey);

export const indexAlgolia = searchClient.initIndex("product");