"use strict";
let showskills = document.getElementById("showskills");
if (showskills) {
    let skillslist = [
        "HTML",
        "CSS",
        "TypeScript",
        "JavaScript",
        "React",
        "NextJs",
        "Figma",
        "Frontend Development",
        "Canva",
        "MsWord",
    ];
    const ul = document.createElement("ul");
    skillslist.forEach(function (skill) {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
    });
    ul.style.display = "none";
    showskills.appendChild(ul);
    const showBtn = document.createElement("button");
    showBtn.textContent = "Show Skills";
    showskills.appendChild(showBtn);
    const hideBtn = document.createElement("button");
    hideBtn.textContent = "Hide Skills";
    hideBtn.style.display = "none";
    showskills.appendChild(hideBtn);
    showBtn.addEventListener("click", function () {
        ul.style.display = "block";
        showBtn.style.display = "none";
        hideBtn.style.display = "inline";
    });
    hideBtn.addEventListener("click", function () {
        ul.style.display = "none";
        hideBtn.style.display = "none";
        showBtn.style.display = "inline";
    });
}
else {
    console.error("Element with ID 'showskills' not found.");
}
