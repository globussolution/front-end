//
"use client";

import { useState } from "react";

export default function LoanCalculator() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(""); // Set initial value as an empty string
  const [loanAmountDesired, setLoanAmountDesired] = useState(""); // Set initial value as an empty string
  const [calculatedLoan, setCalculatedLoan] = useState(null);
  const [availableLoan, setAvailableLoan] = useState(0);

  const loanCategories = {
    "Wedding Loans": {
      subCategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000,
      loanPeriod: 3,
    },
    "Home Construction Loans": {
      subCategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    "Business Startup Loans": {
      subCategories: [
        "Buy Stall",
        "Advance Rent for Shop",
        "Shop Assets",
        "Shop Machinery",
      ],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    "Education Loans": {
      subCategories: ["University Fees", "Child Fees Loan"],
      maxLoan: Infinity, // Based on requirement
      loanPeriod: 4,
    },
  };

  // Function to calculate available loan amount
  const handleAvailableLoan = (selectedCategory, deposit) => {
    if (!selectedCategory || deposit === "") return;

    const maxLoan = loanCategories[selectedCategory]?.maxLoan || 0;
    const loanAvailable = Math.max(maxLoan - deposit, 0); // Ensure loan doesn't go negative
    setAvailableLoan(loanAvailable);
  };

  const calculateLoan = () => {
    if (
      !category ||
      !subCategory ||
      !loanPeriod ||
      initialDeposit === "" ||
      loanAmountDesired === ""
    ) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    const maxLoan = loanCategories[category].maxLoan;
    if (loanAmountDesired > availableLoan) {
      alert(`You can only avail a maximum of PKR ${availableLoan}.`);
      return;
    }

    const loanPeriodYears = parseInt(loanPeriod, 10);
    const loanAmount = loanAmountDesired; // User's desired loan amount
    const monthlyInstallment = loanAmount / (loanPeriodYears * 12);

    setCalculatedLoan({
      loanAmount,
      monthlyInstallment: monthlyInstallment.toFixed(2),
    });
  };

  return (
    <div className="loan-calculator bg-gray-50 p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Loan Calculator</h2>

      {/* Loan Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Loan Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory(""); // Reset subCategory when category changes
            setAvailableLoan(0); // Reset available loan when category changes
            setLoanAmountDesired(""); // Reset loan amount input when category changes
            handleAvailableLoan(e.target.value, initialDeposit); // Update available loan
          }}
          className="w-full border p-2 rounded-md"
        >
          <option value="">Select a category</option>
          {Object.keys(loanCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      {category && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select a subcategory</option>
            {loanCategories[category].subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loan Period */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Loan Period (Years)
        </label>
        <select
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="">Select loan period</option>
          {category &&
            Array.from(
              { length: loanCategories[category].loanPeriod },
              (_, i) => i + 1
            ).map((year) => (
              <option key={year} value={year}>
                {year} Year(s)
              </option>
            ))}
        </select>
      </div>

      {/* Initial Deposit */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Initial Deposit (PKR)
        </label>
        <input
          type="number"
          value={initialDeposit}
          onChange={(e) => {
            const deposit = e.target.value === "" ? "" : Number(e.target.value);
            setInitialDeposit(deposit);
            handleAvailableLoan(category, deposit); // Update available loan when deposit changes
          }}
          className="w-full border p-2 rounded-md"
          placeholder="Enter amount"
        />
      </div>

      {/* Loan Amount User Wants */}
      {category && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Loan Amount (PKR)
          </label>
          <input
            type="number"
            value={loanAmountDesired}
            onChange={(e) =>
              setLoanAmountDesired(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="w-full border p-2 rounded-md"
            placeholder="Enter the loan amount you want"
          />
        </div>
      )}

      {/* Available Loan Amount */}
      {category && (
        <div className="mb-4 bg-gray-100 p-3 rounded-md">
          <p>
            <strong>Available Loan Amount:</strong> PKR {availableLoan}
          </p>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={calculateLoan}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Calculate Loan
      </button>

      {/* Calculation Result */}
      {calculatedLoan && (
        <div className="mt-6 bg-white p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-2">Calculation Result</h3>
          <p>
            <strong>Loan Amount:</strong> PKR {calculatedLoan.loanAmount}
          </p>
          <p>
            <strong>Monthly Installment:</strong> PKR{" "}
            {calculatedLoan.monthlyInstallment}
          </p>
        </div>
      )}
    </div>
  );
}
