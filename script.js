document.addEventListener("DOMContentLoaded", () => {
    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = "#005bb5"; // Darker blue on hover
        });
        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "#0073e6"; // Original blue
        });
    });
});