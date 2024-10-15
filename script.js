let fetchMorePhotos = false;
let morePhotos= true;


let root = document.getElementById('root')

async function fetchPhotos(n) {
    fetchMorePhotos = true;

    let response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${n}`);/*input n as a limit */

    let data = await response.json()

    console.log(data)/*check if the data is there or not in live*/

    fetchMorePhotos = false

    if(data.length === 0){
        morePhotos = false
        return
    }

    for(let photos of data){
        let div = document.createElement('div')

        div.classList.add('photo-item');

        div.innerHTML = 
            `<h2>${photos.title}</h2>
            <p><small><img src="${photos.url}" alt="${photos.title}" style="width: contain;"></small></p>`;
                
        
        root.appendChild(div)
        
    }    
}

/*load more items on triggering scroll*/

window.addEventListener('scroll',() => {
    if(fetchMorePhotos || !morePhotos){
        return
    }

    if((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight-100){
        fetchPhotos(100);
    }
})

fetchPhotos(100); 
        
