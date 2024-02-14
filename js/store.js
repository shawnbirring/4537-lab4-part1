function configForm() {
    let form = document.getElementById("uploadForm")
    form.onsubmit = uploadDef
}

function uploadDef(event) {
    event.preventDefault()
    console.log('test')

    let word = document.getElementById("word").value
    let def = document.getElementById("def").value

    let feedback = document.getElementById("feedback")
    feedback.innerHTML = "Uploading new definition..."

    let params = {word: word, definition: def}

    let xhttp = new XMLHttpRequest()
    xhttp.open("POST", "https://4537-lab4-part2.vercel.app/api/definitions", true)
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            let feedback = document.getElementById("feedback")
            resp = JSON.parse(this.responseText)

            if (this.status == 200) {
                feedback.innerHTML = `New Entry Recorded:
                ${resp["word"]}: ${resp["definition"]}`
            } else if (this.status == 404) {
                feedback.innerHTML = `Request ${resp["totalRequests"]}, word and definition could not be uploaded.`
            } else {
                feedback.innerHTML = "Upload failed."
            }
        }
    }
    xhttp.send(JSON.stringify(params))
}

configForm()