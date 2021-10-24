import { searchOnlyClient } from "../config/algolia";

const _transformData = (data) => {
    const newData = {
        ...data,
        hits: data.hits.map(product => {
            const newProduct = {
                ...product,
                id: product.objectID,
            };
            delete newProduct.objectID;
            return newProduct
        })
    };
    return newData
}

export const getAlgoliaSearchData = async (indexName, searchText, itemsOnPage, currentPage) => {
    const searchIndex = searchOnlyClient.initIndex(indexName);
    const page = !currentPage ? 1 : currentPage;
    const algoliaSearchData = await searchIndex.search(searchText, {
        hitsPerPage: itemsOnPage,
        page: page - 1
    });
    return _transformData(algoliaSearchData);
}