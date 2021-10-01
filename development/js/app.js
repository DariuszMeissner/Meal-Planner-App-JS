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
        this.recipesSection = document.querySelector('.recipes');
        this.schedulesSection = document.querySelector('.schedules');
        // 
        this.modalRecipe = document.getElementById('modalRecipe');
        this.modalSchedule = document.getElementById('modalSchedule');
        this.addRecipeBtn = document.getElementById(selectorName);
        this.addScheduleBtn = document.getElementById(selectorName);
        this.closeSaveRecipeBtn = document.getElementById('closeRecipe');
        this.closeSaveScheduleBtn = document.getElementById('closeSchedule');
        this.cancelRecipeBtn = document.getElementById('cancelRecipe');
        this.cancelScheduleBtn = document.getElementById('cancelSchedule');

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
        this.allSchedulesContainer = document.getElementById('allSchedules');
        this.newLi;
        this.newRecipe = {
            id: '',
            title: "", // name of recipe
            desc: "", // name of desc
            instructions: [], // instructions
            ingredients: [] // instructions
        }

        // dataStorage variables
        this.dataStorage = [];
        this.dataScheduleStorage = [];
        // Auxiliary variable for displaying name on the page
        this.yourName;
        // The modal box close - set false
        this.isItOpen = false;
        // divs with links
        this.linkDashboard = document.querySelector('li:nth-child(1) .navApp__link');
        this.linkRecipes = document.querySelector('li:nth-child(2) .navApp__link');
        this.linkSchedule = document.querySelector('li:nth-child(3) .navApp__link');



        this.UserNameField = document.getElementById('username');
        // dataStorage variables
        this.notifi = {
            info: document.getElementById('info'),
            warning: document.getElementById('warning'),
            success: document.getElementById('success'),
        }
        this.newSchedule = {
            id: '',
            title: '',
            desc: '',
            week: '',
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: [],
        }
        this.schedule = {
            name: document.getElementById('scheduleName'),
            desc: document.getElementById('scheduleDesc'),
            week: document.getElementById('scheduleWeekNr'),
            mon: document.querySelectorAll('.mon'),
            tue: document.querySelectorAll('.tue'),
            wed: document.querySelectorAll('.wed'),
            thu: document.querySelectorAll('.thu'),
            fri: document.querySelectorAll('.fri'),
            sat: document.querySelectorAll('.sat'),
            sun: document.querySelectorAll('.sun'),

        }

        this.insertRecipeList = document.querySelectorAll('.recipeList');

        this.renderName();
        this.initEvents();
        this.hideSectionWelcome(this.istItLogged());
        this.currentPage();
        this.numberOfRecipes();

    }
    numberOfRecipes() {
        this.allRecipes = JSON.parse(localStorage.getItem("recipes"));
        if (this.returnSection) {
            if (this.allRecipes === null) {
                this.notifi.info.innerText = `Masz 0 przepisów`;
            } else {
                this.notifi.info.innerText = `Masz już ${this.allRecipes.length} przespisy, nieźle`;
            }
        }
    }
    renderAllrecipes() { }
    renderName() {
        // Rendering name in navAPP
        this.yourName = localStorage.getItem('newName');
        this.UserNameField.innerText = this.yourName;
    }
    generateId() { }
    currentPage() {
        (window.location.pathname === '/recipes.html') ? this.linkRecipes.classList.add('active') : this.linkRecipes.classList.remove('active');
        (window.location.pathname === '/app.html') ? this.linkDashboard.classList.add('active') : this.linkDashboard.classList.remove('active');
        (window.location.pathname === '/schedules.html') ? this.linkSchedule.classList.add('active') : this.linkSchedule.classList.remove('active');
    }
    istItLogged() {
        if (localStorage.getItem("newName") != null) {
            return true;
        } else {
            return false;
        }
    }
    // Saving in storage 
    saveToLocalStorage(name) { }
    render() { }
    hideSectionWelcome(istItLogged) { }
    initEvents() { }
}




class AddSchedule extends Dashboard {
    constructor(selectorName) {
        super(selectorName);
        console.log(localStorage.getItem('schedules'));
    };
    generateId() {
        if (localStorage.getItem('schedules') != null) {
            this.allSchedules = JSON.parse(localStorage.getItem("schedules"));
            return this.allSchedules.length + 1;
        } else {
            return 1;
        }
    }
    showModal() {
        this.modalSchedule.style.visibility = 'visible';
    }
    cancelModal() {
        this.modalSchedule.style.visibility = 'hidden';
        this.clearInputs();
    }
    clearInputs() {
        this.newSchedule.title = '';
        this.newSchedule.desc = '';
        this.newSchedule.week = '';
    }
    closeSaveModal() {
        this.insertInput(this.generateId())
        this.saveToLocalStorage(this.newSchedule);
        this.modalSchedule.style.visibility = 'hidden';
        console.log(localStorage.getItem('schedules'));
    }
    insertInput(id) {
        this.newSchedule.id = id;
        this.newSchedule.title = this.schedule.name.innerText;
        this.newSchedule.desc = this.schedule.desc.innerText;
        this.newSchedule.week = this.schedule.week.innerText;

        this.newSchedule.mon.push([...this.schedule.mon].map(el => el.value));
        this.newSchedule.tue.push([...this.schedule.tue].map(el => el.value));
        this.newSchedule.wed.push([...this.schedule.wed].map(el => el.value));
        this.newSchedule.thu.push([...this.schedule.thu].map(el => el.value));
        this.newSchedule.fri.push([...this.schedule.fri].map(el => el.value));
        this.newSchedule.sat.push([...this.schedule.sat].map(el => el.value));
        this.newSchedule.sun.push([...this.schedule.sun].map(el => el.value));
        console.log(this.newSchedule);
    }
    insertRecipesInSelect() {
        this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

        if (this.allRecipes == null) {
            console.log('empty storage');
        } else {
            // set on empty innerhtml
            this.insertRecipeList.forEach(el => el.innerHTML = `<option data-id='0' value='posiłek'>posiłek</option>`);

            this.allRecipes.forEach(el => {
                this.newOption = document.createElement('option');
                this.newOption.innerText = el.title;
                this.newOption.setAttribute('data-id', el.id);
                this.newOption.setAttribute('value', el.title);
                // rendering all recipes in select option
                this.insertRecipeList.forEach(el => el.appendChild(this.newOption.cloneNode(true)));
            });

        }
    }
    saveToLocalStorage(newObject) {
        if (localStorage.getItem('schedules') != null) {
            this.dataScheduleStorage = JSON.parse(localStorage.getItem("schedules"));
            this.dataScheduleStorage.push(newObject);
            localStorage.setItem("schedules", JSON.stringify(this.dataScheduleStorage));
        } else {
            this.dataScheduleStorage.push(newObject);
            localStorage.setItem("schedules", JSON.stringify(this.dataScheduleStorage));
        }
        console.log('Schedules added');
    }
    initEvents() {
        if (this.returnSection || this.schedulesSection) {
            this.addScheduleBtn.addEventListener('click', (e) => {
                this.showModal();
                this.clearInputs();
                this.insertRecipesInSelect();
            })
            this.cancelScheduleBtn.addEventListener('click', (e) => {
                this.cancelModal();
            })
            this.closeSaveScheduleBtn.addEventListener('click', (e) => {
                this.closeSaveModal()
            })
        }
    }
}

class AddRecipe extends Dashboard {
    constructor(selectorName) {
        super(selectorName);
        this.removeItem();
    };
    generateId() {
        if (localStorage.getItem('recipes') != null) {
            this.allRecipes = JSON.parse(localStorage.getItem("recipes"));
            return this.allRecipes.length + 1;
        } else {
            return 1;
        }
    }
    renderInstruction(instruction, empty) {
        this.newLi = document.createElement('li');
        this.newLi.innerHTML =
            `
        <span class="itemRecipes">${instruction}</span>
        <i class="removeItem fas fa-trash-alt" title="usuń wiersz"></i>
        `;
        if (empty == false) {
            console.log('no value');
        } else {
            (this.newLi.innerText == '') ? console.log('brak danych') : this.newInstructionsList.appendChild(this.newLi);
            // clearing instruction field
            this.instruction.innerText = '';
        }
    }
    renderIngredient(ingredient, empty) {
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


        this.removeItemsBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.itemInstruction = e.currentTarget.parentElement.firstElementChild.innerText;
                this.itemIngredient = e.currentTarget.parentElement.firstElementChild.innerText;

                e.currentTarget.parentElement.remove();
                this.newRecipe.instructions = this.newRecipe.instructions.filter((item) => {
                    return item != this.itemInstruction;
                })
                this.newRecipe.ingredients = this.newRecipe.ingredients.filter((item) => {
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

    showWarning(isempty, info) {
        if (isempty == false) {
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
        if (this.returnSection || this.recipesSection) {
            this.addRecipeBtn.addEventListener('click', (e) => {
                this.clearInputs();
                this.showModal();
            })
            this.cancelRecipeBtn.addEventListener('click', (e) => {
                this.cancelModal();
            })
            this.addInstructionBtn.addEventListener('click', () => {
                this.insertInstruction(this.isItEmptyInstruction());
                this.renderInstruction(this.instruction.innerText, this.isItEmptyInstruction());
                this.removeItem();
    
            })
            this.addIngredientBtn.addEventListener('click', () => {
                this.insertIngredients(this.isItEmptyIngredient());
                this.renderIngredient(this.ingredient.innerText, this.isItEmptyIngredient());
                this.removeItem();
            })
            this.closeSaveRecipeBtn.addEventListener('click', (e) => {
                this.insertTitleAndDesc(this.generateId());
                this.checkEmptyInputs();
                this.showWarning(this.checkEmptyInputs(), 'Wypełnij wszystkie pola!');
                this.numberOfRecipes();
                console.log(this.newRecipe);
            })
        }


    }
}

class ShowAllSchedules extends Dashboard {
    constructor() {
        super();
        this.renderAllSchedules();
    };
    renderAllSchedules() {
        if (this.allSchedulesContainer) {

            this.allSchedules = JSON.parse(localStorage.getItem("schedules"));

            if (this.allSchedules == null) {
                console.log('empty storage');
            } else {
                // set on empty innerhtml
                this.allSchedulesContainer.innerHTML = '';
                this.allSchedules.forEach(el => {
                    this.newTr = document.createElement("tr");
                    this.newTr.setAttribute('class', 'table__row')
                    // wstawiamy wewnątrz tytuł przepisu
                    this.newTr.innerHTML =
                        `
                        <td class="table__item">${el.id}</td>  
                        <td class="table__item">${el.title}</td>  
                        <td class="table__item">${el.desc}</td>
                        <td class="table__item">${el.week}</td>
                        `;
                    this.allSchedulesContainer.appendChild(this.newTr);
                });
            }
        }

    }
    initEvents() {
        if (this.allSchedulesContainer) {
            this.closeSaveScheduleBtn.addEventListener('click', (e) => {
                console.log(this.allSchedules);
                this.renderAllSchedules();
            })
        }
    }
}
class ShowAllRecipes extends Dashboard {
    constructor() {
        super();
        this.renderAllrecipes();
    };
    renderAllrecipes() {
        if (this.allRecipesContainer) {

            this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

            if (this.allRecipes == null) {
                console.log('empty storage');
            } else {
                // set on empty innerhtml
                this.allRecipesContainer.innerHTML = '';
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
    initEvents() {
        if (this.allRecipesContainer) {
            this.closeSaveRecipeBtn.addEventListener('click', (e) => {
                console.log(this.allRecipes);
                this.renderAllrecipes();
            })
        }
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
        if (this.returnSection) {
            // Hiding welcome section
            (istItLogged == true) ? this.welcomeSection.classList.remove('show') : this.welcomeSection.classList.add('show');
            // Hiding return section
            (istItLogged == true) ? this.returnSection.classList.add('show') : this.returnSection.classList.remove('show');
        }
    }
    render() {
        // Rendering name in navAPP
        this.yourName = localStorage.getItem('newName');
        this.UserNameField.innerText = this.yourName;
    }
    initEvents() {
        if (this.returnSection) {
            this.addNameBtn.addEventListener('click', (e) => {
                this.saveToLocalStorage(this.inputName.value);
                this.render();
                this.hideSectionWelcome(this.istItLogged());
            })
        }

    }
}





document.addEventListener('DOMContentLoaded', () => {
    const user = new UserName('#welcome__submit');
    const addR = new AddRecipe('b1');
    const addS = new AddSchedule('b2');
    const showRecipes = new ShowAllRecipes();
    const showSchedules = new ShowAllSchedules();
})

