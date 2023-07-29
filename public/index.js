const cardData=[
    {
        name:"Prince",
        age:20,
        bg:"B+",
        gender:"Male",
        mob:9484983937,
        imgpath:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Sushant_sr_Manish_M_B%27day_bash.jpg"
    },
    {
        name:"Rohan",
        age:21,
        bg:"A+",
        gender:"Male",
        mob:983983937,
        imgpath:"E:\\Downloads\\Responsive Card Slider JavaScript\\Responsive Card Slider\\images\\profile5.jpg"
    },
    {
        name:"Avdhesh",
        age:20,
        bg:"B+",
        gender:"Female",
        mob:948498347,
        imgpath:"Responsive Card Slider\images\profile6.jpg"
    },
    {
        name:"Aman",
        age:50,
        bg:"O+",
        gender:"Male",
        mob:8794983937,
        imgpath:"Responsive Card Slider\images\profile7.jpg"
    },
]


const postContainer=document.querySelector('.card-wrapper');

const postMethods=()=>{
    cardData.map((cardInfo)=>{
        const card=document.createElement('div');
        card.classList.add('card', 'swiper-slide');
        card.innerHTML=`
        <div class="image-content">
            <span class="overlay"></span>

            <div class="card-image">
                <img src=${cardInfo.imgpath} alt="" class="card-img">
            </div>
        </div>

        <div class="card-content">
            <h2 class="name">${cardInfo.name}</h2>
            <p class="description">
                <div class="blood">${cardInfo.bg}</div>
                <div class="age"><span >Age:</span><div class="ageNum"> ${cardInfo.age}</div></div>
                <div class="age"><span >Gender:</span><div class="GenVal"> ${cardInfo.gender}</div></div>
                <i style="margin: 20px 0px 10px;" class="fa-solid fa-phone fa-beat fa-xl"><div class="mob"> ${cardInfo.mob}</div></i>
            </p>

            <button class="button">View More</button>
        </div>
    `
    postContainer.appendChild(card);

    })
}
postMethods();
