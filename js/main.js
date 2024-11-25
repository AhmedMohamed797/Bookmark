// Selectors
let siteNameInput = document.getElementById("site-name");
let nameError = document.querySelector(".name-error");
let siteUrlInput = document.getElementById("site-url");
let urlError = document.querySelector(".url-error");
let submitBtn = document.getElementById("submit-btn");
let tbodyContent = document.getElementById("tbody-content");
let allInputs = document.querySelectorAll("input:not([type='submit'])");

// Check if local storage is empty or not
let bookmarks = JSON.parse(localStorage.getItem("bookmark")) || [];

// Get Data from input
submitBtn.addEventListener("click", () => {
  // Validation
  let siteNameRegex = /[a-zA-Z-]{4,}/.test(siteNameInput.value);
  let siteUrlRegex = /^(https:\/\/)\w+/.test(siteUrlInput.value);

  if (siteNameRegex && siteUrlRegex) {
    dataObj = {
      siteName: siteNameInput.value.toLowerCase(),
      siteUrl: siteUrlInput.value,
    };

    // Save data in array
    bookmarks.push(dataObj);

    // Save bookmark in local Storage
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));

    // Show msg
    showMsg("Bookmark added successfully!", "success");

    // clear Inputs
    clearInputs();
  } else {
    if (!siteNameRegex) {
      nameError.style.display = "block";
      siteNameInput.classList.add("input-error");
    }

    if (!siteUrlRegex) {
      urlError.style.display = "block";
      siteUrlInput.classList.add("input-error");
    }

    // Show Msg
    showMsg("Please fix input errors", "error");
  }

  showData();
});

// Clear Inputs
function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

// Hide error msg when write on inputs
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Hide error border
    input.classList.remove("input-error");
    // Hide error Msg
    input.nextElementSibling.style.display = "none";
  });
});

// Show Data
function showData() {
  let table = "";

  for (let i = 0; i < bookmarks.length; i++) {
    table += `
      <tr>
          <td>${i + 1}</td>
          <td>${bookmarks[i].siteName}</td>
          <td><button id='visit'><a href="${
            bookmarks[i].siteUrl
          }" target="_blank">Visit</a></button></td>
          <td><button id='delete' onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  }

  tbodyContent.innerHTML = table;
}

// Delete Data
function deleteData(index) {
  bookmarks.splice(index, 1);
  localStorage.bookmark = JSON.stringify(bookmarks);
  showData();

  showMsg("Bookmark deleted successfully!", "error");
}

// Message For Events
function showMsg(text, type) {
  const existingMessage = document.querySelector(".message");
  if (existingMessage) existingMessage.remove(); // Avoid Dublicate

  let messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  document.body.appendChild(messageDiv);

  setTimeout(() => messageDiv.remove(), 3000);
}

// Initial trigger function showData
showData();
