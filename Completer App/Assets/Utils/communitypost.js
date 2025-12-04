export function displayPost(author, text, authorInitials, isAI = false) { //To add isAI parameter
    const postContainer = document.getElementById('community-posts-list');
    if (!postContainer) {
        console.error("Community posts container '#community-posts-list' not found.");
        return;
    }

    //To capture the timestamp
    const nowTimestamp = Date.now();

    //To remove the empty state message
    const emptyState = postContainer.querySelector('.svg-background');
    if (emptyState) {
        emptyState.remove();
    }
    
    //To use app-card for the posts 
    const postWrapper = document.createElement('app-card'); 
    postWrapper.classList.add('community-post-item'); 
    
    //To add AI class to the card wrapper itself
    if (isAI) {
        postWrapper.setAttribute('data-variant', 'ai-post');
    }

    //To store the timestamp on the  card
    postWrapper.setAttribute('data-timestamp', nowTimestamp.toString());

    //For the AI icon and badge
    const aiSvgIcon = `
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-4 w-4" aria-hidden="true" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>`;
    
    const iconContent = isAI ? aiSvgIcon : authorInitials;
    const badgeHTML = isAI ? `<span class="ai-assistant-badge">AI Assistant</span>` : '';
   
    
    //To use html string for the inner content.
    postWrapper.innerHTML = `
        <div class="post-content"> 
            <div class="post-header">
                <span class="user-icon ${isAI ? 'ai-variant' : ''}">${iconContent}</span>
                <div class="post-meta">
                    <div class="post-author-wrapper">
                        <span class="post-author">${author}</span>
                        ${badgeHTML} 
                    </div>
                    <span class="post-time" data-timestamp-display>just now</span>
                </div>
            </div>
            <p class="post-text">${text}</p>
        </div>
    `;
    
    //To inject the new post at the top
    postContainer.prepend(postWrapper);
}