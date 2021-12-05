
// aos libray for animation
AOS.init();

// load data
const loadData = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => getCoutry(data));
}
loadData();

// get each country
const getCoutry = countries =>{
    
    countries.forEach(country => {
        setHtml(country);
        
    });
}

// set html
const setHtml = getValue =>{
    const countryRow = document.getElementById('country_row');
    const div = document.createElement('div');
    div.classList.add('col_4');
    div.setAttribute('data-aos', 'fade-up');
    div.setAttribute('data-aos-anchor-placement', 'bottom-bottom')
    div.innerHTML=`
    <div class="country_image">
        <img src = "${getValue.flags.png}" height="80px" width = "150px">
    </div>
    <p class="country_property"><b>Country Name :</b> ${getValue.name.common}</p>
    <p class="country_property"><b>Capital :</b> ${getValue.capital || 'Not Available'}</p>
    <p><b>Region :</b> ${getValue.region}</p>
    <p><b>Time Zone :</b> ${getValue.timezones[0] || 'Not Available'}</p>
    <p><b>Population :</b> ${getValue.population}</p>
    <p><b>Area :</b> ${getValue.area} km<sup>2</sup></p>
    <p><b>Top Level Domain :</b> ${getValue.tld || 'Not Available'}</p>
    <button id="learn_more_btn">Learn More <i class="fas fa-long-arrow-alt-right"></i></button>

    `;
    countryRow.appendChild(div);
    document.getElementById('loading_sipner').style.display='none';
    document.getElementById('back_top').style.display='block';
}

// search by country name
const inputField = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
    inputField.addEventListener('keypress', function(event){
        if(event.key == "Enter"){
            searchBtn.click()
        }
    })
    searchBtn.addEventListener('click', function(){
        if(inputField.value !== ''){
            const searchUrl = `https://restcountries.com/v3.1/name/${inputField.value}`;
            searchData(searchUrl);
            document.getElementById('country_row').innerHTML='';
            document.getElementById('searchRow').innerHTML='';
            document.getElementById('search_sipner').style.display='none';
        }
        else{
            alert('please write something')
        }
        inputField.value = '';
    })


// search url
const api = 'https://restcountries.com/v3.1/all';
const searchData = searchUrl =>{
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        if(data.status === 404){
            searchData(api)
        }
        else{
            getCoutry(data)
            console.log(data)
        } 
    } 
)}
