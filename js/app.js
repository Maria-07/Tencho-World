// search box 
const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    console.log(searchText);
    searchBox.value = '';

    if (searchText == '') {
        errorMessage();
    } else {
        document.getElementById('error-message').style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchPhone(data.data))
            .catch(error => errorMessage(error));
    }
}

//spiner part 

const spinner = displaySpinner => {
    document.getElementById('spiner').style.display = displaySpinner;
}

// error msg
const errorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
}

let resultNumber;
let phoneDetails;

// display data 
const displaySearchPhone = phoneData => {
    //  console.log(phoneData.length);
    // show search results number 
    resultNumber = document.getElementById('result-numbers');
    resultNumber.innerText = `About ${phoneData.length} results found`;

    // show spinner 
    spinner('block');

    phoneData = phoneData.slice(0, 20);
    // console.log(phoneData);
    const searchPhone = document.getElementById('search-phone');
    searchPhone.textContent = '';

    if (phoneData.length == 0) {
        errorMessage();
        // console.log('phone to nai');
    } else {
        phoneData.forEach(phone => {

            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = ` 
                <div class = "card h-100 shadow">
                    <img src="${phone.image}" class="image-fluid card-img-top p-5" alt="phone Image">
                    <div class="card-body">
                        <h3 class="card-title"> ${phone.phone_name}</h3>
                        <p class="card-text"><h5>Brand Name : ${phone.brand}</h5></p>
                    </div>
                    <button onclick="LoadPhoneDetails('${phone.slug}')" class="w-50 m-3">More Info</button>
                    </div>
                `;
            searchPhone.appendChild(div);
        });
        spinner('none');
    }
}

// Load phone details 
const LoadPhoneDetails = phoneID => {
    resultNumber.innerText = '';
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// display Phone Deatails
const displayPhoneDetails = phoneDetail => {
    // console.log(phoneDetail);
    phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');

    const et = '-';
    let {
        WLAN = et,
            Bluetooth = et,
            GPS = et,
            NFC = et,
            Radio = et,
            USB = et
    } = phoneDetail.others ? phoneDetail.others : {

    }

    //relase Date
    const releaseDate = phoneDetail.releaseDate ? phoneDetail.releaseDate : 'Release Date is not available';

    const sensorList = phoneDetail.mainFeatures.sensors;
    // console.log(sensorList);
    // console.log(sensorList.join(' , '));

    div.innerHTML = `
        <img src="${phoneDetail.image}" class=" card-img-top p-5" alt="...">
            <div class="card-body">
                <h4 style = "color:#8267BE;">Name : ${phoneDetail.name}</h4>
                <h6>Brand Name : ${phoneDetail.brand}</h6>
            </div>

            <div class="mx-3 mb-5">
                <h5>MainFeatures :</h5>
                <h6><u>Storage</u> : ${phoneDetail.mainFeatures.storage}.</h6>
                <h6><u>DisplaySize</u> : ${phoneDetail.mainFeatures.displaySize}.</h6>
                <h6><u>ChipSet</u> : ${phoneDetail.mainFeatures.chipSet}.</h6>
                <h6><u>Memory</u> : ${phoneDetail.mainFeatures.memory}.</h6>

                <h5>Others : </h5>
                <h6><u>WLAN</u> : ${WLAN}</h6>
                <h6><u>Bluetooth</u> : ${Bluetooth}</h6>
                <h6><u>GPS</u> : ${GPS}</h6>
                <h6><u>NFC</u> : ${NFC}</h6>
                <h6><u>Radio</u> : ${Radio}</h6>
                <h6><u>USB</u> : ${USB}</h6>
                <h6><u>Sensors</u> : ${sensorList.join(' , ')}</h6>
            </div> 
            
             <div style = "
             color:#fff;
             font-size:1.2 em;
             text-align:center;
             background-color: #8267BE;
             padding:5px 0;"> ${releaseDate} </div>
        `;

    phoneDetails.appendChild(div);
}