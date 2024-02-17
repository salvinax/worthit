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

        const itemHTML = ` <img class="sidePopImage" src="${imgLink}" alt="plus sign">
<div class="mainFrame"><div class="nav-bar"></div></div>`;

        // Create a temporary container element
        const tempContainer = document.createElement('div');
        tempContainer.classList.add("sidePop");
        tempContainer.innerHTML = itemHTML;

        // Append the item to the body of the webpage
        document.body.appendChild(tempContainer);
        // Append the image to the body of the page


    }


    hi()
})();


document.getElementsByClassName("sidePopImage")[0].addEventListener("click", function () {
    console.log('jeyey')
    var container = document.getElementsByClassName("sidePop")[0];
    container.classList.toggle("slide-down");
});
