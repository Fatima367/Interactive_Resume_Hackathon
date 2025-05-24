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
    let ul_1 = document.createElement("ul");
    skillslist.forEach(function (skill) {
        let li = document.createElement("li");
        li.textContent = skill;
        ul_1.appendChild(li);
    });
    ul_1.style.display = "none";
    showskills.appendChild(ul_1);
    let showBtn_1 = document.createElement("button");
    showBtn_1.textContent = "Show Skills";
    showskills.appendChild(showBtn_1);
    let hideBtn_1 = document.createElement("button");
    hideBtn_1.textContent = "Hide Skills";
    hideBtn_1.style.display = "none";
    showskills.appendChild(hideBtn_1);
    showBtn_1.addEventListener("click", function () {
        ul_1.style.display = "block";
        showBtn_1.style.display = "none";
        hideBtn_1.style.display = "inline";
    });
    hideBtn_1.addEventListener("click", function () {
        ul_1.style.display = "none";
        hideBtn_1.style.display = "none";
        showBtn_1.style.display = "inline";
    });
}
else {
    console.error("Element with ID 'showskills' not found.");
}
