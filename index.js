let myLinks = []

const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const linksFromLocalStorage = JSON.parse(window.localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i ++) {
        if (links[i]) {
            listItems += `
                <li>
                    <a href='${links[i]}' target='_blank'>
                        ${links[i]}
                    </a>
                </li>`
        }
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url)
        window.localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })

})

inputBtn.addEventListener("click", function() {
    if (inputEl.value) {
        myLinks.push(inputEl.value)
    }
    inputEl.value = ""
    window.localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

deleteBtn.addEventListener("dblclick", function() {
    window.localStorage.clear()
    myLinks = []
    render(myLinks)
})

