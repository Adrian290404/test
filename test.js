loadSaves()
function kmTOmiles(){
    let km = parseFloat(document.getElementById("input").value)
    let miles = km * 0.621371
    return miles.toFixed(2)
}
function milesTOkm(){
    let miles = parseFloat(document.getElementById("input").value)
    let km = miles * 1.60934
    return km.toFixed(2)
}
function feetTOmetres(){
    let feet = parseFloat(document.getElementById("input").value)
    let metres = feet * 0.3048
    return metres.toFixed(2)
}
function metresTOfeet(){
    let metres = parseFloat(document.getElementById("input").value)
    let feet = metres * 3.28084
    return feet.toFixed(2)
}
function cmTOinches(){
    let cm = parseFloat(document.getElementById("input").value)
    let inches = cm * 0.0393701
    return inches.toFixed(2)
}
function inchesTOcm(){
    let inches = parseFloat(document.getElementById("input").value)
    let cm = inches * 2.54
    return cm.toFixed(2)
}
function convert() {
    let inputValue = document.getElementById("input").value
    if (isNaN(inputValue) || inputValue === ""){
        document.getElementById("result").innerHTML = 0
    }
    else{
        let conversion = document.getElementById("conversionType").value
        let res = 0
        if(conversion == "kmTOmiles") res = kmTOmiles()
        else if(conversion == "milesTOkm") res = milesTOkm()
        else if(conversion == "feetTOmetres") res = feetTOmetres()
        else if(conversion == "metresTOfeet") res = metresTOfeet()
        else if(conversion == "cmTOinches") res = cmTOinches()
        else res = inchesTOcm()
        document.getElementById("result").innerHTML = res
    }
}
function removeCard(str) {
    let array = JSON.parse(localStorage.getItem("saves"))
    let newArray = []
    for(let i = 0; i < array.length; i++) {
        if(array[i] != str){
            newArray.push(array[i])
        } 
    }
    if (newArray.length == 0){
        localStorage.clear()
    }
    else{
        localStorage.setItem("saves", JSON.stringify(newArray))        
    }
    loadSaves()
}
function newSave(str){
    document.getElementById("savedList").innerHTML += 
`<div class="col-12 col-md-6 mt-3">
    <div class="card bg-light d-flex align-items-center" style="padding: 10px;">
        <div class="d-flex justify-content-between w-100">
            <p class="card-text mb-0 cards">${str}</p>
            <span class="close" onclick="removeCard('${str}')">&times;</span>
        </div>
    </div>
</div>`
}
function loadSaves(){
    document.getElementById("savedList").innerHTML = ""
    if(localStorage.getItem("saves")){
        let array = JSON.parse(localStorage.getItem("saves"))
        for(let i = 0; i < array.length; i++){
            newSave(array[i])
        }        
    }
}
document.getElementById("input").addEventListener("input", convert)
document.getElementById("conversionType").addEventListener("change", function() {
    let inputValue = document.getElementById("input").value
    if (!isNaN(inputValue) && inputValue !== ""){
        convert()
    } 
    else {
        document.getElementById("result").innerHTML = 0
    }
    let conversion = document.getElementById("conversionType").value
    let resultUnit = "cm"
    let inputUnit = "inches"
    if(conversion == "kmTOmiles") resultUnit = "miles", inputUnit = "km"
    else if(conversion == "milesTOkm") resultUnit = "km", inputUnit = "miles"
    else if(conversion == "feetTOmetres") resultUnit = "metres", inputUnit = "feet"
    else if(conversion == "metresTOfeet") resultUnit = "feet", inputUnit = "metres"
    else resultUnit = "inches", inputUnit = "cm"
    document.getElementById("resultUnit").innerHTML = resultUnit
    document.getElementById("convertUnit").innerHTML = inputUnit
})
document.getElementById("change").addEventListener("click", function(){
    let conversion = document.getElementById("conversionType").value
    let resultUnit = "inches"
    let inputUnit = "cm"
    let newConversion = "inchesTOcm"
    if(conversion == "kmTOmiles") resultUnit = "km", inputUnit = "miles", newConversion = "milesTOkm"
    else if(conversion == "milesTOkm") resultUnit = "miles", inputUnit = "km", newConversion = "kmTOmiles"
    else if(conversion == "feetTOmetres") resultUnit = "feet", inputUnit = "metres", newConversion = "metresTOfeet"
    else if(conversion == "metresTOfeet") resultUnit = "metres", inputUnit = "feet", newConversion = "feetTOmetres"
    else resultUnit = "cm", inputUnit = "inches", newConversion = "cmTOinches"
    document.getElementById("conversionType").value = newConversion
    document.getElementById("resultUnit").innerHTML = resultUnit
    document.getElementById("convertUnit").innerHTML = inputUnit
    let inputValue = document.getElementById("input").value
    if (!isNaN(inputValue) && inputValue !== ""){
        convert()
    } 
    else {
        document.getElementById("result").innerHTML = 0
    }
})
document.getElementById("save").addEventListener("click", function(){
    finalString = document.getElementById("input").value + " " + document.getElementById("convertUnit").textContent + " ⭢ " + document.getElementById("result").textContent + " " + document.getElementById("resultUnit").textContent   
    if (document.getElementById("result").textContent != 0){
        if(localStorage.getItem("saves")){
            let array = JSON.parse(localStorage.getItem("saves"))
            array.push(finalString)
            localStorage.setItem("saves", JSON.stringify(array))
            document.getElementById("savedList").innerHTML = ""
            for(let i = 0; i < array.length; i++){
                newSave(array[i])
            }
        }
        else{
            let array = [finalString]
            localStorage.setItem("saves", JSON.stringify(array))
            newSave(finalString)
        }
    }
})