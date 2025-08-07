const project1 = document.getElementById('project1');
const project2 = document.getElementById('project2');
const project3 = document.getElementById('project3');
const container = document.getElementById('projectPanel');
let projects=[
    {
        png:"FFTCollatz",
        description:"Visual analysis of the Collatz conjecture via FFT.",
        href:"javascript:loadPaper(2);document.getElementById('papers').scrollIntoView({behavior:'smooth'});",
        medal:'goldMedal'
    },
    {
        png:"GPAsKalman",
        description:"Using Gaussian Processes and Kalman Filters together.",
        href:"javascript:loadPaper(3);document.getElementById('papers').scrollIntoView({behavior:'smooth'});",
        medal:'N/A'
    },
    {
        png:"PsychotherapyTraining",
        description:"A psychotherapist training tool based on AI feedback.",
        href: "javascript:loadPaper(1);document.getElementById('papers').scrollIntoView({behavior:'smooth'});",
        medal:'LISEF'
    },
    {
        png:'depressionClassification',
        description:"BERT based classification for early depression screening.",
        href:"javascript:loadPaper(0);document.getElementById('papers').scrollIntoView({behavior:'smooth'});",
        medal:'goldMedal'
    },
    {
        png:'coderBackground',
        description:'Custom HTML + JS Background run with Lively Wallpaper',
        href:'https://3dmatrix.netlify.app/',
        medal:'N/A'
    },
    {
        png:"notesAPI",
        description:'Flask + SQLlite Notes API with CRUD operations',
        href:'N/A',
        medal:'N/A'
    },
    {
        png:'doublePendulumn',
        description:"Chaotic double-pendulum system with customizability",
        href:'N/A',
        medal:'N/A'
    },
    {
        png:"beatBlockDifficultyCalculator",
        description:'An app that calculates difficulty in Beatblock.',
        href:'N/A',
        medal:'N/A'
    },
    {
        png:"356Days",
        description:'A game dedicated to my girlfriend who I tragically lost, for all 356 days of dating.',
        href:'N/A',
        medal:'N/A'
    },
]   
const projectSize = Object.keys(projects).length;

function changePosition(parent, direction){
    let index = parseInt(parent.dataset.image,10);
    index = ((index+direction % projectSize)+projectSize) % projectSize;

    const projectPNG = projects[index]['png'];
    parent.style.backgroundImage = `url('/static/assets/projectImages/${projectPNG}.png')`;

    const textDiv = parent.querySelector('.projectText');
    if (textDiv) {
        textDiv.innerText = projects[index]['description'] || '';
        const hrefValue = projects[index]['href'];
        if (hrefValue !== 'N/A') {
            textDiv.href = hrefValue;
            textDiv.classList.remove('disabled-link');
            textDiv.style.pointerEvents = 'auto'; // re-enable clicking
        } else {
            textDiv.removeAttribute('href');      // fully disables navigation
            textDiv.classList.add('disabled-link');
            textDiv.style.pointerEvents = 'none'; // prevents clicks
        }
    }
    const medal = parent.querySelector('.medal');
    if (medal) {
        const medalPNG = projects[index]['medal'];
        if (medalPNG !== 'N/A'){
            medal.style.backgroundImage = `url('/static/assets/medals/${medalPNG}.png')`;
        } else {
            medal.style.backgroundImage = '';
        }

    }
    parent.dataset.image = index;
    const projectLeft = parent.querySelector('.projectLeft')
    projectLeft.innerHTMl='&lt;'
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

document.addEventListener('DOMContentLoaded', () => {
    changePosition(project1, 0);
    changePosition(project2, 0);
    changePosition(project3, 0);
});