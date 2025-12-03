import React, { useEffect, useState } from "react";
import { Eye, TrendingUp, Plus, BarChart3, Link2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDashboardStats } from "../../service/dashboardService";
import { Link, useOutletContext } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const { setLoading } = useOutletContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await getDashboardStats();
        await new Promise((r) => setTimeout(r, 800));
        setStats(res.results);

        // --- CONVERT TO FORMAT CHART ---
        const safeChart = Array.isArray(res.results?.last_7_days_chart)
          ? res.results.last_7_days_chart
          : [];

        const transformed = safeChart.map((value, idx) => ({
          date: `Day ${idx + 1}`,
          visits: value,
        }));

        setChartData(transformed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [setLoading]);

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center shadow-inner mb-6">
          <BarChart3 className="w-12 h-12 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Analytics Yet
        </h2>

        <p className="text-gray-500 max-w-sm">
          Your analytics will appear once your short links receive visitors.
          Create and share a link to start tracking insights!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's your link performance overview.
              </p>
            </div>
            <Link to={"/"}>
              <button className="cursor-pointer mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700">
                <Plus className="w-5 h-5" />
                Create Short Link
              </button>
            </Link>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Link2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Links</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stats.total_links}
              </p>
              <p className="text-sm text-green-600">+12 this week</p>
            </div>

            {/* Total Visits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Visits</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stats.total_visits}
              </p>
              <p className="text-sm text-green-600">+8.2% from last week</p>
            </div>

            {/* Avg. Click Rate */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg. Click Rate</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stats.avg_click_rate}%
              </p>
              <p className="text-sm text-green-600">+3.1% increase</p>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Visitor Analytics
            </h2>
            {chartData.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No visitor activity yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
