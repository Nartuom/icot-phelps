const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
})

navbarLinks.addEventListener("mouseleave", () =>{
    if(navbarLinks.classList.contains("active")){
        setTimeout(function() {
            navbarLinks.classList.toggle("active");
        }, 400);
    }
})