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

//hightlight navbar links when on page
const links = [...navbarLinks.getElementsByTagName("a")];
const path = window.location.pathname;
const page = path.split("/").pop();
console.log(links);
function highlightNav(){
    links.forEach(function(link){
        if(link.href.split("/").pop() == page){
            link.style.color = "#3A7C91";
            link.style.fontWeight = "600";
        };
    });
}

highlightNav();