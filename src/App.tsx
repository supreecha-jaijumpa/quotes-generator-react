import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";

import QuoteCard from "./components/quote-card/QuoteCard";
import { type Quote } from "./types/quote";

const App: FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>();
  const [quote, setQuote] = useState<Quote>();
  const [error, setError] = useState<string>();

  const handleNewQuote = useCallback((data: Quote[]) => {
    const newQuote = data[Math.floor(Math.random() * data.length)];
    setQuote(newQuote);
  }, []);

  useEffect(() => {
    axios
      .get("https://type.fit/api/quotes")
      .then(({ data }) => {
        setQuotes(data as Quote[]);
        handleNewQuote(data as Quote[]);
      })
      .catch((error) => setError(String(error)));
  }, [handleNewQuote]);

  let content = <>loading...</>;

  if (error) {
    content = <>there was an error loading data</>;
  }

  if (quotes && quote) {
    content = (
      <QuoteCard {...quote} onNewQuote={() => handleNewQuote(quotes)} />
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      {content}
    </div>
  );
};

export default App;
