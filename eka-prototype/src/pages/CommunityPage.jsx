import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';
import { 
  Heart, MessageCircle, Share2, TrendingUp,
  ArrowLeft, Plus, Image, Video, Award, X, Send, Smile
} from 'lucide-react';

function CommunityPage() {
  const { posts, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'trending') return post.trending;
    if (activeTab === 'achievements') return post.type === 'achievement' || post.type === 'milestone';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <EkaLogo size="sm" />
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
            Shakti Community 💜
          </h1>
          <p className="text-gray-600 text-lg">
            Share your wins, inspire others, grow together
          </p>
        </div>

        {/* Motivational Banner */}
        <div className="quote-box mb-8 text-center">
          <Award className="w-12 h-12 mx-auto mb-3" />
          <p className="text-xl mb-2">
            "Every achievement, big or small, deserves to be celebrated!"
          </p>
          <p className="text-sm opacity-90">Share your success story and inspire thousands of women</p>
        </div>

        {/* Create Post Button */}
        <button 
          onClick={() => setShowCreatePost(true)}
          className="card p-4 w-full mb-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 text-left">
              <p className="text-gray-500">Share your achievement, {currentUser.name.split(' ')[0]}...</p>
            </div>
            <Plus className="w-6 h-6 text-primary-500" />
          </div>
        </button>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-4 font-semibold border-b-2 transition ${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`pb-3 px-4 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'trending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending Wins
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`pb-3 px-4 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'achievements'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <Award className="w-4 h-4" />
            Achievements
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post}
              isLiked={likedPosts.has(post.id)}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal 
          currentUser={currentUser}
          onClose={() => setShowCreatePost(false)}
        />
      )}
    </div>
  );
}

// Post Card Component
function PostCard({ post, isLiked, onLike }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="card">
      {/* Post Header */}
      <div className="p-4 flex items-start gap-3">
        <img 
          src={post.user.image} 
          alt={post.user.name}
          className="w-12 h-12 rounded-full border-2 border-primary-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-800">{post.user.name}</h3>
            {post.user.verified && (
              <span className="text-primary-500 text-sm">✓</span>
            )}
            {post.achievement && (
              <span className="badge badge-gold text-xs flex items-center gap-1">
                {post.achievement.icon} {post.achievement.title}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
        </div>
        {post.trending && (
          <span className="badge bg-red-100 text-red-600 text-xs flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </span>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
        
        {/* Post Media */}
        {post.media && post.media.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.media[0].url} 
              alt="Post media"
              className="w-full object-cover max-h-96"
            />
          </div>
        )}

        {/* Achievement Badge */}
        {post.achievement && (
          <div className="mb-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{post.achievement.icon}</div>
              <div>
                <h4 className="font-bold text-gray-800">{post.achievement.title}</h4>
                {post.achievement.amount && (
                  <p className="text-2xl font-bold text-primary-600">₹{post.achievement.amount.toLocaleString()}</p>
                )}
                {post.achievement.count && (
                  <p className="text-lg font-bold text-primary-600">{post.achievement.count} Completed!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{isLiked ? post.likes + 1 : post.likes} likes</span>
          <span>{post.comments} comments</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onLike}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${
              isLiked 
                ? 'bg-red-50 text-red-600' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-600' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold hover:bg-gray-50 text-gray-700 transition"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold hover:bg-gray-50 text-gray-700 transition">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-200 pt-4">
          <div className="space-y-3 mb-4">
            {/* Sample Comments */}
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/150?img=15" alt="User" className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">Neha Sharma</h5>
                <p className="text-sm text-gray-700">Congratulations! So inspiring! 🎉</p>
              </div>
            </div>
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/150?img=25" alt="User" className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">Priya Gupta</h5>
                <p className="text-sm text-gray-700">You're amazing! Keep shining! ✨</p>
              </div>
            </div>
          </div>
          
          {/* Add Comment */}
          <div className="flex gap-3">
            <img src={post.user.image} alt="You" className="w-8 h-8 rounded-full" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 outline-none"
              />
              <button className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Create Post Modal
function CreatePostModal({ currentUser, onClose }) {
  const [postContent, setPostContent] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    { id: 'first_earning', title: 'First Earning', icon: '💰' },
    { id: 'course_completed', title: 'Course Completed', icon: '🎓' },
    { id: 'badge_earned', title: 'Badge Earned', icon: '🏆' },
    { id: 'job_secured', title: 'Job Secured', icon: '💼' },
    { id: 'milestone', title: 'Milestone Achieved', icon: '🌟' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold text-gray-800">{currentUser.name}</h3>
              <p className="text-sm text-gray-600">Sharing with Shakti Community</p>
            </div>
          </div>

          {/* Post Content */}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your achievement, inspire others..."
            rows="6"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none mb-4"
          ></textarea>

          {/* Achievement Selection */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">Tag your achievement (optional)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.map(achievement => (
                <button
                  key={achievement.id}
                  onClick={() => setSelectedAchievement(achievement.id === selectedAchievement ? null : achievement.id)}
                  className={`p-3 rounded-lg border-2 transition ${
                    selectedAchievement === achievement.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{achievement.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition cursor-pointer">
              <div className="flex justify-center gap-4 mb-2">
                <Image className="w-8 h-8 text-gray-400" />
                <Video className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Add photos or videos</p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800 text-center">
              💜 Your story can inspire thousands of women. Share your journey!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-outline flex-1 py-3">
              Cancel
            </button>
            <button className="btn-primary flex-1 py-3">
              Post to Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
