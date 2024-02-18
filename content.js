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
        const imgLink1 = chrome.runtime.getURL('stanley.jpg');
        const logo = chrome.runtime.getURL('logo.svg');
        const exit = chrome.runtime.getURL('exit.svg');
        const settings = chrome.runtime.getURL('settings.svg');
        const brand = "Stanley"
        const title = "Stanley Quencher H2.O FlowState™ Tumbler 30oz Rose Quartz"
        const price = "CAD $39.29"
        const imgLink = chrome.runtime.getURL("worthit-popup.svg");
        const imgLink2 = chrome.runtime.getURL("minus.svg");
        const imgLink3 = chrome.runtime.getURL("plus.svg");
        const imgLink4 = chrome.runtime.getURL("circle.svg");

        const arrayN = ["Double-wall vacuum insulation for long-lasting temperature regulation.",
            "Wide range of size options (14oz, 20oz, 30oz, 40oz, and 64oz).",
            "Sustainable construction using 90% recycled BPA-free stainless steel.",
            "Dishwasher safe for convenient cleaning without retaining stains or smells.",
            "Backed by a lifetime warranty, ensuring long-term durability and support."]

        const home =
            `<div class="placeholder"><img class="sidePopImage" src="${imgLink}" alt="plus sign"></div>
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
    <div class="tab-el active"><p class="p-tab">Overview</p></div>
    <div class="tab-el"> <p class="p-tab">ESG Score</p> </div>
    <div class="tab-el"> <p class="p-tab">Worth It?</p></div>
 </div>

 <div class= "tabContent">
    <div class="pros-ensemble">
        <div class="pros-section"><img src="${imgLink3}"/><p> Pros</p></div>
        <div id="one" class='hey'></div>
        <div class="pros-section"><img src="${imgLink2}"/><p> Cons</p></div>
        <div id="two" class='hey'></div>
    </div>
 </div>
 </div>`;

        const tempContainer = document.createElement('div');
        tempContainer.classList.add("sidePop");
        tempContainer.innerHTML = home;
        // Append the item to the body of the webpage
        document.body.appendChild(tempContainer);

        arrayN.forEach(function (el) {
            var item = `
            <div class="arg-boxes">
                <img src="${imgLink4}">
                    <p id="write">${el}</p>
                    <div class="divN"></div>
                </div>`;
            var doc = document.getElementById("one");
            doc.innerHTML += item;
            // Create a temporary container element
        });

    }
    hi()
})();

document.getElementsByClassName("sidePopImage")[0].addEventListener("click", function () {
    var container = document.getElementsByClassName("sidePop")[0];
    container.classList.toggle("slide-down");
});

function addTabContent(tabName) {
    // Remove any previously added tab content
    const esg_circle = chrome.runtime.getURL('esg_circle.svg');
    const esg_bars = chrome.runtime.getURL('esg_bars.svg');
    const esg_explanation = chrome.runtime.getURL('esg_explanation.svg');
    var tabContent = document?.getElementsByClassName("tabContent")[0];
    if (tabContent) {
        tabContent.parentNode.removeChild(tabContent);
    }


    const imgLink2 = chrome.runtime.getURL("minus.svg");
    const imgLink3 = chrome.runtime.getURL("plus.svg");
    const worthitCircle = chrome.runtime.getURL('worthit_meter.svg');
    const home = `
<div class="pros-ensemble">
    <div class="pros-section"><img src="${imgLink3}"/><p> Pros</p></div>
    <div id="one" class='hey'></div>
    <div class="pros-section"><img src="${imgLink2}"/><p> Cons</p></div>
    <div id="two" class='hey'></div>
</div>`;

    // Create new tab content based on tab name
    var newContent = document.createElement("div");
    newContent.classList.add("tabContent");
    if (tabName === "Overview") {
        newContent.innerHTML = home;
    } else if (tabName === " Worth It?") {
        console.log(tabName);
        newContent.innerHTML = `<p class="bold">Worth-It Meter</p><div class="esg">
            <img src="${worthitCircle}" alt="WorthIt Circle">
            <div class="text_overlay">3/10</div>
        </div>
        <p class="bold">So, is it worth it?</p>
        <p>No. This product might not worth it due to its high price tag relative to its perceived performance, alongside the subpar sustainability impact of its parent company. I recommend exploring alternative options that offer more value for money but also align with better eco practices.</p>
        <p class="bold"> What is the Worth-It Meter?</p>
        <p>The Worth-It Meter is a conclusive rating that evaluates a product's overall standing by combining the product’s star ratings and its ESG score.</p>
        <p>A higher score reflects positive star ratings and a commendable ESG score. The product not only performs well but also exhibits strong environmental, social, and governance practices, contributing to a more conscientious and worthwhile purchase.</p>`;
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
        </div >
            `;
    }
    // Append new tab content to the container
    document.getElementsByClassName("mainFrame")[0].appendChild(newContent);
}




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




async function getAmazon() {
    // get product information 
    try {
        const response = await fetch('http://127.0.0.1:5000/amazon-info');
        localStorage.setItem('amazon_data', JSON.stringify(response));
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }

}

async function getMotherly(openai_info) {
    await fetch('http://127.0.0.1:5000/motherly-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'openai_info': openai_info })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = 'Response: ' + JSON.stringify(data);
            localStorage.setItem('query_results', JSON.stringify(data));
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function getGenz(openai_info) {
    await fetch('http://127.0.0.1:5000/genz-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'openai_info': openai_info })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = 'Response: ' + JSON.stringify(data);
            localStorage.setItem('query_results', JSON.stringify(data));
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function getNeutral(openai_info) {
    await fetch('http://127.0.0.1:5000/neutral-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'openai_info': openai_info })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = 'Response: ' + JSON.stringify(data);
            localStorage.setItem('query_results', JSON.stringify(data));
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}