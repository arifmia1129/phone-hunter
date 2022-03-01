const resultContainer = document.getElementById("display-result");

// This function use for load data from server using api
const loadPhones = async () => {
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value.toLowerCase();
    console.log(inputValue);

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();
    console.log(data.data);
    displayPhones(data.data);
    inputField.value = "";
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
          <button class="btn btn-primary">Info</button>
        </div>
      </div>
        `;
        resultContainer.appendChild(div);
    })
}
