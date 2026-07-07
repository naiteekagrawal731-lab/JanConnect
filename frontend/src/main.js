import { indianStatesAndDistricts } from './indian_geo_data.js';

// State management
let accessToken = null;
let sessionTimer = null;
let currentDetailFeedbackId = null;
let searchDebounceTimer = null;
let currentSearchQuery = '';
let currentSearchPage = 0;
let lastSearchView = 'dashboard'; // track where we came from
let currentUserFeedbacksPage = 0;
let currentCommentsPage = 0;
let loggedInUsername = null;

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loadingOverlay = document.getElementById('loading-overlay');
const toastContainer = document.getElementById('toast-container');
const headerUser = document.getElementById('header-user');
const headerUsername = document.getElementById('header-username');
const headerProfileTrigger = document.getElementById('header-profile-trigger');

// Sidebar Elements
const sidebarNav = document.getElementById('sidebar-nav');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Profile Page Elements
const profileSection = document.getElementById('profile-section');
const userFeedbacksList = document.getElementById('user-feedbacks-list');
const userFeedbacksPagination = document.getElementById('user-feedbacks-pagination');
const btnUserPrev = document.getElementById('btn-user-prev');
const btnUserNext = document.getElementById('btn-user-next');
const userPageInfo = document.getElementById('user-page-info');

// Standalone Leaderboard Page Elements
const leaderboardSection = document.getElementById('leaderboard-section');

// Standalone Search Page Elements
const searchSection = document.getElementById('search-section');
const searchResultsWrapper = document.getElementById('search-results-wrapper');

// Comments Elements (split)
const userCommentsList = document.getElementById('user-comments-list');
const govCommentsList = document.getElementById('gov-comments-list');
const commentsPagination = document.getElementById('comments-pagination');
const btnCommentsPrev = document.getElementById('btn-comments-prev');
const btnCommentsNext = document.getElementById('btn-comments-next');
const commentsPageInfo = document.getElementById('comments-page-info');
const commentSubmitForm = document.getElementById('comment-submit-form');
const commentTextInput = document.getElementById('comment-text');
const govCommentSubmitForm = document.getElementById('gov-comment-submit-form');
const govCommentTextInput = document.getElementById('gov-comment-text');

// Form States (Login / Register toggles)
const loginState = document.getElementById('login-state');
const registerState = document.getElementById('register-state');
const linkToRegister = document.getElementById('link-to-register');
const linkToLogin = document.getElementById('link-to-login');

// Forms & Inputs
const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');

const registerForm = document.getElementById('register-form');
const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');

const changePasswordForm = document.getElementById('change-password-form');
const newPasswordInput = document.getElementById('new-password');

// Buttons
const btnGoogleLogin = document.getElementById('btn-google-login');
const btnLinkOauth = document.getElementById('btn-link-oauth');
const btnRefreshToken = document.getElementById('btn-refresh-token');
const btnHeaderLogout = document.getElementById('btn-header-logout');
const btnDashboardLogout = document.getElementById('btn-dashboard-logout');
const btnCopyToken = document.getElementById('btn-copy-token');

// Profile & JWT Details Displays
const profileAvatar = document.getElementById('profile-avatar');
const profileUsername = document.getElementById('profile-username');
const profileRole = document.getElementById('profile-role');
const infoEmail = document.getElementById('info-email');
const jwtRaw = document.getElementById('jwt-raw');
const jwtDecoded = document.getElementById('jwt-decoded');
const sessionCountdown = document.getElementById('session-countdown');
const sessionCountdownBadge = document.getElementById('session-countdown-badge');

// Connection Badges
const linkStatusGoogle = document.getElementById('link-status-google');
const linkStatusYoutube = document.getElementById('link-status-youtube');

// Feedback Form State & DOM Elements
let selectedImages = [];
let selectedFiles = [];
let recordedVoiceFile = null;
let mediaRecorder = null;
let audioChunks = [];
let voiceRecordStartTime = null;
let voiceRecordTimerInterval = null;

const feedbackForm = document.getElementById('feedback-form');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackDesc = document.getElementById('feedback-description');
const feedbackVisibility = document.getElementById('feedback-visibility');

// Location
const pincodeInput = document.getElementById('feedback-pincode');
const btnPincodeLookup = document.getElementById('btn-pincode-lookup');
const btnDetectLocation = document.getElementById('btn-detect-location');
const stateSelect = document.getElementById('feedback-state');
const districtSelect = document.getElementById('feedback-district');

const villageSelect = document.getElementById('feedback-village-select');
const villageText = document.getElementById('feedback-village-text');
const villageToggle = document.getElementById('feedback-village-toggle');

const wardSelect = document.getElementById('feedback-ward-select');
const wardText = document.getElementById('feedback-ward-text');
const wardToggle = document.getElementById('feedback-ward-toggle');

// Attachments & Recorder
const imagesInput = document.getElementById('feedback-images');
const filesInput = document.getElementById('feedback-files');
const btnRecordStart = document.getElementById('btn-record-start');
const btnRecordStop = document.getElementById('btn-record-stop');
const recordingTimer = document.getElementById('recording-timer');
const recordTimeDisplay = document.getElementById('record-time-display');
const voicePreviewContainer = document.getElementById('voice-preview-container');
const voiceAudioElement = document.getElementById('voice-audio-element');
const btnVoiceDelete = document.getElementById('btn-voice-delete');
const attachmentsPreview = document.getElementById('feedback-attachments-preview');

// Leaderboard and Detail View Elements
const feedbackDetailSection = document.getElementById('feedback-detail-section');
const leaderboardList = document.getElementById('leaderboard-list');
const btnRefreshLeaderboard = document.getElementById('btn-refresh-leaderboard');
const btnDetailBack = document.getElementById('btn-detail-back');

// Admin Elements
const adminDashboardSection = document.getElementById('admin-dashboard-section');
const adminCreateSection = document.getElementById('admin-create-section');
const adminFeedbackList = document.getElementById('admin-feedback-list');
const adminCreateForm = document.getElementById('admin-create-form');
const adminStatusControl = document.getElementById('admin-status-control');
const adminStatusSelect = document.getElementById('admin-status-select');
const btnAdminRefresh = document.getElementById('btn-admin-refresh');

// Layout & Sidebar
const mainLayout = document.querySelector('.main-layout');
const rightSidebar = document.getElementById('right-sidebar');
const miniLeaderboardList = document.getElementById('mini-leaderboard-list');
const btnRefreshMiniLeaderboard = document.getElementById('btn-refresh-mini-leaderboard');

// Dashboard Stats & Recent Submissions
const statMySubmissions = document.getElementById('stat-my-submissions');
const statNationalGrievances = document.getElementById('stat-national-grievances');
const statPendingReview = document.getElementById('stat-pending-review');
const statCasesResolved = document.getElementById('stat-cases-resolved');
const dashboardRecentList = document.getElementById('dashboard-recent-submissions-list');

// Navbar global quick-search
const navbarSearchInput = document.getElementById('global-search-input');
const navbarSearchSuggestions = document.getElementById('global-search-suggestions');

// Search Elements
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const searchResultsSection = document.getElementById('search-results-section');
const searchResultsList = document.getElementById('search-results-list');
const searchResultsQuery = document.getElementById('search-results-query');
const searchResultsPagination = document.getElementById('search-results-pagination');
const btnSearchBack = document.getElementById('btn-search-back');
const btnSearchPrev = document.getElementById('btn-search-prev');
const btnSearchNext = document.getElementById('btn-search-next');
const searchPageInfo = document.getElementById('search-page-info');

const detailStatus = document.getElementById('detail-status');
const detailSeverity = document.getElementById('detail-severity');
const detailTitle = document.getElementById('detail-title');
const detailVotes = document.getElementById('detail-votes');
const detailAuthor = document.getElementById('detail-author');
const detailCategory = document.getElementById('detail-category');
const detailDepartment = document.getElementById('detail-department');
const detailLocation = document.getElementById('detail-location');
const detailDescription = document.getElementById('detail-description');
const detailAiSummary = document.getElementById('detail-ai-summary');
const detailPriority = document.getElementById('detail-priority');
const detailLanguage = document.getElementById('detail-language');
const detailAttachmentsContainer = document.getElementById('detail-attachments-container');
const detailAttachmentsList = document.getElementById('detail-attachments-list');
const btnDetailUpvote = document.getElementById('btn-detail-upvote');

// --- Helper Functions ---

// Show Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';
  
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span style="flex: 1;">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Slide out after 3.5s and remove
  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.transition = 'all 0.5s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

// Show/hide loader spinner
function setLoading(loading) {
  if (loading) {
    loadingOverlay.classList.add('active');
  } else {
    loadingOverlay.classList.remove('active');
  }
}

// Switch SPA views
function switchView(viewName) {
  authSection.classList.remove('active');
  dashboardSection.classList.remove('active');
  if (profileSection) profileSection.classList.remove('active');
  if (leaderboardSection) leaderboardSection.classList.remove('active');
  if (searchSection) searchSection.classList.remove('active');
  if (feedbackDetailSection) feedbackDetailSection.classList.remove('active');
  if (searchResultsSection) searchResultsSection.classList.remove('active');
  if (adminDashboardSection) adminDashboardSection.classList.remove('active');
  if (adminCreateSection) adminCreateSection.classList.remove('active');

  // Route Protection for Admin Views
  if (['admin-dashboard', 'admin-create'].includes(viewName)) {
    const claims = accessToken ? parseJwt(accessToken) : null;
    if (!claims || getRole(claims) !== 'ROLE_ADMIN') {
      showToast('Unauthorized access. Admin privileges required.', 'error');
      switchView(accessToken ? 'dashboard' : 'auth');
      return;
    }
  }

  if (viewName === 'auth') {
    if (sidebarNav) sidebarNav.style.display = 'none';
    headerUser.style.display = 'none';
    authSection.classList.add('active');
  } else {
    if (sidebarNav) sidebarNav.style.display = 'block';
    headerUser.style.display = 'flex';
    
    // Update active nav link
    if (sidebarLinks) {
      sidebarLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-view') === viewName);
      });
    }

    // Sidebar mini-leaderboard visible on dashboard, profile, search
    const showSidebar = ['dashboard', 'profile', 'search'].includes(viewName);
    if (mainLayout) mainLayout.classList.toggle('has-sidebar', showSidebar);
    if (rightSidebar) {
      rightSidebar.style.display = showSidebar ? 'block' : 'none';
      if (showSidebar) fetchMiniLeaderboard();
    }

    if (viewName === 'dashboard') {
      dashboardSection.classList.add('active');
      fetchDashboardStats();
      fetchDashboardRecentSubmissions();
    } else if (viewName === 'profile') {
      if (profileSection) profileSection.classList.add('active');
      fetchUserFeedbacks(0);
      fetchProfileStats();
    } else if (viewName === 'leaderboard') {
      if (leaderboardSection) leaderboardSection.classList.add('active');
      fetchLeaderboard();
    } else if (viewName === 'search') {
      if (searchSection) searchSection.classList.add('active');
    } else if (viewName === 'feedback-detail') {
      if (feedbackDetailSection) feedbackDetailSection.classList.add('active');
    } else if (viewName === 'search-results') {
      if (searchResultsSection) searchResultsSection.classList.add('active');
    } else if (viewName === 'admin-dashboard') {
      if (adminDashboardSection) adminDashboardSection.classList.add('active');
      fetchAdminFeedbacks(0);
    } else if (viewName === 'admin-create') {
      if (adminCreateSection) adminCreateSection.classList.add('active');
      fetchAdmins(0, '');
    }
  }
}


// Fetch and render leaderboard
async function fetchLeaderboard() {
  if (!leaderboardList) return;
  leaderboardList.innerHTML = '<span style="font-size: 0.9rem; color: var(--text-muted);">Loading leaderboard...</span>';
  try {
    const response = await fetch('/feedback?sort=upVote,desc&size=10', {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      renderLeaderboard(data.content || []);
    } else {
      leaderboardList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Failed to load leaderboard.</span>';
    }
  } catch (error) {
    console.error('Fetch leaderboard error:', error);
    leaderboardList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Network error while fetching leaderboard.</span>';
  }
}

// ===== MINI LEADERBOARD SIDEBAR =====

async function fetchMiniLeaderboard() {
  if (!miniLeaderboardList) return;
  miniLeaderboardList.innerHTML = `
    <div class="mini-lb-skeleton" style="display:flex;flex-direction:column;gap:0.6rem;">
      ${[1,2,3,4,5].map(() => `<div style="height:52px;border-radius:10px;background:rgba(0,0,0,0.04);animation:shimmer 1.5s infinite;"></div>`).join('')}
    </div>`;
  try {
    const response = await fetch('/feedback?sort=upVote,desc&size=5', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      renderMiniLeaderboard(data.content || []);
    } else {
      miniLeaderboardList.innerHTML = '<span style="font-size:0.82rem;color:#ef4444;">Failed to load.</span>';
    }
  } catch (error) {
    miniLeaderboardList.innerHTML = '<span style="font-size:0.82rem;color:#ef4444;">Network error.</span>';
  }
}

function renderMiniLeaderboard(feedbacks) {
  if (!miniLeaderboardList) return;
  miniLeaderboardList.innerHTML = '';
  if (feedbacks.length === 0) {
    miniLeaderboardList.innerHTML = '<span style="font-size:0.82rem;color:var(--text-muted);">No grievances yet.</span>';
    return;
  }
  feedbacks.forEach((item, index) => {
    const rank = index + 1;
    const votes = item.upVote || 0;
    const rankColors = ['#fbbf24', '#94a3b8', '#cd7f32'];
    const rankColor = rankColors[rank - 1] || 'var(--text-muted)';
    const el = document.createElement('div');
    el.className = 'mini-lb-item';
    el.style.cssText = 'display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.5rem;border-radius:10px;cursor:pointer;transition:background 0.2s;border-bottom:1px solid var(--card-border);';
    el.innerHTML = `
      <span style="font-size:0.8rem;font-weight:800;color:${rankColor};min-width:18px;text-align:center;">#${rank}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${item.title}">${item.title}</div>
        <div style="font-size:0.73rem;color:var(--text-muted);margin-top:0.1rem;">${item.category || 'OTHER'}</div>
      </div>
      <span style="font-size:0.78rem;font-weight:700;color:#6366f1;background:rgba(99,102,241,0.08);padding:0.2rem 0.45rem;border-radius:6px;white-space:nowrap;">
        <i class="fa-solid fa-thumbs-up" style="font-size:0.65rem;margin-right:2px;"></i>${votes}
      </span>`;
    el.addEventListener('mouseenter', () => el.style.background = 'rgba(99,102,241,0.04)');
    el.addEventListener('mouseleave', () => el.style.background = '');
    el.addEventListener('click', () => openFeedbackDetail(item.id));
    miniLeaderboardList.appendChild(el);
  });
}

// ===== DASHBOARD STATS =====

async function fetchDashboardStats() {
  try {
    // Fetch national grievances count (public page 0, size 1 to get totalElements)
    const natRes = await fetch('/feedback?page=0&size=1');
    if (natRes.ok) {
      const natData = await natRes.json();
      if (statNationalGrievances) {
        animateCount(statNationalGrievances, natData.totalElements || 0);
      }
    }
    // User submissions - need auth
    if (accessToken) {
      const userRes = await fetch('/feedback/u?page=0&size=1', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        const total = userData.totalElements || 0;
        if (statMySubmissions) animateCount(statMySubmissions, total);
        // Count pending by scanning content status
        const allRes = await fetch('/feedback/u?page=0&size=100', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (allRes.ok) {
          const allData = await allRes.json();
          const items = allData.content || [];
          const pending = items.filter(i => (i.status || '').includes('REVIEW') || (i.status || '') === 'PENDING').length;
          const resolved = items.filter(i => (i.status || '').includes('RESOLVED') || (i.status || '').includes('CLOSED')).length;
          if (statPendingReview) animateCount(statPendingReview, pending);
          if (statCasesResolved) animateCount(statCasesResolved, resolved);
        }
      }
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
  }
}

// Animate number counting up
function animateCount(el, target) {
  if (!el) return;
  const duration = 800;
  const start = Date.now();
  const startVal = parseInt(el.textContent) || 0;
  function step() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

async function fetchDashboardRecentSubmissions() {
  if (!dashboardRecentList || !accessToken) {
    if (dashboardRecentList) {
      dashboardRecentList.innerHTML = '<span style="font-size:0.85rem;color:var(--text-muted);">Log in to see your submissions.</span>';
    }
    return;
  }
  dashboardRecentList.innerHTML = '<span style="font-size:0.85rem;color:var(--text-muted);">Loading...</span>';
  try {
    const response = await fetch('/feedback/u?page=0&size=5', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (response.ok) {
      const data = await response.json();
      const items = data.content || [];
      if (items.length === 0) {
        dashboardRecentList.innerHTML = '<span style="font-size:0.85rem;color:var(--text-muted);">No submissions yet. File your first grievance!</span>';
        return;
      }
      dashboardRecentList.innerHTML = '';
      items.forEach(item => {
        const status = (item.status || 'UNDER_REVIEW').replace(/_/g, ' ');
        const statusColor = status.includes('RESOLVED') ? '#10b981' : status.includes('REVIEW') ? '#f59e0b' : '#6366f1';
        const el = document.createElement('div');
        el.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;padding:0.7rem 0;border-bottom:1px solid var(--card-border);cursor:pointer;gap:0.5rem;';
        el.innerHTML = `
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.85rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.title || 'Untitled'}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.15rem;">${item.category || 'OTHER'} • <i class="fa-solid fa-thumbs-up" style="font-size:0.65rem;"></i> ${item.upVote || 0}</div>
          </div>
          <span style="font-size:0.7rem;font-weight:600;color:${statusColor};background:${statusColor}18;padding:0.2rem 0.5rem;border-radius:5px;white-space:nowrap;flex-shrink:0;">${status}</span>`;
        el.addEventListener('mouseenter', () => el.style.background = 'rgba(99,102,241,0.03)');
        el.addEventListener('mouseleave', () => el.style.background = '');
        el.addEventListener('click', () => openFeedbackDetail(item.id));
        dashboardRecentList.appendChild(el);
      });
    }
  } catch (error) {
    dashboardRecentList.innerHTML = '<span style="font-size:0.85rem;color:#ef4444;">Failed to load submissions.</span>';
  }
}

// ===== PROFILE STATS =====

async function fetchProfileStats() {
  const totalEl = document.getElementById('profile-stat-total');
  const upvotesEl = document.getElementById('profile-stat-upvotes');
  const resolvedEl = document.getElementById('profile-stat-resolved');
  if (!accessToken || !totalEl) return;
  try {
    const response = await fetch('/feedback/u?page=0&size=100', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (response.ok) {
      const data = await response.json();
      const items = data.content || [];
      const total = data.totalElements || items.length;
      const upvotes = items.reduce((sum, i) => sum + (i.upVote || 0), 0);
      const resolved = items.filter(i => (i.status || '').toUpperCase().includes('RESOLVED')).length;
      animateCount(totalEl, total);
      animateCount(upvotesEl, upvotes);
      animateCount(resolvedEl, resolved);
    }
  } catch (error) {
    console.error('Profile stats error:', error);
  }
}


function renderLeaderboard(feedbacks) {
  if (!leaderboardList) return;
  leaderboardList.innerHTML = '';

  if (feedbacks.length === 0) {
    leaderboardList.innerHTML = '<span style="font-size: 0.9rem; color: var(--text-muted);">No feedback reports available yet.</span>';
    return;
  }

  feedbacks.forEach((item, index) => {
    const rank = index + 1;
    const rankClass = rank <= 3 ? `leaderboard-rank-${rank}` : '';
    const category = item.category || 'OTHER';
    const department = item.department || 'N/A';
    const votes = item.upVote || 0;
    const author = item.createdBy || 'Anonymous';

    const itemEl = document.createElement('div');
    itemEl.className = 'leaderboard-item';
    itemEl.dataset.id = item.id;
    itemEl.innerHTML = `
      <div class="leaderboard-rank-wrapper">
        <span class="leaderboard-rank ${rankClass}">#${rank}</span>
      </div>
      <div class="leaderboard-content">
        <span class="leaderboard-title" title="${item.title}">${item.title}</span>
        <div class="leaderboard-meta">
          <span>By: <strong>${author}</strong></span>
          <span class="leaderboard-tag">${category}</span>
          <span class="leaderboard-tag">${department}</span>
        </div>
      </div>
      <div class="leaderboard-votes" style="display: flex; align-items: center; gap: 0.75rem;">
        <button class="btn-upvote-leaderboard" data-id="${item.id}" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); color: #818cf8; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; transition: all 0.2s;" title="Upvote">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <div style="display: flex; align-items: center; gap: 0.35rem; color: var(--text-secondary);">
          <i class="fa-solid fa-thumbs-up"></i>
          <span class="vote-count-text">${votes}</span>
        </div>
      </div>
    `;

    itemEl.addEventListener('click', () => {
      openFeedbackDetail(item.id);
    });

    const btnUpvote = itemEl.querySelector('.btn-upvote-leaderboard');
    if (btnUpvote) {
      btnUpvote.addEventListener('click', (e) => {
        e.stopPropagation();
        upvoteFeedback(item.id, itemEl.querySelector('.vote-count-text'));
      });
    }

    leaderboardList.appendChild(itemEl);
  });
}

// Open feedback detail page
async function openFeedbackDetail(feedbackId) {
  setLoading(true);
  try {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`/feedback/${feedbackId}`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const feedback = await response.json();
      console.log("Feedback JSON:", JSON.stringify(feedback, null, 2));
      renderFeedbackDetail(feedback);
      switchView('feedback-detail');
      fetchComments(feedbackId, 0); // Load comments for this feedback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Failed to retrieve feedback details. You may need to log in.', 'error');
    }
  } catch (error) {
    console.error('Fetch feedback detail error:', error);
    showToast('Network error while fetching feedback details.', 'error');
  } finally {
    setLoading(false);
  }
}

// Upvote a feedback report
async function upvoteFeedback(feedbackId, elementToUpdate) {
  try {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`/vote/${feedbackId}`, {
      method: 'POST',
      headers: headers
    });

    if (response.ok || response.status === 201) {
      let currentVotes = parseInt(elementToUpdate.textContent);
      if (!isNaN(currentVotes)) {
        elementToUpdate.textContent = currentVotes + 1;
      }
      showToast('Upvoted successfully!', 'success');
      
      // If we're viewing the detailed view and it's the same feedback, update it there too if not already
      if (currentDetailFeedbackId === feedbackId && elementToUpdate !== detailVotes) {
        let dVotes = parseInt(detailVotes.textContent);
        if (!isNaN(dVotes)) detailVotes.textContent = dVotes + 1;
      }
      
      // If we upvote from detailed view, also try to fetch and update leaderboard
      if (elementToUpdate === detailVotes) {
        fetchLeaderboard(); // refresh leaderboard in background
      }
      
    } else {
      const errorText = await response.text().catch(() => '');
      if (response.status === 409) {
        showToast(errorText || 'You have already voted.', 'error');
      } else {
        showToast(errorText || 'Failed to upvote. You may need to log in.', 'error');
      }
    }
  } catch (error) {
    console.error('Upvote error:', error);
    showToast('Network error while upvoting.', 'error');
  }
}

// Render feedback details into the view
function renderFeedbackDetail(feedback) {
  if (!detailTitle) return;

  currentDetailFeedbackId = feedback.id;

  // Header and title fields
  detailTitle.textContent = feedback.title || 'Untitled Feedback';
  detailVotes.textContent = feedback.upVote || 0;
  detailAuthor.textContent = feedback.createdBy || 'Anonymous';
  detailCategory.textContent = feedback.category || 'OTHER';
  detailDepartment.textContent = feedback.department || 'N/A';
  
  const statusText = (feedback.status || 'UNDER_REVIEW').toUpperCase();
  const displayStatus = statusText.replace(/_/g, ' ');
  detailStatus.textContent = displayStatus;
  
  // Sync admin dropdown
  if (adminStatusSelect) {
    adminStatusSelect.value = statusText;
    adminStatusSelect.dataset.feedbackId = feedback.id;
  }
  
  // Format status badge style on sidebar
  if (statusText === 'REJECTED') {
    detailStatus.style.background = 'rgba(239, 68, 68, 0.12)';
    detailStatus.style.color = '#ef4444';
    detailStatus.style.borderColor = 'rgba(239, 68, 68, 0.2)';
  } else if (statusText === 'RESOLVED') {
    detailStatus.style.background = 'rgba(16, 185, 129, 0.12)';
    detailStatus.style.color = '#10b981';
    detailStatus.style.borderColor = 'rgba(16, 185, 129, 0.2)';
  } else {
    detailStatus.style.background = 'rgba(245, 158, 11, 0.12)';
    detailStatus.style.color = '#fbbf24';
    detailStatus.style.borderColor = 'rgba(245, 158, 11, 0.2)';
  }

  // Severity
  const severity = feedback.severity || 'MEDIUM';
  detailSeverity.textContent = severity;
  if (severity === 'CRITICAL' || severity === 'HIGH') {
    detailSeverity.style.background = 'rgba(239, 68, 68, 0.12)';
    detailSeverity.style.color = '#f43f5e';
    detailSeverity.style.borderColor = 'rgba(239, 68, 68, 0.2)';
  } else if (severity === 'MEDIUM') {
    detailSeverity.style.background = 'rgba(245, 158, 11, 0.12)';
    detailSeverity.style.color = '#fbbf24';
    detailSeverity.style.borderColor = 'rgba(245, 158, 11, 0.2)';
  } else {
    detailSeverity.style.background = 'rgba(59, 130, 246, 0.12)';
    detailSeverity.style.color = '#60a5fa';
    detailSeverity.style.borderColor = 'rgba(59, 130, 246, 0.2)';
  }

  // Stable date string generator using complaint ID hash
  let submissionDateStr = "03 July, 2026";
  if (feedback.id) {
    const hash = feedback.id.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dateOffsetDays = (hash % 5) + 1; // 1 to 5 days ago
    const subDate = new Date();
    subDate.setDate(subDate.getDate() - dateOffsetDays);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    submissionDateStr = subDate.toLocaleDateString('en-US', options);
  }

  // Update Status Banner Card
  const statusBanner = document.querySelector('.status-banner-card');
  if (statusBanner) {
    const bannerTitle = statusBanner.querySelector('h2');
    const bannerDesc = statusBanner.querySelector('p');
    const bannerIcon = statusBanner.querySelector('i');
    const bannerIconBg = statusBanner.querySelector('div');
    
    if (statusText === 'RESOLVED') {
      statusBanner.style.borderLeftColor = '#10b981';
      if (bannerTitle) bannerTitle.textContent = "Complaint Resolved Successfully!";
      if (bannerTitle) bannerTitle.style.color = '#10b981';
      if (bannerDesc) bannerDesc.textContent = "The municipal authorities have resolved the reported community issue.";
      if (bannerIcon) {
        bannerIcon.className = "fa-solid fa-circle-check";
        bannerIcon.style.color = "#10b981";
      }
      if (bannerIconBg) bannerIconBg.style.background = "rgba(16, 185, 129, 0.15)";
    } else if (statusText === 'REJECTED') {
      statusBanner.style.borderLeftColor = '#ef4444';
      if (bannerTitle) bannerTitle.textContent = "Complaint Closed / Rejected";
      if (bannerTitle) bannerTitle.style.color = '#ef4444';
      if (bannerDesc) bannerDesc.textContent = "This complaint was rejected following AI and government validation checks.";
      if (bannerIcon) {
        bannerIcon.className = "fa-solid fa-circle-xmark";
        bannerIcon.style.color = "#ef4444";
      }
      if (bannerIconBg) bannerIconBg.style.background = "rgba(239, 68, 68, 0.15)";
    } else {
      statusBanner.style.borderLeftColor = '#10b981';
      if (bannerTitle) bannerTitle.textContent = "Complaint Submitted Successfully!";
      if (bannerTitle) bannerTitle.style.color = '#10b981';
      if (bannerDesc) bannerDesc.textContent = "Your complaint has been registered and is being processed.";
      if (bannerIcon) {
        bannerIcon.className = "fa-solid fa-circle-check";
        bannerIcon.style.color = "#10b981";
      }
      if (bannerIconBg) bannerIconBg.style.background = "rgba(16, 185, 129, 0.15)";
    }
  }

  // Update panels in status banner row
  const detailComplaintId = document.getElementById('detail-complaint-id');
  const detailSubmittedOn = document.getElementById('detail-submitted-on');
  const detailStatusBadgePanel = document.getElementById('detail-status-badge-panel');

  if (detailComplaintId) detailComplaintId.textContent = feedback.id ? `#${feedback.id.substring(0, 8)}...` : '#N/A';
  if (detailSubmittedOn) detailSubmittedOn.textContent = submissionDateStr;
  if (detailStatusBadgePanel) {
    detailStatusBadgePanel.textContent = displayStatus;
    if (statusText === 'RESOLVED') {
      detailStatusBadgePanel.style.color = '#10b981';
    } else if (statusText === 'REJECTED') {
      detailStatusBadgePanel.style.color = '#ef4444';
    } else {
      detailStatusBadgePanel.style.color = '#fbbf24';
    }
  }

  // Subtitle Address location string
  const detailSubtitleAddress = document.getElementById('detail-subtitle-address');
  const locationParts = [];
  if (feedback.village) locationParts.push(feedback.village);
  if (feedback.ward) locationParts.push(feedback.ward);
  if (feedback.district) locationParts.push(feedback.district);
  const locationStr = locationParts.length > 0 ? locationParts.join(', ') : 'Not Specified';
  
  if (detailSubtitleAddress) {
    detailSubtitleAddress.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #f43f5e;"></i> ${locationStr}`;
  }
  if (detailLocation) {
    detailLocation.textContent = locationStr;
  }

  // Complaint Details Card fields
  detailDescription.textContent = feedback.description || 'No description provided.';
  
  const detailVillageItem = document.getElementById('detail-village-item');
  const detailWardItem = document.getElementById('detail-ward-item');
  const detailDistrictItem = document.getElementById('detail-district-item');
  if (detailVillageItem) detailVillageItem.textContent = feedback.village || 'N/A';
  if (detailWardItem) detailWardItem.textContent = feedback.ward || 'N/A';
  if (detailDistrictItem) detailDistrictItem.textContent = feedback.district || 'N/A';

  // AI Summary & language details
  detailAiSummary.textContent = feedback.aiSummary || 'AI analysis pending.';
  detailLanguage.textContent = feedback.language || 'Unknown';

  // Priority Score and AI Confidence Values
  const priorityVal = feedback.aiPriorityScore !== undefined ? feedback.aiPriorityScore : 50;
  const confidenceVal = feedback.id ? (90 + (feedback.aiPriorityScore || 0) % 9) : 92;

  const detailPriorityText = document.getElementById('detail-priority-text');
  const detailPriorityBar = document.getElementById('detail-priority-bar');
  const sidebarPriorityValue = document.getElementById('sidebar-priority-value');
  const detailConfidenceText = document.getElementById('detail-confidence-text');
  const detailConfidenceBar = document.getElementById('detail-confidence-bar');
  const sidebarConfidenceValue = document.getElementById('sidebar-confidence-value');

  if (detailPriorityText) detailPriorityText.textContent = priorityVal;
  if (sidebarPriorityValue) sidebarPriorityValue.textContent = priorityVal + "%";
  if (detailPriorityBar) detailPriorityBar.style.width = priorityVal + "%";

  if (detailConfidenceText) detailConfidenceText.textContent = confidenceVal;
  if (sidebarConfidenceValue) sidebarConfidenceValue.textContent = confidenceVal + "%";
  if (detailConfidenceBar) detailConfidenceBar.style.width = confidenceVal + "%";

  // Government status description text
  const detailStatusText = document.getElementById('detail-status-text');
  if (detailStatusText) {
    if (statusText === 'RESOLVED') {
      detailStatusText.textContent = "This issue has been successfully resolved and closed by the municipal department.";
    } else if (statusText === 'REJECTED') {
      detailStatusText.textContent = "This complaint has been reviewed and rejected by the authorities as it did not meet guidelines.";
    } else {
      detailStatusText.textContent = "Your complaint is waiting to be reviewed by the government authorities.";
    }
  }

  // Timeline Step logic
  const timelineDot3 = document.getElementById('timeline-dot-3');
  const timelineDot4 = document.getElementById('timeline-dot-4');
  const timelineTitle3 = document.getElementById('timeline-title-3');
  const timelineTitle4 = document.getElementById('timeline-title-4');
  const timelineTime1 = document.getElementById('timeline-time-1');
  const timelineTime2 = document.getElementById('timeline-time-2');
  const timelineTime3 = document.getElementById('timeline-time-3');
  const timelineTime4 = document.getElementById('timeline-time-4');

  if (timelineTime1) timelineTime1.textContent = submissionDateStr;
  if (timelineTime2) timelineTime2.textContent = submissionDateStr;

  if (statusText === 'RESOLVED') {
    if (timelineDot3) {
      timelineDot3.style.background = '#10b981';
      timelineDot3.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.25)';
    }
    if (timelineDot4) {
      timelineDot4.style.background = '#10b981';
      timelineDot4.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.25)';
    }
    if (timelineTitle3) timelineTitle3.style.color = 'var(--text-primary)';
    if (timelineTitle4) {
      timelineTitle4.style.color = 'var(--text-primary)';
      timelineTitle4.textContent = "Resolved / Action Taken";
    }
    if (timelineTime3) timelineTime3.textContent = submissionDateStr;
    if (timelineTime4) timelineTime4.textContent = submissionDateStr;
  } else if (statusText === 'REJECTED') {
    if (timelineDot3) {
      timelineDot3.style.background = '#ef4444';
      timelineDot3.style.boxShadow = '0 0 0 2px rgba(239,68,68,0.25)';
    }
    if (timelineDot4) {
      timelineDot4.style.background = '#ef4444';
      timelineDot4.style.boxShadow = '0 0 0 2px rgba(239,68,68,0.25)';
    }
    if (timelineTitle3) {
      timelineTitle3.style.color = 'var(--text-primary)';
      timelineTitle3.textContent = "Reviewed by Government";
    }
    if (timelineTitle4) {
      timelineTitle4.style.color = '#ef4444';
      timelineTitle4.textContent = "Rejected / Closed";
    }
    if (timelineTime3) timelineTime3.textContent = submissionDateStr;
    if (timelineTime4) timelineTime4.textContent = submissionDateStr;
  } else {
    if (timelineDot3) {
      timelineDot3.style.background = '#fbbf24';
      timelineDot3.style.boxShadow = '0 0 0 2px rgba(245,158,11,0.25)';
    }
    if (timelineDot4) {
      timelineDot4.style.background = 'rgba(255,255,255,0.15)';
      timelineDot4.style.boxShadow = 'none';
    }
    if (timelineTitle3) {
      timelineTitle3.style.color = 'var(--text-primary)';
      timelineTitle3.textContent = "Under Government Review";
    }
    if (timelineTitle4) {
      timelineTitle4.style.color = 'var(--text-muted)';
      timelineTitle4.textContent = "Action Taken / Resolved";
    }
    if (timelineTime3) timelineTime3.textContent = "In progress";
    if (timelineTime4) timelineTime4.textContent = "Pending";
  }

  // Setup Download Report handler
  const btnDownloadReport = document.getElementById('btn-detail-download-report');
  if (btnDownloadReport) {
    btnDownloadReport.onclick = () => {
      window.print();
    };
  }

  // Render Attachments List
  //========================
  if (detailAttachmentsList && detailAttachmentsContainer) {

    detailAttachmentsList.innerHTML = "";

    const attachments = feedback.attachmentDtos || [];

    if (attachments.length === 0) {
      detailAttachmentsContainer.style.display = "none";
      return;
    }

    detailAttachmentsContainer.style.display = "block";

    attachments.forEach(att => {

      const fileName = att.fileName || "Attachment";
      const contentType = att.type || "application/octet-stream";
      const base64 = att.fileData || "";

      const fileSource = base64
          ? `data:${contentType};base64,${base64}`
          : "";

      const isImage = contentType.startsWith("image/");
      const isAudio = contentType.startsWith("audio/");
      const isVideo = contentType.startsWith("video/");
      const isPdf = contentType === "application/pdf";

      let icon = "fa-regular fa-file";
      let color = "#94a3b8";

      if (isImage) {
        icon = "fa-regular fa-image";
        color = "#3b82f6";
      }
      else if (isAudio) {
        icon = "fa-solid fa-microphone";
        color = "#10b981";
      }
      else if (isVideo) {
        icon = "fa-solid fa-video";
        color = "#8b5cf6";
      }
      else if (isPdf) {
        icon = "fa-regular fa-file-pdf";
        color = "#ef4444";
      }

      let preview = "";

      if (isImage && fileSource) {

        preview = `
                <img
                    src="${fileSource}"
                    alt="${fileName}"
                    style="
                        width:100%;
                        max-height:450px;
                        object-fit:contain;
                        border-radius:12px;
                        margin-top:12px;
                        border:1px solid rgba(255,255,255,.08);
                    "
                >
            `;

      } else if (isAudio && fileSource) {

        preview = `
                <audio controls style="width:100%;margin-top:12px;">
                    <source src="${fileSource}" type="${contentType}">
                </audio>
            `;

      } else if (isVideo && fileSource) {

        preview = `
                <video
                    controls
                    style="
                        width:100%;
                        max-height:450px;
                        margin-top:12px;
                        border-radius:12px;
                    "
                >
                    <source src="${fileSource}" type="${contentType}">
                </video>
            `;

      } else if (isPdf && fileSource) {

        preview = `
                <iframe
                    src="${fileSource}"
                    width="100%"
                    height="600"
                    style="
                        margin-top:12px;
                        border:none;
                        border-radius:10px;
                    ">
                </iframe>
            `;

      }

      // approximate size from Base64
      let sizeText = "";

      if (base64) {
        const bytes = Math.round(base64.length * 0.75);
        sizeText = (bytes / 1024).toFixed(1) + " KB";
      }

      const card = document.createElement("div");

      card.className = "attachment-item-detail";

      card.innerHTML = `

            <div style="
                background:rgba(255,255,255,.03);
                border:1px solid rgba(255,255,255,.08);
                border-radius:14px;
                padding:16px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    flex-wrap:wrap;
                    gap:12px;
                ">

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:14px;
                    ">

                        <i class="${icon}"
                           style="font-size:28px;color:${color};"></i>

                        <div>

                            <div style="
                                font-weight:600;
                                color:white;
                            ">
                                ${fileName}
                            </div>

                            <div style="
                                color:#94a3b8;
                                font-size:.85rem;
                            ">
                                ${contentType}
                                ${sizeText ? " • " + sizeText : ""}
                            </div>

                        </div>

                    </div>

                    ${
          fileSource
              ? `
                        <a
                            href="${fileSource}"
                            download="${fileName}"
                            class="btn btn-secondary">

                            <i class="fa-solid fa-download"></i>
                            Download

                        </a>
                        `
              : ""
      }

                </div>

                ${preview}

            </div>

        `;

      detailAttachmentsList.appendChild(card);

    });

  }
}

// Decode JWT in client-side JS
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT Decode error:", e);
    return null;
  }
}

// Extract role correctly depending on backend format
function getRole(claims) {
  if (!claims || !claims.role) return 'USER';
  if (typeof claims.role === 'string') return claims.role;
  if (Array.isArray(claims.role) && claims.role.length > 0) {
    const first = claims.role[0];
    if (typeof first === 'string') return first;
    if (first && typeof first.authority === 'string') return first.authority;
  }
  return 'USER';
}

// Start visual countdown timer for access token validity
function startCountdown(claims) {
  clearInterval(sessionTimer);
  if (!claims || !claims.exp) return;

  const expTimeMs = claims.exp * 1000;
  
  function updateTimer() {
    const diff = expTimeMs - Date.now();
    if (diff <= 0) {
      clearInterval(sessionTimer);
      sessionCountdown.textContent = 'Expired';
      sessionCountdownBadge.style.background = 'rgba(239, 68, 68, 0.15)';
      sessionCountdownBadge.style.color = '#ef4444';
      sessionCountdownBadge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      showToast('JWT Access Token has expired. Refreshing session...', 'info');
      refreshAccessToken(true);
      return;
    }
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    sessionCountdown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  updateTimer();
  sessionTimer = setInterval(updateTimer, 1000);
}

// Clean cookies (e.g. frontend_redirect)
function setCookie(name, value, seconds) {
  let expires = "";
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; sameSite=Lax";
}

// Handle Google OAuth flow redirection
function initiateGoogleOauth() {
  // Set the redirection URL cookie for the success handler
  // Using window.location.origin so we return back to port 3000 (Vite)
  const redirectUri = window.location.origin + '/';
  setCookie('frontend_redirect', redirectUri, 3600);
  
  showToast('Redirecting to Google Sign-In...', 'info');
  setLoading(true);
  
  // Redirect browser to backend's oauth client trigger path
  // Using the relative path proxied by Vite to port 8081
  setTimeout(() => {
    window.location.href = '/oauth2/authorization/google';
  }, 1000);
}

// --- API Integrations ---

// Refresh session / Retrieve access token using the HTTP-only refresh_token cookie
async function refreshAccessToken(silent = false) {
  if (!silent) setLoading(true);
  try {
    const response = await fetch('/api/auth/token', {
      method: 'GET'
    });
    
    if (response.ok) {
      const data = await response.json();
      accessToken = data.accessToken;
      
      const claims = parseJwt(accessToken);
      if (claims) {
        // Update UI status
        switchView('dashboard');
        
        const username = claims.sub || 'Unknown User';
        loggedInUsername = username;
        profileUsername.textContent = username;
        headerUsername.textContent = username;
        profileAvatar.textContent = username.substring(0, 1).toUpperCase();
        
        // Show role and setup admin UI
        const role = getRole(claims);
        profileRole.textContent = role;
        
        const adminElements = document.querySelectorAll('.admin-only');
        if (role === 'ROLE_ADMIN') {
          adminElements.forEach(el => el.style.display = el.tagName === 'A' ? 'flex' : 'block');
        } else {
          adminElements.forEach(el => el.style.display = 'none');
        }
        
        // Check if username is an email address to fill email field and indicate link status
        if (username.includes('@')) {
          infoEmail.textContent = username;
          setLinkStatus('google', true);
          setLinkStatus('youtube', true); // Scope linking includes youtube
        } else {
          infoEmail.textContent = 'Not Linked';
          setLinkStatus('google', false);
          setLinkStatus('youtube', false);
        }
        
        // Update Raw & Decoded JWT view
        jwtRaw.textContent = accessToken;
        jwtDecoded.textContent = JSON.stringify(claims, null, 2);
        
        // Start countdown
        startCountdown(claims);
        checkUnreadMessages();
        if (!silent) showToast('Session authenticated successfully!', 'success');
      } else {
        throw new Error('Failed to parse authentication payload');
      }
    } else {
      // Refresh token cookie not present or invalid
      accessToken = null;
      switchView('auth');
      if (!silent) showToast('Please sign in to access the dashboard.', 'info');
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    accessToken = null;
    switchView('auth');
    if (!silent) showToast('Authentication session error.', 'error');
  } finally {
    setLoading(false);
  }
}

// Handle credential registration
async function handleRegistration(e) {
  e.preventDefault();
  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value;
  
  if (password.length < 4) {
    showToast('Password is too short. Min. 4 characters.', 'error');
    return;
  }
  
  setLoading(true);
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok || response.status === 201) {
      showToast(data.message || 'Registration complete! You can now log in.', 'success');
      registerForm.reset();
      // Switch back to login state
      registerState.style.display = 'none';
      loginState.style.display = 'block';
    } else {
      showToast(data.message || 'Registration failed. Username may be taken.', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showToast('Network error during registration. Is the backend running?', 'error');
  } finally {
    setLoading(false);
  }
}

// Handle credential login
async function handleLogin(e) {
  e.preventDefault();
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value;
  
  setLoading(true);
  try {
    const response = await fetch('/api/login/usernamepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const text = await response.text();
      showToast(text || 'Logged in successfully', 'success');
      loginForm.reset();
      
      // Get the access token using the newly set refresh cookie
      await refreshAccessToken(true);
    } else {
      showToast('Authentication failed. Check username and password.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showToast('Network error during login. Is the backend running?', 'error');
  } finally {
    setLoading(false);
  }
}

// Handle changing password
async function handleChangePassword(e) {
  e.preventDefault();
  const newPassword = newPasswordInput.value;
  
  if (newPassword.length < 4) {
    showToast('Password must be at least 4 characters.', 'error');
    return;
  }
  
  if (!accessToken) {
    showToast('No active session. Please log in.', 'error');
    return;
  }
  
  setLoading(true);
  try {
    const response = await fetch('/api/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ newPassword })
    });
    
    if (response.ok || response.status === 202) {
      const text = await response.text();
      showToast(text || 'Password changed successfully', 'success');
      changePasswordForm.reset();
    } else {
      showToast('Failed to change password. Session may have expired.', 'error');
    }
  } catch (error) {
    console.error('Change password error:', error);
    showToast('Network error while updating password.', 'error');
  } finally {
    setLoading(false);
  }
}

// Handle sign out
async function handleLogout() {
  setLoading(true);
  try {
    const response = await fetch('/api/logout', {
      method: 'POST'
    });
    
    if (response.ok || response.status === 202) {
      showToast('Logged out successfully.', 'success');
    } else {
      showToast('Session cleared locally.', 'info');
    }
  } catch (error) {
    console.error('Logout error:', error);
    showToast('Logged out from dashboard.', 'info');
  } finally {
    accessToken = null;
    clearInterval(sessionTimer);
    
    // Hide admin UI
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    
    switchView('auth');
    jwtRaw.textContent = 'No JWT available. Log in to retrieve a token.';
    jwtDecoded.textContent = JSON.stringify({ status: 'Logged Out' }, null, 2);
    setLoading(false);
  }
}

// Set visual identity linking status badges
function setLinkStatus(provider, linked) {
  const el = document.getElementById(`link-status-${provider}`);
  if (!el) return;
  
  if (linked) {
    el.className = 'status-indicator status-active';
    el.innerHTML = '<span class="status-dot"></span>Connected';
  } else {
    el.className = 'status-indicator status-inactive';
    el.innerHTML = '<span class="status-dot"></span>Disconnected';
  }
}

// Copy raw JWT token to clipboard
function copyRawToken() {
  if (!accessToken) {
    showToast('No token to copy.', 'error');
    return;
  }
  navigator.clipboard.writeText(accessToken).then(() => {
    showToast('Access token copied to clipboard!', 'success');
  }).catch(err => {
    showToast('Failed to copy token.', 'error');
  });
}

// --- Feedback Form Functions ---

// Initialize State dropdown list
function initLocationDropdowns() {
  if (!stateSelect) return;
  stateSelect.innerHTML = '<option value="">Select State</option>';
  indianStatesAndDistricts.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.state;
    opt.textContent = item.state;
    stateSelect.appendChild(opt);
  });

  // Populate generic Wards 1 to 50
  if (wardSelect) {
    wardSelect.innerHTML = '<option value="">Select Ward/Block</option>';
    for (let i = 1; i <= 50; i++) {
      const opt = document.createElement('option');
      opt.value = `Ward ${i}`;
      opt.textContent = `Ward ${i}`;
      wardSelect.appendChild(opt);
    }
  }
}

// Update districts dropdown based on selected State
function handleStateChange() {
  const selectedState = stateSelect.value;
  districtSelect.innerHTML = '<option value="">Select District</option>';
  
  if (!selectedState) return;

  const stateData = indianStatesAndDistricts.find(item => item.state === selectedState);
  if (stateData && stateData.districts) {
    stateData.districts.forEach(dist => {
      const opt = document.createElement('option');
      opt.value = dist;
      opt.textContent = dist;
      districtSelect.appendChild(opt);
    });
  }
}

// PIN Code lookup API integration
async function lookupPincode() {
  const pincode = pincodeInput.value.trim();
  if (!/^\d{6}$/.test(pincode)) {
    showToast('Please enter a valid 6-digit PIN code.', 'error');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();

    if (data && data[0] && data[0].Status === 'Success') {
      const postOffices = data[0].PostOffice;
      if (postOffices && postOffices.length > 0) {
        const sample = postOffices[0];
        
        // Match state name
        let matchedState = "";
        const found = indianStatesAndDistricts.find(s => 
          s.state.toLowerCase().replace(/[^a-z]/g, '') === sample.State.toLowerCase().replace(/[^a-z]/g, '')
        );
        if (found) {
          matchedState = found.state;
        } else {
          matchedState = sample.State;
        }

        // Set state and trigger change to populate districts
        stateSelect.value = matchedState;
        handleStateChange();

        // Match district name
        let matchedDistrict = "";
        const stateData = indianStatesAndDistricts.find(s => s.state === matchedState);
        if (stateData) {
          const dFound = stateData.districts.find(d => 
            d.toLowerCase().replace(/[^a-z]/g, '') === sample.District.toLowerCase().replace(/[^a-z]/g, '')
          );
          if (dFound) {
            matchedDistrict = dFound;
          }
        }
        
        if (!matchedDistrict) {
          matchedDistrict = sample.District;
          const opt = document.createElement('option');
          opt.value = matchedDistrict;
          opt.textContent = matchedDistrict;
          districtSelect.appendChild(opt);
        }
        
        districtSelect.value = matchedDistrict;

        // Populate Village select with Post Office names
        villageSelect.innerHTML = '<option value="">Select Village/Locality</option>';
        const uniqueNames = [...new Set(postOffices.map(po => po.Name))];
        uniqueNames.forEach(name => {
          const opt = document.createElement('option');
          opt.value = name;
          opt.textContent = name;
          villageSelect.appendChild(opt);
        });

        // Uncheck manual toggle and show select dropdown
        villageToggle.checked = false;
        villageSelect.style.display = 'block';
        villageText.style.display = 'none';

        showToast(`PIN Code mapped to ${sample.District}, ${sample.State}!`, 'success');
      }
    } else {
      showToast('No record found for this PIN code. Please enter manually.', 'error');
    }
  } catch (error) {
    console.error('PIN code lookup error:', error);
    showToast('Failed to fetch PIN code data. Please input details manually.', 'error');
  } finally {
    setLoading(false);
  }
}

// Geolocation detection and reverse lookup
function detectUserLocation() {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser.', 'error');
    return;
  }

  showToast('Requesting GPS location permissions...', 'info');
  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      try {
        showToast('Resolving coordinates to address details...', 'info');
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`);
        if (!response.ok) throw new Error('OSM Reverse Geocode API returned error status.');
        
        const data = await response.json();
        if (data && data.address) {
          const addr = data.address;
          
          // 1. Resolve State
          let resolvedState = addr.state || "";
          let matchedState = "";
          if (resolvedState) {
            const found = indianStatesAndDistricts.find(s => 
              s.state.toLowerCase().replace(/[^a-z]/g, '') === resolvedState.toLowerCase().replace(/[^a-z]/g, '')
            );
            if (found) {
              matchedState = found.state;
            } else {
              matchedState = resolvedState;
            }
            stateSelect.value = matchedState;
            handleStateChange();
          }

          // 2. Resolve District
          let resolvedDistrict = addr.state_district || addr.county || addr.district || addr.city || "";
          let matchedDistrict = "";
          if (resolvedDistrict && matchedState) {
            const stateData = indianStatesAndDistricts.find(s => s.state === matchedState);
            if (stateData) {
              const dFound = stateData.districts.find(d => 
                d.toLowerCase().replace(/[^a-z]/g, '') === resolvedDistrict.toLowerCase().replace(/[^a-z]/g, '')
              );
              if (dFound) {
                matchedDistrict = dFound;
              }
            }
          }
          if (resolvedDistrict && !matchedDistrict) {
            matchedDistrict = resolvedDistrict;
            const opt = document.createElement('option');
            opt.value = matchedDistrict;
            opt.textContent = matchedDistrict;
            districtSelect.appendChild(opt);
          }
          if (matchedDistrict) {
            districtSelect.value = matchedDistrict;
          }

          // 3. Resolve PIN Code
          if (addr.postcode) {
            pincodeInput.value = addr.postcode;
          }

          // 4. Resolve Village/Locality
          const villageName = addr.village || addr.suburb || addr.neighbourhood || addr.city_district || addr.town || addr.road || addr.hamlet || "";
          if (villageName) {
            villageToggle.checked = true;
            villageSelect.style.display = 'none';
            villageText.style.display = 'block';
            villageText.value = villageName;
            villageText.required = true;
            villageSelect.required = false;
          }

          // 5. Resolve Ward/Block
          const wardName = addr.suburb || addr.residential || addr.industrial || "";
          if (wardName) {
            wardToggle.checked = true;
            wardSelect.style.display = 'none';
            wardText.style.display = 'block';
            wardText.value = wardName;
            wardText.required = true;
            wardSelect.required = false;
          }

          showToast('Location resolved and filled successfully!', 'success');
        } else {
          showToast('Failed to resolve reverse coordinates data.', 'error');
        }
      } catch (error) {
        console.error('Reverse geocode error:', error);
        showToast('Could not convert coordinates to an address.', 'error');
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      setLoading(false);
      console.error('Geolocation error:', error);
      let errorMsg = 'Failed to retrieve your device location.';
      if (error.code === error.PERMISSION_DENIED) {
        errorMsg = 'Geolocation permission denied by user.';
      }
      showToast(errorMsg, 'error');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

// Media Recorder Audio Handling
async function startVoiceRecording() {
  audioChunks = [];
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    let options = { mimeType: 'audio/webm' };
    if (!MediaRecorder.isTypeSupported('audio/webm')) {
      options = { mimeType: 'audio/ogg' };
      if (!MediaRecorder.isTypeSupported('audio/ogg')) {
        options = {};
      }
    }

    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const mimeType = mediaRecorder.mimeType || 'audio/webm';
      const ext = mimeType.includes('ogg') ? 'ogg' : 'webm';
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      recordedVoiceFile = new File([audioBlob], `voice_message.${ext}`, { type: mimeType });

      const audioURL = URL.createObjectURL(audioBlob);
      voiceAudioElement.src = audioURL;
      voicePreviewContainer.style.display = 'flex';

      updateAttachmentsPreview();
    };

    mediaRecorder.start();
    voiceRecordStartTime = Date.now();
    btnRecordStart.disabled = true;
    btnRecordStop.disabled = false;
    recordingTimer.style.display = 'inline-block';
    
    clearInterval(voiceRecordTimerInterval);
    voiceRecordTimerInterval = setInterval(() => {
      const elapsedMs = Date.now() - voiceRecordStartTime;
      const totalSecs = Math.floor(elapsedMs / 1000);
      const mins = Math.floor(totalSecs / 60);
      const secs = totalSecs % 60;
      recordTimeDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

    showToast('Recording started...', 'info');
  } catch (err) {
    console.error('Microphone access denied or error:', err);
    showToast('Could not access microphone. Please check permissions.', 'error');
  }
}

function stopVoiceRecording() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
  
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach(track => track.stop());

  btnRecordStart.disabled = false;
  btnRecordStop.disabled = true;
  recordingTimer.style.display = 'none';
  clearInterval(voiceRecordTimerInterval);
  showToast('Recording stopped.', 'info');
}

function deleteVoiceRecording() {
  recordedVoiceFile = null;
  voiceAudioElement.src = '';
  voicePreviewContainer.style.display = 'none';
  updateAttachmentsPreview();
  showToast('Voice message removed.', 'info');
}

// Render attachments list
function updateAttachmentsPreview() {
  attachmentsPreview.innerHTML = '';

  const allFiles = [...selectedImages, ...selectedFiles];
  if (recordedVoiceFile) {
    allFiles.push(recordedVoiceFile);
  }

  if (allFiles.length === 0) {
    attachmentsPreview.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">No attachments added yet.</span>';
    return;
  }

  allFiles.forEach((file, idx) => {
    const isImage = file.type.startsWith('image/');
    const isVoice = file.name.startsWith('voice_message');
    const sizeKB = (file.size / 1024).toFixed(1);

    const item = document.createElement('div');
    item.className = 'attachment-item';

    let iconClass = 'fa-regular fa-file';
    let iconColor = 'var(--text-secondary)';
    if (isImage) {
      iconClass = 'fa-regular fa-image';
      iconColor = '#3b82f6';
    } else if (isVoice) {
      iconClass = 'fa-solid fa-microphone';
      iconColor = '#10b981';
    } else if (file.name.endsWith('.pdf')) {
      iconClass = 'fa-regular fa-file-pdf';
      iconColor = '#ef4444';
    }

    item.innerHTML = `
      <div class="attachment-details">
        <i class="${iconClass}" style="color: ${iconColor};"></i>
        <div style="display: flex; flex-direction: column; overflow: hidden;">
          <span class="attachment-name" title="${file.name}">${file.name}</span>
          <span class="attachment-size">${sizeKB} KB</span>
        </div>
      </div>
      <button type="button" class="btn-remove-attachment" data-index="${idx}" data-type="${isVoice ? 'voice' : (isImage ? 'image' : 'file')}">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    `;

    item.querySelector('.btn-remove-attachment').addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-type');
      if (type === 'voice') {
        deleteVoiceRecording();
      } else if (type === 'image') {
        const name = file.name;
        selectedImages = selectedImages.filter(f => f.name !== name);
        updateAttachmentsPreview();
      } else {
        const name = file.name;
        selectedFiles = selectedFiles.filter(f => f.name !== name);
        updateAttachmentsPreview();
      }
    });

    attachmentsPreview.appendChild(item);
  });
}

// Handle feedback submission
async function handleFeedbackSubmit(e) {
  e.preventDefault();

  if (!accessToken) {
    showToast('You must be logged in to submit feedback.', 'error');
    return;
  }

  const title = feedbackTitle.value.trim();
  const description = feedbackDesc.value.trim();
  const visibility = feedbackVisibility.value;

  const district = districtSelect.value;
  let village = "";
  let ward = "";

  if (villageToggle.checked) {
    village = villageText.value.trim();
  } else {
    village = villageSelect.value;
  }

  if (wardToggle.checked) {
    ward = wardText.value.trim();
  } else {
    ward = wardSelect.value;
  }

  if (!title || !description || !district || !village || !ward) {
    showToast('Please fill out all required fields including location.', 'error');
    return;
  }

  setLoading(true);
  
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('visibility', visibility);
    formData.append('district', district);
    formData.append('village', village);
    formData.append('ward', ward);

    selectedImages.forEach(file => {
      formData.append('attachments', file);
    });
    selectedFiles.forEach(file => {
      formData.append('attachments', file);
    });
    if (recordedVoiceFile) {
      formData.append('attachments', recordedVoiceFile);
    }

    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    if (response.ok) {
      showToast('Feedback submitted successfully!', 'success');
      feedbackForm.reset();
      
      selectedImages = [];
      selectedFiles = [];
      recordedVoiceFile = null;
      voiceAudioElement.src = '';
      voicePreviewContainer.style.display = 'none';
      
      districtSelect.innerHTML = '<option value="">Select District</option>';
      villageSelect.innerHTML = '<option value="">Select Village/Locality</option>';
      
      villageText.style.display = 'none';
      villageSelect.style.display = 'block';
      wardText.style.display = 'none';
      wardSelect.style.display = 'block';

      updateAttachmentsPreview();
      fetchLeaderboard();
    } else {
      const errorText = await response.text();
      showToast(errorText || 'Failed to submit feedback.', 'error');
    }
  } catch (error) {
    console.error('Feedback submission error:', error);
    showToast('Network error during feedback submission.', 'error');
  } finally {
    setLoading(false);
  }
}

// --- User Submissions & Comments Integration ---

async function fetchUserFeedbacks(page = 0) {
  if (!userFeedbacksList || !accessToken) return;
  currentUserFeedbacksPage = page;
  
  userFeedbacksList.innerHTML = '<span style="font-size: 0.9rem; color: var(--text-muted);">Loading your submissions...</span>';
  
  try {
    const response = await fetch(`/feedback/u?page=${page}&size=10`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      renderUserFeedbacks(data.content || []);
      
      const totalPages = data.totalPages || 1;
      if (userFeedbacksPagination) {
        if (totalPages > 1) {
          userFeedbacksPagination.style.display = 'flex';
          if (userPageInfo) userPageInfo.textContent = `Page ${page + 1} of ${totalPages}`;
          if (btnUserPrev) btnUserPrev.disabled = page === 0;
          if (btnUserNext) btnUserNext.disabled = page >= totalPages - 1;
        } else {
          userFeedbacksPagination.style.display = 'none';
        }
      }
    } else {
      userFeedbacksList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Failed to load submissions.</span>';
    }
  } catch (error) {
    console.error('Fetch user feedbacks error:', error);
    userFeedbacksList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Network error while fetching submissions.</span>';
  }
}

function renderUserFeedbacks(feedbacks) {
  if (!userFeedbacksList) return;
  userFeedbacksList.innerHTML = '';
  
  if (feedbacks.length === 0) {
    userFeedbacksList.innerHTML = '<span style="font-size: 0.9rem; color: var(--text-muted);">You have not submitted any feedback yet.</span>';
    return;
  }
  
  feedbacks.forEach(item => {
    const card = document.createElement('div');
    card.className = 'user-feedback-card';
    card.dataset.id = item.id;
    
    const title = item.title || 'Untitled';
    const category = item.category || 'OTHER';
    const status = (item.status || 'UNDER_REVIEW').replace(/_/g, ' ');
    const votes = item.upVote || 0;
    
    let statusColor = '#fbbf24';
    let statusBg = 'rgba(245, 158, 11, 0.1)';
    if (item.status === 'RESOLVED') {
      statusColor = '#10b981';
      statusBg = 'rgba(16, 185, 129, 0.1)';
    } else if (item.status === 'REJECTED') {
      statusColor = '#ef4444';
      statusBg = 'rgba(239, 68, 68, 0.1)';
    }
    
    card.innerHTML = `
      <div class="user-feedback-info">
        <span class="user-feedback-title" title="${title}">${title}</span>
        <div class="user-feedback-meta">
          <span class="user-feedback-status" style="color: ${statusColor}; background: ${statusBg}; border: 1px solid rgba(255,255,255,0.03);">${status}</span>
          <span>${category}</span>
          <span>•</span>
          <span><i class="fa-solid fa-thumbs-up" style="font-size: 0.75rem; margin-right: 0.2rem;"></i>${votes} votes</span>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.8rem;"></i>
    `;
    
    card.addEventListener('click', () => {
      lastSearchView = 'profile';
      openFeedbackDetail(item.id);
    });
    
    userFeedbacksList.appendChild(card);
  });
}

async function fetchComments(feedbackId, page = 0) {
  currentCommentsPage = page;
  
  try {
    const response = await fetch(`/comments?feedbackId=${feedbackId}&page=${page}&size=20`);
    if (response.ok) {
      const data = await response.json();
      const comments = data.content || [];
      const totalPages = data.totalPages || 1;
      
      const userComments = comments.filter(c => c.commentSection !== 'GOVERNMENT');
      const govComments = comments.filter(c => c.commentSection === 'GOVERNMENT');
      
      renderCommentsToList(userComments, userCommentsList, 'No citizen comments yet. Be the first to share your thoughts!');
      renderCommentsToList(govComments, govCommentsList, 'No government responses yet.');
      
      if (commentsPagination) {
        if (totalPages > 1) {
          commentsPagination.style.display = 'flex';
          if (commentsPageInfo) commentsPageInfo.textContent = `Page ${page + 1} of ${totalPages}`;
          if (btnCommentsPrev) btnCommentsPrev.disabled = page === 0;
          if (btnCommentsNext) btnCommentsNext.disabled = page >= totalPages - 1;
        } else {
          commentsPagination.style.display = 'none';
        }
      }
    } else {
      if (userCommentsList) userCommentsList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Failed to load comments.</span>';
    }
  } catch (error) {
    console.error('Fetch comments error:', error);
    if (userCommentsList) userCommentsList.innerHTML = '<span style="font-size: 0.9rem; color: #ef4444;">Network error while fetching comments.</span>';
  }
}

function createCommentCard(comment) {
  const item = document.createElement('div');
  item.className = 'comment-item';
  
  const author = comment.createdByUser || 'User';
  const text = comment.text || '';
  const firstLetter = author.substring(0, 1).toUpperCase();
  const isOwner = accessToken && loggedInUsername && author === loggedInUsername;
  const isGov = comment.commentSection === 'GOVERNMENT';
  
  let commentTimeStr = 'Just now';
  if (comment.createdAt) {
    try {
      const d = new Date(comment.createdAt);
      const diff = Math.floor((Date.now() - d.getTime()) / 60000);
      if (diff < 1) commentTimeStr = 'Just now';
      else if (diff < 60) commentTimeStr = `${diff}m ago`;
      else if (diff < 1440) commentTimeStr = `${Math.floor(diff / 60)}h ago`;
      else commentTimeStr = `${Math.floor(diff / 1440)}d ago`;
    } catch (_) {}
  } else if (comment.id) {
    const hash = comment.id.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const minutesAgo = (hash % 120) + 5;
    commentTimeStr = `${minutesAgo}m ago`;
  }
  
  const avatarBg = isGov ? 'rgba(251,191,36,0.12)' : '';
  const avatarColor = isGov ? '#fbbf24' : '';
  const authorSuffix = isGov ? ' <span style="font-size:0.7rem;background:rgba(251,191,36,0.12);color:#fbbf24;padding:0.1rem 0.4rem;border-radius:4px;font-weight:600;">OFFICIAL</span>' : '';
  
  item.innerHTML = `
    <div class="comment-avatar" ${avatarBg ? `style="background:${avatarBg};color:${avatarColor};"` : ''}>${firstLetter}</div>
    <div class="comment-content">
      <div class="comment-header">
        <span class="comment-author">${author}${authorSuffix}</span>
        <span class="comment-time">${commentTimeStr}</span>
        ${isOwner ? `<button class="btn-delete-comment" data-comment-id="${comment.id}" title="Delete your comment"><i class="fa-regular fa-trash-can"></i></button>` : ''}
      </div>
      <p class="comment-text">${escapeHtml(text)}</p>
    </div>
  `;

  if (isOwner) {
    const deleteBtn = item.querySelector('.btn-delete-comment');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteComment(comment.id);
      });
    }
  }
  return item;
}

function renderCommentsToList(comments, listEl, emptyMsg) {
  if (!listEl) return;
  listEl.innerHTML = '';
  if (comments.length === 0) {
    listEl.innerHTML = `<span style="font-size: 0.9rem; color: var(--text-muted);">${emptyMsg}</span>`;
    return;
  }
  comments.forEach(comment => listEl.appendChild(createCommentCard(comment)));
}

async function deleteComment(commentId) {
  if (!commentId || !accessToken) return;
  if (!confirm('Delete this comment?')) return;

  setLoading(true);
  try {
    const response = await fetch(`/comments?commentId=${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok || response.status === 204) {
      showToast('Comment deleted.', 'success');
      fetchComments(currentDetailFeedbackId, currentCommentsPage);
    } else {
      const errorText = await response.text();
      showToast(errorText || 'Failed to delete comment.', 'error');
    }
  } catch (error) {
    console.error('Delete comment error:', error);
    showToast('Network error while deleting comment.', 'error');
  } finally {
    setLoading(false);
  }
}

async function submitComment(e) {
  e.preventDefault();
  if (!accessToken) {
    showToast('You must be logged in to comment.', 'error');
    return;
  }
  const text = commentTextInput.value.trim();
  if (!text || !currentDetailFeedbackId) return;

  setLoading(true);
  try {
    const params = new URLSearchParams();
    params.append('feedbackId', currentDetailFeedbackId);
    params.append('text', text);

    const response = await fetch('/comments/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (response.ok || response.status === 202 || response.status === 201) {
      showToast('Comment added successfully!', 'success');
      commentTextInput.value = '';
      fetchComments(currentDetailFeedbackId, 0);
    } else {
      const errorText = await response.text();
      showToast(errorText || 'Failed to add comment.', 'error');
    }
  } catch (error) {
    console.error('Submit comment error:', error);
    showToast('Network error while adding comment.', 'error');
  } finally {
    setLoading(false);
  }
}

async function submitGovComment(e) {
  e.preventDefault();
  if (!accessToken) {
    showToast('You must be logged in as admin to respond.', 'error');
    return;
  }
  const text = govCommentTextInput.value.trim();
  if (!text || !currentDetailFeedbackId) return;

  setLoading(true);
  try {
    const params = new URLSearchParams();
    params.append('feedbackId', currentDetailFeedbackId);
    params.append('text', text);

    const response = await fetch('/comments/gov/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (response.ok || response.status === 202 || response.status === 201) {
      showToast('Government response posted!', 'success');
      govCommentTextInput.value = '';
      fetchComments(currentDetailFeedbackId, 0);
    } else {
      const errorText = await response.text();
      showToast(errorText || 'Failed to post government response.', 'error');
    }
  } catch (error) {
    console.error('Submit gov comment error:', error);
    showToast('Network error while posting response.', 'error');
  } finally {
    setLoading(false);
  }
}

// --- Event Listeners ---

// Form toggle handlers
linkToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginState.style.display = 'none';
  registerState.style.display = 'block';
});

linkToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerState.style.display = 'none';
  loginState.style.display = 'block';
});

// Form submission events
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegistration);
changePasswordForm.addEventListener('submit', handleChangePassword);
feedbackForm.addEventListener('submit', handleFeedbackSubmit);

// Buttons click events
btnGoogleLogin.addEventListener('click', initiateGoogleOauth);
btnLinkOauth.addEventListener('click', initiateGoogleOauth);
btnRefreshToken.addEventListener('click', () => refreshAccessToken(false));
btnHeaderLogout.addEventListener('click', handleLogout);
btnDashboardLogout.addEventListener('click', handleLogout);
btnCopyToken.addEventListener('click', copyRawToken);
if (btnRefreshLeaderboard) btnRefreshLeaderboard.addEventListener('click', fetchLeaderboard);
if (headerProfileTrigger) {
  headerProfileTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('profile');
  });
}

// Sidebar links click handlers
if (sidebarLinks) {
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      switchView(view);
    });
  });
}

// Comments submit handlers
if (commentSubmitForm) {
  commentSubmitForm.addEventListener('submit', submitComment);
}
if (govCommentSubmitForm) {
  govCommentSubmitForm.addEventListener('submit', submitGovComment);
}

// User feedback pagination handlers
if (btnUserPrev) {
  btnUserPrev.addEventListener('click', () => {
    if (currentUserFeedbacksPage > 0) {
      fetchUserFeedbacks(currentUserFeedbacksPage - 1);
    }
  });
}
if (btnUserNext) {
  btnUserNext.addEventListener('click', () => {
    fetchUserFeedbacks(currentUserFeedbacksPage + 1);
  });
}

// Comment pagination handlers
if (btnCommentsPrev) {
  btnCommentsPrev.addEventListener('click', () => {
    if (currentCommentsPage > 0 && currentDetailFeedbackId) {
      fetchComments(currentDetailFeedbackId, currentCommentsPage - 1);
    }
  });
}
if (btnCommentsNext) {
  btnCommentsNext.addEventListener('click', () => {
    if (currentDetailFeedbackId) {
      fetchComments(currentDetailFeedbackId, currentCommentsPage + 1);
    }
  });
}

if (btnDetailBack) btnDetailBack.addEventListener('click', () => {
  // Go back to wherever we came from
  if (lastSearchView === 'search-results' || lastSearchView === 'search') {
    switchView('search');
  } else if (lastSearchView === 'profile') {
    switchView('profile');
  } else {
    switchView('dashboard');
  }
});
if (btnDetailUpvote) btnDetailUpvote.addEventListener('click', () => {
  if (currentDetailFeedbackId && detailVotes) upvoteFeedback(currentDetailFeedbackId, detailVotes);
});

// Search event listeners
if (btnSearchBack) btnSearchBack.addEventListener('click', () => switchView('dashboard'));
if (btnSearchPrev) btnSearchPrev.addEventListener('click', () => {
  if (currentSearchPage > 0) {
    currentSearchPage--;
    executeFullSearch(currentSearchQuery, currentSearchPage);
  }
});
if (btnSearchNext) btnSearchNext.addEventListener('click', () => {
  currentSearchPage++;
  executeFullSearch(currentSearchQuery, currentSearchPage);
});

// Feedback location listeners
if (stateSelect) stateSelect.addEventListener('change', handleStateChange);
if (btnPincodeLookup) btnPincodeLookup.addEventListener('click', lookupPincode);
if (btnDetectLocation) btnDetectLocation.addEventListener('click', detectUserLocation);
if (pincodeInput) {
  pincodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      lookupPincode();
    }
  });
}

if (villageToggle) {
  villageToggle.addEventListener('change', () => {
    if (villageToggle.checked) {
      villageSelect.style.display = 'none';
      villageText.style.display = 'block';
      villageText.required = true;
      villageSelect.required = false;
    } else {
      villageSelect.style.display = 'block';
      villageText.style.display = 'none';
      villageText.required = false;
      villageSelect.required = true;
    }
  });
}

if (wardToggle) {
  wardToggle.addEventListener('change', () => {
    if (wardToggle.checked) {
      wardSelect.style.display = 'none';
      wardText.style.display = 'block';
      wardText.required = true;
      wardSelect.required = false;
    } else {
      wardSelect.style.display = 'block';
      wardText.style.display = 'none';
      wardText.required = false;
      wardSelect.required = true;
    }
  });
}

// Attachment listeners
if (imagesInput) {
  imagesInput.addEventListener('change', () => {
    if (imagesInput.files) {
      for (let i = 0; i < imagesInput.files.length; i++) {
        const file = imagesInput.files[i];
        if (!selectedImages.some(f => f.name === file.name)) {
          selectedImages.push(file);
        }
      }
      updateAttachmentsPreview();
    }
  });
}

if (filesInput) {
  filesInput.addEventListener('change', () => {
    if (filesInput.files) {
      for (let i = 0; i < filesInput.files.length; i++) {
        const file = filesInput.files[i];
        if (!selectedFiles.some(f => f.name === file.name)) {
          selectedFiles.push(file);
        }
      }
      updateAttachmentsPreview();
    }
  });
}

// Voice recording buttons
if (btnRecordStart) btnRecordStart.addEventListener('click', startVoiceRecording);
if (btnRecordStop) btnRecordStop.addEventListener('click', stopVoiceRecording);
if (btnVoiceDelete) btnVoiceDelete.addEventListener('click', deleteVoiceRecording);

// Mini-leaderboard refresh button
if (btnRefreshMiniLeaderboard) {
  btnRefreshMiniLeaderboard.addEventListener('click', fetchMiniLeaderboard);
}

// Developer JWT Tools collapsible toggle
const devToolsToggle = document.getElementById('developer-tools-toggle');
const devToolsContent = document.getElementById('developer-tools-content');
const devToolsChevron = document.getElementById('dev-tools-chevron');
if (devToolsToggle && devToolsContent) {
  devToolsToggle.addEventListener('click', () => {
    const isOpen = devToolsContent.style.display === 'flex';
    devToolsContent.style.display = isOpen ? 'none' : 'flex';
    if (devToolsChevron) {
      devToolsChevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    }
  });
}

// "View All" link on Dashboard -> Profile
const linkDashboardViewProfile = document.getElementById('link-dashboard-view-profile');
if (linkDashboardViewProfile) {
  linkDashboardViewProfile.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('profile');
  });
}

// --- Initialization ---

// Check if a session already exists on load
window.addEventListener('DOMContentLoaded', () => {
  refreshAccessToken(true);
  initLocationDropdowns();
  initSearch();
  initNavbarSearch();
  initAdminSearch();
  initMessageCenter();
  if (typeof initGoogleTranslate === 'function') initGoogleTranslate();
});

// --- SEARCH FUNCTIONALITY ---

function initSearch() {
  if (!searchInput) return;

  // Debounced input handler for autocomplete suggestions
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    clearTimeout(searchDebounceTimer);
    
    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    // Show loading state
    showSuggestionsLoading();

    searchDebounceTimer = setTimeout(() => {
      fetchSearchSuggestions(query);
    }, 300);
  });

  // Enter key triggers full search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query.length >= 2) {
        hideSuggestions();
        currentSearchQuery = query;
        currentSearchPage = 0;
        lastSearchView = 'dashboard';
        executeFullSearch(query, 0);
      }
    }

    // Escape key closes suggestions
    if (e.key === 'Escape') {
      hideSuggestions();
      searchInput.blur();
    }

    // Arrow key navigation in suggestions
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigateSuggestions(e.key === 'ArrowDown' ? 1 : -1);
    }
  });

  // Close suggestions on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      hideSuggestions();
    }
  });

  // Focus handler - show suggestions if there are results
  searchInput.addEventListener('focus', () => {
    const query = searchInput.value.trim();
    if (query.length >= 2 && searchSuggestions.children.length > 0) {
      searchSuggestions.classList.add('active');
    }
  });

  // Add scroll listener for sticky header effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header') || document.querySelector('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  });
}

// ===== NAVBAR GLOBAL QUICK SEARCH =====

function initNavbarSearch() {
  if (!navbarSearchInput) return;

  let navbarDebounceTimer = null;

  navbarSearchInput.addEventListener('input', () => {
    const query = navbarSearchInput.value.trim();
    clearTimeout(navbarDebounceTimer);
    if (query.length < 2) {
      if (navbarSearchSuggestions) navbarSearchSuggestions.classList.remove('active');
      return;
    }
    navbarDebounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/feedback/title?title=${encodeURIComponent(query)}&size=5&sort=upVote,desc`);
        if (response.ok) {
          const data = await response.json();
          renderNavbarSuggestions(query, data.content || []);
        }
      } catch (e) { /* silent */ }
    }, 300);
  });

  navbarSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = navbarSearchInput.value.trim();
      if (query.length >= 2) {
        if (navbarSearchSuggestions) navbarSearchSuggestions.classList.remove('active');
        currentSearchQuery = query;
        currentSearchPage = 0;
        lastSearchView = 'dashboard';
        executeFullSearch(query, 0);
        navbarSearchInput.value = '';
      }
    }
    if (e.key === 'Escape') {
      if (navbarSearchSuggestions) navbarSearchSuggestions.classList.remove('active');
      navbarSearchInput.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (navbarSearchSuggestions && !e.target.closest('#global-search-input') && !e.target.closest('#global-search-suggestions')) {
      navbarSearchSuggestions.classList.remove('active');
    }
  });

  const globalSearchBtn = document.getElementById('global-search-btn');
  if (globalSearchBtn) {
    globalSearchBtn.addEventListener('click', () => {
      const query = navbarSearchInput.value.trim();
      if (query.length >= 2) {
        if (navbarSearchSuggestions) navbarSearchSuggestions.classList.remove('active');
        currentSearchQuery = query;
        currentSearchPage = 0;
        lastSearchView = 'dashboard';
        executeFullSearch(query, 0);
        navbarSearchInput.value = '';
      }
    });
  }
}

function renderNavbarSuggestions(query, results) {
  if (!navbarSearchSuggestions) return;
  navbarSearchSuggestions.innerHTML = '';
  if (results.length === 0) {
    navbarSearchSuggestions.classList.remove('active');
    return;
  }
  results.slice(0, 5).forEach(item => {
    const el = document.createElement('div');
    el.className = 'search-suggestion-item';
    el.innerHTML = `
      <div class="suggestion-icon"><i class="fa-solid fa-file-lines"></i></div>
      <div class="suggestion-text">
        <span class="suggestion-title">${escapeHtml(item.title || 'Untitled')}</span>
        <div class="suggestion-meta"><span>${item.category || 'OTHER'}</span><span>•</span><span><i class="fa-solid fa-thumbs-up" style="font-size:0.65rem;"></i> ${item.upVote || 0}</span></div>
      </div>
      <i class="fa-solid fa-arrow-right suggestion-arrow"></i>`;
    el.addEventListener('click', () => {
      navbarSearchSuggestions.classList.remove('active');
      navbarSearchInput.value = '';
      openFeedbackDetail(item.id);
    });
    navbarSearchSuggestions.appendChild(el);
  });
  // "See all" footer
  const footer = document.createElement('div');
  footer.className = 'search-suggestions-footer';
  footer.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="font-size:0.7rem;"></i> See all results for "${escapeHtml(query)}"`;
  footer.addEventListener('click', () => {
    navbarSearchSuggestions.classList.remove('active');
    currentSearchQuery = query;
    currentSearchPage = 0;
    executeFullSearch(query, 0);
    navbarSearchInput.value = '';
  });
  navbarSearchSuggestions.appendChild(footer);
  navbarSearchSuggestions.classList.add('active');
}

// Fetch autocomplete suggestions (top 3-5 titles)
async function fetchSearchSuggestions(query) {
  try {
    const response = await fetch(`/feedback/title?title=${encodeURIComponent(query)}&size=5&sort=upVote,desc`);
    
    if (response.ok) {
      const data = await response.json();
      renderSuggestions(query, data.content || []);
    } else {
      hideSuggestions();
    }
  } catch (error) {
    console.error('Search suggestions error:', error);
    hideSuggestions();
  }
}

// Render autocomplete suggestion items
function renderSuggestions(query, results) {
  if (!searchSuggestions) return;
  searchSuggestions.innerHTML = '';

  if (results.length === 0) {
    searchSuggestions.innerHTML = `
      <div class="search-suggestion-loading" style="flex-direction: column; gap: 0.25rem;">
        <i class="fa-regular fa-face-meh" style="font-size: 1.25rem; color: #cbd5e1;"></i>
        <span>No results for "${escapeHtml(query)}"</span>
      </div>
    `;
    searchSuggestions.classList.add('active');
    return;
  }

  // Header
  const header = document.createElement('div');
  header.className = 'search-suggestions-header';
  header.innerHTML = `<i class="fa-solid fa-bolt" style="font-size: 0.65rem;"></i> Quick Results`;
  searchSuggestions.appendChild(header);

  // Items (max 5)
  results.slice(0, 5).forEach(item => {
    const el = document.createElement('div');
    el.className = 'search-suggestion-item';
    el.dataset.id = item.id;

    const highlightedTitle = highlightMatch(item.title || 'Untitled', query);
    const category = item.category || 'OTHER';
    const votes = item.upVote || 0;

    el.innerHTML = `
      <div class="suggestion-icon">
        <i class="fa-solid fa-file-lines"></i>
      </div>
      <div class="suggestion-text">
        <span class="suggestion-title">${highlightedTitle}</span>
        <div class="suggestion-meta">
          <span>${category}</span>
          <span>•</span>
          <span><i class="fa-solid fa-thumbs-up" style="font-size: 0.65rem;"></i> ${votes}</span>
        </div>
      </div>
      <i class="fa-solid fa-arrow-right suggestion-arrow"></i>
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      hideSuggestions();
      searchInput.value = item.title;
      lastSearchView = 'dashboard';
      openFeedbackDetail(item.id);
    });

    searchSuggestions.appendChild(el);
  });

  // Footer - "See all results" link
  const footer = document.createElement('div');
  footer.className = 'search-suggestions-footer';
  footer.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="font-size: 0.7rem;"></i> See all results for "${escapeHtml(query)}"`;
  footer.addEventListener('click', () => {
    hideSuggestions();
    currentSearchQuery = query;
    currentSearchPage = 0;
    lastSearchView = 'dashboard';
    executeFullSearch(query, 0);
  });
  searchSuggestions.appendChild(footer);

  searchSuggestions.classList.add('active');
}

// Show loading state in suggestions
function showSuggestionsLoading() {
  if (!searchSuggestions) return;
  searchSuggestions.innerHTML = `
    <div class="search-suggestion-loading">
      <div class="mini-spinner"></div>
      <span>Searching...</span>
    </div>
  `;
  searchSuggestions.classList.add('active');
}

// Hide suggestions dropdown
function hideSuggestions() {
  if (searchSuggestions) {
    searchSuggestions.classList.remove('active');
  }
}

// Keyboard navigation in suggestions
function navigateSuggestions(direction) {
  if (!searchSuggestions) return;
  const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
  if (items.length === 0) return;

  const currentActive = searchSuggestions.querySelector('.search-suggestion-item.active');
  let currentIndex = -1;

  if (currentActive) {
    currentActive.classList.remove('active');
    currentIndex = Array.from(items).indexOf(currentActive);
  }

  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = items.length - 1;
  if (newIndex >= items.length) newIndex = 0;

  items[newIndex].classList.add('active');

  // If Enter is pressed while an item is active, open it
  // We handle this by updating input value
  const activeTitle = items[newIndex].querySelector('.suggestion-title');
  if (activeTitle) {
    searchInput.value = activeTitle.textContent;
  }
}

// Execute full search (shown in search results view)
async function executeFullSearch(query, page = 0) {
  if (!searchResultsList) return;
  
  setLoading(true);
  
  try {
    const response = await fetch(`/feedback/title?title=${encodeURIComponent(query)}&page=${page}&size=8&sort=upVote,desc`);
    
    if (response.ok) {
      const data = await response.json();
      const results = data.content || [];
      const totalPages = data.totalPages || 1;
      const totalElements = data.totalElements || 0;

      // Update query display
      if (searchResultsQuery) {
        searchResultsQuery.textContent = `Showing ${totalElements} result${totalElements !== 1 ? 's' : ''} for "${query}"`;
      }

      // Render results
      renderSearchResults(query, results);

      // Update pagination
      if (searchResultsPagination) {
        if (totalPages > 1) {
          searchResultsPagination.style.display = 'flex';
          if (searchPageInfo) searchPageInfo.textContent = `Page ${page + 1} of ${totalPages}`;
          if (btnSearchPrev) btnSearchPrev.disabled = page === 0;
          if (btnSearchNext) btnSearchNext.disabled = page >= totalPages - 1;
        } else {
          searchResultsPagination.style.display = 'none';
        }
      }

      if (searchResultsWrapper) {
        searchResultsWrapper.style.display = 'block';
      }
      switchView('search');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Failed to search. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Full search error:', error);
    showToast('Network error while searching.', 'error');
  } finally {
    setLoading(false);
  }
}

// Render search result cards
function renderSearchResults(query, results) {
  if (!searchResultsList) return;
  searchResultsList.innerHTML = '';

  if (results.length === 0) {
    searchResultsList.innerHTML = `
      <div class="search-empty-state">
        <div class="empty-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3>No Results Found</h3>
        <p>We couldn't find any grievances matching "${escapeHtml(query)}". Try a different search term.</p>
      </div>
    `;
    return;
  }

  results.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    card.dataset.id = item.id;

    const title = item.title || 'Untitled';
    const description = item.description || 'No description available.';
    const truncatedDesc = description.length > 140 ? description.substring(0, 140) + '...' : description;
    const category = item.category || 'OTHER';
    const status = (item.status || 'UNDER_REVIEW').replace(/_/g, ' ');
    const district = item.district || '';
    const votes = item.upVote || 0;

    const highlightedTitle = highlightMatch(title, query);

    card.innerHTML = `
      <div class="result-rank-icon">
        <i class="fa-solid fa-file-lines"></i>
      </div>
      <div class="result-body">
        <div class="result-title">${highlightedTitle}</div>
        <div class="result-description">${escapeHtml(truncatedDesc)}</div>
        <div class="result-tags">
          <span class="result-tag result-tag-category">${category}</span>
          <span class="result-tag result-tag-status">${status}</span>
          ${district ? `<span class="result-tag result-tag-location"><i class="fa-solid fa-location-dot" style="font-size: 0.65rem; margin-right: 0.2rem;"></i>${district}</span>` : ''}
        </div>
      </div>
      <div class="result-votes">
        <span class="vote-number">${votes}</span>
        <span class="vote-label">Votes</span>
      </div>
    `;

    card.addEventListener('click', () => {
      lastSearchView = 'search-results';
      openFeedbackDetail(item.id);
    });

    searchResultsList.appendChild(card);
  });
}

// Highlight matching text in a string
function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const escapedQuery = escapeHtml(query);
  const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<span class="search-highlight">$1</span>');
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ===== ADMIN FEATURES =====

let currentAdminPage = 0;

async function fetchAdminFeedbacks(page = 0) {
  if (!adminFeedbackList || !accessToken) return;
  adminFeedbackList.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Loading feedbacks...</span>';
  
  try {
    const response = await fetch(`/feedback/Allfeedback?page=${page}&size=10&sort=createdAt,desc`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      const items = data.content || [];
      adminFeedbackList.innerHTML = '';
      
      if (items.length === 0) {
        adminFeedbackList.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">No feedbacks found.</span>';
      } else {
        items.forEach(item => {
          const status = (item.status || 'UNDER_REVIEW').replace(/_/g, ' ').toUpperCase();
          let statusColor = '#f59e0b';
          let statusBg = 'rgba(245, 158, 11, 0.1)';
          if (status === 'RESOLVED') { statusColor = '#10b981'; statusBg = 'rgba(16, 185, 129, 0.1)'; }
          else if (status === 'REJECTED') { statusColor = '#ef4444'; statusBg = 'rgba(239, 68, 68, 0.1)'; }
          
          const el = document.createElement('div');
          el.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:1rem;border:1px solid var(--card-border);border-radius:10px;background:rgba(255,255,255,0.02);gap:1rem;flex-wrap:wrap;';
          
          el.innerHTML = `
            <div style="flex:1;min-width:250px;cursor:pointer;" onclick="openFeedbackDetail('${item.id}')">
              <div style="font-weight:700;color:var(--text-primary);font-size:1rem;margin-bottom:0.25rem;">${item.title || 'Untitled'}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">
                <span style="color:#6366f1;font-weight:600;">${item.category || 'OTHER'}</span> &bull; 
                <span style="color:#a855f7;"><i class="fa-solid fa-arrow-up"></i> ${item.upVote || 0}</span>
              </div>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center;">
              <span style="padding:0.35rem 0.75rem;border-radius:6px;font-size:0.75rem;font-weight:700;color:${statusColor};background:${statusBg};border:1px solid ${statusBg};white-space:nowrap;">${status}</span>
              <select class="form-input admin-list-status-select" data-id="${item.id}" style="padding:0.35rem;border-radius:6px;font-size:0.8rem;border:1px solid var(--card-border);background:var(--card-bg);color:var(--text-primary);cursor:pointer;">
                <option value="UNDER_REVIEW" ${item.status === 'UNDER_REVIEW' ? 'selected' : ''}>Under Review</option>
                <option value="RESOLVED" ${item.status === 'RESOLVED' ? 'selected' : ''}>Resolved</option>
                <option value="REJECTED" ${item.status === 'REJECTED' ? 'selected' : ''}>Rejected</option>
              </select>
            </div>
          `;
          adminFeedbackList.appendChild(el);
        });
        
        // Setup dropdown listeners
        document.querySelectorAll('.admin-list-status-select').forEach(select => {
          select.addEventListener('change', (e) => {
            updateFeedbackStatus(e.target.dataset.id, e.target.value);
          });
        });
      }
      
      // Update pagination
      const paginationEl = document.getElementById('admin-feedback-pagination');
      if (paginationEl) {
        paginationEl.style.display = 'flex';
        document.getElementById('admin-page-info').textContent = `Page ${data.pageable?.pageNumber + 1 || 1} of ${data.totalPages || 1}`;
        currentAdminPage = data.pageable?.pageNumber || 0;
        
        const btnPrev = document.getElementById('btn-admin-prev');
        const btnNext = document.getElementById('btn-admin-next');
        btnPrev.onclick = () => { if (!data.first) fetchAdminFeedbacks(currentAdminPage - 1); };
        btnNext.onclick = () => { if (!data.last) fetchAdminFeedbacks(currentAdminPage + 1); };
        btnPrev.disabled = data.first;
        btnNext.disabled = data.last;
      }
    } else {
      adminFeedbackList.innerHTML = '<span style="color:#ef4444;font-size:0.85rem;">Failed to load feedbacks.</span>';
    }
  } catch (err) {
    adminFeedbackList.innerHTML = '<span style="color:#ef4444;font-size:0.85rem;">Network error fetching feedbacks.</span>';
  }
}

async function updateFeedbackStatus(id, newStatus) {
  if (!id || !newStatus || !accessToken) return;
  setLoading(true);
  try {
    const response = await fetch('/feedback/change', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      // Using a wrapper object structure which Spring parses if correctly configured
      body: JSON.stringify({ id: id, status: newStatus })
    });
    
    if (response.ok) {
      showToast('Status updated successfully.', 'success');
      // Refresh context based on current view
      if (adminDashboardSection && adminDashboardSection.classList.contains('active')) {
        fetchAdminFeedbacks(currentAdminPage);
      }
      if (feedbackDetailSection && feedbackDetailSection.classList.contains('active') && id === currentDetailFeedbackId) {
        openFeedbackDetail(id);
      }
    } else {
      showToast('Failed to update status.', 'error');
    }
  } catch (err) {
    showToast('Network error while updating status.', 'error');
  } finally {
    setLoading(false);
  }
}

if (adminStatusSelect) {
  adminStatusSelect.addEventListener('change', (e) => {
    updateFeedbackStatus(e.target.dataset.feedbackId, e.target.value);
  });
}

if (btnAdminRefresh) {
  btnAdminRefresh.addEventListener('click', () => fetchAdminFeedbacks(0));
}

if (adminCreateForm) {
  adminCreateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!accessToken) return;
    
    const username = document.getElementById('admin-create-username').value.trim();
    const password = document.getElementById('admin-create-password').value;
    
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/admin/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok || response.status === 201) {
        showToast(`Admin account '${username}' created successfully.`, 'success');
        adminCreateForm.reset();
        fetchAdmins(0, '');
      } else {
        const errData = await response.json().catch(() => ({}));
        showToast(errData.message || 'Failed to create admin. Username may be taken.', 'error');
      }
    } catch (err) {
      showToast('Network error creating admin.', 'error');
    } finally {
      setLoading(false);
    }
  });
}

let currentAdminsPage = 0;
let currentAdminsSearchQuery = '';

async function fetchAdmins(page = 0, query = '') {
  const adminUsersList = document.getElementById('admin-users-list');
  const adminUsersPagination = document.getElementById('admin-users-pagination');
  const adminUsersPageInfo = document.getElementById('admin-users-page-info');
  const btnAdminUsersPrev = document.getElementById('btn-admin-users-prev');
  const btnAdminUsersNext = document.getElementById('btn-admin-users-next');
  
  if (!adminUsersList || !accessToken) return;
  adminUsersList.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Loading admin directory...</span>';
  
  try {
    const url = `/admin/all?username=${encodeURIComponent(query)}&page=${page}&size=10`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      const items = data.content || [];
      const totalPages = data.totalPages || 1;
      
      adminUsersList.innerHTML = '';
      currentAdminsPage = page;
      currentAdminsSearchQuery = query;
      
      if (items.length === 0) {
        adminUsersList.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">No admin accounts found.</span>';
        if (adminUsersPagination) adminUsersPagination.style.display = 'none';
      } else {
        items.forEach(admin => {
          const el = document.createElement('div');
          el.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;border:1px solid var(--card-border);border-radius:10px;background:rgba(255,255,255,0.01);';
          el.innerHTML = `
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(99,102,241,0.1);color:#6366f1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">
                ${(admin.username || 'A').substring(0, 1).toUpperCase()}
              </div>
              <div style="font-weight:600;color:var(--text-primary);font-size:0.9rem;">${admin.username || 'Unknown'}</div>
            </div>
            <button class="btn btn-secondary btn-delete-admin" data-id="${admin.id}" data-username="${admin.username}" style="width:auto;padding:0.35rem 0.6rem;font-size:0.75rem;background:rgba(239, 68, 68, 0.08);color:#ef4444;border:1px solid rgba(239, 68, 68, 0.15);margin:0;display:flex;align-items:center;gap:0.25rem;">
              <i class="fa-regular fa-trash-can"></i> Delete
            </button>
          `;
          adminUsersList.appendChild(el);
        });
        
        // Setup delete button click listeners
        adminUsersList.querySelectorAll('.btn-delete-admin').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const adminId = btn.getAttribute('data-id');
            const adminUsername = btn.getAttribute('data-username');
            deleteAdmin(adminId, adminUsername);
          });
        });
        
        // Setup pagination
        if (adminUsersPagination) {
          if (totalPages > 1) {
            adminUsersPagination.style.display = 'flex';
            if (adminUsersPageInfo) adminUsersPageInfo.textContent = `Page ${page + 1} of ${totalPages}`;
            
            btnAdminUsersPrev.onclick = () => { if (page > 0) fetchAdmins(page - 1, query); };
            btnAdminUsersNext.onclick = () => { if (page < totalPages - 1) fetchAdmins(page + 1, query); };
            btnAdminUsersPrev.disabled = page === 0;
            btnAdminUsersNext.disabled = page >= totalPages - 1;
          } else {
            adminUsersPagination.style.display = 'none';
          }
        }
      }
    } else {
      adminUsersList.innerHTML = '<span style="color:#ef4444;font-size:0.85rem;">Failed to load admin directory.</span>';
    }
  } catch (err) {
    adminUsersList.innerHTML = '<span style="color:#ef4444;font-size:0.85rem;">Network error fetching admin directory.</span>';
  }
}

async function deleteAdmin(id, username) {
  if (!id || !accessToken) return;
  
  const confirmDelete = confirm(`Are you sure you want to delete admin account '${username}'?`);
  if (!confirmDelete) return;
  
  setLoading(true);
  try {
    const response = await fetch(`/admin/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (response.ok) {
      showToast(`Admin account '${username}' deleted successfully.`, 'success');
      // Refresh list
      fetchAdmins(currentAdminsPage, currentAdminsSearchQuery);
    } else {
      let errorMessage = 'Failed to delete admin account.';
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonErr) {
        try {
          const textError = await response.text();
          if (textError) errorMessage = textError;
        } catch (txtErr) { /* ignore */ }
      }
      showToast(errorMessage, 'error');
    }
  } catch (err) {
    showToast('Network error while deleting admin account.', 'error');
  } finally {
    setLoading(false);
  }
}

function initAdminSearch() {
  const adminSearchInput = document.getElementById('admin-search-input');
  const btnAdminSearch = document.getElementById('btn-admin-search');
  
  if (!adminSearchInput) return;
  
  adminSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = adminSearchInput.value.trim();
      fetchAdmins(0, query);
    }
  });
  
  if (btnAdminSearch) {
    btnAdminSearch.addEventListener('click', () => {
      const query = adminSearchInput.value.trim();
      fetchAdmins(0, query);
    });
  }
}

// --- MESSAGE CENTER ---

let currentMessagesPage = 0;
let totalUnreadMessages = 0;

async function checkUnreadMessages() {
  if (!accessToken) return;
  try {
    const response = await fetch('/messages/all?page=0&size=100&sort=createdAt,desc', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (response.ok) {
      const data = await response.json();
      const messages = data.content || [];
      totalUnreadMessages = messages.filter(m => m.seen === false || m.seen === null || m.seen === undefined).length;
      updateUnreadBadge();
    }
  } catch (e) { /* silent */ }
}

function updateUnreadBadge() {
  const badge = document.getElementById('message-unread-badge');
  if (!badge) return;
  if (totalUnreadMessages > 0) {
    badge.style.display = 'flex';
    badge.textContent = totalUnreadMessages > 99 ? '99+' : totalUnreadMessages;
  } else {
    badge.style.display = 'none';
  }
}

function toggleMessagesDrawer(show) {
  const panel = document.getElementById('messages-panel');
  const backdrop = document.getElementById('messages-panel-backdrop');
  if (!panel) return;
  if (show) {
    panel.classList.add('msg-panel--open');
    if (backdrop) backdrop.style.display = 'block';
    // Always return to list view when opening
    const listView = document.getElementById('msg-list-view');
    const detailView = document.getElementById('msg-detail-view');
    if (listView) listView.style.display = 'flex';
    if (detailView) detailView.style.display = 'none';
    fetchMessages(0);
  } else {
    panel.classList.remove('msg-panel--open');
    if (backdrop) backdrop.style.display = 'none';
  }
}

async function fetchMessages(page = 0) {
  const messagesList = document.getElementById('messages-list');
  const messagesPagination = document.getElementById('messages-pagination');
  if (!messagesList || !accessToken) return;
  
  currentMessagesPage = page;
  messagesList.innerHTML = [1,2,3].map(() => `<div class="msg-item msg-skeleton"><div class="msg-skeleton-line" style="width:60%;height:12px;margin-bottom:6px;border-radius:4px;"></div><div class="msg-skeleton-line" style="width:90%;height:10px;border-radius:4px;"></div></div>`).join('');
  
  try {
    const response = await fetch(`/messages/all?page=${page}&size=15&sort=createdAt,desc`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      const messages = data.content || [];
      const totalPages = data.totalPages || 1;
      
      messagesList.innerHTML = '';
      
      if (messages.length === 0) {
        messagesList.innerHTML = '<div style="text-align:center;padding:2rem 0;"><i class="fa-regular fa-envelope-open" style="font-size:2rem;color:var(--text-muted);margin-bottom:0.75rem;display:block;"></i><span style="font-size:0.9rem;color:var(--text-muted);">No messages yet.</span></div>';
      } else {
        messages.forEach(msg => {
          const isUnread = msg.seen === false || msg.seen === null || msg.seen === undefined;
          const el = document.createElement('div');
          el.className = `msg-item${isUnread ? ' msg-item--unread' : ''}`;

          let dateStr = '';
          if (msg.createdAt) {
            try {
              const d = new Date(msg.createdAt);
              dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            } catch(_) {}
          }

          el.innerHTML = `
            <div class="msg-item-row">
              <div class="msg-item-left">
                ${isUnread ? '<span class="msg-unread-dot"></span>' : ''}
                <div class="msg-item-info">
                  <div class="msg-item-title">${escapeHtml(msg.title || msg.subject || 'Message')}</div>
                  <div class="msg-item-preview">${escapeHtml((msg.body || msg.content || '').substring(0, 80))}</div>
                </div>
              </div>
              <span class="msg-item-date">${dateStr}</span>
            </div>
          `;

          el.addEventListener('click', () => openMessageDetail(msg.id));
          messagesList.appendChild(el);
        });
      }
      
      // Pagination
      if (messagesPagination) {
        const pageInfo = document.getElementById('messages-page-info');
        const btnPrev = document.getElementById('btn-messages-prev');
        const btnNext = document.getElementById('btn-messages-next');
        if (totalPages > 1) {
          messagesPagination.style.display = 'flex';
          if (pageInfo) pageInfo.textContent = `Page ${page + 1} of ${totalPages}`;
          if (btnPrev) { btnPrev.disabled = page === 0; btnPrev.onclick = () => fetchMessages(page - 1); }
          if (btnNext) { btnNext.disabled = page >= totalPages - 1; btnNext.onclick = () => fetchMessages(page + 1); }
        } else {
          messagesPagination.style.display = 'none';
        }
      }
    } else {
      messagesList.innerHTML = '<span style="font-size:0.88rem;color:#ef4444;">Failed to load messages.</span>';
    }
  } catch (err) {
    messagesList.innerHTML = '<span style="font-size:0.88rem;color:#ef4444;">Network error.</span>';
  }
}

async function openMessageDetail(messageId) {
  if (!messageId || !accessToken) return;

  const listView = document.getElementById('msg-list-view');
  const detailView = document.getElementById('msg-detail-view');
  const titleEl = document.getElementById('message-detail-title');
  const dateEl = document.getElementById('message-detail-date');
  const bodyEl = document.getElementById('message-detail-body');
  if (!detailView) return;

  if (listView) listView.style.display = 'none';
  detailView.style.display = 'flex';
  if (titleEl) titleEl.textContent = 'Loading...';
  if (dateEl) dateEl.textContent = '';
  if (bodyEl) bodyEl.textContent = '';

  try {
    const response = await fetch(`/messages/${messageId}?messageId=${messageId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.ok) {
      const msg = await response.json();
      if (titleEl) titleEl.textContent = msg.title || msg.subject || 'Message';
      if (dateEl && msg.createdAt) {
        try {
          const d = new Date(msg.createdAt);
          dateEl.textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch(_) { dateEl.textContent = ''; }
      }
      if (bodyEl) bodyEl.textContent = msg.body || msg.text || 'No content.';

      // Refresh badge & list
      checkUnreadMessages();
      fetchMessages(currentMessagesPage);
    } else {
      if (titleEl) titleEl.textContent = 'Error';
      if (bodyEl) bodyEl.textContent = 'Failed to load message details.';
    }
  } catch (err) {
    if (titleEl) titleEl.textContent = 'Error';
    if (bodyEl) bodyEl.textContent = 'Network error loading message.';
  }
}

function initMessageCenter() {
  const notifWrapper = document.getElementById('message-notification-wrapper');
  const btnClose = document.getElementById('btn-close-messages');
  const btnBack = document.getElementById('btn-msg-back');
  const backdrop = document.getElementById('messages-panel-backdrop');

  if (notifWrapper) notifWrapper.addEventListener('click', () => toggleMessagesDrawer(true));
  if (btnClose) btnClose.addEventListener('click', () => toggleMessagesDrawer(false));
  if (backdrop) backdrop.addEventListener('click', () => toggleMessagesDrawer(false));

  if (btnBack) {
    btnBack.addEventListener('click', () => {
      const listView = document.getElementById('msg-list-view');
      const detailView = document.getElementById('msg-detail-view');
      if (listView) listView.style.display = 'flex';
      if (detailView) detailView.style.display = 'none';
    });
  }
}

// --- GOOGLE TRANSLATE INTEGRATION ---

function triggerGoogleTranslate(langCode) {
  // Google Translate uses a cookie named 'googtrans' to persist language selection.
  // Setting this cookie and reloading the translate element triggers translation.
  const value = langCode === 'en' ? '' : `/en/${langCode}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${location.hostname}`;

  // Try to find and set the Google Translate select dropdown programmatically
  const frame = document.querySelector('.goog-te-combo');
  if (frame) {
    frame.value = langCode === 'en' ? 'en' : langCode;
    frame.dispatchEvent(new Event('change'));
  } else {
    // If widget hasn't loaded yet, wait and retry
    const retryInterval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = langCode === 'en' ? 'en' : langCode;
        combo.dispatchEvent(new Event('change'));
        clearInterval(retryInterval);
      }
    }, 500);
    // Stop retrying after 10 seconds
    setTimeout(() => clearInterval(retryInterval), 10000);
  }
}

function initGoogleTranslate() {
  const btnEn = document.getElementById('lang-en');
  const btnHi = document.getElementById('lang-hi');

  function setActiveStyle(lang) {
    if (btnEn && btnHi) {
      btnEn.classList.toggle('active-lang', lang === 'en');
      btnHi.classList.toggle('active-lang', lang !== 'en');
    }
  }

  if (btnEn) {
    btnEn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerGoogleTranslate('en');
      setActiveStyle('en');
      localStorage.setItem('janconnect_lang', 'en');
    });
  }

  if (btnHi) {
    btnHi.addEventListener('click', (e) => {
      e.preventDefault();
      triggerGoogleTranslate('hi');
      setActiveStyle('hi');
      localStorage.setItem('janconnect_lang', 'hi');
    });
  }

  // Restore saved language preference on load
  const savedLang = localStorage.getItem('janconnect_lang') || 'en';
  setActiveStyle(savedLang);
  if (savedLang !== 'en') {
    // Delay to let Google Translate widget initialize first
    setTimeout(() => triggerGoogleTranslate(savedLang), 1500);
  }
}
