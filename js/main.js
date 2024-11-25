var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrlInput = document.getElementById("websiteUrl");
var submitBtn = document.querySelector("button.btn-primary");

var bookmarkList = [];

if (localStorage.getItem("bookmarks") != null) {
  var bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display(bookmarkList);
}

var globalNameMatch;
var globalUrlMatch;
 
function validateNameInput(element) {
  var regex = /[a-zA-Z]{3,}/;
  var matchedName = regex.test(element.value);
  globalNameMatch = matchedName;
  if (matchedName) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}
function validateUrlInput(element) {
  var regex = /(www.|https:\/\/)/;
  var matchedUrl = regex.test(element.value);
  globalUrlMatch = matchedUrl;
  if (matchedUrl) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function addBookmark() {
  if (globalNameMatch && globalUrlMatch) {
    bookmark = {
      name: bookmarkNameInput.value,
      url: websiteUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    display(bookmarkList);
    clearForm();
  } else {
    Swal.fire({
      title:
        " <h5 class='valid-1'>Site Name or Url is not valid, Please follow the rules below :</h5>",
      html: `<div class="left "><i class="text-danger fa-solid fa-circle-arrow-right  me-2"></i>Site name must contain at least 3 characters</div>
            <div class="my-2 left"><i class="text-danger fa-solid fa-circle-arrow-right me-2"></i>Dont repeat name</div>
            <div class="left"><i class="text-danger fa-solid fa-circle-arrow-right me-2"></i>Site URL must be a valid one</div>
            `,
    });
  }

  
}

function display(list) {
  textHtml = ``;
  for (i = 0; i < list.length; i++) {
    textHtml += `
        <tr class="">
                <td class="td-index">${i + 1}</td>
                <td class="td-name">${list[i].name}</td>
                <td><a target="_blank" href="${
                  list[i].url
                }" class="text-decoration-none text-black"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`;

    document.querySelector("tbody").innerHTML = textHtml;
  }
}
function clearForm() {
  bookmarkNameInput.value = "";
  websiteUrlInput.value = "";
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkNameInput.classList.remove("is-valid");
  websiteUrlInput.classList.remove("is-invalid");
  websiteUrlInput.classList.remove("is-valid");
}
submitBtn.addEventListener("click", function () {
  addBookmark();
});

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  display(bookmarkList);
}
