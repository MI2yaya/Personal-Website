const header = document.getElementById('header');
const bars = document.getElementById('bars')
const sections = ['me', 'projects', 'papers', 'work', 'photos'];


function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Append each section (or create a button/link if that's the intent)
sections.forEach(id => {
    const section = document.getElementById(id);
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = capitalizeFirstLetter(id);
    link.classList.add('headerTab');
    document.getElementById('headerTabsContainer').appendChild(link);
});

bars.onclick = () => {
    header.classList.toggle('show');
};