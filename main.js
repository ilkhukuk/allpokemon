// ! Renk atamaları
const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
}

//  !HTMLden gelenler
const searchBtn = document.querySelector('.searchBtn');
const search = document.querySelector('.search');
const pokeContainer = document.querySelector('.poke-container');
const searchInput = document.querySelector('.searchInput')
const pokeCount = 10000


//  ! olaylar
searchBtn.addEventListener('click', () => {
    search.classList.toggle('active')
})


// ! Filtreleme
searchInput.addEventListener('input', (x) => {
    const searchValue = searchInput.value.toLowerCase()
    const pokName = document.querySelectorAll('.poke-name')

    pokName.forEach((pname) => {
        if (pname.innerHTML.toLowerCase().includes(searchValue)) {
            pname.parentElement.parentElement.style.display = 'block'
        }else {
            pname.parentElement.parentElement.style.display = 'none'
        }
    })
})

//  ! Api

const fetchPokes = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPoke(i)
    }
}



const getPoke = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    cardCreate(data)
}

const cardCreate = (x) => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('pokemon')


    const pokeId = x.id.toString().padStart(3, '0')
    const pokeName = x.name
    const pokeBase = x.base_experience
    const pokeWeight = x.weight
    const pokeType = x.types[0].type.name
    const pokeBg = bg_color[pokeType]

    newDiv.style.backgroundColor = `${pokeBg}`

    newDiv.innerHTML = `<div class="pid"><span class="poke-id"># ${pokeId}</span></div>
    <div class="image-container"">    
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png" alt="first">
</div>
<div class="poke-info">

<h3 class="poke-name">${pokeName}</h3>
<div class="info">
   <small class="power">
       <i class="fa-solid fa-flask"></i> ${pokeBase} exp
   </small>
   <small class="weight">
       <i class="fa-solid fa-flask"></i> ${pokeWeight} kg  
   </small>
</div>
<div class="poke-type">
   <i class="fa-brands fa-uncharted" style="color: black; font-weight: bold;"></i> ${pokeType}
</div>
</div>`

    pokeContainer.appendChild(newDiv)
}
fetchPokes()

