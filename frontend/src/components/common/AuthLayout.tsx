import { useEffect, useState } from "react";
import UnSecuredComponent from "./UnSecuredComponent";
import { QuoteDataType } from "../../types/components/common/AuthLayout";
import axios from "axios";
import { QUOTE_URL } from "../../config";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const [quoteData, setQuoteData] = useState<QuoteDataType>({
    content: "",
    author: "",
  });

  async function fetchQuote() {
    const res = await axios.get(QUOTE_URL);
    const { content, author } = res.data;
    setQuoteData({
      content,
      author,
    });
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <UnSecuredComponent>
      <div className="grid grid-cols-2 h-lvh">
        {children}
        <div className="bg-[#f3f4f6] flex justify-center flex-col px-16">
          <h2 className="text-3xl font-bold mb-3">
            {quoteData.content ? `"${quoteData.content}"` : ""}
          </h2>
          <p className="text-sm text-gray-500">{quoteData.author}</p>
        </div>
      </div>
    </UnSecuredComponent>
  );
}

export default AuthLayout;
