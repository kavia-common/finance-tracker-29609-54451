import React from "react";
import PropTypes from "prop-types";
import { computeRunningTotal } from "./domain/summary";

// PUBLIC_INTERFACE
/**
 * Displays the list of finance entries and the running total.
 * @param {Object} props
 * @param {Array} props.entries - List of finance entries ({ id, description, amount, category, date })
 */
function FinanceEntryList({ entries }) {
  const runningTotal = computeRunningTotal(entries);

  return (
    <div className="finance-list-container">
      <div className="running-total" style={{
        fontWeight: "bold",
        fontSize: "1.2rem",
        marginBottom: "1rem"
      }}>
        💰 Running Total: <span style={{ color: "#1976d2" }}>{runningTotal.toFixed(2)}</span>
      </div>
      <table className="finance-table" style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "var(--bg-secondary)",
        color: "var(--text-primary)",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <thead>
          <tr>
            <th style={{padding: "12px", borderBottom: "1px solid var(--border-color)"}}>Description</th>
            <th style={{padding: "12px", borderBottom: "1px solid var(--border-color)"}}>Amount</th>
            <th style={{padding: "12px", borderBottom: "1px solid var(--border-color)"}}>Category</th>
            <th style={{padding: "12px", borderBottom: "1px solid var(--border-color)"}}>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="4" style={{textAlign: "center", padding: "24px"}}>No entries found.</td>
            </tr>
          ) : (
            entries.map(entry => (
              <tr key={entry.id}>
                <td style={{padding: "10px", borderBottom: "1px solid var(--border-color)"}}>{entry.description}</td>
                <td style={{
                  padding: "10px",
                  borderBottom: "1px solid var(--border-color)",
                  color: entry.amount < 0 ? "#e02d1b" : "#2ca139"
                }}>{Number(entry.amount).toFixed(2)}</td>
                <td style={{padding: "10px", borderBottom: "1px solid var(--border-color)"}}>{entry.category}</td>
                <td style={{padding: "10px", borderBottom: "1px solid var(--border-color)"}}>
                  {entry.date ? (new Date(entry.date)).toLocaleDateString() : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

FinanceEntryList.propTypes = {
  entries: PropTypes.array.isRequired
};

export default FinanceEntryList;
