class Dashboard {
  constructor(selectorName) {
    //
    this.statePLan = 0;
    this.addNameBtn = document.querySelector(selectorName);
    this.inputName = document.getElementById("name");
    this.UserNameField = document.getElementById("username");
    this.welcomeSection = document.getElementById("welcome");

    this.returnSection = document.getElementById("return");
    this.recipesSection = document.querySelector(".recipes");
    this.schedulesSection = document.querySelector(".schedules");
    this.weekPlanSection = document.getElementById("weekPlan");
    //
    this.modalRecipe = document.getElementById("modalRecipe");
    this.modalSchedule = document.getElementById("modalSchedule");

    this.addRecipeBtn = document.getElementById(selectorName);
    this.addScheduleBtn = document.getElementById(selectorName);

    this.closeSaveRecipeBtn = document.getElementById("closeRecipe");
    this.closeSaveScheduleBtn = document.getElementById("closeSchedule");
    this.cancelRecipeBtn = document.getElementById("cancelRecipe");
    this.cancelScheduleBtn = document.getElementById("cancelSchedule");

    this.addInstructionBtn = document.getElementById("add__instructon");
    this.addIngredientBtn = document.getElementById("add__ingredient");

    this.recipeName = document.getElementById("recipeName");
    this.recipeDesc = document.getElementById("recipeDesc");

    this.insertRecipeList = document.querySelectorAll(".recipeList");

    this.instruction = document.getElementById("instruction");
    this.ingredient = document.getElementById("ingredient");

    this.newInstructionsList = document.getElementById("instructionsList");
    this.newIngredientsList = document.getElementById("ingredientsList");

    this.warning = document.querySelector(".warning");
    this.warningSchedule = document.getElementById("warningSchedule");
    this.allRecipesContainer = document.getElementById("allRecipes");
    this.allSchedulesContainer = document.getElementById("allSchedules");
    this.newLi;
    this.newRecipe = {
      id: "",
      title: "", // name of recipe
      desc: "", // name of desc
      instructions: [], // instructions
      ingredients: [], // instructions
    };
    // dataStorage variables
    this.dataStorage = [];
    this.dataScheduleStorage = [];
    // Auxiliary variable for displaying name on the page
    this.yourName;
    // The modal box close - set false
    this.isItOpen = false;
    // divs with links
    this.linkDashboard = document.querySelector("li:nth-child(1) .navApp__link");
    this.linkRecipes = document.querySelector("li:nth-child(2) .navApp__link");
    this.linkSchedule = document.querySelector("li:nth-child(3) .navApp__link");

    this.prevPlan = document.getElementById("prevPlan");
    this.nextPlan = document.getElementById("nextPlan");

    this.weekTitle = document.querySelector(".week__title");
    this.date = new Date();
    this.UserNameField = document.getElementById("username");
    // dataStorage variables
    this.notifi = {
      info: document.getElementById("info"),
      warning: document.getElementById("warning"),
      success: document.getElementById("success"),
    };
    this.newSchedule = {
      id: "",
      title: "",
      desc: "",
      week: "",
      allDays: [
        {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: [],
        },
        {},
      ],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };
    this.schedule = {
      name: document.getElementById("scheduleName"),
      desc: document.getElementById("scheduleDesc"),
      week: document.getElementById("scheduleWeekNr"),
      mon: document.querySelectorAll(".mon"),
      tue: document.querySelectorAll(".tue"),
      wed: document.querySelectorAll(".wed"),
      thu: document.querySelectorAll(".thu"),
      fri: document.querySelectorAll(".fri"),
      sat: document.querySelectorAll(".sat"),
      sun: document.querySelectorAll(".sun"),
    };

    this.renderName();
    this.initEvents();
    this.hideSectionWelcome(this.istItLogged());
    this.currentPage();
    this.numberOfRecipes();
    this.getWeekPtototype();
    this.notification();
  }

  // added function getweek to data object based on ISO
  getWeekPtototype() {
    Date.prototype.getWeek = function () {
      var date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    };
  }
  notification() {
    this.warningNoPlan = document.querySelector(".notifi__item--yellow");
    this.allSchedules = JSON.parse(localStorage.getItem("schedules"));

    if (this.returnSection) {
      if (this.allSchedules === null) {
        this.warningNoPlan.style.display = "flex";
      } else if (this.allSchedules.length > 0) {
        this.warningNoPlan.style.display = "none";
      }
    }
  }
  numberOfRecipes() {
    this.infoNoPlans = document.querySelector(".info__noPlans");
    this.tablePlan = document.querySelector(".week__tableSection");
    this.allRecipes = JSON.parse(localStorage.getItem("recipes"));
    this.allSchedules = JSON.parse(localStorage.getItem("schedules"));

    if (this.returnSection) {
      if (this.allSchedules === null && this.allRecipes === null) {
        this.infoNoPlans.style.display = "flex";
        this.tablePlan.style.display = "none";
        this.notifi.info.innerText = `Nie ustawiłeś żadnych planów i przepisów`;
      }
      if (this.allSchedules === null && this.allRecipes !== null) {
        this.infoNoPlans.style.display = "flex";
        this.tablePlan.style.display = "none";
        this.notifi.info.innerText = `Przepisy: ${this.allRecipes.length}, Plany: 0`;
      } else {
         this.infoNoPlans.style.display = "none";
         this.tablePlan.style.display = "block";
         this.notifi.info.innerText = `Przepisy: ${this.allRecipes.length}, Plany: ${this.allSchedules.length}`;  
      }
      
    }
  }
  renderAllrecipes() {}
  renderName() {
    // Rendering name in navAPP
    this.yourName = localStorage.getItem("newName");
    this.UserNameField.innerText = this.yourName;
  }
  generateId() {}
  currentPage() {
    // navigation routing
    window.location.pathname === "/recipes.html" ? this.linkRecipes.classList.add("active") : this.linkRecipes.classList.remove("active");
    window.location.pathname === "/app.html" ? this.linkDashboard.classList.add("active") : this.linkDashboard.classList.remove("active");
    window.location.pathname === "/schedules.html" ? this.linkSchedule.classList.add("active") : this.linkSchedule.classList.remove("active");
  }
  istItLogged() {
    if (localStorage.getItem("newName") != null) {
      return true;
    } else {
      return false;
    }
  }
  // Saving in storage
  saveToLocalStorage(name) {}
  render() {}
  hideSectionWelcome(istItLogged) {}
  initEvents() {}
}

class Plans extends Dashboard {
  constructor() {
    super();
    this.renderPlan();
    this.showCurrentWeekInYear();
  }
  showCurrentWeekInYear() {
    if (this.returnSection) {
      this.weekCurrentTitle = document.querySelector(".week__currentTitle");
      this.weekCurrentTitle.innerText = `Mamy ${this.date.getWeek()} tydzień roku`;
    }
  }

  renderPlan() {
    if (this.returnSection) {
      this.allSchedules = JSON.parse(localStorage.getItem("schedules"));

      if (this.allSchedules == null) {
        console.log("empty storage");
      } else {
        this.allSchedules.forEach((el) => {
          if (el.week == this.date.getWeek()) {
            this.weekPlanSection.innerHTML = "";
            this.weekTitle.innerText = `Twój plan na ${this.date.getWeek()} tydzień:`;
            for (let i = 0; i < el.mon.length; i++) {
              this.newTr = document.createElement("tr");
              this.newTr.setAttribute("class", "table__row");
              this.newTr.innerHTML = `
                            <td>${el.mon[i]}</td>
                            <td>${el.tue[i]}</td>
                            <td>${el.wed[i]}</td>
                            <td>${el.thu[i]}</td>
                            <td>${el.fri[i]}</td>
                            <td>${el.sat[i]}</td>
                            <td>${el.sun[i]}</td>
                            `;
              this.weekPlanSection.appendChild(this.newTr);
            }
          } else {
              if (el.id == 1) {
                this.weekPlanSection.innerHTML = "";
              this.weekTitle.innerText = `Twój plan na ${el.week} tydzień:`;
              for (let i = 0; i < el.mon.length; i++) {
                this.newTr = document.createElement("tr");
                this.newTr.setAttribute("class", "table__row");
                this.newTr.innerHTML = `
                                <td>${el.mon[i]}</td>
                                <td>${el.tue[i]}</td>
                                <td>${el.wed[i]}</td>
                                <td>${el.thu[i]}</td>
                                <td>${el.fri[i]}</td>
                                <td>${el.sat[i]}</td>
                                <td>${el.sun[i]}</td>
                                `;
                this.weekPlanSection.appendChild(this.newTr);
              }
            }
          }
        });
      }
    }
  }
  currentPlan(n) {
    this.weekPlanSection.innerHTML = "";
    this.allSchedules = JSON.parse(localStorage.getItem("schedules"));
    this.statePLan += n;

    if (this.statePLan === this.allSchedules.length) {
      this.statePLan = 0;
      //   console.log("koniec planów, iterujemy od początku");
    }
    if (this.statePLan < 0) {
      this.statePLan = this.allSchedules.length - 1;
      //   console.log("koniec planów, iterujemy od początku");
    }

    // display plan by click of button next or prev
    this.allSchedules[this.statePLan].allDays.forEach((el, index) => {
      if (index == 0) {
        // redndering current plan of week
        this.weekTitle.innerText = `Twój plan na ${this.allSchedules[this.statePLan].week} tydzień:`;

        for (let i = 0; i < 5; i++) {
          this.newTr = document.createElement("tr");
          this.newTr.setAttribute("class", "table__row");
          this.newTr.innerHTML = `
                                      <td>${el.mon[i]}</td>
                                      <td>${el.tue[i]}</td>
                                      <td>${el.wed[i]}</td>
                                      <td>${el.thu[i]}</td>
                                      <td>${el.fri[i]}</td>
                                      <td>${el.sat[i]}</td>
                                      <td>${el.sun[i]}</td>
                                      `;
          this.weekPlanSection.appendChild(this.newTr);
        }
      }
    });
    // console.log(this.allSchedules);
    // console.log(this.statePLan);
  }
  initEvents() {
    if (this.returnSection) {
      this.closeSaveScheduleBtn.addEventListener("click", (e) => {
        console.log(this.allSchedules);
        this.renderPlan();
        this.numberOfRecipes();
      });
      this.prevPlan.addEventListener("click", () => this.currentPlan(-1));
      this.nextPlan.addEventListener("click", () => this.currentPlan(1));
    }
  }
}

class AddSchedule extends Dashboard {
  constructor(selectorName) {
    super(selectorName);
  }
  generateId() {
    if (localStorage.getItem("schedules") != null) {
      this.allSchedules = JSON.parse(localStorage.getItem("schedules"));
      return this.allSchedules.length + 1;
    } else {
      return 1;
    }
  }
  showModal() {
    this.modalSchedule.style.visibility = "visible";
  }
  cancelModal() {
    this.modalSchedule.style.visibility = "hidden";
    this.warningSchedule.classList.remove("show");
    this.clearInputs();
  }
  clearInputs() {
    this.newSchedule.title = "";
    this.newSchedule.desc = "";
    this.newSchedule.week = "";
    this.schedule.name.innerText = "";
    this.schedule.desc.innerText = "";
    this.schedule.week.innerText = "";
  }

  insertInput(id) {
    this.newSchedule.id = id;
    this.newSchedule.title = this.schedule.name.innerText;
    this.newSchedule.desc = this.schedule.desc.innerText;
    this.newSchedule.week = this.schedule.week.innerText;

    this.newSchedule.mon = [...this.schedule.mon].map((el) => el.value);
    this.newSchedule.tue = [...this.schedule.tue].map((el) => el.value);
    this.newSchedule.wed = [...this.schedule.wed].map((el) => el.value);
    this.newSchedule.thu = [...this.schedule.thu].map((el) => el.value);
    this.newSchedule.fri = [...this.schedule.fri].map((el) => el.value);
    this.newSchedule.sat = [...this.schedule.sat].map((el) => el.value);
    this.newSchedule.sun = [...this.schedule.sun].map((el) => el.value);

    this.newSchedule.allDays[0].mon = [...this.schedule.mon].map((el) => el.value);
    this.newSchedule.allDays[0].tue = [...this.schedule.tue].map((el) => el.value);
    this.newSchedule.allDays[0].wed = [...this.schedule.wed].map((el) => el.value);
    this.newSchedule.allDays[0].thu = [...this.schedule.thu].map((el) => el.value);
    this.newSchedule.allDays[0].fri = [...this.schedule.fri].map((el) => el.value);
    this.newSchedule.allDays[0].sat = [...this.schedule.sat].map((el) => el.value);
    this.newSchedule.allDays[0].sun = [...this.schedule.sun].map((el) => el.value);

    console.log(this.newSchedule.allDays);
  }
  insertRecipesInSelect() {
    this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

    if (this.allRecipes == null) {
      console.log("empty storage");
    } else {
      // set on empty innerhtml
      this.insertRecipeList.forEach((el) => (el.innerHTML = `<option data-id='0' value='posiłek'>posiłek</option>`));

      // insert all reicipes in all's select
      this.allRecipes.forEach((el) => {
        this.newOption = document.createElement("option");
        this.newOption.innerText = el.title;
        this.newOption.setAttribute("data-id", el.id);
        this.newOption.setAttribute("value", el.title);
        // rendering all recipes in select option
        this.insertRecipeList.forEach((el) => el.appendChild(this.newOption.cloneNode(true)));
      });
    }
  }

  closeSaveModal() {
    this.saveToLocalStorage(this.newSchedule);
    this.modalSchedule.style.visibility = "hidden";
    console.log(localStorage.getItem("schedules"));
  }
  checkEmptyInputs() {
    if (this.schedule.name.innerText == "" || this.schedule.desc.innerText == "" || this.schedule.week.innerText == "") {
      return false;
    } else {
      this.closeSaveModal();
    }
  }
  showWarning(isempty, info) {
    if (isempty == false) {
      this.warningSchedule.classList.add("show");
      this.warningSchedule.firstElementChild.innerText = info;
    } else {
      this.warningSchedule.classList.remove("show");
    }
  }
  saveToLocalStorage(newObject) {
    if (localStorage.getItem("schedules") != null) {
      this.dataScheduleStorage = JSON.parse(localStorage.getItem("schedules"));
      this.dataScheduleStorage.push(newObject);
      localStorage.setItem("schedules", JSON.stringify(this.dataScheduleStorage));
    } else {
      this.dataScheduleStorage.push(newObject);
      localStorage.setItem("schedules", JSON.stringify(this.dataScheduleStorage));
    }
    console.log("Schedules added");
  }
  initEvents() {
    if (this.returnSection || this.schedulesSection) {
      this.addScheduleBtn.addEventListener("click", (e) => {
        this.clearInputs();
        this.showModal();
        this.insertRecipesInSelect();
      });
      this.cancelScheduleBtn.addEventListener("click", (e) => {
        this.cancelModal();
      });
      this.closeSaveScheduleBtn.addEventListener("click", (e) => {
        this.insertInput(this.generateId());
        this.showWarning(this.checkEmptyInputs(), "Wypełnij wszystie pola!");
        console.log(this.newSchedule);
      });
    }
  }
}

class AddRecipe extends Dashboard {
  constructor(selectorName) {
    super(selectorName);
    this.removeItem();
  }
  generateId() {
    if (localStorage.getItem("recipes") != null) {
      this.allRecipes = JSON.parse(localStorage.getItem("recipes"));
      return this.allRecipes.length + 1;
    } else {
      return 1;
    }
  }
  renderInstruction(instruction, empty) {
    this.newLi = document.createElement("li");
    this.newLi.innerHTML = `
        <span class="itemRecipes">${instruction}</span>
        <i class="removeItem fas fa-trash-alt" title="usuń wiersz"></i>
        `;
    if (empty == false) {
      console.log("no value");
    } else {
      this.newLi.innerText == "" ? console.log("brak danych") : this.newInstructionsList.appendChild(this.newLi);
      // clearing instruction field
      this.instruction.innerText = "";
    }
  }
  renderIngredient(ingredient, empty) {
    this.newLi = document.createElement("li");
    this.newLi.innerHTML = `
        <span class="itemRecipes">${ingredient}</span>
        <i class="removeItem fas fa-trash-alt" title="usuń wiersz"></i>
        `;
    if (empty == false) {
      console.log("no value");
    } else {
      this.newLi.innerText == "" ? console.log("brak danych") : this.newIngredientsList.appendChild(this.newLi);
      // clearing instruction field
      this.ingredient.innerText = "";
    }
  }
  removeItem() {
    this.removeItemsBtn = document.querySelectorAll(".removeItem");

    this.removeItemsBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.itemInstruction = e.currentTarget.parentElement.firstElementChild.innerText;
        this.itemIngredient = e.currentTarget.parentElement.firstElementChild.innerText;

        e.currentTarget.parentElement.remove();
        this.newRecipe.instructions = this.newRecipe.instructions.filter((item) => {
          return item != this.itemInstruction;
        });
        this.newRecipe.ingredients = this.newRecipe.ingredients.filter((item) => {
          return item != this.itemIngredient;
        });
        console.log(this.newRecipe.instructions);
        console.log(this.newRecipe.ingredients);
      });
    });
  }

  showModal() {
    this.modalRecipe.style.visibility = "visible";
  }
  cancelModal() {
    this.modalRecipe.style.visibility = "hidden";
    this.clearInputs();
  }
  isItEmptyInstruction() {
    if (this.instruction.innerText == "") {
      return false;
    } else {
      return true;
    }
  }
  isItEmptyIngredient() {
    if (this.ingredient.innerText == "") {
      return false;
    } else {
      return true;
    }
  }
  checkEmptyInputs() {
    if (this.newInstructionsList.innerText == "" || this.newIngredientsList == "" || this.recipeName.innerText == "" || this.recipeDesc.innerText == "") {
      return false;
    } else {
      this.closeSaveModal();
    }
  }

  showWarning(isempty, info) {
    if (isempty == false) {
      this.warning.classList.add("show");
      this.warning.firstElementChild.innerText = info;
    } else {
      this.warning.classList.remove("show");
    }
  }

  insertTitleAndDesc(id) {
    this.newRecipe.title = this.recipeName.innerText;
    this.newRecipe.desc = this.recipeDesc.innerText;
    this.newRecipe.id = id;
  }

  insertInstruction(isItEmptyInstruction) {
    if (isItEmptyInstruction === false) {
      console.log("warning no instruction");
    } else {
      this.newRecipe.instructions.push(this.instruction.innerText);
      console.log(this.newRecipe.instructions);
    }
  }

  insertIngredients(isItEmptyIngredient) {
    if (isItEmptyIngredient === false) {
      console.log("warning no ingredient");
    } else {
      this.newRecipe.ingredients.push(this.ingredient.innerText);
      console.log(this.newRecipe.ingredients);
    }
  }
  saveToLocalStorage(newObject) {
    if (localStorage.getItem("recipes") != null) {
      this.dataStorage = JSON.parse(localStorage.getItem("recipes"));
      this.dataStorage.push(newObject);
      localStorage.setItem("recipes", JSON.stringify(this.dataStorage));
    } else {
      this.dataStorage.push(newObject);
      localStorage.setItem("recipes", JSON.stringify(this.dataStorage));
    }
    console.log("Recipe added");
  }

  closeSaveModal() {
    this.saveToLocalStorage(this.newRecipe);
    this.modalRecipe.style.visibility = "hidden";
  }
  clearInputs() {
    this.recipeName.innerText = "";
    this.recipeDesc.innerText = "";
    this.instruction.innerText = "";
    this.ingredient.innerText = "";
    this.newInstructionsList.innerHTML = "";
    this.newIngredientsList.innerHTML = "";
    this.warning.firstElementChild.innerText = "";
  }
  initEvents() {
    if (this.returnSection || this.recipesSection) {
      this.addRecipeBtn.addEventListener("click", (e) => {
        this.clearInputs();
        this.showModal();
      });
      this.cancelRecipeBtn.addEventListener("click", (e) => {
        this.cancelModal();
      });
      this.addInstructionBtn.addEventListener("click", () => {
        this.insertInstruction(this.isItEmptyInstruction());
        this.renderInstruction(this.instruction.innerText, this.isItEmptyInstruction());
        this.removeItem();
      });
      this.addIngredientBtn.addEventListener("click", () => {
        this.insertIngredients(this.isItEmptyIngredient());
        this.renderIngredient(this.ingredient.innerText, this.isItEmptyIngredient());
        this.removeItem();
      });
      this.closeSaveRecipeBtn.addEventListener("click", (e) => {
        this.insertTitleAndDesc(this.generateId());
        this.showWarning(this.checkEmptyInputs(), "Wypełnij wszystkie pola!");
        this.numberOfRecipes();
        console.log(this.newRecipe);
      });
    }
  }
}

class ShowAllSchedules extends Dashboard {
  constructor() {
    super();
    this.renderAllSchedules();
  }
  renderAllSchedules() {
    if (this.allSchedulesContainer) {
      this.allSchedules = JSON.parse(localStorage.getItem("schedules"));

      if (this.allSchedules == null) {
        console.log("empty storage");
      } else {
        // set on empty innerhtml
        this.allSchedulesContainer.innerHTML = "";
        // sorting schedules week <
        this.allSchedules = this.allSchedules.sort((a, b) => a.week - b.week);
        // redndering sorted schedules
        this.allSchedules.forEach((el) => {
          this.newTr = document.createElement("tr");
          this.newTr.setAttribute("class", "table__row");
          // wstawiamy wewnątrz tytuł przepisu
          this.newTr.innerHTML = `
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
    if (this.schedulesSection) {
      this.closeSaveScheduleBtn.addEventListener("click", (e) => {
        console.log(this.allSchedules);
        this.renderAllSchedules();
      });
    }
  }
}
class ShowAllRecipes extends Dashboard {
  constructor() {
    super();
    this.renderAllrecipes();
    this.removeRecipe();
  }
  removeRecipe() {
    this.removeRecipeBtn = document.querySelectorAll(".removeItem");
    this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

    this.removeRecipeBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.recipe = e.currentTarget.parentElement.parentElement.firstElementChild.innerText;
        console.log(this.recipe);
      });
    });
  }
  renderAllrecipes() {
    if (this.allRecipesContainer) {
      this.allRecipes = JSON.parse(localStorage.getItem("recipes"));

      if (this.allRecipes == null) {
        console.log("empty storage");
      } else {
        // set on empty innerhtml
        this.allRecipesContainer.innerHTML = "";
        this.allRecipes.forEach((el) => {
          this.newTr = document.createElement("tr");
          this.newTr.setAttribute("class", "table__row");
          // wstawiamy wewnątrz tytuł przepisu
          this.newTr.innerHTML = `
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
      this.closeSaveRecipeBtn.addEventListener("click", (e) => {
        console.log(this.allRecipes);
        this.renderAllrecipes();
      });
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
      istItLogged == true ? this.welcomeSection.classList.remove("show") : this.welcomeSection.classList.add("show");
      // Hiding return section
      istItLogged == true ? this.returnSection.classList.add("show") : this.returnSection.classList.remove("show");
    }
  }
  render() {
    // Rendering name in navAPP
    this.yourName = localStorage.getItem("newName");
    this.UserNameField.innerText = this.yourName;
  }
  initEvents() {
    if (this.returnSection) {
      this.addNameBtn.addEventListener("click", (e) => {
        this.saveToLocalStorage(this.inputName.value);
        this.render();
        this.hideSectionWelcome(this.istItLogged());
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = new UserName("#welcome__submit");
  const addR = new AddRecipe("b1");
  const addS = new AddSchedule("b2");
  const showRecipes = new ShowAllRecipes();
  const showSchedules = new ShowAllSchedules();
  const plans = new Plans();
});
