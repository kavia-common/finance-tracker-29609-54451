//
// Summary domain logic: running total and statistics for finance entries
//

// PUBLIC_INTERFACE
/**
 * Computes the running total from a list of finance entries.
 * @param {Array<{amount: number|string}>} entries
 * @returns {number}
 */
export function computeRunningTotal(entries) {
  if (!Array.isArray(entries)) return 0;
  return entries.reduce((total, entry) => total + Number(entry.amount || 0), 0);
}

// PUBLIC_INTERFACE
/**
 * Computes category-wise totals.
 * @param {Array<{amount: number|string, category: string}>} entries
 * @returns {Object} category => sum
 */
export function computeCategoryTotals(entries) {
  if (!Array.isArray(entries)) return {};
  return entries.reduce((acc, entry) => {
    const cat = entry.category || "Uncategorized";
    const amount = Number(entry.amount || 0);
    acc[cat] = (acc[cat] || 0) + amount;
    return acc;
  }, {});
}
