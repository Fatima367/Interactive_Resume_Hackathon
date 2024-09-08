var showskills = document.getElementById("showskills");
var skillslist = [
  "HTML",
  "CSS",
  "TypeScript",
  "JavaScript",
  "NextJs(Learning)",
  "Canva",
  "MsWord",
];
showskills === null || showskills === void 0
  ? void 0
  : showskills.addEventListener("click", function handleClick(event) {
      showskills.removeEventListener("click", handleClick);
      var ul = document.createElement("ul");
      skillslist.forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
        ul.style.display = "block";
      });
      showskills.append(ul);
      var hideBtn = document.createElement("button");
      hideBtn.textContent = "Hide";
      showskills.append(hideBtn);
      hideBtn.addEventListener("click", function () {
        ul.style.display = "none";
        hideBtn.style.display = "none";
      });
    });
