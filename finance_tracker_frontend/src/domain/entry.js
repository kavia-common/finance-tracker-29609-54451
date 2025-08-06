//
// Entry domain model logic: validation and factory for finance entries
//

// PUBLIC_INTERFACE
/**
 * Creates a validated finance entry object.
 * @param {Object} params
 * @param {string} params.description
 * @param {number|string} params.amount
 * @param {string} params.category
 * @param {string|Date} params.date
 * @returns {Object} entry object if valid, throws error if invalid
 */
export function createEntry({ description, amount, category, date }) {
  // Simple validation
  if (!description || typeof description !== "string") {
    throw new Error("Description is required");
  }
  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount)) {
    throw new Error("Amount must be a number");
  }
  if (!category || typeof category !== "string") {
    throw new Error("Category is required");
  }
  let entryDateObj;
  if (!date) {
    entryDateObj = new Date();
  } else {
    entryDateObj = new Date(date);
    if (isNaN(entryDateObj.getTime())) {
      throw new Error("Invalid date");
    }
  }
  return {
    description: description.trim(),
    amount: parsedAmount,
    category: category.trim(),
    date: entryDateObj.toISOString()
  };
}

// PUBLIC_INTERFACE
/**
 * Validates an existing entry object. Returns boolean.
 */
export function isValidEntry(entry) {
  try {
    createEntry(entry);
    return true;
  } catch {
    return false;
  }
}
