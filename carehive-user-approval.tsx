import React, { useState } from 'react';
import { Activity, Users, Bell, Menu, X, Search, ChevronDown, Filter, Check, AlertCircle, Eye, Download, Clock, BookOpen, Star, DollarSign, Settings, LogOut, User, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock data for pending approvals
const pendingApprovals = {
  families: [
    {
      id: 1,
      name: "Reyes Family",
      email: "reyes.family@email.com",
      phone: "+63 912 345 6789",
      address: "123 Rizal Ave, Manila, Philippines",
      familyType: "Dual-Income Household",
      members: 4,
      children: [
        { age: 5, gender: "Male" },
        { age: 3, gender: "Female" }
      ],
      pets: "Yes (1 Dog)",
      careType: "Child Care",
      submittedAt: "2025-03-18T14:30:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_reyes.jpg" },
        proofOfResidence: { status: "pending", file: "utility_bill_reyes.pdf" }
      },
      status: "pendingApproval"
    },
    {
      id: 2,
      name: "Santos Family",
      email: "santos@email.com",
      phone: "+63 917 123 4567",
      address: "456 Quezon Blvd, Quezon City, Philippines",
      familyType: "Single Parent",
      members: 3,
      children: [
        { age: 7, gender: "Female" },
        { age: 4, gender: "Male" }
      ],
      pets: "No",
      careType: "Child Care, Housekeeping",
      submittedAt: "2025-03-19T09:15:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_santos.jpg" },
        proofOfResidence: { status: "verified", file: "utility_bill_santos.pdf" }
      },
      status: "pendingApproval"
    },
    {
      id: 3,
      name: "Lim Family",
      email: "lim.family@email.com",
      phone: "+63 918 765 4321",
      address: "789 Taft Ave, Pasay, Philippines",
      familyType: "OFW Dependents",
      members: 5,
      children: [
        { age: 10, gender: "Female" },
        { age: 8, gender: "Male" },
        { age: 6, gender: "Female" }
      ],
      pets: "Yes (2 Cats)",
      careType: "Child Care, Pet Sitting",
      submittedAt: "2025-03-19T10:45:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_lim.jpg" },
        proofOfResidence: { status: "pending", file: "utility_bill_lim.pdf" }
      },
      status: "pendingApproval"
    }
  ],
  careProviders: [
    {
      id: 1,
      name: "Maria Dela Cruz",
      email: "maria.delacruz@email.com",
      phone: "+63 919 876 5432",
      address: "234 Mabini St, Makati, Philippines",
      dateOfBirth: "1990-05-15",
      gender: "Female",
      yearsExperience: 5,
      services: ["Child Care", "Senior Care"],
      languages: ["Filipino", "English"],
      availability: "Full-time",
      submittedAt: "2025-03-18T13:20:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_maria.jpg" },
        nbiClearance: { status: "verified", file: "nbi_maria.pdf" },
        medicalResults: { status: "pending", file: "medical_maria.pdf" },
        proofOfAddress: { status: "verified", file: "address_maria.pdf" }
      },
      status: "pendingApproval"
    },
    {
      id: 2,
      name: "Juan Reyes",
      email: "juan.reyes@email.com",
      phone: "+63 915 432 1098",
      address: "567 Recto Ave, Manila, Philippines",
      dateOfBirth: "1988-09-23",
      gender: "Male",
      yearsExperience: 3,
      services: ["Housekeeping", "Pet Sitting"],
      languages: ["Filipino", "English", "Chinese"],
      availability: "Part-time",
      submittedAt: "2025-03-19T08:45:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_juan.jpg" },
        nbiClearance: { status: "verified", file: "nbi_juan.pdf" },
        medicalResults: { status: "verified", file: "medical_juan.pdf" },
        proofOfAddress: { status: "pending", file: "address_juan.pdf" }
      },
      status: "pendingApproval"
    },
    {
      id: 3,
      name: "Sofia Lopez",
      email: "sofia.lopez@email.com",
      phone: "+63 916 789 0123",
      address: "890 Escolta St, Manila, Philippines",
      dateOfBirth: "1993-11-07",
      gender: "Female",
      yearsExperience: 7,
      services: ["Child Care", "Tutoring"],
      languages: ["Filipino", "English", "Spanish"],
      availability: "On-Demand",
      submittedAt: "2025-03-19T11:30:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_sofia.jpg" },
        nbiClearance: { status: "pending", file: "nbi_sofia.pdf" },
        medicalResults: { status: "verified", file: "medical_sofia.pdf" },
        proofOfAddress: { status: "verified", file: "address_sofia.pdf" }
      },
      status: "pendingApproval"
    },
    {
      id: 4,
      name: "Diego Santos",
      email: "diego.santos@email.com",
      phone: "+63 920 123 4567",
      address: "123 Legaspi St, Makati, Philippines",
      dateOfBirth: "1995-03-12",
      gender: "Male",
      yearsExperience: 2,
      services: ["Senior Care", "Housekeeping"],
      languages: ["Filipino", "English"],
      availability: "Full-time",
      submittedAt: "2025-03-19T12:15:00Z",
      documents: {
        governmentId: { status: "verified", file: "gov_id_diego.jpg" },
        nbiClearance: { status: "verified", file: "nbi_diego.pdf" },
        medicalResults: { status: "verified", file: "medical_diego.pdf" },
        proofOfAddress: { status: "verified", file: "address_diego.pdf" }
      },
      status: "pendingApproval"
    }
  ]
};

// Helper function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to calculate document completion percentage
const calculateDocumentCompletion = (documents) => {
  const totalDocs = Object.keys(documents).length;
  const verifiedDocs = Object.values(documents).filter(doc => doc.status === "verified").length;
  return Math.round((verifiedDocs / totalDocs) * 100);
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

// Document Status Badge
const DocumentStatusBadge = ({ status }) => {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle size={12} className="mr-1" /> Verified
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock size={12} className="mr-1" /> Pending
      </span>
    );
  }
};

// Document Preview Card
const DocumentPreview = ({ document, title }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium">{title}</h4>
        <DocumentStatusBadge status={document.status} />
      </div>
      <div className="bg-gray-100 rounded border border-gray-200 p-2 flex items-center justify-between">
        <span className="text-xs text-gray-500 truncate">{document.file}</span>
        <div className="flex">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Eye size={16} />
          </button>
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Approval Details Panel for Family
const FamilyApprovalDetails = ({ family }) => {
  return (
    <div className="bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-medium">{family.name}</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center">
            <Check size={14} className="mr-1" /> Approve
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 flex items-center">
            <XIcon size={14} className="mr-1" /> Reject
          </button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 flex items-center">
            <AlertCircle size={14} className="mr-1" /> Request Info
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{family.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm">{family.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm">{family.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Family Type</p>
              <p className="text-sm">{family.familyType}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Family Details</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Household Members</p>
              <p className="text-sm">{family.members}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Children</p>
              <div>
                {family.children.map((child, index) => (
                  <p key={index} className="text-sm">
                    {child.age} year old {child.gender}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pets</p>
              <p className="text-sm">{family.pets}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Care Type Needed</p>
              <p className="text-sm">{family.careType}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Document Verification</h3>
        <DocumentPreview document={family.documents.governmentId} title="Government ID" />
        <DocumentPreview document={family.documents.proofOfResidence} title="Proof of Residence" />
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Admin Notes</h3>
        <textarea 
          className="w-full border border-gray-300 rounded-md p-2 text-sm" 
          rows="3"
          placeholder="Add notes about this family..."
        ></textarea>
      </div>
    </div>
  );
};

// Approval Details Panel for Care Provider
const CareProviderApprovalDetails = ({ provider }) => {
  return (
    <div className="bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-medium">{provider.name}</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center">
            <Check size={14} className="mr-1" /> Approve
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 flex items-center">
            <XIcon size={14} className="mr-1" /> Reject
          </button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 flex items-center">
            <AlertCircle size={14} className="mr-1" /> Request Info
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{provider.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm">{provider.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm">{provider.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="text-sm">{new Date(provider.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm">{provider.gender}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Professional Details</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Years of Experience</p>
              <p className="text-sm">{provider.yearsExperience}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Services Offered</p>
              <div>
                {provider.services.map((service, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Languages</p>
              <div>
                {provider.languages.map((language, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Availability</p>
              <p className="text-sm">{provider.availability}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Document Verification</h3>
        <DocumentPreview document={provider.documents.governmentId} title="Government ID" />
        <DocumentPreview document={provider.documents.nbiClearance} title="NBI Clearance" />
        <DocumentPreview document={provider.documents.medicalResults} title="Medical Results" />
        <DocumentPreview document={provider.documents.proofOfAddress} title="Proof of Address" />
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Admin Notes</h3>
        <textarea 
          className="w-full border border-gray-300 rounded-md p-2 text-sm" 
          rows="3"
          placeholder="Add notes about this care provider..."
        ></textarea>
      </div>
    </div>
  );
};

// Main User Approval Screen
const UserApprovalScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('families');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };
  
  const filteredUsers = activeTab === 'families' 
    ? pendingApprovals.families.filter(family => 
        family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        family.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pendingApprovals.careProviders.filter(provider => 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="flex h-full">
            <div className={`flex-1 ${showDetails ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
              <div className="p-4 md:p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">User Approval Queue</h1>
                  <p className="text-gray-500">Review and approve new user registrations.</p>
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
                        Families ({pendingApprovals.families.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('careProviders')}
                        className={`py-3 px-6 text-sm font-medium ${
                          activeTab === 'careProviders'
                            ? 'border-b-2 border-teal-500 text-teal-500'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Care Providers ({pendingApprovals.careProviders.length})
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div className="w-full md:w-auto mb-2 md:mb-0">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-md text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex flex-wrap items-center">
                        <div className="relative mr-2">
                          <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center">
                            <Filter size={14} className="mr-1" />
                            Filter
                            <ChevronDown size={14} className="ml-1" />
                          </button>
                        </div>
                        <div>
                          <button className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center">
                            <Check size={14} className="mr-1" />
                            Bulk Approve
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <input type="checkbox" className="rounded border-gray-300 text-teal-600" />
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            {activeTab === 'careProviders' && (
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Services
                              </th>
                            )}
                            {activeTab === 'families' && (
                              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Care Type
                              </th>
                            )}
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Submitted
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Documents
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
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleUserSelect(user)}
                            >
                              <td className="px-3 py-4 whitespace-nowrap">
                                <input type="checkbox" className="rounded border-gray-300 text-teal-600" onClick={(e) => e.stopPropagation()} />
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-2">
                                    <User size={14} />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-gray-500 text-xs">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                {activeTab === 'careProviders' ? (
                                  <div className="flex flex-wrap">
                                    {user.services.map((service, index) => (
                                      <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-1 mb-1">
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-900">{user.careType}</div>
                                )}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatDate(user.submittedAt)}</div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-teal-500 h-2 rounded-full" 
                                      style={{ width: `${calculateDocumentCompletion(user.documents)}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500">{calculateDocumentCompletion(user.documents)}%</span>
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    className="p-1 text-green-600 hover:text-green-800"
                                    onClick={(e) => { e.stopPropagation(); /* Handle approve */ }}
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button 
                                    className="p-1 text-red-600 hover:text-red-800"
                                    onClick={(e) => { e.stopPropagation(); /* Handle reject */ }}
                                  >
                                    <X size={16} />
                                  </button>
                                  <button 
                                    className="p-1 text-blue-600 hover:text-blue-800"
                                    onClick={(e) => { e.stopPropagation(); handleUserSelect(user); }}
                                  >
                                    <Eye size={16} />
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
                        <p className="text-gray-500">No pending approvals found.</p>
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
              <div className="fixed inset-0 z-40 lg:relative lg:inset-auto lg:flex-1">
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 lg:hidden" onClick={() => setShowDetails(false)}></div>
                <div className="relative h-full w-full max-w-md ml-auto bg-white lg:max-w-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200 lg:hidden">
                    <h2 className="text-lg font-medium">User Details</h2>
                    <button onClick={() => setShowDetails(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  
                  {selectedUser && (
                    <>
                      {activeTab === 'families' && <FamilyApprovalDetails family={selectedUser} />}
                      {activeTab === 'careProviders' && <CareProviderApprovalDetails provider={selectedUser} />}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserApprovalScreen;