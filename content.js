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
        const imgLink = chrome.runtime.getURL("worthit-popup.svg");
        const imgLink2 = chrome.runtime.getURL("minus.svg");
        const imgLink3 = chrome.runtime.getURL("plus.svg");
        const imgLink4 = chrome.runtime.getURL("circle.svg");
        const hi = "Stanley Cup"
        const price = "$23.99"

        const pros_text = ["as;fldjlsadkfj;asdlfkasdj;kfjsadfjas;dflas", "as;fldjlsadkfj;asdlfkasdj;kfjsadfjas;dflas", "as;fldjlsadkfj;asdlfkasdj;kfjsadfjas;dflas"]

        const home = ` <div class="placeholder"> <img class="sidePopImage" src="${imgLink}" alt="plus sign"> </div>
<div class="mainFrame">
<div class="nav-bar"></div>
<div class="product-detail">
 <div class="product-image"><img class="main-img" src="${imgLink1}" alt="plus sign"></div>
 <div class="product-info"> <p class="text-format">${hi}</p><p class="text-format">${price}</p></div>
 </div>
 <div class="tab-bar">
 <div class="tab-el active"><p class="p-tab">Overview</p></div>
 <div class="tab-el"><p class="p-tab">ESG Score</p> </div>
 <div class="tab-el"><p class="p-tab">Worth It?</p></div>
 </div>
 <div class= "tabContent">
 <div class="pros-ensemble">
 <div class="pros-section"><img src="${imgLink3}"/><p> Pros</p></div>
 <div id="one" class='hey'></div>
 <div class="pros-section"><img src="${imgLink2}"/><p> Cons</p></div>
 <div id="two" class='hey'></div>
 </div>
 </div>
 </div>
 </div>`;

        const tempContainer = document.createElement('div');
        tempContainer.classList.add("sidePop");
        tempContainer.innerHTML = home;
        // Append the item to the body of the webpage
        document.body.appendChild(tempContainer);

        pros_text.forEach(function (el) {
            var item = `
            <div class="arg-boxes">
                <img src="${imgLink4}">
                <p>${el}</p>
                <div class="divN"></div>
            </div>
        `;
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
        newContent.innerHTML = `<p>This is the ESG Score tab content.</p>`;
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


