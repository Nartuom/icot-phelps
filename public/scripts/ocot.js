const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const navbar = document.getElementsByClassName('navbar')
const navbarLi = [...document.getElementsByClassName('navbarLi')]
const burgerBar = document.getElementsByClassName('bar')

toggleButton.addEventListener('click', () => {
  [...burgerBar].forEach(function (bar) {
    bar.classList.toggle('onClick')
  })
  navbarLi.forEach(function (li) {
    li.classList.toggle('activeLi')
  })
  navbarLinks.classList.toggle('active')
  navbar[0].classList.toggle('responsiveNav')
})

// hightlight navbar links when on page
const links = [...navbarLinks.getElementsByTagName('a')]
const path = window.location.pathname
const page = path.split('/').pop()
const services = document.getElementById('servicesLink')
function highlightNav () {
  links.forEach(function (link) {
    if (link.href.split('/').pop() === page && link !== services) {
      link.style.color = '#3a7c91'
      link.style.fontWeight = '600'
      if (link.classList.contains('dropdownLinks')) {
        services.style.color = '#3A7C91'
        services.style.fontWeight = '600'
        link.style.color = '#D7E4E9'
      }
    };
  })
}

highlightNav()
