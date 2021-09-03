
// load data
const loadData = () =>{
    fetch('https://restcountries.eu/rest/v2/all')
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
    div.classList.add('col_4')
    div.innerHTML=`
    <div class="country_image">
        <img src = "${getValue.flag}" height="80px" width = "150px">
    </div>
    <p class="country_property"><b>Country Name :</b> ${getValue.name}</p>
    <p class="country_property"><b>Capital :</b> ${getValue.capital}</p>
    <p><b>Region :</b> ${getValue.region}</p>
    <p><b>Population :</b> ${getValue.population}</p>
    <p><b>Area :</b> ${getValue.area} km<sup>2</sup></p>
    <p><b>Top Level Domain :</b> ${getValue.topLevelDomain}</p>
    <p><b>calling Codes :</b> +${getValue.callingCodes}</p>
    <button id="learn_more_btn">Learn More <i class="fas fa-long-arrow-alt-right"></i></button>

    `;
    countryRow.appendChild(div);
    document.getElementById('loading_sipner').style.display='none';
    document.getElementById('back_top').style.display='block';
}

// search by country name
document.getElementById('searchButton').addEventListener('click', function(){
    const inputField = document.getElementById('searchInput');
    if(inputField.value !== ''){
        const searchUrl = `https://restcountries.eu/rest/v2/name/${inputField.value}`;
        searchData(searchUrl);
        document.getElementById('country_row').innerHTML='';
        document.getElementById('searchRow').innerHTML='';
        document.getElementById('search_sipner').style.display='flex';
    }
    else{
        alert('please write something')
    }
    inputField.value = '';
})

// search url
const searchData = searchUrl =>{
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        if(data.status === 404){
            document.getElementById('search_sipner').style.display='none';
            alert('please write a valied name, now your page will be reload');
            window.location.reload();
        }
        else{
            resultSearch(data)
        }
    })
    
}

// search result
const resultSearch = sResult =>{
    if(sResult.length !== 0){
        console.log(sResult)
        sResult.forEach(searchCountry =>{
            searchResutlSetHtml(searchCountry)
        })
    }
    else{
        console.log(sResult.status)
    }
}

// search resul show in html
const searchResutlSetHtml = resiveData =>{
    const countryRow = document.getElementById('searchRow');
    const div = document.createElement('div');
    div.classList.add('col_4')
    div.innerHTML=`
    <div class="country_image">
        <img src = "${resiveData.flag}" height="80px" width = "150px">
    </div>
    <p class="country_property"><b>Country Name :</b> ${resiveData.name}</p>
    <p class="country_property"><b>Capital :</b> ${resiveData.capital}</p>
    <p><b>Region :</b> ${resiveData.region}</p>
    <p><b>Population :</b> ${resiveData.population}</p>
    <p><b>Area :</b> ${resiveData.area} km<sup>2</sup></p>
    <p><b>Top Level Domain :</b> ${resiveData.topLevelDomain}</p>
    <p><b>calling Codes :</b> +${resiveData.callingCodes}</p>
    <button id="learn_more_btn">Learn More <i class="fas fa-long-arrow-alt-right"></i></button>

    `;
    countryRow.appendChild(div);
    document.getElementById('search_sipner').style.display='none';
}