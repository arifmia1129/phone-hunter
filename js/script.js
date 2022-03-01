// This container for display result
const resultContainer = document.getElementById("display-result");

//This container for display error
const errorContainer = document.getElementById("display-error");

//This container for display details
const detailsContainer = document.getElementById("display-details");

//Spinner
const spin = document.getElementById("spinner");

// This function use for load data from server using api
const loadPhones = async () => {
    spin.style.display = "block";
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value.toLowerCase();
    detailsContainer.textContent = "";


    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();

    // Condition apply for check error found or not
    if (inputValue === "") {
        resultContainer.textContent = "";
        errorContainer.innerText = "Sorry! because input field is empty.";
        inputField.value = "";
        spin.style.display = "none";
    }
    else if (data.data.length === 0) {
        resultContainer.textContent = "";
        errorContainer.innerText = "Sorry! No result found.";
        inputField.value = "";
        spin.style.display = "none";
    }
    else {
        errorContainer.textContent = "";
        resultContainer.textContent = "";
        // Condition apply for 20 element display
        if (data.data.length < 20) {
            displayPhones(data.data);
            spin.style.display = "none";
        }

        else {
            moreDisplayPhones(data.data);
            spin.style.display = "none";

        }
        inputField.value = "";
    }
}


// This function use for display data in UI that data is loaded from server

const displayPhones = (phones) => {
    phones.slice(0, 20)?.forEach(phone => {
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

// More display 
const moreDisplayPhones = (phones) => {
    phones.slice(0, 20)?.forEach(phone => {
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

    const div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("justify-content-center");
    div.classList.add("align-items-center");
    div.classList.add("my-3");
    div.innerHTML = `
        <button id="more-btn" class = "btn btn-primary text-white fw-bold px-5 py-3 rounded-3 mx-auto">More</button>
        `;
    resultContainer.appendChild(div);

    document.getElementById("more-btn").addEventListener("click", function () {
        morePhones(phones)
    });

}

// More button function set
const morePhones = phones => {
    resultContainer.textContent = "";
    phones?.forEach(phone => {
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

    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

const displayDetails = phone => {
    resultContainer.textContent = "";
    detailsContainer.textContent = "";

    console.log(phone);

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card mb-3 p-3 mx-auto">
        <img src="${phone.image}" class="card-img-top w-25 mx-auto py-2" alt="...">
        <div class="card-body">
          <h5 class="card-title"><span class="fw-bold">Name :</span> ${phone.name}</h5>
          <h6 class="card-text"><span class="fw-bold">Brand :</span> ${phone.brand}</h6>
          <h6 class="card-text"><span class="fw-bold">Release Date :</span> ${phone.releaseDate ? phone.releaseDate : "Release date not avaiable."}</h6>
          <h6 class="card-text"> <span class="fw-bold">Main features :</span>  | Storage : ${phone.mainFeatures.storage}, Display Size : ${phone.mainFeatures.displaySize}, Chipset : ${phone.mainFeatures.chipSet}, Memory : ${phone.mainFeatures.memory} |</h6>
          <h6 class="card-text"><span class="fw-bold">Sensors : </span> ${phone.mainFeatures.sensors}.</h6>
          <h6 class="card-text"><span class="fw-bold">Others info :</span> Bluetooth : ${phone.others.Bluetooth}, GPS : ${phone.others.GPS}, NFC : ${phone.others.NFC}, Radio : ${phone.others.Radio}, USB : ${phone.others.USB}, WLAN : ${phone.others.WLAN}.</h6>
        </div>
      </div>
        `;
    detailsContainer.appendChild(div);
}
