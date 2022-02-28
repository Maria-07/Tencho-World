// error msg
const errorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
}

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
        console.log(url);
    }
}