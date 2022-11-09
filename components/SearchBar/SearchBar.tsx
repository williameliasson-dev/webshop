import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/router";

const SearchBar = ({ setSearching }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<Product>>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length !== 0) {
      setSearching(true);
      fetchResult();
    } else {
      setSearching(false);
      setResults([]);
    }
  }, [query]);

  async function fetchResult() {
    await fetch("/api/product/search", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ query: query }),
    }).then(async (res) => {
      const data = await res.json();
      if ((await data) !== results) {
        setResults(data);
      }
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?products=${query}`);
            setQuery("");
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-input"
            placeholder="SEARCH PRODUCTS"
            autoComplete="off"
          />
        </form>
        {query !== "" && (
          <div className={styles.results}>
            <h2>Suggestions</h2>
            <div>
              {results?.map((result: Product, i) => {
                return (
                  <div key={i}>
                    <h3>{result.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
