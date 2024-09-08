const showskills = document.getElementById("showskills");

let skillslist = [
  "HTML",
  "CSS",
  "TypeScript",
  "JavaScript",
  "NextJs(Learning)",
  "Canva",
  "MsWord",
];

showskills?.addEventListener("click", function handleClick(event) {
  showskills.removeEventListener("click", handleClick);

  const ul = document.createElement("ul");

  skillslist.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;

    ul.appendChild(li);
    ul.style.display = "block";
  });

  showskills.append(ul);

  const hideBtn = document.createElement("button");
  hideBtn.textContent = "Hide";
  showskills.append(hideBtn);

  hideBtn.addEventListener("click", () => {
    ul.style.display = "none";
    hideBtn.style.display = "none";
  });
});
