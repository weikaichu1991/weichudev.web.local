// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName("enlargeable-image");
var modalImg = document.getElementById("modalImage");

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// --- the commeenting sections functions ---
const url = new URL(location.href);
const APILINK = 'https://europe-west1-weichudev-web2024.cloudfunctions.net/api';
const main = document.getElementById("commentsSection");

const div_new = document.createElement('div');
div_new.innerHTML = `
<div class="row">
    <div class="column">
        <div class="card">
            <h1>New Comment</h1>
            <p><strong>Name: </strong>
                <input type="text" id="new_name" value="" placeholder="*Required">
            </p>
            <p><strong>Email: </strong>
                <input type="text" id="new_email" value="" placeholder="(optional)">
            </p>
            <p><strong>Subject: </strong>
                <input type="text" id="new_subject" value="" placeholder="*Required">
            </p>
            <p><strong>Comment: </strong>
                <input type="text" id="new_comment" value="" placeholder="*Required">
            </p>
            <br>
            <p><a href="#" onclick="saveComment('new_name', 'new_email', 'new_subject', 'new_comment')" target="_blank">Submit</a>
            </p>
            <p class="terms">* Email address is only for validation purpose which will be required when you need to edit or delete your comment. Therefore, for security reason, it is recommended to provide email address. The address won't be used for any marketing or social communication without your consent.  </p>
            <hr>
        </div>
    </div>
</div>
`
main.appendChild(div_new);

// returnComments(APILINK);
function returnComments(url) {
    fetch(url)
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        // main.innerHTML = '';
        data.forEach(comment => {
            const div_card = document.createElement('div');
            const comment_id = comment._id;
            const formattedDate = formatDate(comment.date);
            div_card.innerHTML = `
                    <div class = "row">
                        <div class = "column">
                            <div class = "div_card" id = "${comment_id}">
                                <p class="comment_subject"><strong>Subject: </strong>${comment.subject}</p>
                                <p class="comment_text"><strong>Comment: </strong>${comment.comment_text}</p>
                                <p class="commentator">${comment.name} - ${formattedDate}</p>
                                <p><a href="#" onclick="showEmailVerification('${comment._id}', 'edit')" class="verifyBtn "target="_blank">Edit | </a><a href = "#" onclick="showEmailVerification('${comment._id}', 'delete')" target="_blank">Delete</a></p>
                            </div>
                        </div>
                    </div>
                `;
                main.appendChild(div_card);
        });
    })
    .catch(error => {
        console.error('Error fetching comments:', error);
        alert('Error fetching comments. Please try again.');
    });
}

function showEmailVerification(commentId, action){
    const element = document.getElementById(commentId);
    element.innerHTML += `
        <div id="verifyEmail-${commentId}">
            <p><strong>Verify Email: </strong>
                <input type= "text" id = "verifyInput-${commentId}" placeholder="Enter your email to verify">
                <a href="#" onclick="verifyEmail('${commentId}', '${action}')" target="_blank">Verify</a>
            </p>
        </div>
    `
}

async function verifyEmail(commentId, action){
    const verifyInput = document.getElementById(`verifyInput-${commentId}`).value.trim().toLowerCase();
    const url = `${APILINK}/${commentId}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const comment = await response.json();
        console.log('Comment load successfully');
        const storedEmail = comment.email.trim().toLowerCase();
        if (storedEmail === verifyInput) {
            if (action === 'edit') {
                editComment(comment._id, comment.name, comment.email, comment.subject, comment.comment_text);
            } else if (action === 'delete') {
                deleteComment(commentId, verifyInput);
            }
        } else {
            alert('Email verification failed. Please enter the correct email.');
        }
    } else {
        console.error('Error saving comment:', response.statusText);
    }
}

function editComment(id, name, email, subject, comment_text ) {
    const element = document.getElementById(id);
    const subjectInputId = "subject" + id
    const commentInputId = "comment_text" + id
    const nameInputId = "name" + id
    const emailInputId = "email" + id
    const verifyEmailInputId = "verify_email" + id;
    // creating editing function with 2 input boxes shown up.
    element.innerHTML = `
        <p><strong>Name: </strong>
        <input type="text" id="${nameInputId}" value="${name}">
        </p>
        <p><strong>Email: </strong>
        <input type="text" id="${emailInputId}" value="${email}">
        </p>
        <p><strong>Subject: </strong>
        <input type="text" id="${subjectInputId}" value="${subject}">
        </p>
        <p><strong>Comment: </strong>
        <input type="text" id="${commentInputId}" value="${comment_text}">
        </p>
        <p><a href = "#" onclick = "saveComment('${nameInputId}', '${emailInputId}', '${subjectInputId}', '${commentInputId}', '${id}')" target="_blank">Save</a>
        </p>
    `
}
// creating save the editted review function
async function saveComment(nameInputId, emailInputId, subjectInputId, commentInputId, id = "") {
    const subject = document.getElementById(subjectInputId).value;
    const comment_text = document.getElementById(commentInputId).value;
    const name = document.getElementById(nameInputId).value;
    const email = document.getElementById(emailInputId).value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${APILINK}/${id}` : APILINK;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, comment_text })
    });

    if (response.ok) {
        console.log('Comment saved successfully');
        location.reload(main);
    } else {
        console.error('Error saving comment:', response.statusText);
    }
}

async function deleteComment(id) {
    const response = await fetch(`${APILINK}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Comment deleted successfully');
        location.reload(main);
    } else {
        console.error('Error deleting comment:', response.statusText);
    }
}

// Function to format the date and time zone
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        timeZoneName: 'short'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}


// Load comments when the page loads
document.addEventListener('DOMContentLoaded', () => returnComments(APILINK));
// document.addEventListener('DOMContentLoaded', () => returnComments(APILINK));