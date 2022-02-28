const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}

const cardSection = {
    
}

products.forEach((section, index)=>{

    let cardSection = qs('.card-section').cloneNode(true)

    cardSection.querySelector('.img img').src = section.img
    cardSection.querySelector('.card-section-title span').innerHTML = section.nameSection

    cardSection.dataset.key = section.id

    qs('.cards').appendChild(cardSection)
})