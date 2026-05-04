import React, { useState } from "react";
import { getAIInsights } from "../services/aiService";

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    try {
      setLoading(true);

      const data = await getAIInsights();

      let responseText = "";

      if (typeof data === "string") {
        responseText = data;
      } else if (data.choices) {
        responseText =
          data.choices[0].message.content;
      }

      const formattedData = responseText
        .split("\n")
        .filter(item => item.trim() !== "")
        .slice(0, 4);

      setInsights(formattedData);

    } catch (error) {
      console.log(error);
      setInsights([
        "Unable to generate AI insights."
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-6">

      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              AI Insights
            </h1>

            <p className="text-slate-400 mt-2">
              Smart analysis of your spending habits
            </p>
          </div>

          <button
            onClick={generateInsights}
            disabled={loading}
            className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 transition-all"
          >
            {loading
              ? "Analyzing..."
              : "Generate"}
          </button>

        </div>

        {loading && (
          <div className="text-center text-slate-400 py-10">
            AI is analyzing your expenses...
          </div>
        )}

        {!loading && insights.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">

            {insights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:scale-105 transition-all"
              >
                <p className="text-lg text-slate-200">
                  {item}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AIInsights;