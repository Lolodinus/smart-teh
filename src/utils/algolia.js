import { searchOnlyClient, indexAlgolia } from "../config/algolia";

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

const _sortingBy = async (sorting) => {
    const _sortTypes = {
        "priceHigh": {indexName: "product_price_deck", customRanking: "desc(price)"},
        "priceLow": {indexName: "product", customRanking: "asc(price)"},
        "all": {indexName: "product", customRanking: "asc(price)"}
    }

    if (_sortTypes.hasOwnProperty(sorting)) {
        return _sortTypes[`${sorting}`];
    } else {
        return _sortTypes["all"];
    }
} 

const _checkSorting = async (sorting) => {
    const { indexName, customRanking } = await _sortingBy(sorting);
    await indexAlgolia.setSettings({customRanking: [customRanking]});
    return indexName;
} 

export const getAlgoliaSearchData = async (searchText, itemsOnPage, currentPage, sorting) => {
    const page = !currentPage ? 1 : currentPage;
    const indexName = await _checkSorting(sorting);
    const searchIndex = await searchOnlyClient.initIndex(indexName);
    const algoliaSearchData = await searchIndex.search(searchText, {
        hitsPerPage: itemsOnPage,
        page: page - 1,
    });
    return _transformData(algoliaSearchData);
}