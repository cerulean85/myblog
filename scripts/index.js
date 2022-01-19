Vue.component("todo-item", {
    props: ["todo"],
    template: "<li>{{ todo.text }}</li>"
})

var app = new Vue({
    el: '#app',
    data: {
        title: "어서오세요!",
        message: 'Hello Vue!!!',
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
        ]
    },
    methods: {
        switchGender: function () {
            this.isMan = !this.isMan
        },
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
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
