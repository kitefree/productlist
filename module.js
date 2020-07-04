export default {

    productList: [],
    uuid: '603cb025-ce43-4d9c-bb8a-51732cf440ab',    
    query() {

        const vm = this;
        //console.log(e);

        const url = new URL(
            `https://course-ec-api.hexschool.io/api/${vm.uuid}/ec/products`
        );

        // let params = {
        //     "page": "1",
        // };
        // Object.keys(params)
        //     .forEach(key => url.searchParams.append(key, params[key]));

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",            
        };

        fetch(url, {
            method: "GET",
            headers: headers,
        })
        .then(response => response.json())
        .then(function(json){
            vm.productList = JSON.parse(JSON.stringify(json.data));
            //console.table(vm.productList);
            vm.render();
        });

    },
    render(){        
        const vm = this;
        let app = document.querySelector("#app");
        let html = ``;
        vm.productList.forEach(element => {
            html +=`
            <div class="card">
            <img src="${ element.imageUrl[0] }" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${ element.title }</h5>
            <p class="card-text">${ element.content }</p>
            </div>
            </div>  
            `;
        });
        app.innerHTML = html;
    }
}