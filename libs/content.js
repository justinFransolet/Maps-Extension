
const run =  () => {
    // Get google search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const q_params = urlParams.get("q");
    // Create new Maps button in navigation bar
    const navBar = document.querySelector(".qogDvd");
    const multitoolBar = navBar.querySelector(".crJ18e");
    const displayList = multitoolBar.querySelector("div[role='list']");
    if (navBar && multitoolBar && displayList) {
        const listItem = document.createElement("div");
        listItem.setAttribute("role", "listitem");
        const link = document.createElement("a");
        link.setAttribute("role", "link");
        link.className = "nPDzT T3FoJb";
        link.href = `https://www.google.com/maps/search/${q_params}`;
        const div = document.createElement("div");
        div.className = "YmvwI";
        div.textContent = "Maps";
        link.appendChild(div);
        listItem.appendChild(link);
        const existingItem = displayList.children[2];
        if (existingItem) {
            displayList.insertBefore(listItem, existingItem);
        } else {
            displayList.appendChild(listItem);
        }
    }else{
        console.error("Navigation bar not found.");
    }
};

run();