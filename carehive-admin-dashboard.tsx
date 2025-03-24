import React, { useState } from 'react';
import { Bell, Menu, X, Activity, Users, BookOpen, Star, DollarSign, AlertTriangle, Clock, ChevronRight, Search, LogOut, Settings, User } from 'lucide-react';

// Mock data (would come from API in a real implementation)
const dashboardStats = {
  pendingApprovals: {
    families: 24,
    careProviders: 38,
    total: 62
  },
  activeUsers: {
    families: 1245,
    careProviders: 893,
    total: 2138
  },
  bookings: {
    active: 127,
    completed: 1893,
    disputed: 8
  },
  reviews: {
    pending: 47,
    approved: 3256
  },
  revenue: {
    daily: 15640,
    weekly: 89750,
    monthly: 342800,
    currency: "₱"
  }
};

const recentActivity = [
  {
    id: 1,
    type: "user_approval",
    action: "approved",
    subject: "Care Provider",
    name: "Maria Santos",
    timestamp: "2025-03-19T09:45:00Z"
  },
  {
    id: 2,
    type: "dispute",
    action: "resolved",
    subject: "Hours Dispute",
    name: "between Rodriguez Family and Elena Reyes",
    timestamp: "2025-03-19T09:30:00Z"
  },
  {
    id: 3,
    type: "review",
    action: "approved",
    subject: "Review",
    name: "from Lim Family for Carlos Mendoza",
    timestamp: "2025-03-19T09:15:00Z"
  },
  {
    id: 4,
    type: "payment",
    action: "processed",
    subject: "Withdrawal",
    name: "for ₱4,500 to Juana Dela Cruz",
    timestamp: "2025-03-19T09:00:00Z"
  },
  {
    id: 5,
    type: "user_approval",
    action: "rejected",
    subject: "Family Account",
    name: "Gonzales Family",
    timestamp: "2025-03-19T08:45:00Z"
  },
  {
    id: 6,
    type: "booking",
    action: "created",
    subject: "New Booking",
    name: "between Tan Family and Luis Bautista",
    timestamp: "2025-03-19T08:30:00Z"
  }
];

const urgentItems = [
  {
    id: 1,
    type: "dispute",
    description: "Hours dispute requires immediate attention",
    users: "Garcia Family and Ana Reyes",
    created: "2025-03-18T14:23:00Z",
    priority: "high"
  },
  {
    id: 2,
    type: "withdrawal",
    description: "Large withdrawal request pending for 24+ hours",
    users: "Diego Flores",
    amount: "₱12,500",
    created: "2025-03-18T09:15:00Z",
    priority: "medium"
  },
  {
    id: 3,
    type: "review",
    description: "Review with multiple flags requires moderation",
    users: "From Ramos Family for Sofia Lopez",
    created: "2025-03-19T07:30:00Z",
    priority: "medium"
  }
];

// Helper function to format date/time
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
};

// Helper to format currency
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
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <BookOpen size={18} /> },
    { id: 'reviews', label: 'Content Moderation', icon: <Star size={18} /> },
    { id: 'payments', label: 'Payments', icon: <DollarSign size={18} /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <Activity size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
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

// Stat Card Component
const StatCard = ({ title, value, subValue, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subValue && (
            <p className="text-xs text-gray-500 mt-1">{subValue}</p>
          )}
        </div>
        <div className={`rounded-lg p-2 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }) => {
  // Determine the color and icon based on activity type
  const getTypeProperties = (type) => {
    switch (type) {
      case 'user_approval':
        return { 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-800',
          icon: <User size={14} />
        };
      case 'dispute':
        return { 
          bgColor: 'bg-red-100', 
          textColor: 'text-red-800',
          icon: <AlertTriangle size={14} />
        };
      case 'review':
        return { 
          bgColor: 'bg-yellow-100', 
          textColor: 'text-yellow-800',
          icon: <Star size={14} />
        };
      case 'payment':
        return { 
          bgColor: 'bg-green-100', 
          textColor: 'text-green-800',
          icon: <DollarSign size={14} />
        };
      case 'booking':
        return { 
          bgColor: 'bg-purple-100', 
          textColor: 'text-purple-800',
          icon: <BookOpen size={14} />
        };
      default:
        return { 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          icon: <Activity size={14} />
        };
    }
  };
  
  const { bgColor, textColor, icon } = getTypeProperties(activity.type);
  
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`${bgColor} ${textColor} rounded-full p-2 mt-1`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium">
              <span className="capitalize">{activity.action}</span> {activity.subject}
            </p>
            <p className="text-xs text-gray-500 mt-1">{activity.name}</p>
          </div>
          <span className="text-xs text-gray-400">{formatTime(activity.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

// Urgent Item Component
const UrgentItem = ({ item }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'dispute':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'withdrawal':
        return <DollarSign size={16} className="text-green-500" />;
      case 'review':
        return <Star size={16} className="text-yellow-500" />;
      default:
        return <Activity size={16} className="text-blue-500" />;
    }
  };
  
  const priorityClass = getPriorityColor(item.priority);
  
  return (
    <div className={`border-l-4 rounded p-4 mb-3 ${priorityClass}`}>
      <div className="flex items-start">
        <div className="mr-3">
          {getTypeIcon(item.type)}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium">{item.description}</h4>
          <p className="text-xs text-gray-500 mt-1">{item.users}</p>
          <div className="flex items-center mt-2">
            <Clock size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-400">
              {formatDate(item.created)} at {formatTime(item.created)}
            </span>
          </div>
        </div>
        <button className="flex items-center text-xs font-medium text-teal-600 hover:text-teal-700">
          <span>Handle</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const CareHiveAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Jamie! Here's what's happening today.</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <StatCard 
              title="Pending Approvals" 
              value={dashboardStats.pendingApprovals.total}
              subValue={`${dashboardStats.pendingApprovals.families} Families, ${dashboardStats.pendingApprovals.careProviders} Care Providers`}
              icon={<User size={20} className="text-white" />}
              color="bg-blue-500"
            />
            <StatCard 
              title="Active Users" 
              value={dashboardStats.activeUsers.total}
              subValue={`${dashboardStats.activeUsers.families} Families, ${dashboardStats.activeUsers.careProviders} Care Providers`}
              icon={<Users size={20} className="text-white" />}
              color="bg-green-500"
            />
            <StatCard 
              title="Active Bookings" 
              value={dashboardStats.bookings.active}
              subValue={`${dashboardStats.bookings.disputed} Disputed`}
              icon={<BookOpen size={20} className="text-white" />}
              color="bg-purple-500"
            />
            <StatCard 
              title="Pending Reviews" 
              value={dashboardStats.reviews.pending}
              subValue={`${dashboardStats.reviews.approved} Approved`}
              icon={<Star size={20} className="text-white" />}
              color="bg-yellow-500"
            />
            <StatCard 
              title="Daily Revenue" 
              value={formatCurrency(dashboardStats.revenue.daily)}
              subValue={`Monthly: ${formatCurrency(dashboardStats.revenue.monthly)}`}
              icon={<DollarSign size={20} className="text-white" />}
              color="bg-teal-500"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <h2 className="text-lg font-medium">Recent Activity</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search activity..." 
                      className="pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>
                <div className="p-4">
                  {recentActivity.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                  
                  <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 mt-3">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
            
            {/* Attention Required */}
            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-medium">Attention Required</h2>
                </div>
                <div className="p-4">
                  {urgentItems.map(item => (
                    <UrgentItem key={item.id} item={item} />
                  ))}
                  
                  <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 mt-3">
                    View All Items
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CareHiveAdminDashboard;
