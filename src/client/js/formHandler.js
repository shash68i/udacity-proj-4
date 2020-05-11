function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")

    fetch('http://localhost:8081/test',{
    method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"formText":formText})
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        // document.getElementById('results').innerHTML = `Polarity: ${res.polarity}<br>Subectivity: ${res.subjectivity}<br>Text: ${res.text}`;
        document.getElementById('polarity').innerHTML = `Polarity: ${res.polarity}`;
        document.getElementById('subjectivity').innerHTML = `Subectivity: ${res.subjectivity}`;
        document.getElementById('text-data').innerHTML = `Text: ${res.text}`;

    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

export { handleSubmit }
