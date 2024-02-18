document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('promptForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        var name = document.getElementById('promptInput').value;
        var response = await getAmazon();
        if (name === 'motherly') {
            response = await getMotherly(response.openai_info);
        } else if (name === 'genz') {
            response = await getGenz(response.openai_info);
        } else {
            response = await getNeutral(response.openai_info);
        }
        console.log(response)
    });
});


async function getAmazon() {
    // get product information 
    try {
        const response = await fetch('http://127.0.0.1:5000/amazon-info');
        localStorage.setItem('amazon_data', response);
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
            localStorage.setItem('query_results3', data);
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
            localStorage.setItem('query_results2', JSON.stringify(data));
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
            localStorage.setItem('query_results1', data);
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}