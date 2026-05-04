import React, {
  useEffect,
  useState
} from "react";

import {

  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer

} from "recharts";

import API from "../../services/api";

const COLORS = [

  "#06B6D4",
  "#8B5CF6",
  "#EF4444",
  "#10B981",
  "#F59E0B"

];

const CategoryChart = () => {

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadChartData();

  }, []);

  const loadChartData = async () => {

    try {

      const response = await API.get(
        "/analytics/category"
      );

      const formattedData = Object.entries(
        response.data || {}
      ).map(([key, value]) => ({

        name: key,
        value: Number(value)

      }));

      setChartData(formattedData);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="bg-slate-900 rounded-3xl p-6 h-[450px] flex justify-center items-center text-white">

        Loading...

      </div>

    );

  }

  if (chartData.length === 0) {

    return (

      <div className="bg-slate-900 rounded-3xl p-6 h-[450px] flex justify-center items-center text-gray-400">

        No expense data found

      </div>

    );

  }

  return (

    <div className="bg-slate-900 rounded-3xl p-6 h-[450px] overflow-hidden">

      {/* Heading */}
      <h2 className="text-white text-2xl font-bold mb-5 text-center">

        Category Breakdown

      </h2>

      {/* Chart */}
      <div className="w-full h-[340px] flex justify-center items-center">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie

              data={chartData}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="45%"

              outerRadius={100}

              label

            >

              {chartData.map((entry, index) => (

                <Cell

                  key={index}

                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }

                />

              ))}

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default CategoryChart;