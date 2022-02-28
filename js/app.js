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
            .then(data => displaySearchPhone(data.data));
    }
}

// error msg
const errorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
}

// display data 
const displaySearchPhone = phoneData => {
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
                <div class = "card h-100 " >
                    <img src="${phone.image}" class="image-fluid card-img-top p-5" alt="phone Image">
                    <div class="card-body">
                        <h3 class="card-title"> ${phone.phone_name}</h3>
                        <p class="card-text"><h5>Brand Name : ${phone.brand}</h5></p>
                    </div>
                    <button onclick="LoadPhoneDetails('${phone.slug}')" class="w-50 m-3">More Info</button>
                    </div>
                `;
            searchPhone.appendChild(div);
        })
    }
}

// Load phone details 
const LoadPhoneDetails = phoneID => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

// display Phone Deatails
const displayPhoneDetails = phoneDetail => {
    console.log(phoneDetail);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phoneDetail.image}" class=" card-img-top p-5" alt="...">
            <div class="card-body">
                <h4 style = "color:#8267BE;">Name : ${phoneDetail.name}</h4>
                <h6>Brand Name : ${phoneDetail.brand}</h6>
                <h6>Brand Name : ${phoneDetail.brand}</h6>
            </div>

             <div class="mx-3 mb-5">
                <h5>mainFeatures :</h5>

                <h6><u>Storage</u> : ${phoneDetail.mainFeatures.storage}.</h6>
                <h6><u>DisplaySize</u> : ${phoneDetail.mainFeatures.displaySize}.</h6>
                <h6><u>ChipSet</u> : ${phoneDetail.mainFeatures.chipSet}.</h6>
                <h6><u>Memory</u> : ${phoneDetail.mainFeatures.memory}.</h6>
            

           
                <h5>Others : </h5>

                <h6><u>WLAN</u> : ${phoneDetail.others.WLAN}.</h6>
                <h6><u>Bluetooth</u> : ${phoneDetail.others.Bluetooth}.</h6>
                <h6><u>GPS</u> : ${phoneDetail.others.GPS}.</h6>
                <h6><u>NFC</u> : ${phoneDetail.others.NFC}.</h6>
                <h6><u>Radio</u> : ${phoneDetail.others.Radio}.</h6>
                <h6><u>USB</u> : ${phoneDetail.others.USB}.</h6>
                
            </div>

            <div style = "color:#fff;
                        font-size:1.2em;
                        text-align:center;
                        background-color:#8267BE;
                        padding: 5px 0;
                        "
            >${phoneDetail.releaseDate}</div>
    `;
    phoneDetails.appendChild(div);

}