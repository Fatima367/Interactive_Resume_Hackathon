const formElement = document.getElementById(
  "resumeform"
);
const resumeContainer = document.getElementById(
  "generatedresume"
);
const formDiv = document.getElementById("formdiv");

// Utility function to get form field values
function getFormValues() {
  const image = document.getElementById("profilepic") as HTMLInputElement;
  const name = (document.getElementById("fullname") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("phone") as HTMLInputElement).value;
  const address = (document.getElementById("address") as HTMLInputElement).value;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const workExperience = (
    document.getElementById("workExperience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
  const reference = (document.getElementById("ref") as HTMLTextAreaElement).value;

  return { image, name, email, contact, address, education, workExperience, skills, reference };
}

// Function to generate the HTML content for the resume
function generateResumeContent(data: ReturnType<typeof getFormValues>, imageSrc?: string) {
  const educationList = data.education
    .split("\n")
    .map((edu) => `<li>${edu}</li>`)
    .join("");
  const workExperienceList = data.workExperience
    .split("\n")
    .map((exp) => `<li>${exp}</li>`)
    .join("");
  const skillsList = data.skills
    .split("\n")
    .map((skill) => `<li>${skill}</li>`)
    .join("");

  return `
    <div style="display: flex; align-items: flex-start;">
      <div style="flex: 1;">
        <h1>${data.name}</h1>
        <div style="display: flex; align-items: center; gap: 0.5rem; word-break: break-all;">
          <p style="display: flex; align-items: center; color: #001478; margin: 0; margin-left:20px;">
            <i class="fas fa-envelope" style="font-size: 0.8em; margin-right: 5px;"></i>
            <b>Email: </b> <span style="color: black; padding-left: 5px">${data.email}</span>
          </p>
          ${
            data.contact
              ? `
          <p style="display: flex; align-items: center; color: #001478; margin: 0; margin-left:20px;">
            <i class="fas fa-phone" style="font-size: 0.8em; margin-right: 5px;"></i>
            <b>Contact No: </b> <span style="color: black; padding-left: 5px"> ${data.contact}</span>
          </p>`
              : ""
          }
        </div>
        ${
          data.address
            ? `
          <p style="display: flex; align-items: center; color: #001478; margin: 6px 0 0; margin-left:20px;">
            <i class="fas fa-map-marker-alt" style="font-size: 0.8em; margin-right: 5px;"></i>
            <b>Address:</b> <span style="color: black; padding-left: 5px; word-break: break-word; overflow-wrap: break-word;"> ${data.address}</span>
          </p>`
            : ""
        }

        <h2><i class="fas fa-graduation-cap" style="font-size: 0.9em; margin-right: 2px;"></i> Education</h2>
        <ul style="word-break: break-word; overflow-wrap: break-word; font-size: medium;">${educationList}</ul>
      </div>
      ${
        imageSrc
          ? `<div style="flex-shrink: 0;"><img src="${imageSrc}" alt="Profile Image" style="object-fit: cover;"/></div>`
          : ""
      }
    </div>

    <h2><i class="fas fa-briefcase" style="font-size: 0.9em; margin-right: 2px;"></i> Work Experience</h2>
    <ul style="word-break: break-word; overflow-wrap: break-word;font-size: medium;">${workExperienceList}</ul>
    <h2><i class="fas fa-tools" style="font-size: 0.9em; margin-right: 2px;"></i> Skills</h2>
    <ul style="word-break: break-word; overflow-wrap: break-word; font-size: medium;">${skillsList}</ul>
    <h2><i class="fas fa-address-book" style="font-size: 0.9em; margin-right: medium;"></i> References</h2>
    <h4 style="word-break: break-word; overflow-wrap: break-word; font-size: medium;" >${data.reference}</h4>
  `;
}

// Function to handle the "Share" button click logic
function handleShareButtonClick(shareButton: HTMLButtonElement, shareLinks: HTMLDivElement) {
  shareButton.addEventListener("click", function () {
    const currentUrl = window.location.href;
    shareLinks.style.display =
      shareLinks.style.display === "none" ? "block" : "none";
    shareLinks.innerHTML = `<br>Share <a href="${currentUrl}" target="_blank"> Resume Builder</a> to let others make and download their Resume.`;

    const copybtn = document.createElement("button");
    copybtn.innerHTML = `<i class="fas fa-copy"></i> Copy Link!`;
    shareLinks.appendChild(copybtn);
    copybtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert(`Link Copied to the clipboard`);
        })
        .catch((err) =>
          console.error("Copy Link by right click on underlined text!", err)
        );
    });
  });
}

// Function to display the generated resume
function displayResume(resumeContainer: HTMLElement, formDiv: HTMLElement, resumeData: ReturnType<typeof getFormValues>, imageSrc?: string) {
  resumeContainer.style.display = "block";
  resumeContainer.innerHTML = generateResumeContent(resumeData, imageSrc);
  formDiv.style.display = "none";

  // Add Download PDF button
  const createPdf = document.createElement("button");
  createPdf.innerHTML = `<i class="fas fa-download"></i> Download PDF`;
  resumeContainer.append(createPdf);
  createPdf.addEventListener("click", downloadResume);

  // Add Share button
  const shareButton = document.createElement("button");
  shareButton.innerHTML = `<i class="fas fa-share"></i> Share`;
  shareButton.style.marginLeft = "5px";
  resumeContainer.append(shareButton);

  const shareLinks = document.createElement("div");
  shareLinks.style.display = "none";
  resumeContainer.append(shareLinks);

  handleShareButtonClick(shareButton, shareLinks);

  // Add Edit Resume button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i> Edit Resume`;
  editButton.style.marginLeft = "5px";
  resumeContainer.append(editButton);

  editButton.addEventListener("click", () => {
    formDiv.style.display = "block";
    resumeContainer.style.display = "none";
  });
}

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

  const image = resumeElement.querySelector("img");

  image?.style.height = "180px";
  image?.style.width = "180px";
  resumeElement.style.width = "780px";
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

// Event listener for form submission
function handleFormSubmit(event: Event) {
  event.preventDefault();

  if (!resumeContainer || !formDiv) return;

  const data = getFormValues();

  if (data.image.files?.[0]) {
    const file = data.image.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target?.result as string;
      displayResume(resumeContainer, formDiv, data, imageSrc);
    };
    reader.readAsDataURL(file);
  } else {
    displayResume(resumeContainer, formDiv, data);
  }
}

// Initial setup
if (formElement && resumeContainer && formDiv) {
  resumeContainer.style.display = "none";
  formElement.addEventListener("submit", handleFormSubmit);
} else {
  console.error("Form element, resume container, or form div not found.");
}