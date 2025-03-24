import React, { useState } from 'react';
import { 
  Activity, Users, Bell, Menu, X, Search, Filter, 
  Check, AlertCircle, User, Eye, Edit, BookOpen, 
  Star, DollarSign, Settings, LogOut, Ban, Phone
} from 'lucide-react';

// Mock data for users
const mockUsers = {
  families: [
    {
      id: 1,
      name: "Reyes Family",
      email: "reyes.family@email.com",
      phone: "+63 912 345 6789",
      careType: "Child Care",
      registeredAt: "2025-02-10T14:30:00Z",
      status: "active",
      rating: 4.8
    },
    {
      id: 2,
      name: "Santos Family",
      email: "santos@email.com",
      phone: "+63 917 123 4567",
      careType: "Child Care, Housekeeping",
      registeredAt: "2025-01-19T09:15:00Z",
      status: "active",
      rating: 4.2
    },
    {
      id: 3,
      name: "Lim Family",
      email: "lim.family@email.com",
      phone: "+63 918 765 4321",
      careType: "Child Care, Pet Sitting",
      registeredAt: "2025-02-05T10:45:00Z",
      status: "suspended",
      reason: "Payment issues unresolved",
      rating: 3.6
    }
  ],
  careProviders: [
    {
      id: 101,
      name: "Maria Dela Cruz",
      email: "maria.delacruz@email.com",
      phone: "+63 919 876 5432",
      services: ["Child Care", "Senior Care"],
      registeredAt: "2025-01-18T13:20:00Z",
      status: "active",
      rating: 4.9
    },
    {
      id: 102,
      name: "Juan Reyes",
      email: "juan.reyes@email.com",
      phone: "+63 915 432 1098",
      services: ["Housekeeping", "Pet Sitting"],
      registeredAt: "2025-01-22T08:45:00Z",
      status: "active",
      rating: 4.6
    },
    {
      id: 103,
      name: "Sofia Lopez",
      email: "sofia.lopez@email.com",
      phone: "+63 916 789 0123",
      services: ["Child Care", "Tutoring"],
      registeredAt: "2025-01-15T11:30:00Z",
      status: "suspended",
      reason: "Multiple negative reviews under investigation",
      rating: 2.7
    }
  ]
};

// Helper function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
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
  const [activeItem, setActiveItem] = useState('users');
  
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

// Star Rating Component
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, i) => (
        <Star key={`filled-${i}`} size={16} fill="#FBBF24" color="#FBBF24" />
      ))}
      {hasHalfStar && (
        <Star size={16} fill="#FBBF24" color="#FBBF24" className="opacity-50" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} color="#FBBF24" />
      ))}
      <span className="ml-1 text-xs font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusMap = {
    active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
    suspended: { bg: "bg-red-100", text: "text-red-800", label: "Suspended" },
    inactive: { bg: "bg-gray-100", text: "text-gray-800", label: "Inactive" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending Approval" }
  };
  
  const { bg, text, label } = statusMap[status] || statusMap.inactive;
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} ${text}`}>
      {status === 'active' ? <Check size={12} className="mr-1" /> : <AlertCircle size={12} className="mr-1" />}
      {label}
    </span>
  );
};

// User Detail View Component
const UserDetailView = ({ user, userType, onClose }) => {
  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium">{user.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className={`h-16 w-16 rounded-full ${
            userType === 'family' ? 'bg-teal-100 text-teal-800' : 'bg-purple-100 text-purple-800'
          } flex items-center justify-center mr-4`}>
            <span className="font-medium text-xl">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm text-gray-500">Member since {formatDate(user.registeredAt)}</p>
            <div className="flex items-center mt-1">
              <StatusBadge status={user.status} />
              {user.status === 'suspended' && (
                <span className="ml-2 text-xs text-red-600">{user.reason}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h4>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="mb-2">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm">{user.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3">
            {userType === 'family' ? 'Care Type' : 'Services Offered'}
          </h4>
          <div className="bg-gray-50 rounded-md p-3">
            {userType === 'family' ? (
              <p className="text-sm">{user.careType}</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {user.services.map((service, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Rating</h4>
          <div className="bg-gray-50 rounded-md p-3 flex items-center">
            <StarRating rating={user.rating} />
            <span className="ml-2 text-sm text-gray-500">Average rating</span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            className={`px-3 py-1 rounded-md text-sm mr-2 ${
              user.status === 'active'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {user.status === 'active' ? (
              <><Ban size={14} className="inline mr-1" />Suspend</>
            ) : (
              <><Check size={14} className="inline mr-1" />Reactivate</>
            )}
          </button>
          <button className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600">
            <Edit size={14} className="inline mr-1" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Main User Management Screen
const UserManagementScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('families');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };
  
  const filteredUsers = activeTab === 'families' 
    ? mockUsers.families.filter(family => {
        // Apply search
        const matchesSearch = 
          family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          family.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          family.phone.includes(searchQuery);
        
        // Apply status filter
        const matchesStatus = statusFilter === 'all' || family.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
    : mockUsers.careProviders.filter(provider => {
        // Apply search
        const matchesSearch = 
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.phone.includes(searchQuery);
        
        // Apply status filter
        const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="flex h-full">
            <div className={`flex-1 overflow-y-auto ${showDetails ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
              <div className="p-4 md:p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                  <p className="text-gray-500">View and manage all users on the platform.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                  <div className="border-b border-gray-200">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('families')}
                        className={`py-3 px-6 text-sm font-medium ${
                          activeTab === 'families'
                            ? 'border-b-2 border-teal-500 text-teal-500'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Families ({mockUsers.families.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('careProviders')}
                        className={`py-3 px-6 text-sm font-medium ${
                          activeTab === 'careProviders'
                            ? 'border-b-2 border-teal-500 text-teal-500'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Care Providers ({mockUsers.careProviders.length})
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
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
                          <option value="suspended">Suspended</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending Approval</option>
                        </select>
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center">
                          <Filter size={14} className="mr-1" />
                          More Filters
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contact
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {activeTab === 'families' ? 'Care Type' : 'Services'}
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rating
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Registered
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredUsers.map((user) => (
                            <tr 
                              key={user.id} 
                              className={`hover:bg-gray-50 cursor-pointer ${user.status === 'suspended' ? 'bg-red-50' : ''}`}
                              onClick={() => handleUserSelect(user)}
                            >
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className={`h-8 w-8 rounded-full ${
                                    activeTab === 'families' ? 'bg-teal-100 text-teal-800' : 'bg-purple-100 text-purple-800'
                                  } flex items-center justify-center mr-2`}>
                                    <span className="font-medium">{user.name.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-gray-500 text-xs">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Phone size={14} className="mr-1 text-gray-500" /> 
                                  {user.phone}
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                {activeTab === 'families' ? (
                                  <div className="text-sm text-gray-900">{user.careType}</div>
                                ) : (
                                  <div className="flex flex-wrap">
                                    {user.services.map((service, index) => (
                                      <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-1 mb-1">
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <StatusBadge status={user.status} />
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <StarRating rating={user.rating} />
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatDate(user.registeredAt)}</div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    className="p-1 text-blue-600 hover:text-blue-800"
                                    onClick={(e) => { e.stopPropagation(); handleUserSelect(user); }}
                                  >
                                    <Eye size={16} />
                                  </button>
                                  <button 
                                    className="p-1 text-teal-600 hover:text-teal-800"
                                    onClick={(e) => { e.stopPropagation(); /* Handle edit */ }}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button 
                                    className={`p-1 ${user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                                    onClick={(e) => { e.stopPropagation(); /* Handle status change */ }}
                                  >
                                    {user.status === 'active' ? <Ban size={16} /> : <Check size={16} />}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-gray-500">No users found matching your criteria.</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{filteredUsers.length}</span> users
                      </div>
                      <div className="flex justify-end">
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
              </div>
            </div>
            
            {showDetails && (
              <div className={`${showDetails ? 'block' : 'hidden'} w-full lg:w-1/2 border-l border-gray-200`}>
                {selectedUser && (
                  <UserDetailView 
                    user={selectedUser} 
                    userType={activeTab === 'families' ? 'family' : 'careProvider'}
                    onClose={() => setShowDetails(false)} 
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagementScreen;