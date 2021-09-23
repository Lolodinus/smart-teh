export const priceFormat = (price) => {
    const oldPrice = price.toString();
    const separator = " ";
    const newPrice = oldPrice.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    return newPrice;
}