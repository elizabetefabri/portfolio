// Função genérica para atualizar elementos HTML
function updateElement(elementId, value, attribute = null) {
  const element = document.getElementById(elementId);

  if (element) {
    if (attribute === null) {
      element.innerText = value;
    } else {
      element[attribute] = value;
    }
  }
}

function updateProfileInfo(profileData) {
  updateElement('profile.photo', profileData.photo, 'src');
  updateElement('profile.photo', profileData.name, 'alt');
  
  updateElement('profile.name', profileData.name);
  updateElement('profile.job', profileData.job);
  updateElement('profile.location', profileData.location);
  updateElement('profile.phone', profileData.phone, 'innerText');
  updateElement('profile.phone', `tel:${profileData.phone}`, 'href');
  updateElement('profile.email', profileData.email, 'innerText');
  updateElement('profile.email', `mailto:${profileData.email}`, 'href');
}

function updateSkills(elementId, skills) {
  const element = document.getElementById(elementId);

  if (element) {
    element.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
  }
}

function updateHardSkills(profileData) {
  const hardSkillsElement = document.getElementById('profile.skills.hardSkills');
  softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')

  const softSkills = document.getElementById('profile.skills.softSkills')
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')
    
  if (hardSkillsElement) {
    // Mapear os objetos e criar elementos de imagem
    const skillImages = profileData.skills.hardSkills.map(skill => {
      const imageElement = document.createElement('img');
      imageElement.src = skill.logo;
      imageElement.alt = skill.name;
      imageElement.title = skill.name;
      return imageElement;
    });

    // Limpar o conteúdo anterior e adicionar as imagens à lista
    hardSkillsElement.innerHTML = '';
    skillImages.forEach(imageElement => {
      const listItem = document.createElement('li');
      listItem.appendChild(imageElement);
      hardSkillsElement.appendChild(listItem);
    });
  }
}

function updatePortfolioItems(elementId, items) {
  const element = document.getElementById(elementId);

  if (element) {
    element.innerHTML = items.map(project => {
      const githubClass = project.github ? ' class="github"' : '';
      return `
        <li>
          <h3${githubClass}>${project.name}</h3>
          <a href="${project.url}" target="_blank">${project.url}</a>
        </li>
      `;
    }).join('');
  }
}

function updateProfessionalExperienceItems(elementId, items) {
  const element = document.getElementById(elementId);

  if (element) {
    element.innerHTML = items.map(experience => `
      <li>
        <h3 class="title">${experience.name}</h3>
        <p class="period">${experience.period}</p>
        <p>${experience.description}</p>
      </li>
    `).join('');
  }
}

(async () => {
  const profileData = await fetchProfileData();

  updateProfileInfo(profileData);
  updateSkills('profile.skills.softSkills', profileData.skills.softSkills);
  updateSkills('profile.skills.hardSkills', profileData.skills.hardSkills);
  updateSkills('profile.languages', profileData.languages);
  updatePortfolioItems('profile.portfolio', profileData.portfolio);
  updateProfessionalExperienceItems('profile.professionalExperience', profileData.professionalExperience);
})();
