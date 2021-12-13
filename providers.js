class Providers {

    constructor() {
        this.url = "https://demo-drinkstore-server.herokuapp.com/v1/";
    }

    async getCategories() {

        let url = this.url + "categories";
        const response = await fetch(url, {
            method:'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Headers':'*' 
            },
            mode: 'cors',
        })
        return response.json();
    }

    async getProducts(req) {

        let url = this.url + "products";
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Headers':'*' 
            },
            mode: 'cors',
            body: JSON.stringify(req)
        });
        return response.json()
    }
}