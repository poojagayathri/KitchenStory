//let carts=document.querySelectorAll('.add-cart')

var products=[
    {
        name:'pomogranate',
        tag:'product-6.jpg',
        price:23,
        incart :0

    },
    {
        name:'onion',
        tag:'product-7.jpg',
        price:12,
        incart :0

    },
    {
        name:'pudina',
        tag:'cart-1.jpg',
        price:7,
        incart :0

    },
    {
        name:'capsicum',
        tag:'home-img-1.png',
        price:30,
        incart :0

    },
    {
        name:'Bell pepper',
        tag:'home-img-2.png',
        price:76,
        incart :0

    },
    {
        name:'Red capsicum',
        tag:'home-img-3.png',
        price:54,
        incart :0

    },
    {
        name:'Banana',
        tag:'product-1.jpg',
        price:27,
        incart :0

    },
    {
        name:'Fig',
        tag:'product-2.jpg',
        price:48,
        incart :0

    }
];

var row=document.getElementById('abc');
if(row){
    Object.values(products).map(item=>{
        console.log(item.incart);
        var x=JSON.stringify(item);
        console.log(x);
        row.innerHTML += `
        <div id="productId-${item.tag}" class="col-lg-3 text-center">
            <div class="card">
              <div class="card-body">
                <img src="./img/${item.tag}" width="150px" height="150px" class="img-luid">
                <h6>${item.name}</h6>
                <p>$ ${item.price}</p>
                  <div>
                    <ion-icon onclick="decrement('${item.tag}')" class="btn btn-outline-success" name="remove-outline"></ion-icon>
                    <a id="${item.tag}" class="quantity">0</a>
                    <ion-icon onclick="increment('${item.tag}')" class="btn btn-outline-success" name="add-outline"></ion-icon>
                  </div>
                
              </div>
            </div>
          </div>
        `;

    });
}

function searchSet(){  
    localStorage.setItem('searchItem',document.getElementById('search').value);  
    window.location.href="Search.html";
}
 
function search(searchvalue){
    var row=document.getElementById('searchItem');    
    var localSearch=[];
    if(row){
        if(localStorage.getItem('cartItems')){
            var cartItems=localStorage.getItem('cartItems');
            cartItems=JSON.parse(cartItems);
            for(var key in cartItems){
                var key1 =cartItems[key];
                console.log(key1);
                for(var val in key1){
                    console.log(key1[val]);
                    if(val === 'name' && key1[val].includes(searchvalue)){
                        localSearch.push(key1);
                    }
                }
            }
           
            
        }
        Object.values(products).map(item=>{
            console.log(item.incart);
            
            if(item.name.includes(searchvalue)){
                if(localSearch.length==0)
                localSearch.push(item)
                else if(!localSearch.some(e=>item.name === e.name))
                localSearch.push(item);
            }
        });        

        console.log(localSearch);

        //else{
            Object.values(localSearch).map(item=>{
                console.log(item.incart);
                
                if(item.name.includes(searchvalue)){
                    row.innerHTML += `
                <div id="productId-${item.tag}" class="col-lg-3 text-center">
                    <div class="card">
                      <div class="card-body">
                        <img src="./img/${item.tag}" width="150px" height="150px" class="img-luid">
                        <h6>${item.name}</h6>
                        <p>$ ${item.price}</p>
                          <div>
                            <ion-icon onclick="decrement('${item.tag}')" class="btn btn-outline-success" name="remove-outline"></ion-icon>
                            <a id="${item.tag}-prod" class="quantity">${item.incart}</a>
                            <ion-icon onclick="increment('${item.tag}')" class="btn btn-outline-success" name="add-outline"></ion-icon>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                `;
    
                }           
        
            });

        //}

        
    }
    

}
    

function increment(id){
    var cartItems=localStorage.getItem('cartItems');
    cartItems=JSON.parse(cartItems);
    item=products.filter(e => e.tag===id).map(e=>({
        ...e,
    }))
    
    if(cartItems){
        if(cartItems[item[0].tag]){
            cartItems[item[0].tag].incart += 1;
            if(document.getElementById(item[0].tag))
            document.getElementById(item[0].tag).innerHTML=cartItems[item[0].tag].incart;
            else
            document.getElementById(item[0].tag+"-prod").innerHTML=cartItems[item[0].tag].incart;
        }else{
            item[0].incart=1;
            cartItems={
                ...cartItems,
                [item[0].tag]:item[0]
            };
            if(document.getElementById(item[0].tag))
            document.getElementById(item[0].tag).innerHTML=1;
            else
            document.getElementById(item[0].tag+"-prod").innerHTML=1;

        }

    }else{
        item[0].incart=1;        
        cartItems={
            [item[0].tag]:item[0]
        };
        if(document.getElementById(item[0].tag))
        document.getElementById(item[0].tag).innerHTML=1;
        else
        document.getElementById(item[0].tag+"-prod").innerHTML=1;
        
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    cartNumber();
    totalCost(item[0]);
    document.location.reload();

}

function decrement(id){
    var cartItems=localStorage.getItem('cartItems');
    cartItems=JSON.parse(cartItems);
    item=products.filter(e => e.tag===id).map(e=>({
        ...e,
    }))
    
    if(cartItems){
        if(cartItems[item[0].tag].incart !==0){
            if(cartItems[item[0].tag]){
                cartItems[item[0].tag].incart -= 1;
                if(document.getElementById(item[0].tag))
                document.getElementById(item[0].tag).innerHTML=cartItems[item[0].tag].incart;
                else
                document.getElementById(item[0].tag+"-prod").innerHTML=cartItems[item[0].tag].incart;
                if(cartItems[item[0].tag].incart === 0){
                    console.log(typeof(cartItems));
                    delete cartItems[item[0].tag];
                }
            }
    
        }
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
        cartNumberDec();
        totalCostDec(item[0]);
        document.location.reload();
    }    
}

/* For updating the product count in home.html */
function onloadproductCount(){
    var cartItems=localStorage.getItem('cartItems');
    if(cartItems){
        cartItems=JSON.parse(cartItems);
    for ( var key of Object.keys(cartItems)){
        document.getElementById(cartItems[key].tag).innerHTML=cartItems[key].incart;
    }
    }
    
}

/* For updating the number of items in cart - for displaying */
function onloadCartNumber(){
    var productNumber=localStorage.getItem('cartNumber');

    if(productNumber){
        document.querySelector('.cart-info span').textContent=productNumber;
    }
}

/* Updating the number of items in cart for local storage */
function cartNumber(){
    var productNumber=localStorage.getItem('cartNumber');
    productNumber=parseInt(productNumber);
    if(productNumber){
        productNumber=productNumber+1;
    localStorage.setItem('cartNumber',productNumber);
    document.querySelector('.cart-info span').textContent=productNumber;
    }
    else{      
    localStorage.setItem('cartNumber',1);
    document.querySelector('.cart-info span').textContent=1;
    }
    
}

function cartNumberDec(){
    var productNumber=localStorage.getItem('cartNumber');
    productNumber=parseInt(productNumber);
    if(productNumber){
        productNumber=productNumber-1;
    localStorage.setItem('cartNumber',productNumber);
    document.querySelector('.cart-info span').textContent=productNumber;
    }    
}

function totalCost(product){
    console.log('the product price is '+product.price);
    var totalCost=localStorage.getItem('totalCost');
    totalCost=parseInt(totalCost);
    if(totalCost)
        totalCost=totalCost+product.price
    else
    totalCost=product.price;
    localStorage.setItem('totalCost',totalCost);
}

function totalCostDec(product){
    console.log('the product price is '+product.price);
    var totalCost=localStorage.getItem('totalCost');
    totalCost=parseInt(totalCost);
    if(totalCost)
        totalCost=totalCost-product.price
    localStorage.setItem('totalCost',totalCost);


}

function displayCart(){
    var cartItems=localStorage.getItem('cartItems');
    var cartNumber=localStorage.getItem('cartNumber');
    cartItems=JSON.parse(cartItems);
    console.log(cartItems);

    var t = $('#example').DataTable();
    var counter = 1;

    if(document.querySelector('#example')){
        var table=document.getElementById("example");
        console.log('length is '+cartNumber);
        Object.values(cartItems).map(item => {
            console.log(item.price);
            t.row.add([`<img src="./img/${item.tag}" width="100px" height="100px"><div>${item.name}</div>`, 
            item.price, 
            `<div>
            <ion-icon onclick="decrement('${item.tag}')" class="btn btn-outline-success" name="remove-outline"></ion-icon>
            <a id="${item.tag}" class="quantity">${item.incart}</a>
            <ion-icon onclick="increment('${item.tag}')" class="btn btn-outline-success" name="add-outline"></ion-icon>
          </div>`,
            item.price*item.incart]).draw(false);
         });
    }
}

function displayTotal(){
    var totalCost=localStorage.getItem('totalCost');
    if(totalCost){
        var cost=document.getElementById('totalCost');
        cost.innerHTML=`Total Cost:${totalCost}`;
        var checkOut=document.getElementById('checkOut');
        checkOut.style.display="block";
    }
    else
    {
        var checkOut=document.getElementById('checkOut');
        checkOut.style.display="none";
    }

}


if(row)
   onloadproductCount();
onloadCartNumber();
$('#example').DataTable();
displayCart();
displayTotal();

/*
  let carts=document.querySelectorAll('.add-cart')

for(let i=0; i<carts.length;i++)
{
    carts[i].addEventListener('click' ,() =>{
        cartNumber();
        setCartItems(products[i]);
        totalCost(products[i]);
    } )
}

function setCartItems(product){
    
    var cartItems=localStorage.getItem('cartItems');
    cartItems=JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag])
             cartItems[product.tag].incart += 1;  
             else{
                product.incart=1+product.incart;
                cartItems={
                    ...cartItems,
                    [product.tag]:product
                } 

             } 

    }else{
        product.incart=1+product.incart;
        cartItems={
            [product.tag]:product
        }        
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}



*/