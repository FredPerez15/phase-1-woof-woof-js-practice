// wait for the page to load 
// then call fetchPups

document.addEventListener("DOMContentLoaded", fetchPups)

// send a fetch request to API

function fetchPups() {
    fetch("http://localhost:3000/pups")
    // wait for response 
    // convert to JSON
        .then(response => response.json())
        // pass the array of objects
        // to addAllPups function
        .then (pups => addAllPups(pups))
}

function addAllPups(pups) {
    // grab the div with the id of dog-bar
    const dogBar = document.getElementById("dog-bar")
    // iterate over the array of pup object
    pups.forEach((pup) => {
        // create a span for each element
        const newDogSpan = document.createElement("span")
        //set the span inner text to the name 
        newDogSpan.innerText = pup.name
        // add the id to the span 
        newDogSpan.dataset.id = pup.id
        // attach a click event listener to span 
        newDogSpan.addEventListener('click', handlePupClick)
        // add the span to div with id dog-bar
        dogBar.append(newDogSpan) 
    });

    function handlePupClick(e) {
        // sent a fetch to the dynamic url
        // interpoltae the data id-attribute
       fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
       // convert response to JSON
        .then(response => response.json()) 
        // 
        .then(pupData => addOnePup(pupData))
    }
    function addOnePup(pup) {
        // grab div with id dog-info
        const dogInfo = document.getElementById('dog-info')
        // clear the div
        dogInfo.innerHTML = ''
        // create an img tag
        const pupImage = document.createElement('img')
        // set image src attribute to image key from pup object
        pupImage.src = pup.image
        // create an h2 with the pup's name
        const pupName = document.createElement('h2')
        pupName.innerText = pup.name
        // create a button element
        const dogButton = document.createElement('button')
        // conditionally render button text based on
        // isGoodDog boolean value
        dogButton.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

        dogButton.addEventListener('click', handlePupButtonClick)
        // append new img tag, h2 to div#dog-info
        dogInfo.append(pupImage, pupName, dogButton)
    }
    function handlePupButtonClick(e) {
        if (e.target.innerText === 'Good Dog!') {
            e.target.innerText = 'Bad Dog!'
        } else {
            e.target.innerText = 'Good Dog!'
        }
    }
}