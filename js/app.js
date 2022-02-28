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

// display data 
const displaySearchPhone = phoneData => {
    const searchPhone = document.getElementById('search-phone');
    searchPhone.textContent = '';

    if (phoneData.length == 0) {
        errorMessage();
        // console.log('phone to nai');
    } else {
        phoneData.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = ` 
                <div class = "card h-100 " >
                    <img src="${phone.image}" class="image-fluid card-img-top p-5" alt="phone Image">
                    <div class="card-body">
                        <h3 class="card-title"> ${phone.phone_name}</h3>
                        <p class="card-text"><h5>Brand Name : ${phone.brand}</h5></p>
                    </div>
                    <button class="w-50 m-3">More Info</button>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                `;
            searchPhone.appendChild(div);
        })
    }


}

// error msg
const errorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
}