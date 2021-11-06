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

const _getSortingFilter = async (sorting) => {
    const sortTypes = {
        "priceHigh": "product_price_desc",
        "priceLow": "product_price_asc",
        "all": "product"
    }

    if (sortTypes.hasOwnProperty(sorting)) {
        return sortTypes[`${sorting}`];
    } else {
        return sortTypes["all"];
    }
} 

const _getPriceFilter = async (priceFilter) => {
    if (priceFilter.hasOwnProperty("minPrice") && priceFilter.hasOwnProperty("maxPrice")) {
        return `price:${ priceFilter.minPrice } TO ${ priceFilter.maxPrice }`;
    } else if (priceFilter.hasOwnProperty("minPrice")) {
        return `price >= ${ priceFilter.minPrice }`;
    } else if (priceFilter.hasOwnProperty("maxPrice")) {
        return `price <= ${ priceFilter.maxPrice }`;
    } else {
        return ""
    }
}

const _getCatygoryFilter = (catygoryFilter) => {
    if (catygoryFilter.length > 1) {
        return `category:${catygoryFilter.join(" OR category:")}`;
    } else {
        return `category: ${catygoryFilter[0]}`;
    }
}

const _getAlgoliaSearchFilterConfig = async (algoliaSearchConfig, priceFilter, catygoryFilter) => {
    const algoliaFilters = priceFilter && catygoryFilter
        ? `${priceFilter} AND ${catygoryFilter}`
        : priceFilter
            ? priceFilter
            : catygoryFilter;
    return {
        ...algoliaSearchConfig,
        filters: algoliaFilters
    }
}

const _checkFilter = async(algoliaConfig, filters) => {
    const { priceFilter, categoryTagsFilter } = filters;

    // get price filter
    const algoliaPriceFilter = priceFilter && Object.keys(priceFilter).length > 0 
        ? await _getPriceFilter(priceFilter)
        : "";

    // get category tags filter
    const algoliaCatygoryFilter = categoryTagsFilter && categoryTagsFilter.length > 0 
        ? await _getCatygoryFilter(categoryTagsFilter)
        : "";

    // set filter
    algoliaConfig = algoliaPriceFilter || algoliaCatygoryFilter
        ? await _getAlgoliaSearchFilterConfig(algoliaConfig, algoliaPriceFilter, algoliaCatygoryFilter)
        : algoliaConfig;

    return {algoliaConfig, algoliaPriceFilter, algoliaCatygoryFilter};
}

const _getCategoryTags = async (searchIndex, searchFilter, algoliaSearchConfig, algoliaPriceFilter) => {
    const serchDataWithoutTags = await searchIndex.search(searchFilter, {
        ...algoliaSearchConfig,
        filters: algoliaPriceFilter,
    });
    return serchDataWithoutTags.facets.category;
}

// get product
export const getAlgoliaSearchData = async (itemsOnPage, currentPage, allFilters) => {
    const { searchFilter, sortByFilter } = allFilters;

    // check currentPage exist
    const page = !currentPage ? 1 : currentPage;
    
    let algoliaSearchConfig = {
        hitsPerPage: itemsOnPage,
        page: page - 1,
        facets: ['price', "category"]
    };

    // get sorting
    const newIndexName = await _getSortingFilter(sortByFilter);

    // check filter
    const {algoliaConfig, algoliaPriceFilter, algoliaCatygoryFilter} = await _checkFilter(algoliaSearchConfig, allFilters);
    algoliaSearchConfig = algoliaConfig;

    const searchIndex = await searchOnlyClient.initIndex(newIndexName);
    const algoliaSearchData = await searchIndex.search(searchFilter, algoliaSearchConfig);
    const algoliaData = await _transformData(algoliaSearchData);

    return {
        minPrice: algoliaSearchData.facets_stats.price.min,
        maxPrice: algoliaSearchData.facets_stats.price.max,
        availableCatygory: await _getCategoryTags(
            searchIndex, 
            searchFilter, 
            algoliaSearchConfig, 
            algoliaPriceFilter
        ),
        products:  algoliaData.hits,
        totalPages: +algoliaData.nbPages
    }
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