let cellsData = [];
let allTags = new Set();
let allBrands = new Set();

function loadCells() {
    fetch('cells.json')
        .then(response => response.json())
        .then(data => {
            cellsData = data.cells;
            console.log("Données chargées :", cellsData);
            populateTags();
            populateBrands();
            displayCells(cellsData);
        })
        .catch(error => console.error('Erreur lors du chargement des cellules:', error));
}

function populateTags() {
    cellsData.forEach(cell => {
        if(cell.tags) {
            cell.tags.forEach(tag => allTags.add(tag));
        }
    });

    const tagDropdown = document.getElementById('tagDropdown');
    Array.from(allTags).sort().forEach(tag => {
        appendCheckbox(tagDropdown, tag);
    });
}

function populateBrands() {
    cellsData.forEach(cell => {
        if(cell.marque) {
            allBrands.add(cell.marque);
        }
    });

    const brandDropdown = document.getElementById('brandDropdown');
    Array.from(allBrands).sort().forEach(brand => {
        appendCheckbox(brandDropdown, brand);
    });
}

function appendCheckbox(dropdown, item) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item;
    checkbox.value = item;

    const label = document.createElement('label');
    label.htmlFor = item;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item));

    checkbox.addEventListener('change', filterCells);

    dropdown.appendChild(label);
}

function displayCells(cells) {
    const container = document.getElementById('gridContainer');
    container.innerHTML = '';
    cells.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'grid-item';
        cellDiv.onclick = () => window.open(cell.link, '_blank');

        const img = document.createElement('img');
        img.src = cell.image;
        img.alt = cell.name;
        img.className = 'cell-image';

        const name = document.createElement('div');
        name.textContent = cell.name;
        name.className = 'cell-name';

        cellDiv.appendChild(img);
        cellDiv.appendChild(name);
        container.appendChild(cellDiv);
    });
}

function filterCells() {
    console.log("Filtrage des cellules"); // Pour le débogage

    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    console.log("Terme de recherche:", searchTerm); // Pour le débogage

    const selectedTags = Array.from(document.querySelectorAll('#tagDropdown input[type="checkbox"]:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('#brandDropdown input[type="checkbox"]:checked')).map(cb => cb.value);

    const filteredCells = cellsData.filter(cell => {
        const nameMatch = cell.name.toLowerCase().includes(searchTerm);
        const tagMatch = selectedTags.length === 0 || (cell.tags && cell.tags.some(tag => selectedTags.includes(tag)));
        const brandMatch = selectedBrands.length === 0 || (cell.marque && selectedBrands.includes(cell.marque));
        return nameMatch && tagMatch && brandMatch;
    });

    displayCells(filteredCells);
}

// Ajout d'un écouteur d'événements pour la barre de recherche
document.getElementById('searchBar').addEventListener('input', filterCells);

document.addEventListener('DOMContentLoaded', loadCells);

document.getElementById('discordButton').addEventListener('click', function() {
    window.open('https://discord.gg/cu23ZnNze4', '_blank');
});

document.getElementById('signupButton').addEventListener('click', function() {
    window.open('https://pandabuy.allapp.link/cm0g2oggpf6qoog03v5g', '_blank');
});
