function configForm() {
    let form = document.getElementById("lookup")
    form.onsubmit = lookupDef
}

function lookupDef(event) {
    event.preventDefault()
    console.log("test")

    let word = document.getElementById("word").value
    let def = document.getElementById("def")
    def.innerHTML = "Looking up definition..."

    xhr = new XMLHttpRequest()
    xhr.open("GET",`https://4537-lab4-part2.vercel.app/api/definitions/?word=${word}`, true)
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            let resp = JSON.parse(this.responseText)
            if (this.status == 200) {
                def.innerHTML = resp["definition"]
            } else if (this.status == 404) {
                def.innerHTML = `Request ${resp["totalRequests"]}, word ${word} not found!`
            }
        } 
    }
    xhr.send()
}

configForm()