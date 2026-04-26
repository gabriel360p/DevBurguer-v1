/*
    Voce pensa muito como objeto, lembre que pode usar a posição da array!
*/

const catalogue = [

    { id: 0, name: 'X-Salada', price: 30, vegan: false, src: './img/xsalada.jpeg' },

    { id: 1, name: 'X-Bacon', price: 34, vegan: false, src: './img/xbacon.png' },

    { id: 2, name: 'X-Bacon Egg', price: 39, vegan: false, src: './img/bacon-egg.png' },

    { id: 3, name: 'Monstruoso', price: 50, vegan: false, src: './img/monstruoso.png' },

    { id: 4, name: 'Big Vegano', price: 55, vegan: true, src: './img/xvegan.png' },

    { id: 5, name: 'X-Vegan', price: 45, vegan: true, src: './img/monstruoso-vegan.png' },

]







const cart = [];
cart.push(catalogue[0])
console.log(cart[0])

