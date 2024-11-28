let LocalStorageShow = true;
let SessionStorageShow = true;

//* Local Storage
const catchLocalStorageBtn = document.getElementById('getLocalStorageButton');
catchLocalStorageBtn.addEventListener('click', () => {
	const data = {
		fetchFunctionName: getLocalStorageData,
		headerId: 'LocalStorageHeading',
		HeaderName: 'Local Storage',
		ContenId: 'LocalStorage',
	};
	setStorage(data);
});

//* Session Storage
const catchSessionStorageBtn = document.getElementById(
	'getSessionStorageButton'
);
catchSessionStorageBtn.addEventListener('click', () => {
	const data = {
		fetchFunctionName: getSessionStorageData,
		headerId: 'StorageDataHeading',
		HeaderName: 'Session Storage',
		ContenId: 'StorageData',
	};
	setStorage(data);
});


//*clear All
const catchClearAllBtn = document.getElementById('clearAll');
catchClearAllBtn.addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// Execute the clear function in the content script context
		chrome.scripting.executeScript(
			{
				target: { tabId: tabs[0].id },
				func: clearAllStorage,
			},
			() => {
				alert('All localStorage and sessionStorage data have been cleared.');
				// Optionally reset any UI elements
				document.getElementById('LocalStorageContainer').innerHTML = '';
				document.getElementById('SessionStorageContainer').innerHTML = '';
				catchLocalStorageBtn.style.backgroundColor = '#abb8e8';
				catchSessionStorageBtn.style.backgroundColor = '#abb8e8';
			}
		);
	});
});

// Function to clear all localStorage and sessionStorage
function clearAllStorage() {
	localStorage.clear();
	sessionStorage.clear();
}


//*remove specific item from Local Storage


catchLocalStorageBtn.addEventListener('click',(event)=>{
    const closetIcon =event.target.closest('img')
    if(closetIcon){
        alert('closetIcon',closetIcon)

    }
})


//* common function for get browser storage
const setStorage = (data) => {
	const { fetchFunctionName, headerId, HeaderName, ContenId } = data;
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.scripting.executeScript(
			{
				target: { tabId: tabs[0].id },
				func: fetchFunctionName,
			},
			(results) => {
				const StorageData = results[0].result;

				// Get the target element by its ID
				const LocalStorageDiv = document.getElementById(
					'LocalStorageContainer'
				);
				const SessionStorageDiv = document.getElementById(
					'SessionStorageContainer'
				);

				const headerLocal = document.createElement('h3');
				const headerSession = document.createElement('h3');

				const isLocalStorage = ContenId === 'LocalStorage';
				// LocalStorageDiv.append(headerLocal)

				if (isLocalStorage) {
					LocalStorageShow = !LocalStorageShow;
					LocalStorageDiv.append(headerLocal);
				} else {
					SessionStorageShow = !SessionStorageShow;
					SessionStorageDiv.append(headerSession);
				}

				if (LocalStorageShow) {
					LocalStorageDiv.innerHTML = '';
					catchLocalStorageBtn.style.backgroundColor = '#abb8e8';
				}

				if (SessionStorageShow) {
					SessionStorageDiv.innerHTML = '';
					catchSessionStorageBtn.style.backgroundColor = '#abb8e8';
				}

				// Loop through the object
				for (const key in StorageData) {
					if (StorageData.hasOwnProperty(key)) {
						
                        //* Create a new element 
						const container = document.createElement('div');
						const p = document.createElement('p');
						const space = document.createElement('p');
						const textInput = document.createElement('input');
						const removeICon = document.createElement('img');
						const correctICon = document.createElement('img');
						const iconContainer = document.createElement('div');

						space.textContent = ' : ';

						textInput.type = 'text';
						textInput.value = `${StorageData[key]}`;
						textInput.title = `${StorageData[key]}`;

						const fullText = `${key}`;

						p.textContent =
							fullText.length > 13 ? fullText.slice(0, 13) + '...' : fullText;

						// Set the title attribute to show full content on hover
						p.title = fullText;
						p.style.width = '100px';

						// Apply flexbox styling to the div
						container.style.display = 'flex';
						container.style.alignItems = 'center'; // Align items vertically centered
						container.style.gap = '10px'; // Add space between elements (optional)

						iconContainer.style.display = 'flex';
						iconContainer.style.flexDirection = 'row';
						iconContainer.style.gap = '11px';

                        iconContainer.id ='iconsContainer'

						removeICon.src = './icons/remove.svg';
						removeICon.alt = 'removeIcon';

						correctICon.src = './icons/correct.svg';
						correctICon.alt = 'correctIcon';

                        correctICon.addEventListener("click", () => handleRemoveIconClick(fullText));


						iconContainer.append(removeICon, correctICon);

						// Append p and input to the div
						container.append(p, space, textInput, iconContainer);

						// Inject the element into the target element
						if (isLocalStorage && !LocalStorageShow) {
							LocalStorageDiv.appendChild(container);
							catchLocalStorageBtn.style.backgroundColor = '#F44336';
							headerLocal.textContent = 'Local Storage';
						}
						if (!isLocalStorage && !SessionStorageShow) {
							SessionStorageDiv.appendChild(container);
							catchSessionStorageBtn.style.backgroundColor = '#F44336';
							headerSession.textContent = 'Session Storage';
						}
					}
				}
			}
		);
	});
};

// Function to get localStorage values, to be executed in the content script context
function getLocalStorageData() {
	const keys = Object.keys(localStorage);
	const localStorageValues = {};

	keys.forEach((key) => {
		localStorageValues[key] = localStorage.getItem(key);
	});

	return localStorageValues; // Return the localStorage data to popup.js
}

// Function to get localStorage values, to be executed in the content script context
function getLocalStorageData() {
	const keys = Object.keys(localStorage);
	const localStorageValues = {};

	keys.forEach((key) => {
		localStorageValues[key] = localStorage.getItem(key);
	});

	return localStorageValues; // Return the localStorage data to popup.js
}

// Function to get sessionStorage values, to be executed in the content script context
function getSessionStorageData() {
	const keys = Object.keys(sessionStorage);
	const sessionStorageValues = {};

	keys.forEach((key) => {
		sessionStorageValues[key] = sessionStorage.getItem(key);
	});

	return sessionStorageValues; // Return the sessionStorage data to popup.js
}
