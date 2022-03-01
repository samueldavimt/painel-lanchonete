const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}
let itemQt = 1
let priceItem = null
let constPrice = null

let sectionPosition = null
let itemPosition = null
let sizeItem = null

const cart = {
    cart: [],

    addItemCart(){
        
        let item = products[sectionPosition].items[itemPosition]
        let nameItem = item.name
    

        let itemCart = {
            pSection: sectionPosition,
            pItem: itemPosition,
            name:nameItem,
            price:constPrice,
            qt:itemQt,
            size: sizeItem

        }

        cart.cart.push(itemCart)
        console.log(cart.cart)
        cart.updateCart()

        windowItemInfo.hideWindowInfo()
        

    },


    updateCart(){
        qs('.cart-items').innerHTML = ''
        cart.showCart()
        cart.cart.forEach((item,index)=>{
            let itemCart = qs('.cart-item').cloneNode(true)

            itemCart.querySelector(".cart-item-img img").src = products[item.pSection].items[item.pItem].img

            itemCart.querySelector('.cart-item-name').innerHTML = item.name
            

            qs('.cart-items').appendChild(itemCart)
        })

    },

    showCart(){
        qs('.cart').classList.remove('cart-hide')
    },

    hideCart(){
        qs('.cart').classList.remove('cart-hide')
    },

    eventCartButton(){
        qs('.cart-header-info').addEventListener('click',function(){
            
            if(qs('.cart').classList.contains('cart-hide')){
                qs('.cart').classList.remove('cart-hide')
            }else{
                qs('.cart').classList.add('cart-hide')
            }
        })
    }
}

const insertCards = {
    insertItems(){
        qs('.cards').innerHTML = ''

        let key = this.dataset.key 
       
        let sectionProducts = products.find(p=>{
            return p.id == key
        })
       
        
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

        windowItemInfo.modifyQtItem()

    }

}

const windowItemInfo = {
   
    displayWindowInfo(){
        
        itemQt = 1
        let windowInfo = qs('.item-window-container')

        windowInfo.style.opacity  = 0

        setTimeout(()=>{
            windowInfo.style.opacity = 1 
        },200)

        windowInfo.style.display = 'flex'

        let positionSection = this.dataset.keySection
        let positionItem = this.dataset.keyItem
        let item = products[positionSection].items[positionItem]

        itemPosition =  positionItem
        sectionPosition = positionSection
        windowInfo.dataset.keySection = positionSection
        windowInfo.dataset.keyItem = positionItem

        windowInfo.querySelector('.img img').src = item.img
        windowInfo.querySelector('.item-window-info h1').innerHTML = item.name

        windowInfo.querySelector('.item-window-price').innerHTML = 'R$ ' + item.price.toFixed(2,0)

        priceItem = Number(item.price.toFixed(2,0))
        constPrice = priceItem

        qs('.cancel-window-area').addEventListener('click',windowItemInfo.hideWindowInfo)

        qs('.add-cart').addEventListener('click',cart.addItemCart)


        //Add sizes
        qs('.item-window-size .sizes').innerHTML = ''

        item.sizes.forEach(sizeInfo=>{
            let size = qs('.models .size').cloneNode(true)

            size.querySelector('span:nth-of-type(1)').innerHTML = sizeInfo.name
            sizeItem = sizeInfo.name
            size.dataset.name = sizeInfo.name
            size.querySelector('span:nth-of-type(2)').innerHTML = sizeInfo.size
            size.addEventListener('click',windowItemInfo.modifySizeItem)
            
            size.dataset.price = sizeInfo.price


            qs('.item-window-size .sizes').appendChild(size)

        })
        qs('.item-window-size div.size:nth-last-child(1)').classList.add('selected')

        windowInfo.querySelector('.window-area-qt').innerHTML = itemQt






    },

    modifySizeItem(){
        itemQt = 1
        constPrice = null
        qs('.window-area-qt').innerHTML = itemQt
        qsall('.size').forEach(size=>{
            size.classList.remove('selected')
        })
        this.classList.add('selected')
        let price = Number(this.dataset.price)
        
        qs('.item-window-price').innerHTML = `R$ ${price.toFixed(2,0)}`

        priceItem = Number(price.toFixed(2,0))
        constPrice = priceItem

        sizeItem = this.dataset.name
        
    },

    hideWindowInfo(){
        itemQt = 1
        
        let windowInfo = qs('.item-window-container')

        windowInfo.style.opacity  = 0

        setTimeout(()=>{
          
            windowInfo.style.display = 'none'
        },400)

        
    },

    modifyQtItem(){
       
        qs(".window-price-qtmenos").addEventListener('click',function(){
            if(itemQt > 1){
                itemQt --
                
            }          
            qs('.window-area-qt').innerHTML = itemQt
            
           if(constPrice > priceItem){
            constPrice -= priceItem
           }

            qs('.item-window-price').innerHTML = `R$ ${constPrice.toFixed(2,0)}`

        })

        qs(".window-price-qtmais").addEventListener('click',function(e){
            e.stopPropagation()
            
            
            itemQt ++
           
           qs('.window-area-qt').innerHTML = itemQt
            constPrice = priceItem * itemQt

            qs('.item-window-price').innerHTML = `R$ ${constPrice.toFixed(2,0)}`

        })
    }



}

insertCards.insertCardSection()
cart.eventCartButton()