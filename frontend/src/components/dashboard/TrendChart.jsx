import React, {
  useEffect,
  useState
} from "react";

import {

  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid

} from "recharts";

import API from "../../services/api";

const TrendChart = () => {

  const [data, setData] = useState([]);

  const [type, setType] = useState("week");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadTrend();

  }, [type]);

  const loadTrend = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/analytics/trends?type=${type}`
      );

      setData(response.data || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const options = [
    "week",
    "month",
    "year",
    "all"
  ];

  return (

    <div className="bg-slate-900 rounded-3xl p-6 text-white h-[450px]">

      <h2 className="text-2xl font-bold mb-5">

        Expense Trend

      </h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">

        {options.map((item) => (

          <button

            key={item}

            onClick={() => setType(item)}

            className={`px-4 py-2 rounded-xl capitalize transition-all ${
              type === item
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-gray-300"
            }`}

          >

            {item}

          </button>

        ))}

      </div>

      {/* Chart */}
      {loading ? (

        <div className="flex justify-center items-center h-[280px] text-gray-400">
          Loading...
        </div>

      ) : data.length === 0 ? (

        <div className="flex justify-center items-center h-[280px] text-gray-400">
          No expense data found
        </div>

      ) : (

        <ResponsiveContainer width="100%" height={280}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#06b6d4"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>

  );

};

export default TrendChart;