import React, { useState } from 'react';
import { 
  Activity, Users, Bell, Menu, X, 
  Check, BookOpen, Star, DollarSign, 
  Settings, LogOut, Save, PlusCircle, UserPlus, 
  Trash, Edit
} from 'lucide-react';

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
  const [activeItem, setActiveItem] = useState('settings');
  
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

// Settings Tab
const SettingsTab = ({ id, label, icon, active, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center py-3 px-4 w-full text-left transition-colors ${
        active
          ? 'bg-gray-100 text-teal-600 border-l-2 border-teal-500'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

// Form Components
const FormInput = ({ label, type = "text", value, onChange, placeholder, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        required={required}
      />
    </div>
  );
};

// Form Select Component
const FormSelect = ({ label, value, onChange, options, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ label, checked, onChange, helpText }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          checked ? 'bg-teal-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// Platform Settings Component
const PlatformSettings = () => {
  const [platformName, setPlatformName] = useState('CareHive Philippines');
  const [platformCurrency, setPlatformCurrency] = useState('PHP');
  const [timeZone, setTimeZone] = useState('Asia/Manila');
  
  const currencyOptions = [
    { value: 'PHP', label: 'Philippine Peso (₱)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'SGD', label: 'Singapore Dollar (S$)' },
    { value: 'EUR', label: 'Euro (€)' }
  ];
  
  const timezoneOptions = [
    { value: 'Asia/Manila', label: 'Manila (GMT+8)' },
    { value: 'Asia/Singapore', label: 'Singapore (GMT+8)' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)' },
    { value: 'Australia/Sydney', label: 'Sydney (GMT+10)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8)' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium">Platform Settings</h2>
        <p className="text-sm text-gray-500">Configure the basic platform settings</p>
      </div>
      <div className="p-4">
        <FormInput 
          label="Platform Name" 
          value={platformName} 
          onChange={(e) => setPlatformName(e.target.value)} 
          required 
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform Logo
          </label>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-teal-600">CH</span>
            </div>
            <div>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
                <PlusCircle size={14} className="mr-1" />
                Upload Logo
              </button>
              <p className="mt-1 text-xs text-gray-500">Recommended size: 512x512px</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect 
            label="Default Currency" 
            value={platformCurrency} 
            onChange={(e) => setPlatformCurrency(e.target.value)} 
            options={currencyOptions} 
            required 
          />
          
          <FormSelect 
            label="Time Zone" 
            value={timeZone} 
            onChange={(e) => setTimeZone(e.target.value)} 
            options={timezoneOptions} 
            required 
          />
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-4 flex justify-end">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 flex items-center">
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Fee Structure Settings Component
const FeeStructureSettings = () => {
  const [serviceFeePercentage, setServiceFeePercentage] = useState(10);
  const [interviewCreditPrices, setInterviewCreditPrices] = useState([
    { id: 1, range: '1-5', price: 250 },
    { id: 2, range: '6-10', price: 200 },
    { id: 3, range: '10+', price: 50 }
  ]);
  
  const handlePriceChange = (id, newPrice) => {
    setInterviewCreditPrices(
      interviewCreditPrices.map(item => 
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium">Fee Structure</h2>
        <p className="text-sm text-gray-500">Manage the platform fee structure and pricing</p>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Fee Percentage
          </label>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={serviceFeePercentage}
              onChange={(e) => setServiceFeePercentage(e.target.value)}
              className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <span className="ml-2 text-sm text-gray-700">%</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Percentage deducted from care provider payouts as platform service fee
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Interview Credit Pricing</h3>
          <div className="bg-gray-50 rounded-md p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Credit Range</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Price per Credit (₱)</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviewCreditPrices.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2">
                      <span className="text-sm">{item.range}</span>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">₱</span>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-20 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </td>
                    <td className="py-2">
                      <button className="text-red-600 hover:text-red-800">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
              <PlusCircle size={14} className="mr-1" />
              Add Price Tier
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-4 flex justify-end">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 flex items-center">
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Settings Dashboard Component
const SettingsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSettingTab, setActiveSettingTab] = useState('platform');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const settingTabs = [
    { id: 'platform', label: 'Platform Settings', icon: <Settings size={18} /> },
    { id: 'fees', label: 'Fee Structure', icon: <DollarSign size={18} /> },
    { id: 'verification', label: 'Verification Settings', icon: <Check size={18} /> },
    { id: 'notifications', label: 'Notification Settings', icon: <Bell size={18} /> },
    { id: 'admins', label: 'Admin Users', icon: <Users size={18} /> }
  ];
  
  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col w-full lg:pl-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500">Configure platform and user settings</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium">Settings Menu</h3>
              </div>
              <div>
                {settingTabs.map((tab) => (
                  <SettingsTab 
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    icon={tab.icon}
                    active={activeSettingTab === tab.id}
                    onClick={setActiveSettingTab}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              {activeSettingTab === 'platform' && <PlatformSettings />}
              {activeSettingTab === 'fees' && <FeeStructureSettings />}
              {activeSettingTab === 'verification' && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium mb-4">Verification Settings</h2>
                  <p>Configure verification requirements for families and care providers</p>
                </div>
              )}
              {activeSettingTab === 'notifications' && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
                  <p>Configure email and push notification settings</p>
                </div>
              )}
              {activeSettingTab === 'admins' && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium mb-4">Admin User Management</h2>
                  <div className="flex justify-between items-center mb-4">
                    <p>Manage administrator accounts and permissions</p>
                    <button className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 flex items-center">
                      <UserPlus size={14} className="mr-1" />
                      Add Admin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsDashboard;