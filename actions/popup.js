document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('promptForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        var name = document.getElementById('promptInput').value;
        var response = await getAmazon();
        if (name === 'motherly') {
            response = await getOpenAI(response.openai_info);
        } else if (name === 'teen') {
            response = await getOpenAI(response.openai_info);
        } else {
            response = await getOpenAI(response.openai_info);
        }
        console.log(response)
    });
});


async function getAmazon() {
    // get product information 
    try {
        const response = await fetch('http://127.0.0.1:5000/amazon-info');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }

}

async function getOpenAI(openai_info) {
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
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}