const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const navbar = document.getElementsByClassName("navbar");
const navbarLi = [...document.getElementsByClassName("navbarLi")];

toggleButton.addEventListener("click", () => {
    navbarLi.forEach(function(li){
        li.classList.toggle("activeLi");
    });
    navbarLinks.classList.toggle("active");
    navbar[0].classList.toggle("responsiveNav");
});


//hightlight navbar links when on page
const links = [...navbarLinks.getElementsByTagName("a")];
const path = window.location.pathname;
const page = path.split("/").pop();
const services = document.getElementById("servicesLink");
function highlightNav(){
    links.forEach(function(link){
        if(link.href.split("/").pop() == page && link !== services){
            link.style.color = "#3a7c91";
            link.style.fontWeight = "600";
            if(link.classList.contains("dropdownLinks")){
                services.style.color = "#3A7C91";
                services.style.fontWeight = "600"
                link.style.color = "#D7E4E9";
            }
        };
    });
}

highlightNav();

//Form validation
function validateForm(){
    let vName = document.forms["contactForm"]["user_name"].value;
    let vEmail = document.forms["contactForm"]["user_email"].value;
    let vMessage = document.forms["contactForm"]["user_message"].value;
    if(vName == ""){
        alert("Please fill in your name before submitting the contact form");
        return false;
    } else if(vEmail == ""){
        alert("Please enter your email address before submitting the contact form");
        return false;
    } else if(vMessage == ""){
        alert("Please enter a message before submiting the contact form");
        return false;
    }
}