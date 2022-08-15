class Api {

    static BASEURL = 'https://api-blog-m2.herokuapp.com/' 
    static token = localStorage.getItem('Token')
    static id = localStorage.getItem('Id')

    static async createUser(data) {
        const resp = await fetch(`${this.BASEURL}user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res != null && res!= undefined && res != ''){
                window.location = `src/pages/redirection.html`
            }
        })
        .then((error) => error);
        return resp;
    };

    static async login(data) {
        const token = await fetch(`${this.BASEURL}user/login`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(data), 
        })
        .then((res) => res.json())
        .then((res) => {            
            if(res.token != null && res.token != undefined && res.token != ''){
                localStorage.setItem("Token", res.token)
                localStorage.setItem("Id", res.userId)
                window.location = `redirection.html`
            }
        })
        .catch((error) => error);
        return token;
    }

    static async getPost() {
        const response = await fetch(`${this.BASEURL}post`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${Api.token}` ,
            "Content-Type": "application/json"
        },
        })
        .then(res => res.json())
        .then(data => data);
        return response
    };

    static async getUser(userId) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/user/${userId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
        })
        .then((res) => res.json());    
        return response
    }
    
    static async createPost(post) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
            body: JSON.stringify(post),
        })
        .then((res) => res.json());    
        return response
    }

    static async listPostPag(elem) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post?page=${elem}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
        })
        .then((res) => res.json());    
        return response
    }

    static async listPost(elem) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${elem}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
        })
        .then((res) => res.json());    
        return response
    }
    
    static async patchPost(id, content) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
            body: JSON.stringify(content),
        })
        .then((res) => res.json());    
        return response
    }
    
    static async deletePost(id) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api.token}`,
            },
        });
    }
}


export { Api }