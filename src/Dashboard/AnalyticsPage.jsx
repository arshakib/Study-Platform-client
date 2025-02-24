import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const statsData = [
  {
    title: "Total Revenue",
    value: "$54,230",
    icon: CurrencyDollarIcon,
    change: "+12.5%",
    color: "bg-green-100",
  },
  {
    title: "Active Users",
    value: "2,430",
    icon: UsersIcon,
    change: "+8.1%",
    color: "bg-blue-100",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    icon: ChartBarIcon,
    change: "-1.2%",
    color: "bg-purple-100",
  },
  {
    title: "Avg. Order Value",
    value: "$86",
    icon: ArrowUpIcon,
    change: "+4.3%",
    color: "bg-orange-100",
  },
];

const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

const weeklyPerformanceData = [
  { day: "Mon", performance: 65 },
  { day: "Tue", performance: 85 },
  { day: "Wed", performance: 75 },
  { day: "Thu", performance: 90 },
  { day: "Fri", performance: 65 },
];

const taskDistributionData = [
  { name: "Completed", value: 75, color: "#6366f1" },
  { name: "In Progress", value: 15, color: "#f59e0b" },
  { name: "Pending", value: 10, color: "#ef4444" },
];

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 z-40">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat) => (
            <div
              key={stat.title}
              className={`p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <stat.icon className="h-12 w-12 text-gray-600 opacity-75" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData}>
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Weekly Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPerformanceData}>
                  <Bar
                    dataKey="performance"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Task Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
