/*
    Voce pensa muito como objeto, lembre que pode usar a posição da array!
*/

const catalogue = [

    { id: 0, name: 'X-Salada', price: 30, vegan: false, src: './assets/xsalada.jpeg' },

    { id: 1, name: 'X-Bacon', price: 34, vegan: false, src: './assets/xbacon.png' },

    { id: 2, name: 'X-Bacon-Egg', price: 39, vegan: false, src: './assets/bacon-egg.png' },

    { id: 3, name: 'Monstruoso', price: 50, vegan: false, src: './assets/monstruoso.png' },

    { id: 4, name: 'Big-Vegano', price: 55, vegan: true, src: './assets/xvegan.png' },

    { id: 5, name: 'X-Vegan', price: 45, vegan: true, src: './assets/monstruoso-vegan.png' },

]


let cartItem = document.querySelector(".cart-itens")
let cartSection = document.querySelector(".cart-container")
let catalogueSection = document.querySelector(".catalogue-container")
let buyingSection = document.querySelector(".buying-container")
let cartStorage = []

let descontos = []
let valuesView = []
//     {
//         name:"",
//         priceNoDiscont:0,
//         priceWithDiscont:0,
//     }
// ]
let SumDescontosAllValues = []
let valueTotalComum = 0


//Construindo a estrutura dos cards
function createCard(id, name, src, price, vegan) {
    /*
        Estou retornando na saída da minha função o código HTML para o js conseguir gerar os cards
    */
    return `
                <div class="card">
                <div class="card-header">
                    <h2 class="food-title">${name}</h2>
                </div>
                <div class="card-body">

                    <figure>
                        <picture><img class="picture-food-catalogue" src="${src}" alt="${name}">
                        </picture>
                    </figure>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
                <div class="card-footer">
                    <div class="card-footer-price">
                        <p>Preço: R$ ${price}</p>
                    </div>
                    <div class="card-footer-button">
                        
                        <i class="bi bi-cart" id="${name}"></i>
                    </div>
                </div>

            </div>

        `
}






// Gerando o Catalogo automáticamente via JS
catalogue.forEach(item => {
    /*
        Eu criei a função createCard, blz, ai agora estou percorrendo minha array e passando os dados para a função que vai retornar o card com os dados 
        dos itens que estão dentro da Array
    */
    // catalogueSection.insertAdjacentHTML("beforeend", createCard(item.id, item.name, item.src, item.price, item.vegan))
    catalogueSection.insertAdjacentHTML("beforeend", createCard(item.id, item.name, item.src, item.price, item.vegan))
    //Estou usando o insertAdjacentHTML para ADICIONAR os blocos de código HTML na minha div catalogue-container

    // catalogueSection.innerHTML+=createCard(item.id, item.name, item.src, item.price, item.vegan)
    //Diferente do innerHTML, o insert ele adicionar os elementos enquanto o inner destrói e reconstrói
});






//Controle de mostrar Catalogo e Carrinho
document.querySelector(".bi.bi-house").addEventListener("click", () => {
    catalogueSection.style.display = "grid" //Mostrando o catalogo ja gerado anteriormente    
    cartSection.style.display = "none" //Escondendo a seção do meu carrinho de compras
    buyingSection.style.display = "none"
    cartItem.innerHTML = ""
})

document.querySelector(".bi.bi-cart").addEventListener("click", () => {
    cartSection.style.display = "flex" //Mostrando a seção do carrinho de compras
    catalogueSection.style.display = "none" //Escondendo o meu catalogo pra mostrar só meu carrinho
    buyingSection.style.display = "none"

    if (cartStorage.length > 0) {
        valueTotalComum = 0
        for (let index = 0; index < cartStorage.length; index++) {
            valueTotalComum += cartStorage[index].price;
        }

        cartStorage.forEach(item => {
            priecingsBlock(item.name, item.price, 0);
            console.log(item.name, item.price, 0);
        });

        document.querySelector(".value-none-discount").innerHTML = `Valor Total sem Desconto: ${(valueTotalComum).toFixed(2)}`
    }
    cartStorage.forEach(cartIten => {
        cartItem.insertAdjacentHTML("afterbegin", createItemCart(cartIten.name, cartIten.src, cartIten.price, cartIten.id));
    });
})




//Adicionando ao carrinho
//Infelizmente estou tendo que mapear cada um deles, não consegui fazer algo dinâmico
document.querySelector("#X-Salada").addEventListener("click", () => {
    cartStorage.push(catalogue[0])
    console.log(cartStorage)
})
document.querySelector("#X-Bacon").addEventListener("click", () => {
    cartStorage.push(catalogue[1])
    console.log(cartStorage)
})
document.querySelector("#X-Bacon-Egg").addEventListener("click", () => {
    cartStorage.push(catalogue[2])
    console.log(cartStorage)
})
document.querySelector("#Monstruoso").addEventListener("click", () => {
    cartStorage.push(catalogue[3])
    console.log(cartStorage)
})
document.querySelector("#Big-Vegano").addEventListener("click", () => {
    cartStorage.push(catalogue[4])
    console.log(cartStorage)
})
document.querySelector("#X-Vegan").addEventListener("click", () => {
    cartStorage.push(catalogue[5])
    console.log(cartStorage)
})


function createItemCart(name, src, price, id) {
    return `
        <div class="cart-item">
            <div class="div-item-picture">
                <img src="${src}" alt="${name}">
            </div>
            <div class="cart-item-informations">
                <div class="div-tem-name">
                    <p>Lanche: ${name}</p>
                </div>
                <div class="div-tem-price">
                    <p>R$ ${price}</p>
                </div>
            </div>
        </div>
    `
}


//Zerando Carrinho
document.querySelector(".btn-deleteAll").addEventListener("click", () => {
    if (cartStorage.length > 0) {

        cartStorage = []
        cartItem.innerHTML = ""
        descontos = []
        SumDescontosAllValues = []
        valueTotalComum = 0
        document.querySelector(".value-none-discount").innerHTML = ""
        document.querySelector(".value-with-discount").innerHTML = ""
        document.querySelector(".itens-discont-list").innerHTML = ""
    } else {
        alert("O Carrinho está vazio!")
    }

})







function priecingsBlock(priceWithDiscont, name) {
    return `
        <p>${name}</p>
        <p>Preço com desconto: R$ ${priceWithDiscont}</p>
        <div class="divisor"></div>
    `
}




// value-with-discount
//calculando desconto

document.querySelector(".btn-discount").addEventListener("click", () => {
    if (cartStorage.length > 0) {

        SumDescontosAllValues = []
        descontos = []
        document.querySelector(".itens-discont-list").innerHTML = ""

        //calculando a porcentagem
        desconto = (document.querySelector(".discount-input").value / 100).toFixed(2);

        descontos = cartStorage.map((item) => {

            //conseguindo o valor de desconto
            let valorDesconto = (item.price * desconto).toFixed(2);

            //aplicando o desconto
            let descontoAplicado = item.price - valorDesconto

            console.log(descontoAplicado)
            return descontoAplicado;
        })

        // descontos.reverse()

        for (let index = 0; index < cartStorage.length; index++) {
            const itemCart = cartStorage[index].name;
            const itemDiscont = descontos[index];

            document.querySelector(".itens-discont-list").insertAdjacentHTML("beforeend", priecingsBlock(itemDiscont, itemCart))

        }

        SumDescontosAllValues = descontos.reduce((acc, valorAtual) => {
            return acc + valorAtual;
        }, 0)

        document.querySelector(".value-with-discount").innerHTML = `Valor Total com Desconto: ${(SumDescontosAllValues).toFixed(2)}`
    } else {
        alert("O Carrinho está vazio!")
    }
})

document.querySelector(".btn-buying").addEventListener("click", () => {
    buyingSection.style.display = "flex"
    cartSection.style.display = "none" //Mostrando a seção do carrinho de compras
    catalogueSection.style.display = "none" //Escondendo o meu catalogo pra mostrar só meu carrinho
})

//filtrando pedidos
let inputValue = document.querySelector(".option-search-bar").value;
document.querySelector(".bi.bi-search").addEventListener("click", () => {
    let filtro=[];
    filtro = catalogue.filter(produto => produto.name.includes('x'));
    console.log(filtro)
    console.log(inputValue)
})
