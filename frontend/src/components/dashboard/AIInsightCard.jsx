import React, { useState } from "react";
import { getAIInsights } from "../../services/aiService";

const AIInsightCard = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    try {
      setLoading(true);

      const data = await getAIInsights();

      let responseText =
        typeof data === "string"
          ? data
          : data.message || "";

      const formattedInsights = responseText
        .split("\n")
        .filter(item => item.trim() !== "")
        .slice(0, 6);

      setInsights(formattedInsights);

    } catch (error) {
      console.log("AI Error:", error);
      setInsights([
        "Unable to fetch AI insights."
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white">

      <h2 className="text-2xl font-bold mb-5">
        AI Insights
      </h2>

      <button
        onClick={generateInsights}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl mb-5"
      >
        {loading
          ? "Generating..."
          : "Generate AI Insights"}
      </button>

      {insights.length > 0 && (
        <ul className="space-y-3 text-gray-300">
          {insights.map((item, index) => (
            <li key={index}>
              • {item}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default AIInsightCard;