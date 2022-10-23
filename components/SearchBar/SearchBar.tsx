import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/router";

type Props = {};

const SearchBar = (props: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length !== 0) {
      fetchResult();
    } else {
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
    console.log(results);
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?products=${query}`);
            setQuery("");
          }}
        >
          <label htmlFor="search-input" className={styles.search}>
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
              autoComplete="off"
            />
          </label>
        </form>
        {query !== "" && (
          <div className={styles["results-container"]}>
            <div className={styles.suggestions}>
              <h2>Sökförslag</h2>
              <div className={styles["suggestion-items"]}>
                {results?.map((result: Product, i) => {
                  return <h3 key={i}>{result.title}</h3>;
                })}
              </div>
            </div>
            <div className={styles.results}>
              <h2>Produkter</h2>
              <div className={styles.products}>
                {results?.map((result: Product, i) => {
                  return (
                    <div className={styles.result} key={i}>
                      <a className={styles.imagewrapper}>
                        <Image
                          layout="fill"
                          alt="product"
                          src={`${result.imgLink}`}
                        />
                      </a>
                      <h3>{result.title}</h3>
                      <h4>{result.price} kr</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
