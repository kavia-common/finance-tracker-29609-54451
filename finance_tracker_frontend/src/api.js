//
// api.js - Generic API utility for frontend.
// Handles requests to the backend REST API.
//

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"; // Update for deployment if needed

// PUBLIC_INTERFACE
/**
 * Fetches all finance entries from backend API.
 * Returns: Promise<Array<{ id, description, amount, category, date }>>
 */
export async function fetchFinanceEntries() {
  const resp = await fetch(`${API_BASE_URL}/entries`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch entries: ${resp.status}`);
  }
  return await resp.json();
}
