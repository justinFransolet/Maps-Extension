/**
 * Send new status to the background script.
 */
const sendStatusToContent = async (status) => {
    await chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const activeTab = tabs[0];

        // Send the status to the content script
        chrome.tabs.sendMessage(activeTab.id, {type: 'STATUS_MAPS', status: status}, () => {});
    });
};

/**
 * Change the status system.
 */

const changeStatus = async () => {
    const status = getStatus();
    const newStatus = status === "active" ? "inactive" : "active";
    localStorage.setItem("statusMaps", newStatus);
    displayStatus();
    await sendStatusToContent(newStatus);
    console.log(`Status changed to: ${newStatus}`);
};

const getStatus = () => localStorage.getItem("statusMaps") || "active";

/**
 * Display status system.
 */

const displayStatus = () => {
    const statusElement = document.getElementById("toggleSystem");
    if (statusElement) {
        statusElement.checked = getStatus() === "active";
    } else {
        statusElement.checked = false;
        console.error("Status element not found.");
    }
};

/**
 * At the start of the popup, display the status system.
 */
document.addEventListener("DOMContentLoaded", () => displayStatus());

const toggleSystem = document.getElementById("toggleSystem");
toggleSystem.addEventListener("change", changeStatus);