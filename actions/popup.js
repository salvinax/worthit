document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('promptForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        var name = document.getElementById('promptInput').value;
        sendRequest(name);
        getAmazon()
    });
});

function getAmazon() {
    // get product information 

    fetch('http://127.0.0.1:5000/amazon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('information').innerText = 'Response: ' + JSON.stringify(data.reviews);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function sendRequest(name) {
    fetch('http://127.0.0.1:5000/open-ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ name: name })
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('response').innerText = 'Response: ' + data;
            console.log(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}