const loadProduct = () => {
    const url = 'https://api.escuelajs.co/api/v1/products';
    fetch(url)
        .then(Response => Response.json())
        .then(data => showData(data))
}

const showData = data => {
    data.forEach(element => {
        // console.log(element.category.image);
        const isBookmarked = checkBookmark(element.id);
        console.log(isBookmarked);
        const cardArea = document.getElementById('card');
        const div = document.createElement('div');
        // card create
        div.innerHTML = `
            <div class="col">
                <div class="card h-100 text-center px-5">
                    <div class="d-flex justify-content-between">
                        <img src="${element.images[0]}" class="w-50 h-50 mx-auto p-3">
                        <div>
                            <button class="mt-2 border" onclick="${isBookmarked? `removeBookmark('${element.id}')` : `bookmarkAdd('${element.id}','${element.title}','${element.price}')`}"><i class="${isBookmarked? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark' }"></i></button>
                        </div> 
                    </div>
                    <h3 class="text-success">Name: ${element.title}</h3>
                    <p>${element.description}</p>
                    <div class="d-flex justify-content-between px-4 pb-3">
                        <div>
                            <h5>Price: ${element.price}$</h5>
                        </div>
                        <div>
                            <button class="btn btn-info">Buy now</button>
                        </div>
                    </div>
                </div>     
            </div>
        `;
        cardArea.appendChild(div);
    });
}
const bookmarkAdd = (id,name,price)=>{
    console.log({id,name,price});
    let products = [];
    let productObject = {id,name,price,bookmark:true};
    const previousBookmark = JSON.parse(localStorage.getItem('bookmark'));
    if(previousBookmark) //jdi age bookmark name a kono key theke thake
    {
        const isBookmarkAvailable = previousBookmark.find((items)=>items.id==id);
        if(isBookmarkAvailable){
            alert("Bookmark already done buddy");
        }
        else{
            products.push(...previousBookmark,productObject);
            localStorage.setItem("bookmark",JSON.stringify(products));
        }
    }
    else{
        products.push(productObject);
        localStorage.setItem("bookmark",JSON.stringify(products));
    }
}
const checkBookmark = (id) =>{
    const previousBookmark = JSON.parse(localStorage.getItem('bookmark'));
    const isBookmarked = previousBookmark?.find(item => item.id==id);
    if(isBookmarked){
        return true;
    }
    else{
        return false;
    }
}
const removeBookmark = id =>{
    const previousBookmark = JSON.parse(localStorage.getItem('bookmark'));
    const restOfBookmark = previousBookmark.filter(item => item.id != id);
    localStorage.setItem("bookmark",JSON.stringify(restOfBookmark));
}
loadProduct();