var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var siteList = [];

if (localStorage.getItem("siteContainer") !== null) {
  siteList = JSON.parse(localStorage.getItem("siteContainer"));
  displayData();
}

function addSite() {
  if (siteNameValidation() && siteURLValidation()) {
    var site = {
      name: siteNameInput.value,
      url: siteURLInput.value,
    };
    siteList.push(site);

    localStorage.setItem("siteContainer", JSON.stringify(siteList));

    displayData();

    clearData();
  }
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += `
    
          <tr>
        <th scope="row" class="py-4">${i + 1}</th>
        <td class="py-4">${siteList[i].name}</td>
        <td class="py-4"><a class="btn btn-success" href="${
          siteList[i].url
        }"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td class="py-4"> <button class="btn btn-danger" onclick="DeleteItem(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>
    
    `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function clearData() {
  siteNameInput.value = null;
  siteURLInput.value = null;
}

function DeleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("siteContainer", JSON.stringify(siteList));

  displayData();
}

function siteNameValidation() {
  var text = siteNameInput.value;
  var regex = /^[a-zA-Z][a-zA-Z0-9\s]{2,19}$/;
  if (regex.test(text)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    document.getElementById("msgName").classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    document.getElementById("msgName").classList.remove("d-none");
    return false;
  }
}

function siteURLValidation() {
  var text = siteURLInput.value;
  var regex = /^(www|https:\/\/).{2,}$/;
  if (regex.test(text)) {
    siteURLInput.classList.add("is-valid");
    siteURLInput.classList.remove("is-invalid");
    document.getElementById("msgURl").classList.add("d-none");
    return true;
  } else {
    siteURLInput.classList.add("is-invalid");
    siteURLInput.classList.remove("is-valid");
    document.getElementById("msgURl").classList.remove("d-none");
    return false;
  }
}
