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

// error msg
const errorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
}


// display data 
const displaySearchPhone = phoneData => {
    phoneData = phoneData.slice(0,20);
    console.log(phoneData);
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

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// display Phone Deatails
const displayPhoneDetails = phoneDetail => {
    console.log(phoneDetail);
    const phoneDetails = document.getElementById('phone-details');
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

    const releaseDate = phoneDetail.releaseDate ? phoneDetail.releaseDate : 'Release Date is not available';

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

                <h6><u>WLAN</u> : ${WLAN}</h6>
                <h6><u>Bluetooth</u> : ${Bluetooth}</h6>
                <h6><u>GPS</u> : ${GPS}</h6>
                <h6><u>NFC</u> : ${NFC}</h6>
                <h6><u>Radio</u> : ${Radio}</h6>
                <h6><u>USB</u> : ${USB}</h6>
            </div> 
            
             <div style = "
             color:#fff;
             font-size:1.2 em;
             text-align:center;
             background-color: #8267BE;
             padding:5px 0;"> ${releaseDate} </div>
        `;



    // console.log(phoneDetail.releaseDate);
    // const relaseDiv = document.createElement('div');
    // console.log(phoneDetail.releaseDate);
    // if (phoneDetail.releaseDate == '') {
    //     console.log('relasedata nai');
    // } else {
    //     console.log(phoneDetail.releaseDate);
    // }

    /*
    const p = document.createElement('p');
    const sensors = phoneDetail.mainFeatures.sensors;
    console.log(sensors);
    for (let i = 0; i < sensors.length; i++)
        p.innerText = ((i + 1) + ": " + sensors[i]);
    phoneDetails.appendChild(p);
    // li.innerHTML 


    relaseDiv.classList.add('card');
    relaseDiv.innerHTML = `
        <div style = "color:#000;
        font-size: 1.2 em;
        text-align: center;
        background -color: #8267BE;
        padding: 5px 0;">${phoneDetail.releaseDate}</div>
        `
    
    */

    phoneDetails.appendChild(div);
    // phoneDetails.appendChild(relaseDiv);
}