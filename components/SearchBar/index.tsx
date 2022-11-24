import { Product } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/router";

interface SearchBarProps {
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearching,
  setMenu,
}: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<Product>>([]);
  const router = useRouter();

  useEffect(() => {
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
    if (query.length !== 0) {
      setSearching(true);
      fetchResult();
    } else {
      setSearching(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?products=${query}`);
            setQuery("");
            setMenu(false);
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
                  <Link href={`/products/${result.id}`} key={i}>
                    <div onClick={() => setMenu(false)}>
                      <h3>{result.title}</h3>
                    </div>
                  </Link>
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
