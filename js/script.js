// This container for display result
const resultContainer = document.getElementById("display-result");

//This container for display error
const errorContainer = document.getElementById("display-error");
// This function use for load data from server using api
const loadPhones = async () => {
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value.toLowerCase();


    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();

    // Condition apply for check error found or not
    if (inputValue === "") {
        resultContainer.textContent = "";
        errorContainer.innerText = "Sorry! because input field is empty.";
        inputField.value = "";
    }
    else if (data.data.length === 0) {
        resultContainer.textContent = "";
        errorContainer.innerText = "Sorry! No result found.";
        inputField.value = "";
    }
    else {
        errorContainer.textContent = "";
        resultContainer.textContent = "";

        if (data.data.length < 20) {
            displayPhones(data.data);
        }
        else {
            displayPhones(data.data.slice(0, 20));
        }
        inputField.value = "";
    }
}


// This function use for display data in UI that data is loaded from server

const displayPhones = (phones) => {
    phones?.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add("col-sm-12");
        div.innerHTML = `
        <div class="card mb-3 p-3">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto py-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick= loadDetails('${phone.slug}') class="btn btn-primary">Info</button>
        </div>
      </div>
        `;
        resultContainer.appendChild(div);
    })
}

const loadDetails = id => {
    console.log(id);
}
