import { Button } from "./Components/Button/button.js"; 
customElements.define("my-button", Button);

//For Input-fields
import { Input } from "./Components/Text-Fields/input.js";
customElements.define("my-input", Input);

//For the main container
import { MainContainer } from "./Patterns/Container/maincontainer.js";
customElements.define("main-container", MainContainer);

//For the card/div containing the logo and greetings
import { HeadCard } from "./Components/GreetingCard/cardheader.js";
customElements.define("head-card", HeadCard);

//For the form pattern
import { Tab } from "./Patterns/Tab/tab.js";
customElements.define("tab-content", Tab);


function setupTabs() {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", (e) => {
            const mutedBar = button.parentElement;
            const innerContainer = mutedBar.parentElement;
            const tabName = button.dataset.forTab;
            const tabToActivate = innerContainer.querySelector(`.tab[data-tab="${tabName}"]`)


      if (!tabToActivate)return;      mutedBar.querySelectorAll(".button").forEach(button => {
                button.classList.remove("button--active");
            });

            innerContainer.querySelectorAll(".tab").forEach(tab => {
                tab.classList.remove("tab--active");
            });


                button.classList.add("button--active");
                tabToActivate.classList.add("tab--active");
            });

    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();

     document.querySelectorAll(".mute").forEach(mutedBar => {
        mutedBar.querySelector(".button").click();
    });
     

    console.log('');
});

