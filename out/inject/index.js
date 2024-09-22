console.log("Message from inject.js");

// Function to get the current video ID
function getVideoId() {
    // Check URL params first (for standard video pages)
    const urlParams = new URLSearchParams(window.location.search);
    let videoId = urlParams.get('v');

    // If not found in URL, try to find in page meta data
    if (!videoId) {
        const ytInitialPlayerResponse = window.ytInitialPlayerResponse;
        if (ytInitialPlayerResponse && ytInitialPlayerResponse.videoDetails) {
            videoId = ytInitialPlayerResponse.videoDetails.videoId;
        }
    }

    // If still not found, try to find in page content
    if (!videoId) {
        const videoElement = document.querySelector('ytd-watch-flexy');
        if (videoElement) {
            videoId = videoElement.getAttribute('video-id');
        }
    }

    return videoId;
}

// Function to inject a custom item into the "More Options" menu on YouTube
function addCustomMenuItem() {
    const menu = document.querySelector("ytd-menu-popup-renderer #items");
    
    if (menu && !menu.querySelector(".custom-menu-item")) {
        // Create a new custom item
        const customItem = document.createElement("ytd-menu-service-item-renderer");
        customItem.className = "style-scope ytd-menu-popup-renderer custom-menu-item";
        customItem.setAttribute("system-icons", "");
        customItem.setAttribute("role", "menuitem");
        customItem.setAttribute("tabindex", "-1");
        customItem.setAttribute("aria-selected", "false");

        customItem.innerHTML = `
            <tp-yt-paper-item class="style-scope ytd-menu-service-item-renderer" role="option" tabindex="0">
                <yt-icon class="style-scope ytd-menu-service-item-renderer">
                    <span class="yt-icon-shape yt-spec-icon-shape">
                        <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                            </svg>
                        </div>
                    </span>
                </yt-icon>
                <yt-formatted-string class="style-scope ytd-menu-service-item-renderer">Download Thumbnail</yt-formatted-string>
            </tp-yt-paper-item>
        `;

        // Insert the custom item into the menu (after "Download" option)
        const downloadItem = menu.querySelector('ytd-menu-service-item-download-renderer');
        if (downloadItem && downloadItem.nextSibling) {
            menu.insertBefore(customItem, downloadItem.nextSibling);
        } else {
            menu.appendChild(customItem);
        }

        // Add click event listener for custom functionality
        customItem.addEventListener("click", () => {
            const videoId = getVideoId();
            if (videoId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                window.open(thumbnailUrl, '_blank');
            } else {
                alert("Couldn't find video ID. Make sure you're on a video page.");
            }
        });
    }
}

// MutationObserver to watch for changes in the DOM and inject the custom item when the menu is available
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            addCustomMenuItem();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Initial call in case the menu is already loaded
addCustomMenuItem();