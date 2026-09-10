// Fetch and render starred repositories
async function loadRepositories() {
  const container = document.getElementById('repositories-container');
  
  try {
    // Fetch the events.json file
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.statusText}`);
    }
    
    const data = await response.json();
    const repositories = data.repositories || [];
    
    if (repositories.length === 0) {
      container.innerHTML = '<p class="error">No starred repositories found.</p>';
      return;
    }
    
    // Create the list of repositories
    const list = document.createElement('ul');
    list.className = 'repositories-list';
    
    repositories.forEach(repo => {
      const li = document.createElement('li');
      li.className = 'repository-card';
      
      // Format the star count with commas
      const formattedStars = repo.stars.toLocaleString();
      
      // Parse and format the starred date
      const starredDate = new Date(repo.starredAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      li.innerHTML = `
        <div class="repo-header">
          <div class="repo-title">
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
              ${repo.owner}/<strong>${repo.name}</strong>
            </a>
            <div class="repo-owner"></div>
          </div>
          <div class="repo-stars">⭐ ${formattedStars}</div>
        </div>
        <p class="repo-description">${repo.description}</p>
        <div class="repo-footer">
          <span class="repo-language">${repo.language}</span>
          <span class="repo-starred-date">Starred on ${starredDate}</span>
        </div>
      `;
      
      list.appendChild(li);
    });
    
    container.innerHTML = '';
    container.appendChild(list);
    
  } catch (error) {
    console.error('Error loading repositories:', error);
    container.innerHTML = `<div class="error">Error loading repositories: ${error.message}</div>`;
  }
}

// Load repositories when the page is ready
document.addEventListener('DOMContentLoaded', loadRepositories);
