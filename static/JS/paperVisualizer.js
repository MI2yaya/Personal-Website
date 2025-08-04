const publication = document.getElementById('paperPublicationText');
const patent = document.getElementById('paperPatentText');
const type = document.getElementById('paperTypeText');
const awardList = document.getElementById("paperAwardsList")
const abstract = document.getElementById('paperAbstractText');
const paper = document.getElementById('paperPDF');
const title = document.getElementById('paperTitle');
const prevBtn = document.getElementById('prevPaper');
const nextBtn = document.getElementById('nextPaper');

const papers = [
    {
        file: "utilizingBERTForTheDetectionOfDepresssionInSocialMediaMessages",
        title: "Utilizing BERT for the Detection of Depression in Social Media Messages",
        abstract: "Depression is a global mental health issue generalized by a decrease in mood and satisfaction. Treatments for individuals afflicted with depressive symptoms include prescribed medications that require diagnosis to acquire. The purpose of this investigation was to accurately assist psychiatrists in diagnosis procedures to prevent both false positive and false negative conclusions by utilizing machine learning on social media messages. This was done by training a machine learning algorithm which accurately predicted and detected depressive behaviors and communications. As social media messages encompass individual’s general communications among long periods of time with high consistency and frequency, social media messages were used as a method to both train an accurate and consistent machine learning model. Social media messages rely on self reported diagnoses. Based on F1 accuracy normalization across machine learning HyperTuning, average accuracy indicated 97% [+/-0.5%] among a ~7600 sample dataset. Utilizing generalized sentimental analysis has shown less accurate results (~80%) but needs further research.",
        publication: "https://www.scipedia.com/public/Petrizzo_2024a#",
        patent: "N/A",
        type:   "Individual",
        awards: ["LISEF","NYSSEF","SAAWA - H.M", "LI Math Fair - Gold"]
    },
    {
        file: "buildingAConversationalAIMediumToEnhancePsychotherapyTrainingWithVirtualPatients",
        title: "Building a Conversational AI Medium to Enhance Psychotherapy Training",
        abstract: "Psychotherapists in training lack a standardized and formalized method of patient interaction for the proper development of empathy, communication, and experience. Currently, the experience of a resident may include training with other residents where one patient acts as the patient and one the psychotherapist, or with the usage of a simulated patient, an actor, to practice with the resident. Both methods have shortcomings in availability, reliability, and the accuracy of the patient in replicating a real scenario. This project attempted to create virtual patients by utilizing online patient transcripts through the fine-tuning and transfer-learning of three modern Artificial Intelligence models, ChatGPT-4o, LlaMa-3.1v-405B, and Gemini 1.5 Pro; alongside the miniature versions of these models as applicable. This included the creation of a website interface that can interact with the created models for evaluation, while also allowing an interactive format with a simplistic design. The accuracy of the models was independently evaluated through cosine similarities between data and model outputs to find semantic relations, and varied from 92.99% to 83.40%; with ChatGPT-4o Mini and Full having the highest fine-tuned and transfer-learning accuracies respectfully. Furthermore, a customizable model allowed user input for specific descriptions and mental illnesses. This highlights the potential for a model to be successfully representative of a patient which can be utilized to train residents easier than currently available methods. The need for further evaluation and continual training are at the forefront of current limitations.",
        publication: "https://www.scipedia.com/public/Petrizzo_2025a#",
        patent: "63/772,435",
        type:  "Individual",
        awards: ["LISEF - 2nd Grand Award","NYSSEF","JSHS","JYEM Finalist"]
    },
    {
        file:"aNovelApproximationOfTheColatzConjectureThroughDiscreteFourierTransformations",
        title: "A Novel Approximation of the Collatz Conjecture Through Discrete Fourier Transformations",
        abstract: "N/A",
        publication: "N/A",
        patent: "N/A",
        type: "Individual",
        awards: ['LI Math Fair - Gold']
    },
    {
        file:"filler",
        title:"Soon!",
        abstract:"Soon!",
        publication:'N/A',
        patent:'N/A',
        type:'Mentorship - Stony Brook University',
        awards: 'N/A'
    },
    {
        file:'preventingDengueControllingMosquitoPopulationsThroughRecyclableTrapsAndEducation',
        title:'Preventing Dengue: Controlling Mosquito Populations Through Recyclable Traps and Education',
        abstract:"N/A",
        publication:'N/A',
        patent:'N/A',
        type:'Group - Summer Program',
        awards: ['Harvard Science Research Conference - 1st Place']
    }
];
const paperSize = papers.length;
let currentPaperIndex=0;

function setBlockVisibility(elementId, value) {
    const el = document.getElementById(elementId);
    el.style.visibility = (value === "N/A") ? "hidden" : "visible";
}

function loadPaper(index) {
    const paperData = papers[index];

    paper.setAttribute("data", `/static/assets/paperPDFs/${paperData.file}.pdf`);
    abstract.innerHTML = `&emsp;&emsp; ${paperData.abstract}`;
    title.innerHTML = `${paperData.title} Paper #${index+1}/${paperSize}`;

    setBlockVisibility('paperPublication', paperData.publication);
    publication.innerHTML = paperData.publication;
    publication.href = paperData.publication;

    setBlockVisibility('paperPatent',paperData.patent);
    patent.innerHTML = paperData.patent;

    setBlockVisibility('paperType',paperData.type);
    type.innerHTML = paperData.type;

    setBlockVisibility('paperAwards',paperData.awards);
    awardList.innerHTML='';
    if (paperData.awards && paperData.awards !== "N/A" && Array.isArray(paperData.awards)) {
        paperData.awards.forEach(awardText => {
            const awardItem = document.createElement('li');
            awardItem.innerHTML = awardText;
            awardItem.classList.add('award');
            awardList.appendChild(awardItem);
        });
    }
    currentPaperIndex=index;
}

prevBtn.onclick = () => {
    currentPaperIndex = (currentPaperIndex - 1 + paperSize) % paperSize;
    loadPaper(currentPaperIndex);
};

nextBtn.onclick = () => {
    currentPaperIndex = (currentPaperIndex + 1) % paperSize;
    loadPaper(currentPaperIndex);
};

document.addEventListener('DOMContentLoaded', () => {
    loadPaper(currentPaperIndex);
});