import { FC, useCallback, useState } from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { Quote } from "../../types/quote";

type QuoteCardProps = Quote & {
  onNew?: () => void;
};

const QuoteCard: FC<QuoteCardProps> = ({ text, author, onNew }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    void copy(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copy, text]);

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
          className={`hover:text-blue-500 ${copied ? "opacity-50" : ""}`}
          onClick={handleCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
            />
          </svg>
        </button>
        <button
          className="border border-slate-400 rounded px-2 py-1 hover:bg-slate-50 hover:shadow-md"
          onClick={onNew}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
