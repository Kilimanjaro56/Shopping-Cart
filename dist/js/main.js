const products = [
    {   
        id: 0,
        name: "item one",
        imgUrl: "https://picsum.photos/id/1/100/100",
        price: 250
    },
    {
        id: 1,
        name: "item two",
        imgUrl: "https://picsum.photos/id/2/100/100",
        price: 250
    },
    {
        id: 2,
        name: "item three",
        imgUrl: "https://picsum.photos/id/3/100/100",
        price: 250
    },
]

let cart=[]

function displayProducts(prodArray){
    let html = ``;
    for(const product of prodArray){
        html += `<div class="thumbnail">
        <h3>${product.name}</h3>
        <img src="${product.imgUrl}">
        <p>${product.price}</p>
        <button data-id="${product.id}" >Add to Cart</button>
    </div>`
    }
    $('.thumbnails').html(html);
    addThumbnailButtonListeners();
}

function addThumbnailButtonListeners(){
    $('.thumbnail button').click(function(){
        const selectedId = $(this).data('id');
        const product = products.find(function(item){
            return item.id === selectedId
        });
        cart.push(product);
        displayCart();
    })
};

function displayCart(){
    let html = ``
    for(const product of cart){
        html += `<div class="cart-item">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button data-id="${product.id}">Remove</button>
    </div>`
    }
    $(".cart").html(html);
    addCartButtonListeners();
    calcTotal();
};

function addCartButtonListeners(){
    $('.cart-item button').click(function(){
        const selectedId = $(this).data('id');
        const productCartIndex = cart.findIndex(function(item){
            return selectedId === item.id
        });
        cart.splice(productCartIndex, 1);
        displayCart();
    });
};

function calcTotal(){
    let total = 0
    for( const product of cart){
        total  += product.price;
    }
    const dollars = total/100
    $('.total').html(dollars.toLocaleString("en-US", {style:"currency", currency:"USD"}));
}

displayProducts(products);