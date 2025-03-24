import React, { useState } from 'react';
import { 
  Activity, User, Users, Bell, Menu, X, Search, Filter, 
  Check, AlertCircle, BookOpen, Calendar,
  Star, DollarSign, Settings, LogOut, Clock, 
  Download, CreditCard, Wallet, ArrowDown, FileText
} from 'lucide-react';

// Mock data for withdrawal requests
const mockWithdrawals = [
  {
    id: "W1001",
    providerName: "Maria Dela Cruz",
    providerId: 101,
    amount: 4250,
    requestedAt: "2025-03-18T14:30:00Z",
    status: "pending",
    accountType: "Bank Account",
    accountDetail: "BDO **** 1234"
  },
  {
    id: "W1002",
    providerName: "Juan Reyes",
    providerId: 102,
    amount: 3600,
    requestedAt: "2025-03-17T10:15:00Z",
    status: "processing",
    accountType: "E-wallet",
    accountDetail: "GCash **** 5678"
  },
  {
    id: "W1003",
    providerName: "Sofia Lopez",
    providerId: 103,
    amount: 2800,
    requestedAt: "2025-03-16T09:45:00Z",
    status: "completed",
    completedAt: "2025-03-17T11:20:00Z",
    accountType: "E-wallet",
    accountDetail: "GCash **** 9012"
  }
];

// Mock data for transactions
const mockTransactions = [
  {
    id: "T2001",
    type: "withdrawal",
    userId: 101,
    userName: "Maria Dela Cruz",
    userType: "care_provider",
    amount: 4250,
    timestamp: "2025-03-18T14:30:00Z",
    status: "pending",
    details: "Withdrawal to BDO **** 1234"
  },
  {
    id: "T2002",
    type: "booking_payment",
    userId: 1,
    userName: "Reyes Family",
    userType: "family",
    amount: 325,
    timestamp: "2025-03-17T12:30:00Z",
    status: "completed",
    details: "Payment for booking #1004"
  },
  {
    id: "T2003",
    type: "credit_purchase",
    userId: 2,
    userName: "Santos Family",
    userType: "family",
    amount: 500,
    timestamp: "2025-03-16T10:15:00Z",
    status: "completed",
    details: "Purchase of 5 interview credits"
  }
];

// Helper function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to format time
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
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
          <span className="text-sm font-medium">Jamie Santos</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <BookOpen size={18} /> },
    { id: 'reviews', label: 'Content Moderation', icon: <Star size={18} /> },
    { id: 'payments', label: 'Payments', icon: <DollarSign size={18} /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <Activity size={18} /> },
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
                className={`w-full flex items-center py-2 px-4 rounded-md text-sm transition-colors ${
                  item.id === 'payments'
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

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusMap = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <Clock size={12} className="mr-1" />, label: "Pending" },
    processing: { bg: "bg-blue-100", text: "text-blue-800", icon: <Activity size={12} className="mr-1" />, label: "Processing" },
    completed: { bg: "bg-green-100", text: "text-green-800", icon: <Check size={12} className="mr-1" />, label: "Completed" },
    rejected: { bg: "bg-red-100", text: "text-red-800", icon: <X size={12} className="mr-1" />, label: "Rejected" }
  };
  
  const { bg, text, icon, label } = statusMap[status] || statusMap.pending;
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} ${text}`}>
      {icon}
      {label}
    </span>
  );
};

// Transaction Type Badge Component
const TransactionTypeBadge = ({ type }) => {
  const typeMap = {
    withdrawal: { bg: "bg-purple-100", text: "text-purple-800", icon: <ArrowDown size={12} className="mr-1" />, label: "Withdrawal" },
    booking_payment: { bg: "bg-blue-100", text: "text-blue-800", icon: <BookOpen size={12} className="mr-1" />, label: "Booking Payment" },
    credit_purchase: { bg: "bg-green-100", text: "text-green-800", icon: <CreditCard size={12} className="mr-1" />, label: "Credit Purchase" },
    service_fee: { bg: "bg-teal-100", text: "text-teal-800", icon: <DollarSign size={12} className="mr-1" />, label: "Service Fee" },
    refund: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <Wallet size={12} className="mr-1" />, label: "Refund" }
  };
  
  const { bg, text, icon, label } = typeMap[type] || { bg: "bg-gray-100", text: "text-gray-800", icon: <Activity size={12} className="mr-1" />, label: "Other" };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} ${text}`}>
      {icon}
      {label}
    </span>
  );
};

// Revenue Summary Card Component
const RevenueSummary = () => {
  const revenueData = {
    daily: 12500,
    weekly: 76400,
    monthly: 310000,
    interviewCredits: 152500,
    serviceFees: 157500,
    withdrawals: 98700
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Revenue Summary</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Daily Revenue</p>
            <p className="text-xl font-bold text-teal-600">{formatCurrency(revenueData.daily)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Weekly Revenue</p>
            <p className="text-xl font-bold text-teal-600">{formatCurrency(revenueData.weekly)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
            <p className="text-xl font-bold text-teal-600">{formatCurrency(revenueData.monthly)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Interview Credits</p>
            <p className="text-xl font-bold text-blue-600">{formatCurrency(revenueData.interviewCredits)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Service Fees</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(revenueData.serviceFees)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Pending Withdrawals</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(revenueData.withdrawals)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Withdrawal Requests Tab
const WithdrawalRequests = () => {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by provider name or withdrawal ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="border border-gray-300 rounded-md text-sm p-2"
            defaultValue="all"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{withdrawal.id}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{withdrawal.providerName}</div>
                    <div className="text-xs text-gray-500">ID: {withdrawal.providerId}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(withdrawal.amount)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{withdrawal.accountType}</div>
                    <div className="text-xs text-gray-500">{withdrawal.accountDetail}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(withdrawal.requestedAt)}</div>
                    <div className="text-xs text-gray-500">{formatTime(withdrawal.requestedAt)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <StatusBadge status={withdrawal.status} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {withdrawal.status === 'pending' && (
                        <>
                          <button className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs hover:bg-green-100">
                            Approve
                          </button>
                          <button className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100">
                            Reject
                          </button>
                        </>
                      )}
                      {withdrawal.status === 'processing' && (
                        <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs hover:bg-blue-100">
                          Complete
                        </button>
                      )}
                      <button className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs hover:bg-gray-100">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Transactions Tab
const TransactionHistory = () => {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by user name, transaction ID, or details..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="border border-gray-300 rounded-md text-sm p-2"
            defaultValue="all"
          >
            <option value="all">All Types</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="booking_payment">Booking Payments</option>
            <option value="credit_purchase">Credit Purchases</option>
            <option value="service_fee">Service Fees</option>
            <option value="refund">Refunds</option>
          </select>
          <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center">
            <Download size={14} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <TransactionTypeBadge type={transaction.type} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.userName}</div>
                    <div className="text-xs text-gray-500">
                      {transaction.userType === 'family' ? 'Family' : 'Care Provider'}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(transaction.timestamp)}</div>
                    <div className="text-xs text-gray-500">{formatTime(transaction.timestamp)}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.details}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs hover:bg-blue-100 flex items-center">
                      <FileText size={12} className="mr-1" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main Payment Management Screen
const PaymentManagementScreen = () => {
  const [activeTab, setActiveTab] = useState('withdrawals');
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
            <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
            <p className="text-gray-500">Monitor and manage platform payments, withdrawals, and transactions.</p>
          </div>
          
          {/* Revenue Summary */}
          <RevenueSummary />
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('withdrawals')}
                  className={`py-3 px-6 text-sm font-medium ${
                    activeTab === 'withdrawals'
                      ? 'border-b-2 border-teal-500 text-teal-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Withdrawal Requests
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`py-3 px-6 text-sm font-medium ${
                    activeTab === 'transactions'
                      ? 'border-b-2 border-teal-500 text-teal-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Transaction History
                </button>
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'withdrawals' && <WithdrawalRequests />}
          {activeTab === 'transactions' && <TransactionHistory />}
        </main>
      </div>
    </div>
  );
};

export default PaymentManagementScreen;