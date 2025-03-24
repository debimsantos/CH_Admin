import React, { useState } from 'react';
import { 
  Activity, Users, Bell, Menu, X, Search, Filter, 
  Check, Star, DollarSign, Settings, LogOut, BookOpen
} from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: 1001,
    familyName: "Reyes Family",
    providerName: "Maria Dela Cruz",
    serviceType: "Child Care",
    status: "active",
    startDate: "2025-03-15T09:00:00Z",
    totalHours: 4,
    hourlyRate: 65,
    totalAmount: 260
  },
  {
    id: 1002,
    familyName: "Santos Family",
    providerName: "Juan Reyes",
    serviceType: "Housekeeping",
    status: "completed",
    startDate: "2025-03-14T13:00:00Z",
    totalHours: 5,
    hourlyRate: 70,
    totalAmount: 350
  },
  {
    id: 1003,
    familyName: "Lim Family",
    providerName: "Sofia Lopez",
    serviceType: "Child Care, Tutoring",
    status: "upcoming",
    startDate: "2025-03-21T14:00:00Z",
    totalHours: 4,
    hourlyRate: 80,
    totalAmount: 320
  },
  {
    id: 1004,
    familyName: "Reyes Family",
    providerName: "Sofia Lopez",
    serviceType: "Child Care",
    status: "disputed",
    startDate: "2025-03-17T09:00:00Z",
    totalHours: 5,
    hourlyRate: 65,
    totalAmount: 325
  },
  {
    id: 1005,
    familyName: "Santos Family",
    providerName: "Maria Dela Cruz",
    serviceType: "Senior Care",
    status: "cancelled",
    startDate: "2025-03-16T10:00:00Z",
    totalHours: 6,
    hourlyRate: 75,
    totalAmount: 450
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
          <span className="hidden md:block text-sm font-medium">Jamie Santos</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('bookings');
  
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

// Status Badge Component
const StatusBadge = ({ status }) => {
  let color = "bg-gray-100 text-gray-800";
  
  if (status === "active") color = "bg-green-100 text-green-800";
  if (status === "completed") color = "bg-blue-100 text-blue-800";
  if (status === "upcoming") color = "bg-purple-100 text-purple-800";
  if (status === "disputed") color = "bg-red-100 text-red-800";
  if (status === "cancelled") color = "bg-gray-100 text-gray-800";
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Main Booking Management Screen
const BookingManagementScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const filteredBookings = mockBookings.filter(booking => {
    // Apply search
    const matchesSearch = 
      booking.familyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toString().includes(searchQuery);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
              <p className="text-gray-500">View and manage all bookings on the platform.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by booking ID, family, or provider..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      className="border border-gray-300 rounded-md text-sm p-2"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="disputed">Disputed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center">
                      <Filter size={14} className="mr-1" />
                      More Filters
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Family
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.familyName}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.providerName}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.serviceType}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(booking.startDate)}</div>
                          <div className="text-xs text-gray-500">{formatTime(booking.startDate)}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(booking.totalAmount)}</div>
                          <div className="text-xs text-gray-500">{booking.totalHours} hrs @ {formatCurrency(booking.hourlyRate)}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex space-x-1">
                            {booking.status === 'disputed' && (
                              <button className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100">
                                Resolve
                              </button>
                            )}
                            {booking.status === 'active' && (
                              <button className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs hover:bg-green-100">
                                Verify Hours
                              </button>
                            )}
                            <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs hover:bg-blue-100">
                              Message
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredBookings.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No bookings found matching your criteria.</p>
                </div>
              )}
              
              <div className="p-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredBookings.length}</span> bookings
                </div>
                <div className="flex">
                  <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    Previous
                  </button>
                  <button className="ml-3 px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    Next
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

export default BookingManagementScreen;