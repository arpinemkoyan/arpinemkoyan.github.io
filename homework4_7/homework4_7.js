let pname = document.querySelector("input");
let ul_list = document.querySelector("ul");
let products = [];
let dele = document.querySelector("input + i");
pname.addEventListener("keydown", ((e) => {
    if (e.key == "Enter") {
        if (localStorage.length) {
            products.push(...JSON.parse(localStorage.getItem("product_name")))
        }

        if (products.length != 0) {
            if (products.length >= 1) {
                products.length = 0
            }
            products.push(...JSON.parse(localStorage.getItem("product_name")))
        }

        products.push({ "product_name": pname.value });
        pname.value = ""
        ul_list.innerHTML = ""
        localStorage.setItem("product_name", JSON.stringify(products));

        printData();
    }
}));

function Grocery(pname) {
    this.pname = pname;
    let li_elem = document.createElement("li");
    li_elem.setAttribute("onclick", "addLine(this)")
    li_elem.innerHTML = `${this.pname}`
    ul_list.appendChild(li_elem);
}

function printData() {

    if (localStorage.length != 0) {
        for (let i of JSON.parse(localStorage.getItem("product_name"))) {
            new Grocery(i.product_name)
        }

    }
}

function addLine(elem) {
    elem.style.textDecoration = "line-through"
}
dele.addEventListener("click", () => {
    localStorage.removeItem("product_name")
    ul_list.innerHTML = ""

})