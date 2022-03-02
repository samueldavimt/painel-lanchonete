// Window Front

window.addEventListener('keyup',hideWindowFront)

function hideWindowFront(e){
    if(e.key == 'Enter'){
        qs('.window-front').style.height = '0vh'
        insertCards.insertCardSection()
        window.removeEventListener('keyup',hideWindowFront)
    }

}

qs('#button-window-front').addEventListener('click',()=>{
    qs('.window-front').style.height = '0vh'
    insertCards.insertCardSection()
})
