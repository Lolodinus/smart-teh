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
        }),
    };
    return newData
}

const _sortingBy = async (sorting) => {
    const _sortTypes = {
        "priceHigh": "product_price_desc",
        "priceLow": "product_price_asc",
        "all": "product"
    }

    if (_sortTypes.hasOwnProperty(sorting)) {
        return _sortTypes[`${sorting}`];
    } else {
        return _sortTypes["all"];
    }
} 

const _checkSorting = async (sorting) => {
    const indexName = await _sortingBy(sorting);
    return indexName;
} 

const _checkFilterPrice = (filters) => {
    if (filters.minPrice && filters.maxPrice) {
        return `price:${ filters.minPrice } TO ${ filters.maxPrice }`;
    } else if (filters.minPrice) {
        console.log(filters.minPrice);
        return `price >= ${ filters.minPrice }`;
    } else {
        return `price <= ${ filters.maxPrice }`;
    }
}

const _getFilter = (filters) => {
    const algoliaFilters = [];
    if ((filters.hasOwnProperty("minPrice") && filters.minPrice) || (filters.hasOwnProperty("maxPrice") && filters.maxPrice)) {
        algoliaFilters.push(_checkFilterPrice(filters));
    }
    return algoliaFilters;
}

export const getAlgoliaSearchFilterConfig = async (algoliaSearchConfig, filter) => {
    const filters = filter ? _getFilter(filter) : "";
    let algoliaFilters = filters.length > 0 ? filters.join(" AND ") : "";

    const newAlgoliaSearchConfig = {
        ...algoliaSearchConfig,
        filters: algoliaFilters,
    };
    return algoliaFilters.length > 0 ? newAlgoliaSearchConfig : algoliaSearchConfig;
}

export const getAlgoliaSearchData = async (searchText, itemsOnPage, currentPage, sorting, filter) => {
    
    // check sorting
    const newIndexName = await _checkSorting(sorting);

    // check currentPage exist
    const page = !currentPage ? 1 : currentPage;
    
    let algoliaSearchConfig = {
        hitsPerPage: itemsOnPage,
        page: page - 1,
    };

    // check filter
    algoliaSearchConfig = filter 
        ? await getAlgoliaSearchFilterConfig(algoliaSearchConfig, filter) 
        : algoliaSearchConfig;
    

    const searchIndex = await searchOnlyClient.initIndex(newIndexName);
    const algoliaSearchData = await searchIndex.search(searchText, algoliaSearchConfig);
    return _transformData(algoliaSearchData);
}


// add product
export const addProductToAlgoliaDB = async(id, title, price, img, category) => {
    try {
        await indexAlgolia.saveObject({
            objectID: id,
            title: title,
            price: +price,
            img: img,
            category: category,
        });
    } catch(error) {
        console.log(`${error.code} - ${error.message}`);
    }
}