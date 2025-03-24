import React, { useState } from 'react';
import { 
  Activity, Users, Bell, Menu, X, Search, Filter, 
  Check, AlertCircle, BookOpen, ArrowUp, ArrowDown,
  Star, DollarSign, Settings, LogOut, Download, BarChart2,
  TrendingUp, Clock, User, Briefcase, FilePlus, Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, LineChart, Line, 
  PieChart, Pie, Cell
} from 'recharts';

// Mock data for user growth chart
const userGrowthData = [
  { month: 'Jan', families: 120, careProviders: 80 },
  { month: 'Feb', families: 180, careProviders: 120 },
  { month: 'Mar', families: 250, careProviders: 170 },
  { month: 'Apr', families: 310, careProviders: 210 },
  { month: 'May', families: 390, careProviders: 270 },
  { month: 'Jun', families: 450, careProviders: 340 },
  { month: 'Jul', families: 540, careProviders: 410 },
  { month: 'Aug', families: 620, careProviders: 480 },
  { month: 'Sep', families: 690, careProviders: 560 },
  { month: 'Oct', families: 780, careProviders: 640 },
  { month: 'Nov', families: 880, careProviders: 710 },
  { month: 'Dec', families: 980, careProviders: 790 }
];

// Mock data for revenue chart
const revenueData = [
  { month: 'Jan', interviewCredits: 42000, serviceFees: 38000 },
  { month: 'Feb', interviewCredits: 52000, serviceFees: 45000 },
  { month: 'Mar', interviewCredits: 58000, serviceFees: 53000 },
  { month: 'Apr', interviewCredits: 75000, serviceFees: 67000 },
  { month: 'May', interviewCredits: 85000, serviceFees: 78000 },
  { month: 'Jun', interviewCredits: 102000, serviceFees: 92000 },
  { month: 'Jul', interviewCredits: 112000, serviceFees: 102000 },
  { month: 'Aug', interviewCredits: 125000, serviceFees: 115000 },
  { month: 'Sep', interviewCredits: 140000, serviceFees: 127000 },
  { month: 'Oct', interviewCredits: 155000, serviceFees: 142000 },
  { month: 'Nov', interviewCredits: 168000, serviceFees: 156000 },
  { month: 'Dec', interviewCredits: 185000, serviceFees: 172000 }
];

// Mock data for service distribution
const serviceDistributionData = [
  { name: 'Child Care', value: 45 },
  { name: 'Senior Care', value: 20 },
  { name: 'Housekeeping', value: 25 },
  { name: 'Tutoring', value: 7 },
  { name: 'Pet Sitting', value: 3 }
];

// Mock data for key metrics
const keyMetricsData = {
  totalUsers: 1870,
  totalBookings: 3256,
  averageRating: 4.7,
  conversionRate: 64.2, // % of interviews that convert to bookings
  repeatRate: 78.5, // % of families who book more than once
  avgSessionTime: 217, // in minutes
  monthlyGrowth: 12.4 // % growth month over month
};

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0
  }).format(amount);
};

// Header Component
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-teal-600">CareHive</h1>
          <span className="ml-2 text-sm text-gray-500">Admin</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
          <Bell size={20} className="text-gray-500 cursor-pointer hover:text-teal-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-2">
            <span className="font-medium">JS</span>
          </div>
          <span className="hidden md:block text-sm font-medium">Jamie Santos</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('reports');
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <BookOpen size={18} /> },
    { id: 'reviews', label: 'Content Moderation', icon: <Star size={18} /> },
    { id: 'payments', label: 'Payments', icon: <DollarSign size={18} /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart2 size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ];
  
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded bg-teal-500 flex items-center justify-center mr-2">
            <span className="font-bold text-white">CH</span>
          </div>
          <span className="font-bold text-lg">CareHive Admin</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      
      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center py-2 px-4 rounded-md text-sm transition-colors ${
                  activeItem === item.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button className="flex items-center text-gray-300 hover:text-white">
          <LogOut size={18} className="mr-2" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

// Key Metrics Card Component
const KeyMetricsCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-md bg-teal-100 text-teal-600">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      
      {change && (
        <div className={`flex items-center mt-2 text-xs ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {changeType === 'positive' ? 
            <ArrowUp size={12} className="mr-1" /> : 
            <ArrowDown size={12} className="mr-1" />
          }
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

// User Growth Chart
const UserGrowthChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">User Growth</h3>
        <div className="flex items-center">
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1 mr-2">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
          </select>
          <button className="p-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userGrowthData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="families" name="Families" fill="#3B82F6" />
            <Bar dataKey="careProviders" name="Care Providers" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Revenue Chart
const RevenueChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Revenue Breakdown</h3>
        <div className="flex items-center">
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1 mr-2">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
          </select>
          <button className="p-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="interviewCredits" name="Interview Credits" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="serviceFees" name="Service Fees" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Service Distribution Chart
const ServiceDistributionChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Service Type Distribution</h3>
        <button className="p-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">
          <Download size={16} />
        </button>
      </div>
      
      <div className="flex h-60">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {serviceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 flex items-center">
          <div className="w-full">
            {serviceDistributionData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <div className="text-sm flex-1">{entry.name}</div>
                <div className="text-sm font-medium">{entry.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Metrics
const BookingMetrics = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Booking Performance</h3>
        <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Interview to Booking Conversion</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded">+5.2%</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{keyMetricsData.conversionRate}%</span>
            <span className="text-xs text-gray-500 ml-2 mb-1">of interviews convert to bookings</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${keyMetricsData.conversionRate}%` }}></div>
          </div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Repeat Booking Rate</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded">+3.7%</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{keyMetricsData.repeatRate}%</span>
            <span className="text-xs text-gray-500 ml-2 mb-1">of families book again</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${keyMetricsData.repeatRate}%` }}></div>
          </div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Average Session Duration</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded">+12%</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{keyMetricsData.avgSessionTime}</span>
            <span className="text-xs text-gray-500 ml-2 mb-1">minutes on average</span>
          </div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Average Rating</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{keyMetricsData.averageRating}</span>
            <div className="flex items-center ml-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12}
                  fill={i < Math.floor(keyMetricsData.averageRating) ? "#FBBF24" : "none"}
                  color="#FBBF24"
                  className={i < Math.floor(keyMetricsData.averageRating) ? "" : "opacity-50"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Date Range Selector
const DateRangeSelector = () => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <button className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 mr-2">
          Last 30 Days
        </button>
        <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 mr-2">
          Last Quarter
        </button>
        <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
          Year to Date
        </button>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Start Date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm w-28"
          />
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="End Date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm w-28"
          />
        </div>
      </div>
    </div>
  );
};

// Report List
const ReportsList = () => {
  const reports = [
    { id: 1, name: "Monthly Platform Performance", type: "Automated", lastRun: "2025-03-15", format: "PDF" },
    { id: 2, name: "User Growth Analysis", type: "Custom", lastRun: "2025-03-10", format: "Excel" },
    { id: 3, name: "Financial Summary Q1 2025", type: "Custom", lastRun: "2025-03-05", format: "PDF" },
    { id: 4, name: "User Satisfaction Survey Results", type: "Automated", lastRun: "2025-02-28", format: "Excel" },
    { id: 5, name: "Care Provider Performance", type: "Automated", lastRun: "2025-02-20", format: "PDF" }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Saved Reports</h3>
        <button className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 flex items-center">
          <FilePlus size={14} className="mr-1" />
          New Report
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{report.name}</div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    report.type === 'Automated' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {report.type}
                  </span>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(report.lastRun).toLocaleDateString()}</div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{report.format}</div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs hover:bg-blue-100">
                      Generate
                    </button>
                    <button className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs hover:bg-gray-100">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Reports & Analytics Screen
const ReportsAndAnalyticsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col w-full lg:pl-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-gray-500">Monitor platform performance and generate custom reports.</p>
          </div>
          
          <DateRangeSelector />
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KeyMetricsCard 
              title="Total Users" 
              value={keyMetricsData.totalUsers} 
              icon={<Users size={18} />}
              change="+125 this month"
              changeType="positive"
            />
            <KeyMetricsCard 
              title="Total Bookings" 
              value={keyMetricsData.totalBookings} 
              icon={<Briefcase size={18} />}
              change="+248 this month"
              changeType="positive"
            />
            <KeyMetricsCard 
              title="Average Rating" 
              value={keyMetricsData.averageRating} 
              icon={<Star size={18} />}
              change="+0.2 pts"
              changeType="positive"
            />
            <KeyMetricsCard 
              title="Monthly Growth" 
              value={`${keyMetricsData.monthlyGrowth}%`} 
              icon={<TrendingUp size={18} />}
              change="+2.5% from last month"
              changeType="positive"
            />
          </div>
          
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <UserGrowthChart />
            <RevenueChart />
          </div>
          
          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ServiceDistributionChart />
            <BookingMetrics />
          </div>
          
          {/* Report List */}
          <ReportsList />
        </main>
      </div>
    </div>
  );
};

export default ReportsAndAnalyticsScreen;