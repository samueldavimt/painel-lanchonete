const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}

const insertCards = {
    insertItems(){
        qs('.cards').innerHTML = ''

        let key = this.dataset.key 
        console.log(key)
        let sectionProducts = products.find(p=>{
            return p.id == key
        })
        console.log(sectionProducts)
        
        let items = sectionProducts.items
        items.forEach((item,index)=>{
            let cardItem = qs('.card-item').cloneNode(true)

            cardItem.querySelector('.card-item .img img').src = item.img

            cardItem.querySelector('.card-item-name span').innerHTML = item.name

            cardItem.querySelector('.card-item-price').innerHTML = item.price.toFixed(2,0)

            cardItem.dataset.keyItem = index
            cardItem.dataset.keySection = products.indexOf(sectionProducts)
            

            cardItem.addEventListener('click',windowItemInfo.displayWindowInfo)

            qs('.cards').appendChild(cardItem)


        })
  
    },

    insertCardSection(){
        qs('.cards').innerHTML = ''

        products.forEach((section, index)=>{

            let cardSection = qs('.card-section').cloneNode(true)
        
            cardSection.querySelector('.img img').src = section.img
            cardSection.querySelector('.card-section-title span').innerHTML = section.nameSection
        
            cardSection.dataset.key = section.id
        
            cardSection.addEventListener('click',insertCards.insertItems)
        
            qs('.cards').appendChild(cardSection)
        })

    }

}

const windowItemInfo = {
    displayWindowInfo(){
        let windowInfo = qs('.item-window-container')

        windowInfo.style.opacity  = 0

        setTimeout(()=>{
            windowInfo.style.opacity = 1 
        },200)

        windowInfo.style.display = 'flex'

        
        
        let positionSection = this.dataset.keySection
        let positionItem = this.dataset.keyItem
        let item = products[positionSection].items[positionItem]


    }

}

insertCards.insertCardSection()
