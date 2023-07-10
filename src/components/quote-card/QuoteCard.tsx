import { FC } from "react";

import CopyToClipboard from "../copy-to-clipboard/CopyToClipboard";
import { type Quote } from "../../types/quote";

export type QuoteCardProps = Quote & {
  onNewQuote?: () => void;
};

const QuoteCard: FC<QuoteCardProps> = ({ text, author, onNewQuote }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border w-full max-w-md py-4 px-8">
      <p
        className={`inline text-2xl relative before:text-slate-400 before:content-['“'] before:font-serif before:text-3xl before:mr-1 after:text-slate-400 after:content-['”'] after:font-serif after:text-3xl after:ml-1`}
      >
        {text}
      </p>
      <p className="text-right text-sm font-medium italic mt-4">{author}</p>
      <hr className="my-5" />
      <div className="flex justify-between">
        <button
          title="generate new quote"
          className="border border-slate-400 rounded px-2 py-1 hover:bg-slate-50 hover:shadow-md"
          onClick={onNewQuote}
        >
          New Quote
        </button>
        <CopyToClipboard text={text} />
      </div>
    </div>
  );
};

export default QuoteCard;
