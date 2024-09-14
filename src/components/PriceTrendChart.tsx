import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  [key: string]: number | string;
}

interface PriceTrendChartProps {
  data: ChartData[];
  selectedProducts: string[];
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  data,
  selectedProducts,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Price Trends</h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedProducts.map((product, index) => (
              <Line
                key={product}
                type="monotone"
                dataKey={product}
                stroke={`hsl(${index * 30}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceTrendChart;
