import React, { useState, useEffect } from "react";

type Props = {};

const SearchBar = (props: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    fetchResult();
  }, [query]);

  async function fetchResult() {
    await fetch("/api/product/search", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ query: query }),
    }).then(async (res) => setResults(await res.json()));
    console.log(results);
  }

  return (
    <div>
      <div>
        <label htmlFor="search-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-input"
            placeholder="Sök..."
          />
        </label>
      </div>
      <div>a</div>
    </div>
  );
};

export default SearchBar;
