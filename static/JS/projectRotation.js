const project1 = document.getElementById('project1');
const project2 = document.getElementById('project2');
const project3 = document.getElementById('project3');
const container = document.getElementById('projects');
let projects={
    0:"FFTCollatz",
    1:"GPAsKalman",
    2:"PsychotherapyTraining",
    3:"356Days",
    4:"beatBlockDifficultyCalculator"
}
let descriptions={
    0: "Visual analysis of the Collatz conjecture via FFT.",
    1: "Using Gaussian Processes and Kalman Filters together.",
    2: "A psychotherapist training tool based on AI feedback.",
    3: "A game dedicated to my girlfriend, for all 356 days of dating.",
    4: "An app that calculates difficulty in Beatblock."
}
const size = Object.keys(projects).length;

function changePosition(parent, direction){
    let index = parseInt(parent.dataset.image,10);
    index = ((index+direction % size)+size) % size;
    const projectName = projects[index];
    parent.style.backgroundImage = `url('/static/assets/projectImages/${projectName}.png')`;
    const textDiv = parent.querySelector('.projectText');
    if (textDiv) {
        textDiv.innerText = descriptions[index] || '';
    }
    
    parent.dataset.image = index;
}

document.querySelectorAll('.projectLeft').forEach(btn => {
    btn.addEventListener('click', (e) => {

    document.querySelectorAll('.project').forEach(p => p.classList.add('animating'));
    const newProject = project1.cloneNode(true)
    newProject.style.transition='none';
    newProject.style.transform = 'translateX(500%)';
    changePosition(newProject, 3);
    container.appendChild(newProject)
    void newProject.offsetWidth;

    project1.style.transition = 'transform 0.5s ease';
    project2.style.transition = 'transform 0.5s ease';
    project3.style.transition = 'transform 0.5s ease';

    newProject.style.transition = 'transform 0.5s ease';
    newProject.style.transform = 'translateX(305%)';

    project1.style.transform = 'translateX(-200%)';
    project2.style.transform = 'translateX(-117%) translateY(-12.8%) scaleY(.745) scaleX(.7428)';
    project3.style.transform = 'translateX(-157%) translateY(17%) scaleY(1.34) scaleX(1.346)';

    setTimeout(() => {
    
        [project1, project2, project3].forEach(proj => {
            proj.style.transition = 'none';
            proj.style.transform = '';
            void proj.offsetWidth;
            proj.style.transition = '';
        });
        changePosition(project1, 1);
        changePosition(project2, 1);
        changePosition(project3, 1);
        container.removeChild(newProject);
        document.querySelectorAll('.project').forEach(p => p.classList.remove('animating'));
      }, 500); 
  });
});
document.querySelectorAll('.projectRight').forEach(btn => {
    btn.addEventListener('click', (e) => {

    document.querySelectorAll('.project').forEach(p => p.classList.add('animating'));
    const newProject = project3.cloneNode(true)
    newProject.style.transition='none';
    newProject.style.transform = 'translateX(-500%)';
    changePosition(newProject, -3);
    container.appendChild(newProject)
    void newProject.offsetWidth;

    project1.style.transition = 'transform 0.5s ease';
    project2.style.transition = 'transform 0.5s ease';
    project3.style.transition = 'transform 0.5s ease';

    newProject.style.transition = 'transform 0.5s ease';
    newProject.style.transform = 'translateX(-305%)';

    project1.style.transform = 'translateX(157%) translateY(17%) scaleY(1.34) scaleX(1.346)';
    project2.style.transform = 'translateX(117%) translateY(-12.8%) scaleY(.745) scaleX(.7428)';
    project3.style.transform = 'translateX(200%)';

    setTimeout(() => {
    
        [project1, project2, project3].forEach(proj => {
            proj.style.transition = 'none';
            proj.style.transform = '';
            void proj.offsetWidth;
            proj.style.transition = '';
        });
        changePosition(project1, -1);
        changePosition(project2, -1);
        changePosition(project3, -1);
        container.removeChild(newProject);
        document.querySelectorAll('.project').forEach(p => p.classList.remove('animating'));
      }, 500); 
  });
});
window.onload = function() {
    changePosition(project1, 0);
    changePosition(project2, 0);
    changePosition(project3, 0);
};