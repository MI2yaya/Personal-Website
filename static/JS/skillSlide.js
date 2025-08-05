const skillsSlide = document.getElementById('skillsSlide');

let skills = [
    { png: "python", description: 'Python' },
    { png: "js", description: 'JavaScript' },
    { png: "html", description: 'HTML' },
    { png: "css", description: 'CSS' },
    { png: 'ai', description: "AI Chatbots"}
];
let currentSkillIndex = 0;
const speed = 1;
let paused=false;
let inView = true;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        inView = entry.isIntersecting;
    });
}, {
    threshold: 0.1
});
observer.observe(skillsSlide);

function addSkill(index, left = window.innerWidth) {
    const skillPNG = skills[index]['png'];
    const skillDescription = skills[index]['description'];
    const skill = document.createElement('div');
    skill.classList.add('skill');
    skill.style.left = `${left}px`;
    skill.style.backgroundImage = `url('/static/assets/skillsImages/${skillPNG}.png')`;
    skill.addEventListener('mouseover', () => paused = true);
    skill.addEventListener('mouseout', () => paused = false);
    
    const skillBar = document.createElement('div');
    skillBar.classList.add('skillBar');
    const skillText = document.createElement('a');
    skillText.innerHTML = skillDescription;

    skillBar.appendChild(skillText);
    skill.appendChild(skillBar);
    skillsSlide.appendChild(skill);

    requestAnimationFrame(() => {
        skill.dataset.width = skill.getBoundingClientRect().width;
    });
}

function animateSkills() {
    const skillElements = document.querySelectorAll('.skill');
    skillElements.forEach(skill => {
        if (!paused && inView){
            let currentLeft = parseFloat(skill.style.left);
            currentLeft -= speed;
            skill.style.left = `${currentLeft}px`;

            // Remove if completely off screen
            const width = parseFloat(skill.dataset.width || 0);
            if (currentLeft + width < 0) {
                skill.remove();
            }
        }
    });

    // Add new skill if rightmost one is far enough in
    const lastSkill = skillsSlide.lastElementChild;
    const lastWidth = lastSkill ? parseFloat(lastSkill.dataset.width || 0) : 0;

    if (!lastSkill || parseFloat(lastSkill.style.left) < window.innerWidth - (lastWidth*1.5)) {
        addSkill(currentSkillIndex);
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    }

    requestAnimationFrame(animateSkills);
}

document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});
