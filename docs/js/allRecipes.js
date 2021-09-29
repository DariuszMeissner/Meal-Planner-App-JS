/**
 * Render recipes on the page
 * 
 * 
 *  */

 class Recipes {
    constructor() {

        this.allRecipesContainer = document.getElementById('allRecipes');
        this.UserNameField = document.getElementById('username');
        this.newLi;
        // div with nav recipes
        this.linkRecipes = document.querySelector('li:nth-child(2) .navApp__link');
        // dataStorage variables
        this.dataStorage = [];
        this.currentPage();
        this.renderName();
    }
    currentPage(){
        (window.location.pathname)?console.log('ok'):console.log('bad');
        this.linkRecipes.classList.add('active');
    }
    renderAllrecipes(){}
    renderName(){
        // Rendering name in navAPP
        this.yourName = localStorage.getItem('newName');
        this.UserNameField.innerText = this.yourName;
    }
}

class ShowAllRecipes extends Recipes {
    constructor(selectorName) {
        super(selectorName);
        this.renderAllrecipes();
    };
    renderAllrecipes() {
        this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

        if(this.allRecipes == null) {
            console.log('empty storage');
        } else {
            this.allRecipes.forEach(el => {
                this.newTr = document.createElement("tr");
                this.newTr.setAttribute('class', 'table__row')
                // wstawiamy wewnątrz tytuł przepisu
                this.newTr.innerHTML =
                    `
                    <td class="table__item">${el.id}</td>  
                    <td class="table__item">${el.title}</td>  
                    <td class="table__item">${el.desc}</td>
                    `;
                this.allRecipesContainer.appendChild(this.newTr);
            });
        }
        }
}

document.addEventListener('DOMContentLoaded', () => {
    const addR = new ShowAllRecipes();
})

