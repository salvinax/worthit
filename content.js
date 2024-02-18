// iconURL = chrome.extension.getURL("/bird.jpg");
// // Create an image element
// const image = document.createElement('img');
// image.src = iconURL;
// image.style.position = 'fixed';
// image.style.top = '50px'; // Adjust as per your requirement
// image.style.left = '50px'; // Adjust as per your requirement
// image.style.zIndex = "1000";

// // Append the image to the body of the page
// document.body.appendChild(image);


(function () {
    function hi() {
        const imgLink = chrome.runtime.getURL('worthit-popup.png');
        const imgLink1 = chrome.runtime.getURL('stanley.jpg');
        const logo = chrome.runtime.getURL('logo.svg');
        const exit = chrome.runtime.getURL('exit.svg');
        const settings = chrome.runtime.getURL('settings.svg');
        const brand = "Stanley"
        const title = "Stanley Quencher H2.O FlowState™ Tumbler 30oz Rose Quartz"
        const price = "CAD $39.29"
        const imgLink2 = chrome.runtime.getURL('pros.jpg');


        const home = ` <img class="sidePopImage" src="${imgLink}" alt="plus sign">
        <div class="mainFrame">
            <div class="nav-bar">
                <div class="left-svg">
                    <img src="${logo}" alt="WorthIt Logo">
                </div>
            
                <div class="right-svgs">
                    <img src="${settings}" alt="Right SVG 1">
                    <img src="${exit}" alt="Right SVG 2">
                </div>
            </div>

            <div class="product-detail">
                <div class="product-image"><img class="main-img" src="${imgLink1}" alt="plus sign"></div>
                <div class="product-info"> <p id="item-brand" class="text-format">${brand}</p><p id="item-title" class="text-format">${title}</p><p id="item-text" class="text-format">${price}</p></div>
            </div>
            <div class="tab-bar">
                <div class="tab-el active"> <p class="p-tab">Overview</p></div>
                <div class="tab-el"> <p class="p-tab">ESG Score</p> </div>
                <div class="tab-el"> <p class="p-tab">Worth It?</p></div>
 </div>
 <div class= "tabContent"> 
    <p>This is the Overview tab content.</p>
    
 </div>
 </div></div></div>`;

        const overview = `<div class="pros-section> <div/>"`
        const esg_screen = ``
        const worth_it_screen = ``

        // Create a temporary container element
        const tempContainer = document.createElement('div');
        tempContainer.classList.add("sidePop");
        tempContainer.innerHTML = home;
        // Append the item to the body of the webpage
        document.body.appendChild(tempContainer);
    }
    hi()
})();

function addTabContent(tabName) {
    // Remove any previously added tab content
    const esg_circle = chrome.runtime.getURL('esg_circle.svg');
    const worthit_circle = chrome.runtime.getURL('worthit_meter.svg');
    const esg_bars = chrome.runtime.getURL('esg_bars.svg');
    const esg_explanation = chrome.runtime.getURL('esg_explanation.svg');   
    var tabContent = document?.getElementsByClassName("tabContent")[0];
    if (tabContent) {
        tabContent.parentNode.removeChild(tabContent);
    }

    // Create new tab content based on tab name
    var newContent = document.createElement("div");
    newContent.classList.add("tabContent");
    console.log(tabName)
    if (tabName === "Overview") {
        newContent.innerHTML = `<p>This is the Overview tab content.</p>`;
    } else if (tabName === "Worth It?") {
        newContent.innerHTML = `<p>This is the Worth It? tab content.</p>`;
    } else {
        newContent.innerHTML = `
        <div class="esg_width">
            <div class="esg">
                <img src="${esg_circle}" alt="ESG Circle">
                <div class="text_overlay">25</div>
            </div>
            <p>The final ESG Risk Scores are a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signaling less unmanaged ESG Risk.</p>
            <div class="esg"> 
                <img src="${esg_bars}" alt="ESG Bars">
            </div>
            <p class="bold"> What is ESG?</p>
            <p>An Environmental, Social and Governance (ESG) score measures an organization’s performance against various sustainability metrics related to environmental, social, or governance issues.</p>
            <div class="esg"> 
                <img src="${esg_explanation}" alt="ESG Explanation">
            </div>
            <p>ESG scores are determined by analysts who evaluate corporate disclosures, conduct management interviews, and review public information to rate an organization objectively.</p>
            <p class="bold">Good to know</p>
            <p>A low ESG score indicates effective management of environmental, social, and governance risks, reflecting commitment to sustainability. Conversely, a high ESG score implies greater risk exposure in these areas.</p>
        </div>
        `;
    }

    // Append new tab content to the container
    document.getElementsByClassName("mainFrame")[0].appendChild(newContent);
}




document.getElementsByClassName("sidePopImage")[0].addEventListener("click", function () {
    var container = document.getElementsByClassName("sidePop")[0];
    container.classList.toggle("slide-down");
});


const tabs = document.querySelectorAll('.tab-el');
// Add click event listener to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove 'active' class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Add 'active' class to the clicked tab
        this.classList.add('active');
        const tabName = this.textContent;
        addTabContent(tabName);
    });
});


