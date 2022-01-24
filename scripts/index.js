Vue.component("todo-item", {
    props: ["todo"],
    template: "<li>{{ todo.text }}</li>"
})

Vue.component('child', {
    // JavaScript는 camelCase
    props: ['myMessage'],
    template: '<span>{{ myMessage }}</span>'
})

var app = new Vue({
    el: '#app',
    data: {
        title: "어서오세요!",
        message: 'Hello Vue!!!',
        parentMsg: "melong!!",
        my_items: [
            { id: 0, name: "web"},
            { id: 1, name: "is"},
            { id: 2, name: "free"}
        ],
        isMan: true,
        gender: 0,
        age: 65,
        groceryList: [
            { id: 0, text: "Vegetables" },
            { id: 1, text: "Cheese" },
            { id: 2, text: "Whatever else humans are supposed to eat" },
        ],
        articles: []
    },
    created() {
        // this.getArticles()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };

        fetch("http://localhost:3000/get_articles", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .then((response) => {
                for (let i=0; i<response.totalCount; i++) {
                    const item = response.list[i]
                    this.articles.push({
                        no: item.no,
                        userNo: item.user_no,
                        contentType: item.content_type,
                        title: item.title,
                        contents: item.contents,
                        createdAt: item.created_at,
                        updatedAt: item.updated_at,
                        files: item.files,
                        viewCount: item.view_count
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        switchGender: function () {
            this.isMan = !this.isMan
        },
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        },

        getArticles: function () {
            // alert("ㅋㅋ")
            // fetch("http://localhost:3000/get_articles")
            //     .then((response) => {
            //         alert("1211")
            //         if (response.ok) {
            //             return response.json()
            //         }
            //
            //         throw new Error("Network response was not ok")
            //     })
            //     .then((json) => {
            //         alert("2323")
            //         this.articles.push({
            //             title: json.title,
            //             contents: json.contents
            //         })
            //     })
            //     .catch((error) => {
            //         alert("23445")
            //         console.log(error)
            //     })

        }
    },
    todo: {
        text: "Learn Vue",
        isComplete: false
    }
});


// var data = { a: 1}
// var vm = new Vue({
//     data: data
// })
//
// vm.a === data.a
// vm.a = 2
//
