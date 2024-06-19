document.addEventListener('DOMContentLoaded', function() {
    const threadForm = document.getElementById('threadForm');
    const threadList = document.getElementById('threadList');
    const threads = [];

    if (threadForm) {
        threadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const title = document.getElementById('threadTitle').value;
            const body = document.getElementById('threadBody').value;
            
            const thread = {
                title,
                body,
                comments: []
            };
            
            threads.push(thread);
            displayThreads();
            threadForm.reset();
        });
    }

    function displayThreads() {
        threadList.innerHTML = '';
        threads.forEach((thread, index) => {
            const threadElement = document.createElement('div');
            threadElement.classList.add('thread');
            threadElement.innerHTML = `
                <h3>${thread.title}</h3>
                <p>${thread.body}</p>
                <button onclick="showComments(${index})">Show Comments</button>
                <div id="comments-${index}" class="comments" style="display: none;">
                    <h4>Comments</h4>
                    <div id="commentList-${index}"></div>
                    <input type="text" id="commentAuthor-${index}" placeholder="Your name" required>
                    <textarea id="commentBody-${index}" placeholder="Add a comment" required></textarea>
                    <button onclick="addComment(${index})">Add Comment</button>
                </div>
            `;
            threadList.appendChild(threadElement);
        });
    }

    window.showComments = function(index) {
        const commentsDiv = document.getElementById(`comments-${index}`);
        commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
        displayComments(index);
    }

    window.addComment = function(index) {
        const commentAuthor = document.getElementById(`commentAuthor-${index}`).value;
        const commentBody = document.getElementById(`commentBody-${index}`).value;
        threads[index].comments.push({ author: commentAuthor, body: commentBody });
        document.getElementById(`commentAuthor-${index}`).value = '';
        document.getElementById(`commentBody-${index}`).value = '';
        displayComments(index);
    }

    function displayComments(threadIndex) {
        const commentList = document.getElementById(`commentList-${threadIndex}`);
        commentList.innerHTML = '';
        threads[threadIndex].comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p><span>${comment.author}:</span> ${comment.body}</p>`;
            commentList.appendChild(commentElement);
        });
    }

    if (threadList) {
        displayThreads();
    }
});
