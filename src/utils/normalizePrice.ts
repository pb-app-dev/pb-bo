export const normalizePrice = (price: string): number => {
    const cleanedPrice = price.replace(/[^\d,]/g, '');
    const numericValue = parseFloat(cleanedPrice.replace(',', '.'));
    return Math.round(numericValue * 100);
};