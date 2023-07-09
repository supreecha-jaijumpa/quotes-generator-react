import { FC, useCallback, useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import QuoteCard from "./components/quote-card/QuoteCard";
import { fetcher } from "./utils/fetcher";
import { type Quote } from "./types/quote";

const App: FC = () => {
  const { data, isLoading } = useSWRImmutable<Quote[]>(
    "https://type.fit/api/quotes",
    fetcher
  );

  const [quote, setQuote] = useState<Quote>();

  const newQuote = useCallback(() => {
    if (!data || data.length === 0) {
      setQuote(undefined);
      return;
    }
    const newQuote = data[Math.floor(Math.random() * data.length)];
    setQuote(newQuote);
  }, [data]);

  useEffect(() => {
    if (data && !quote) {
      newQuote();
    }
  }, [data, quote, newQuote]);

  let content = <>Not found any quotes data</>;

  if (isLoading) {
    content = <>Loading ...</>;
  }

  if (quote) {
    content = <QuoteCard {...quote} onNew={newQuote} />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      {content}
    </div>
  );
};

export default App;
