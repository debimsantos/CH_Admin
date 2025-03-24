import React, { useState } from 'react';
import { 
  Activity, Users, Bell, Menu, X, Search, ChevronDown, Filter, 
  Check, AlertCircle, Star, Flag, Edit, Clock, BookOpen, 
  DollarSign, Settings, LogOut, ThumbsUp, ThumbsDown, Eye 
} from 'lucide-react';

// Mock data for pending reviews
const pendingReviews = [
  {
    id: 1,
    reviewerType: "family",
    reviewerName: "Reyes Family",
    reviewerId: 101,
    revieweeType: "careProvider",
    revieweeName: "Maria Dela Cruz",
    revieweeId: 201,
    rating: 4.5,
    content: "Maria was excellent with our children. She was punctual, engaging, and the kids loved her. We definitely plan to book her again for future childcare needs.",
    submittedAt: "2025-03-18T14:30:00Z",
    bookingId: 1001,
    serviceType: "Child Care",
    flags: [],
    status: "pending"
  },
  {
    id: 2,
    reviewerType: "careProvider",
    reviewerName: "Juan Reyes",
    reviewerId: 202,
    revieweeType: "family",
    revieweeName: "Santos Family",
    revieweeId: 102,
    rating: 3.0,
    content: "The Santos family was generally good to work with, though there were some communication issues. The house was quite messy when I arrived, making the cleaning task more difficult than expected.",
    submittedAt: "2025-03-19T09:15:00Z",
    bookingId: 1002,
    serviceType: "Housekeeping",
    flags: ["possible_negative"],
    status: "pending"
  },
  {
    id: 3,
    reviewerType: "family",
    reviewerName: "Lim Family",
    reviewerId: 103,
    revieweeType: "careProvider",
    revieweeName: "Sofia Lopez",
    revieweeId: 203,
    rating: 5.0,
    content: "Sofia was amazing with our children! She was not only punctual but also came prepared with educational activities. Our kids learned so much while having fun.",
    submittedAt: "2025-03-19T10:45:00Z",
    bookingId: 1003,
    serviceType: "Child Care, Tutoring",
    flags: [],
    status: "pending"
  },
  {
    id: 4,
    reviewerType: "family",
    reviewerName: "Garcia Family",
    reviewerId: 104,
    revieweeType: "careProvider",
    revieweeName: "Diego Santos",
    revieweeId: 204,
    rating: 2.0,
    content: "Very disappointed with the service. Diego arrived 30 minutes late and seemed unprepared to care for an elderly person. My father was uncomfortable the whole time.",
    submittedAt: "2025-03-19T11:30:00Z",
    bookingId: 1004,
    serviceType: "Senior Care",
    flags: ["negative_review", "needs_attention"],
    status: "pending"
  }
];

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
  const [activeItem, setActiveItem] = useState('reviews');
  
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

// Flag Badge Component
const FlagBadge = ({ flagType }) => {
  const flagStyles = {
    'negative_review': 'bg-red-100 text-red-800',
    'possible_negative': 'bg-yellow-100 text-yellow-800',
    'needs_attention': 'bg-orange-100 text-orange-800',
    'inappropriate': 'bg-purple-100 text-purple-800'
  };
  
  const flagLabels = {
    'negative_review': 'Negative Review',
    'possible_negative': 'Potentially Negative',
    'needs_attention': 'Needs Attention',
    'inappropriate': 'Possibly Inappropriate'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${flagStyles[flagType]}`}>
      <Flag size={10} className="mr-1" />
      {flagLabels[flagType]}
    </span>
  );
};

// Review Detail Panel
const ReviewDetailPanel = ({ review, onClose, onApprove, onReject }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  const handleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Save changes
    }
  };
  
  const handleReject = () => {
    if (showRejectionForm) {
      onReject(review.id, rejectionReason);
    } else {
      setShowRejectionForm(true);
    }
  };
  
  return (
    <div className="bg-white border-l border-gray-200 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-medium">Review Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              {review.reviewerType === 'family' ? 'Family Review' : 'Provider Review'}
            </span>
            <h3 className="text-lg font-medium mt-2">{review.reviewerName}</h3>
            <div className="text-sm text-gray-500">for {review.revieweeName}</div>
          </div>
          <StarRating rating={review.rating} />
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Review Content</h4>
          {editMode ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              rows="5"
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded-md text-sm">{review.content}</div>
          )}
        </div>
        
        {review.flags.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Flagged Content</h4>
            <div className="flex flex-wrap gap-2">
              {review.flags.map((flag, index) => (
                <FlagBadge key={index} flagType={flag} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500">Booking ID</div>
                <div>#{review.bookingId}</div>
              </div>
              <div>
                <div className="text-gray-500">Service Type</div>
                <div>{review.serviceType}</div>
              </div>
              <div>
                <div className="text-gray-500">Submitted</div>
                <div>{formatDate(review.submittedAt)}</div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="capitalize">{review.status}</div>
              </div>
            </div>
          </div>
        </div>
        
        {showRejectionForm && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Rejection Reason</h4>
            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
            >
              <option value="">Select a reason...</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="offensive">Offensive Language</option>
              <option value="spam">Spam or Irrelevant</option>
              <option value="personal_info">Contains Personal Information</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Additional comments..."
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              rows="3"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleEdit}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <Edit size={14} className="inline mr-1" />
          {editMode ? "Save Edits" : "Edit"}
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
          >
            <X size={14} className="inline mr-1" />
            {showRejectionForm ? "Submit Rejection" : "Reject"}
          </button>
          <button
            onClick={() => onApprove(review.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
          >
            <Check size={14} className="inline mr-1" />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Review Moderation Screen
const ReviewModerationScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleReviewSelect = (review) => {
    setSelectedReview(review);
    setShowDetails(true);
  };
  
  const handleApprove = (id) => {
    console.log(`Approving review ${id}`);
    // In a real app, this would call an API
  };
  
  const handleReject = (id, reason) => {
    console.log(`Rejecting review ${id} with reason: ${reason}`);
    // In a real app, this would call an API
  };
  
  const filteredReviews = pendingReviews.filter(review => {
    // Apply search query
    const matchesSearch = 
      review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.revieweeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filter
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'family') return matchesSearch && review.reviewerType === 'family';
    if (activeFilter === 'provider') return matchesSearch && review.reviewerType === 'careProvider';
    if (activeFilter === 'flagged') return matchesSearch && review.flags.length > 0;
    
    return matchesSearch;
  });
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className={`flex-1 overflow-y-auto ${showDetails ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
              <div className="p-4 md:p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Review Moderation</h1>
                  <p className="text-gray-500">Review and approve user feedback.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setActiveFilter('all')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilter === 'all' 
                              ? 'bg-teal-100 text-teal-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          All Reviews
                        </button>
                        <button
                          onClick={() => setActiveFilter('family')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilter === 'family' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          Family Reviews
                        </button>
                        <button
                          onClick={() => setActiveFilter('provider')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilter === 'provider' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          Provider Reviews
                        </button>
                        <button
                          onClick={() => setActiveFilter('flagged')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilter === 'flagged' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          <Flag size={12} className="inline mr-1" />
                          Flagged
                        </button>
                      </div>
                      
                      <div className="relative w-full md:w-auto">
                        <input
                          type="text"
                          placeholder="Search reviews..."
                          className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-md text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      {filteredReviews.map((review) => (
                        <div 
                          key={review.id}
                          className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleReviewSelect(review)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start">
                              <div className={`rounded-full h-10 w-10 flex items-center justify-center mr-3 ${
                                review.reviewerType === 'family' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                              }`}>
                                {review.reviewerType === 'family' ? 'F' : 'CP'}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {review.reviewerName} <span className="text-gray-400">→</span> {review.revieweeName}
                                </h3>
                                <div className="flex items-center mt-1">
                                  <StarRating rating={review.rating} />
                                  <span className="ml-2 text-xs text-gray-500">
                                    {formatDate(review.submittedAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              {review.flags.length > 0 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs font-medium">
                                  <Flag size={10} className="mr-1" /> {review.flags.length}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {review.content}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Service: {review.serviceType} | Booking #{review.bookingId}
                            </span>
                            <div className="flex space-x-2">
                              <button 
                                className="p-1 text-green-600 hover:text-green-800 bg-green-50 rounded"
                                onClick={(e) => { e.stopPropagation(); handleApprove(review.id); }}
                              >
                                <Check size={16} />
                              </button>
                              <button 
                                className="p-1 text-red-600 hover:text-red-800 bg-red-50 rounded"
                                onClick={(e) => { e.stopPropagation(); setSelectedReview(review); setShowDetails(true); }}
                              >
                                <X size={16} />
                              </button>
                              <button 
                                className="p-1 text-blue-600 hover:text-blue-800 bg-blue-50 rounded"
                                onClick={(e) => { e.stopPropagation(); setSelectedReview(review); setShowDetails(true); }}
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {filteredReviews.length === 0 && (
                        <div className="text-center py-10">
                          <p className="text-gray-500">No reviews found matching your criteria.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {showDetails && (
              <div className={`${showDetails ? 'block' : 'hidden'} w-full lg:w-1/2 border-l border-gray-200`}>
                {selectedReview && (
                  <ReviewDetailPanel 
                    review={selectedReview}
                    onClose={() => setShowDetails(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
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

export default ReviewModerationScreen;
