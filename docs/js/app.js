/**
 * Save name in to local storage
 * and disaply it,
 * next hide welcome section
 *  */

class Dashboard {
    constructor(selectorName) {
        // 
        this.addNameBtn = document.querySelector(selectorName);
        this.inputName = document.getElementById('name');
        this.UserNameField = document.getElementById('username');
        this.welcomeSection = document.getElementById('welcome');
        this.UserNameStorage;
        this.returnSection = document.getElementById('return');
        // 
        this.modalRecipe = document.getElementById('modalRecipe');
        this.addRecipeBtn = document.getElementById(selectorName);
        this.closeSaveRecipeBtn = document.getElementById('closeRecipe');
        this.cancelRecipeBtn = document.getElementById('cancelRecipe');

        this.addInstructionBtn = document.getElementById('add__instructon');
        this.addIngredientBtn = document.getElementById('add__ingredient');

        this.recipeName = document.getElementById('recipeName');
        this.recipeDesc = document.getElementById('recipeDesc');

        this.removeItemsBtn;
        
        this.instruction = document.getElementById('instruction');
        this.ingredient = document.getElementById('ingredient');

        this.newInstructionsList = document.getElementById('instructionsList');
        this.newIngredientsList = document.getElementById('ingredientsList');

        this.itemInstruction;
        this.itemIngredient;

        this.warning = document.querySelector('.warning');
        this.allRecipesContainer = document.getElementById('allRecipes');
        this.newLi;
        this.newRecipe = {
            id:'',
            title: "", // name of recipe
            desc: "", // name of desc
            instructions: [], // instructions
            ingredients: [] // instructions
        }
        // dataStorage variables
        this.dataStorage = [];
        // Auxiliary variable for displaying name on the page
        this.yourName;
        // The modal box close - set false
        this.isItOpen = false;
        // div with nav dashboard
        this.linkRecipes = document.querySelector('li:nth-child(1) .navApp__link');
        // Start initEvents
        this.initEvents();
        this.hideSectionWelcome(this.istItLogged());
        this.currentPage();
    }
    
    currentPage(){
        this.linkRecipes.classList.add('active');
    }
    istItLogged() {
        if (localStorage.getItem("newName") != null) {
            return true;
        } else {
            return false;
        }
    }
    // Saving in storage 
    saveToLocalStorage(name) {
        console.log('napisz metodę w odpowiedniej klasie');
    }
    render() {
        console.log('napisz metodę w odpowiedniej klasie');
    }

    hideSectionWelcome(istItLogged) {
        console.log('napisz metodę w odpowiedniej klasie');
    }
    initEvents() {

    }
}


class UserName extends Dashboard {
    constructor(selectorName) {
        super(selectorName);
        // Displaying name after refresh page
        this.render();
    }
    saveToLocalStorage(name) {
        // Saving name in storage 
        this.UserNameStorage = name;
        localStorage.setItem("newName", this.UserNameStorage);

        console.log("Imię zapisane do localStorage");
    }
    hideSectionWelcome(istItLogged) {
        // Hiding welcome section
        (istItLogged == true) ? this.welcomeSection.classList.remove('show') : this.welcomeSection.classList.add('show');
        // Hiding return section
        (istItLogged == true) ? this.returnSection.classList.add('show') : this.returnSection.classList.remove('show');

    }
    render() {
        // Rendering name in navAPP
        this.yourName = localStorage.getItem('newName');
        this.UserNameField.innerText = this.yourName;
    }
    initEvents() {
        this.addNameBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveToLocalStorage(this.inputName.value);
            this.render();
            this.hideSectionWelcome(this.istItLogged());
        })
    }
}

class AddRecipe extends Dashboard {
    constructor(selectorName) {
        super(selectorName);
        this.removeItem();
    };
    generateId(){
        if (localStorage.getItem('recipes') != null) {
            this.allRecipes = JSON.parse(localStorage.getItem("recipes"));
            return this.allRecipes.length + 1;
        } else {
            return 1;
        }
    }
    renderInstruction(instruction,empty) {
        this.newLi = document.createElement('li');
        this.newLi.innerHTML = 
        `
        <span class="itemRecipes">${instruction}</span>
        <i class="removeItem fas fa-trash-alt" title="usuń wiersz"></i>
        `;
        if(empty == false) {
            console.log('no value');
        } else {
            (this.newLi.innerText == '') ? console.log('brak danych') : this.newInstructionsList.appendChild(this.newLi);
            // clearing instruction field
            this.instruction.innerText = '';
        }
    }
    renderIngredient(ingredient,empty) {
        this.newLi = document.createElement('li');
        this.newLi.innerHTML = 
        `
        <span class="itemRecipes">${ingredient}</span>
        <i class="removeItem fas fa-trash-alt" title="usuń wiersz"></i>
        `;
        if (empty == false) {
            console.log('no value');
        } else {
            (this.newLi.innerText == '') ? console.log('brak danych') : this.newIngredientsList.appendChild(this.newLi);
            // clearing instruction field
            this.ingredient.innerText = '';
        }
    }
    removeItem() {
        this.removeItemsBtn = document.querySelectorAll('.removeItem');
        
        
        this.removeItemsBtn.forEach( btn => {
            btn.addEventListener('click', (e) => {
                this.itemInstruction = e.currentTarget.parentElement.firstElementChild.innerText;
                this.itemIngredient = e.currentTarget.parentElement.firstElementChild.innerText;

                e.currentTarget.parentElement.remove();
                this.newRecipe.instructions= this.newRecipe.instructions.filter( (item) => {
                    return item != this.itemInstruction;
                })
                this.newRecipe.ingredients= this.newRecipe.ingredients.filter( (item) => {
                    return item != this.itemIngredient;
                })
                console.log(this.newRecipe.instructions);
                console.log(this.newRecipe.ingredients);
            })
        })
        
    }
    
    showModal() {
        this.modalRecipe.style.visibility = 'visible';
    }
    cancelModal() {
        this.modalRecipe.style.visibility = 'hidden';
        this.clearInputs();
    }
    isItEmptyInstruction() {
        if (this.instruction.innerText == '') {
            return false;
        } else {
            return true;
        }
    }
    isItEmptyIngredient() {
        if (this.ingredient.innerText == '') {
            return false;
        } else {
            return true;
        }
    }
    checkEmptyInputs() {
        if (this.newInstructionsList.innerText == '' 
        || this.newIngredientsList == '' || this.recipeName.innerText == '' 
        || this.recipeDesc.innerText == '') {
            return false;
        } else {
            this.closeSaveModal();
        }
    }

    showWarning(isempty,info) {
        if(isempty == false) {
            this.warning.classList.add('show');
            this.warning.firstElementChild.innerText = info;
        } else {
            this.warning.classList.remove('show');
        }
    }

    insertTitleAndDesc(id) {
        this.newRecipe.title = this.recipeName.innerText;
        this.newRecipe.desc = this.recipeDesc.innerText;
        this.newRecipe.id = id;
        
    }

    insertInstruction(isItEmptyInstruction) {
        if (isItEmptyInstruction === false) {
            console.log('warning no instruction');
        } else {
            this.newRecipe.instructions.push(this.instruction.innerText);
            console.log(this.newRecipe.instructions);
        }
    }

    insertIngredients(isItEmptyIngredient) {
        if (isItEmptyIngredient === false) {
            console.log('warning no ingredient');
        } else {
            this.newRecipe.ingredients.push(this.ingredient.innerText);
            console.log(this.newRecipe.ingredients);
        }
    }
    saveToLocalStorage(newObject) {
        if (localStorage.getItem('recipes') != null) {
            this.dataStorage = JSON.parse(localStorage.getItem("recipes"));
            this.dataStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(this.dataStorage));
        } else {
            this.dataStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(this.dataStorage));
        }
        console.log('Recipe added');
    }

    closeSaveModal() {
        this.saveToLocalStorage(this.newRecipe);
        this.modalRecipe.style.visibility = 'hidden';
    }
    clearInputs() {
        this.recipeName.innerText = '';
        this.recipeDesc.innerText = '';
        this.instruction.innerText = '';
        this.ingredient.innerText = '';
        this.newInstructionsList.innerHTML = '';
        this.newIngredientsList.innerHTML = '';
        this.warning.firstElementChild.innerText = '';
    }
    initEvents() {
        this.addRecipeBtn.addEventListener('click', (e) => {
            this.clearInputs();
            this.showModal();
        })
        this.cancelRecipeBtn.addEventListener('click', (e) => {
            this.cancelModal();
        })
        this.addInstructionBtn.addEventListener('click', () => {
            this.insertInstruction(this.isItEmptyInstruction());
            this.renderInstruction(this.instruction.innerText,this.isItEmptyInstruction());
            this.removeItem();
           
        })
        this.addIngredientBtn.addEventListener('click', () => {
            this.insertIngredients(this.isItEmptyIngredient());
            this.renderIngredient(this.ingredient.innerText,this.isItEmptyIngredient());
            this.removeItem();
        })
        this.closeSaveRecipeBtn.addEventListener('click', (e) => {
            this.insertTitleAndDesc(this.generateId());
            this.checkEmptyInputs();
            this.showWarning(this.checkEmptyInputs(), 'Wypełnij wszystkie pola!');
            console.log(this.newRecipe);
        })
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = new UserName('#welcome__submit');
    const addR = new AddRecipe('b1');
})

