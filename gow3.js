/**
 * God of War III PC Launcher - Dynamic Releases & Media Controller
 * Developed for ScreamAngel/gow3_launcher
 */

document.addEventListener('DOMContentLoaded', () => {
    initGitHubRelease();
    initAudioPlayer();
    initMobileMenu();
    initSmoothScroll();
    initDropdown();
});

/* ==========================================================================
   1. Dynamic GitHub Release Fetcher
   ========================================================================== */
const GITHUB_REPO = 'ScreamAngel/gow3_launcher';
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const FALLBACK_DOWNLOAD_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/gow3-windows-linux.zip`;
const FALLBACK_VERSION = 'v1.3';

async function initGitHubRelease() {
    const downloadBtn = document.getElementById('downloadBtn');
    const versionBadge = document.getElementById('versionBadge');
    const releaseVersionText = document.getElementById('releaseVersion');
    const releaseSizeText = document.getElementById('releaseSize');
    const releaseDateText = document.getElementById('releaseDate');
    const changelogContainer = document.getElementById('changelogContent');

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const tagName = data.tag_name || FALLBACK_VERSION;
        
        // Find zip or first asset
        let downloadUrl = FALLBACK_DOWNLOAD_URL;
        let assetSize = null;

        if (data.assets && data.assets.length > 0) {
            const zipAsset = data.assets.find(a => a.name.endsWith('.zip')) || data.assets[0];
            downloadUrl = zipAsset.browser_download_url;
            if (zipAsset.size) {
                assetSize = (zipAsset.size / (1024 * 1024)).toFixed(1) + ' MB';
            }
        }

        // Update Download button
        if (downloadBtn) {
            downloadBtn.href = downloadUrl;
            downloadBtn.setAttribute('title', `${tagName} sürümünü indir`);
        }

        if (releaseVersionText) {
            releaseVersionText.textContent = tagName;
        }

        if (versionBadge) {
            versionBadge.innerHTML = `<i class="fa-solid fa-code-branch"></i> ${tagName} Yayında`;
        }

        if (releaseSizeText && assetSize) {
            releaseSizeText.textContent = assetSize;
        }

        if (releaseDateText && data.published_at) {
            const pubDate = new Date(data.published_at);
            const formattedDate = pubDate.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            releaseDateText.textContent = formattedDate;
        }

        // If changelog container exists and we have release body
        if (changelogContainer && data.body) {
            renderChangelog(changelogContainer, data.body);
        }

    } catch (err) {
        console.warn('GitHub API fetch failed or rate limited, using fallback release info:', err);
        // Graceful fallback
        if (downloadBtn && !downloadBtn.href.includes('github.com')) {
            downloadBtn.href = FALLBACK_DOWNLOAD_URL;
        }
        if (releaseVersionText && releaseVersionText.textContent === '...') {
            releaseVersionText.textContent = FALLBACK_VERSION;
        }
        if (versionBadge && versionBadge.textContent.includes('...')) {
            versionBadge.innerHTML = `<i class="fa-solid fa-code-branch"></i> ${FALLBACK_VERSION} Yayında`;
        }
        if (releaseSizeText && releaseSizeText.textContent === '...') {
            releaseSizeText.textContent = '~84 MB';
        }
    }
}

function renderChangelog(container, rawText) {
    // Format simple markdown lines cleanly
    const lines = rawText.split('\r\n');
    let html = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        if (trimmed.startsWith('Attention!') || trimmed.startsWith('Dikkat!')) {
            html += `<div class="changelog-alert"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHTML(trimmed)}</div>`;
        } else if (trimmed.endsWith(':')) {
            html += `<h4 class="changelog-subheading">${escapeHTML(trimmed)}</h4>`;
        } else {
            html += `<p class="changelog-line"><i class="fa-solid fa-check"></i> ${escapeHTML(trimmed)}</p>`;
        }
    });

    if (html) {
        container.innerHTML = html;
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/* ==========================================================================
   2. Spartan Audio Player (Rage of Sparta & Tides of Chaos)
   ========================================================================== */
const playlist = [
    { title: 'Rage of Sparta', file: 'rage of sparta.mp3' },
    { title: 'Tides of Chaos', file: 'tides of chaos.mp3' }
];

let currentTrackIndex = 0;
let isAudioPlaying = false;

function initAudioPlayer() {
    const audioEl = document.getElementById('bgAudio');
    const playBtn = document.getElementById('audioPlayBtn');
    const trackBtn = document.getElementById('audioTrackBtn');
    const trackName = document.getElementById('currentTrackName');
    const visualizer = document.getElementById('audioVisualizer');

    if (!audioEl || !playBtn) return;

    function updateTrackUI() {
        if (trackName) {
            trackName.textContent = playlist[currentTrackIndex].title;
        }
        audioEl.src = playlist[currentTrackIndex].file;
    }

    function togglePlay() {
        if (audioEl.paused) {
            audioEl.play().then(() => {
                isAudioPlaying = true;
                updatePlayState(true);
            }).catch(e => {
                console.log('Audio playback prevented or waiting for interaction:', e);
            });
        } else {
            audioEl.pause();
            isAudioPlaying = false;
            updatePlayState(false);
        }
    }

    function updatePlayState(playing) {
        if (playBtn) {
            const icon = playBtn.querySelector('i');
            if (icon) {
                icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
            }
        }
        if (visualizer) {
            visualizer.classList.toggle('playing', playing);
        }
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        updateTrackUI();
        if (isAudioPlaying) {
            audioEl.play().catch(e => console.log(e));
        }
    }

    playBtn.addEventListener('click', togglePlay);

    if (trackBtn) {
        trackBtn.addEventListener('click', nextTrack);
    }

    // When current track ends, loop to next track automatically
    audioEl.addEventListener('ended', () => {
        nextTrack();
    });

    // Auto-update UI on pause/play triggered externally
    audioEl.addEventListener('pause', () => updatePlayState(false));
    audioEl.addEventListener('play', () => updatePlayState(true));
}

/* ==========================================================================
   3. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking outside or clicking any nav link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });
}

/* ==========================================================================
   4. Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==========================================================================
   5. Dropdown Menu Controller (Click & Keyboard Support)
   ========================================================================== */
function initDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;
    const btn = dropdown.querySelector('.dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Close dropdown with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
        }
    });
}
