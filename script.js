const studentContainer = document.querySelector("#student-profiles");
const alumniContainer = document.querySelector("#alumni-profiles");
const searchInput = document.querySelector("#profile-search");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

function createProfileCard(profile) {
  const tags = profile.tags.map((tag) => `<li>${tag}</li>`).join("");

  return `
    <article class="profile-card">
      <img src="${profile.picture}" alt="Portrait illustration for ${profile.name}" loading="lazy" />
      <div class="profile-content">
        <p class="profile-status">${profile.status === "current" ? "Current Student" : "Alumni"}</p>
        <h3>${profile.name}</h3>
        <p class="profile-title">${profile.title}</p>
        <p>${profile.bio}</p>
        <ul class="tag-list" aria-label="Interests for ${profile.name}">${tags}</ul>
        <div class="profile-links">
          <a href="mailto:${profile.email}">Email</a>
          <a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </article>
  `;
}

function profileMatchesSearch(profile, query) {
  const searchableText = [
    profile.name,
    profile.status,
    profile.title,
    profile.email,
    profile.bio,
    ...profile.tags
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
}

function renderProfiles(query = "") {
  const visibleProfiles = profiles.filter((profile) => profileMatchesSearch(profile, query));
  const students = visibleProfiles.filter((profile) => profile.status === "current");
  const alumni = visibleProfiles.filter((profile) => profile.status === "alumni");

  studentContainer.innerHTML = students.map(createProfileCard).join("") || emptyState("current students");
  alumniContainer.innerHTML = alumni.map(createProfileCard).join("") || emptyState("alumni");
}

function emptyState(groupName) {
  return `<p class="empty-state">No ${groupName} matched your search. Try another keyword.</p>`;
}

searchInput.addEventListener("input", (event) => renderProfiles(event.target.value));
renderProfiles();
