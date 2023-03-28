import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

type Props = {
  setSearch: (str: string) => void;
};
const Search: React.FC<Props> = ({ setSearch }) => {
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input.toLocaleLowerCase(), 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <input
      className="search-input"
      type="search"
      placeholder="Search here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default Search;
