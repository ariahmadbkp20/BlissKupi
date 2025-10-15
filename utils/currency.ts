/**
 * Parses a formatted price string (e.g., "Rp 18.000") into a number.
 * @param priceString The string to parse.
 * @returns The parsed number.
 */
export const parsePrice = (priceString: string): number => {
    // Remove "Rp", dots, and trim whitespace, then convert to number
    return Number(priceString.replace(/Rp|\.| /g, ''));
};

/**
 * Formats a number into a standard Indonesian Rupiah currency string.
 * @param amount The number to format.
 * @returns The formatted currency string.
 */
export const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};