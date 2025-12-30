/**
 * Received from the popup script the status if the system is active.
 */
chrome.runtime.onMessage.addListener((message,sender, sendResponse) => {
    if (message.type === 'STATUS_MAPS') {
        localStorage.setItem("statusMaps", message.status);
        sendResponse();
    }
});

/**
 * Get the therms of the Google search query from URL.
 * @returns {string} The search query.
 */
const get_search_query = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("q");
}

/**
 * Get the multitool bar element from Google search results page.
 * @returns {Element} The multitool bar element.
 */
const get_multitool_bar = () => {
    const navBar = document.querySelector("div[jsname='s2gQvd']");
    return navBar.querySelector("div[role='list']");
}

/**
 * Create a new Maps button element.
 * @returns {HTMLDivElement} The Maps button element.
 */
const create_maps_button = (q_params) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("role", "listitem");

    const link = document.createElement("a");
    link.setAttribute("role", "link");
    link.className = "C6AK7c";
    link.href = `https://www.google.com/maps/search/${q_params}`;

    const div = document.createElement("div");
    div.className = "mXwfNd";

    const span = document.createElement("span");
    span.className = "R1QWuf";
    span.textContent = "Maps";

    div.appendChild(span);

    link.appendChild(div);

    listItem.appendChild(link);

    return listItem;
}

/**
 * Script to add a "Maps" button to the Google search results page.
 */
const run =  () => {
    // Check if the system is active
    const status = localStorage.getItem("statusMaps") || "active";
    if (status !== "active") return;

    // Get google search query from URL
    const q_params = get_search_query()

    // Create new Maps button in navigation bar
    const displayList = get_multitool_bar()

    if (q_params && displayList) {
        const listItem = create_maps_button(q_params)

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