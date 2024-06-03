document.addEventListener("DOMContentLoaded", function () {
    const topUl = document.getElementById("top-navbar-ul");
    const links = Array.from(topUl.getElementsByClassName("nav-link"));
    const currentPath = window.location.pathname;

    // Loop through all links
    links.forEach(link => {
        // Check if the link href matches the current URL path
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});