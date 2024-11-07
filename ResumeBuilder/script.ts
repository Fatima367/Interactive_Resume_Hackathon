const formElement = document.getElementById("resumeform") as HTMLFormElement | null;
const resumeContainer = document.getElementById("generatedresume") as HTMLElement | null;

function downloadResume() {
  const resumeElement = document.getElementById("generatedresume");
  if (!resumeElement) return;

  const options = {
    margin: [0, 0, 0, 0.2],
    filename: "Resume.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  const buttons = resumeElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.display = "none";
  });

  resumeElement.style.width = '780px';
  resumeElement.style.border = "none";

  html2pdf()
    .from(resumeElement)
    .set(options)
    .save()
    .then(() => {
      resumeElement.style.border = "1px solid gray";
      buttons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
}

const formDiv = document.getElementById("formdiv") as HTMLElement | null;

if (formElement && resumeContainer) {
  resumeContainer.style.display = "none";
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const image = (document.getElementById("profilepic") as HTMLInputElement);
    const name = (document.getElementById("fullname") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const contact = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    const educationList = education.split("\n").map((edu) => `<li>${edu}</li>`).join("");
    const workExperienceList = workExperience.split("\n").map((exp) => `<li>${exp}</li>`).join("");
    const skillsList = skills.split("\n").map((skill) => `<li>${skill}</li>`).join("");
    
    if (image.files && image.files[0]) {
      const file = image.files[0];
      const reader = new FileReader();

      reader.onload = (function(e) {
        const imageSrc = e.target?.result as string;

        const generatedResume = `
          <div style="display: flex; align-items: flex-start;">
            <div style="flex: 1;">
              <h2>Personal Information</h2>
              <p><b>Name:</b> ${name}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Contact No:</b> ${contact}</p>
            </div>
            <div style="flex-shrink: 0;">
              <img src="${imageSrc}" alt="Profile Image" style="object-fit: cover;"/>
            </div>
          </div>
          <h2>Education</h2>
          <ul>${educationList}</ul>
          <h2>Work Experience</h2>
          <ul>${workExperienceList}</ul>
          <h2>Skills</h2>
          <ul>${skillsList}</ul>
        `;

        resumeContainer.style.display = "block";
        resumeContainer.innerHTML = generatedResume;
        formDiv.style.display = "none";

        // Create and append "Download PDF" button
        const createPdf = document.createElement("button");
        createPdf.textContent = "Download PDF";
        resumeContainer.append(createPdf);
        createPdf.addEventListener("click", downloadResume);

        // Create and append "Share" button
        const shareButton = document.createElement("button");
        shareButton.textContent = "Share";
        shareButton.style.marginLeft = '5px';
        resumeContainer.append(shareButton);

        const shareLinks = document.createElement("div");
        shareLinks.style.display = "none";
        resumeContainer.append(shareLinks);

        shareButton.addEventListener("click", function () {
          const currentUrl = window.location.href;
          shareLinks.style.display = shareLinks.style.display === "none" ? "block" : "none";
          shareLinks.innerHTML = `<br>Share <a href="${currentUrl}" target="_blank"> Resume Builder</a> to let others make and download their Resume.`;

          const copybtn = document.createElement("button");
          copybtn.textContent = "Copy Link!";
          shareLinks.appendChild(copybtn);
          copybtn.addEventListener("click", () => {
            navigator.clipboard.writeText(currentUrl)
              .then(() => {
                alert(`Link Copied to the clipboard`);
              })
              .catch((err) => console.error("Copy Link by right click on underlined text!", err));
          });
        });
      });
      reader.readAsDataURL(file);
    } else {
      const generatedResume = `
        <h2>Personal Information</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Contact No:</b> ${contact}</p>
        <h2>Education</h2>
        <ul>${educationList}</ul>
        <h2>Work Experience</h2>
        <ul>${workExperienceList}</ul>
        <h2>Skills</h2>
        <ul>${skillsList}</ul>
      `;

      resumeContainer.style.display = "block";
      resumeContainer.innerHTML = generatedResume;
      formDiv.style.display = "none";

      const createPdf = document.createElement("button");
      createPdf.textContent = "Download PDF";
      resumeContainer.append(createPdf);
      createPdf.addEventListener("click", downloadResume);

      const shareButton = document.createElement("button");
      shareButton.textContent = "Share";
      shareButton.style.marginLeft = '5px';
      resumeContainer.append(shareButton);

      const shareLinks = document.createElement("div");
      shareLinks.style.display = "none";
      resumeContainer.append(shareLinks);

      shareButton.addEventListener("click", function () {
        const currentUrl = window.location.href;
        shareLinks.style.display = shareLinks.style.display === "none" ? "block" : "none";
        shareLinks.innerHTML = `<br>Share <a href="${currentUrl}" target="_blank"> Resume Builder</a> to let others make and download their Resume.`;

        const copybtn = document.createElement("button");
        copybtn.textContent = "Copy Link!";
        shareLinks.appendChild(copybtn);
        copybtn.addEventListener("click", () => {
          navigator.clipboard.writeText(currentUrl)
            .then(() => {
              alert(`Link Copied to the clipboard`);
            })
            .catch((err) => console.error("Copy Link by right click on underlined text!", err));
        });
      });
    }
  });
} else {
  console.error("Form element or resume container not found.");
}
