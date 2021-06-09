class App {
    // Initializes the instance of the class App
    // parameter "element" points at html element to be used as a container for an App object
    // parameter "size" points at partitioning of puzzles within App container
    constructor(element, size) {

        // Initiate game grid within App container upon App instantiation
        this.grid = this.initiateGrid();

        // Retrieve and assign size property(rows x columns) based on respective parameter passed through constructor
        this.size = size;
        // Retrieve and assign element property based on respective parameter passed through constructor
        this.element = element;

        // Attach flip event on mouse click to the current App instantiation
        this.flip = this.flip.bind(this);
        this.element.addEventListener('click', this.flip);

        // Populate App container with div elements according to partitioning set as size property
        for (let rows = 0; rows < size; rows++) {
            for (let columns = 0; columns < size; columns++) {
                // Create div element
                let div = document.createElement('div');

                // Set div size (250 is the width and height of the container)
                div.style.width = (250 / size) + 'px';
                div.style.height = (250 / size) + 'px';

                // Specify div location
                div.dataset.location = JSON.stringify({ rows, columns });

                // Append newly created div
                element.appendChild(div);
            }
        }
    }

    // Renders flipped puzzles of the game grid
    render(rows, columns, delay) {
        // Locate puzzle div
        let div = this.element.children[rows * this.size + columns];
        // Set class name 
        div.className = this.grid[rows][columns] ? ('flip' + (delay ? ' flip-delay' : '')) : '';
    }

    // Initiates game Grid with 5 columns and 5 rows
    initiateGrid() {
        // Define grid variable as an array with 5 elements (=> five rows)
        const grid = Array(5);
        // Set 5 columns in each of 5 rows (all initially set to false)
        for (let i = 0; i < grid.length; i++) {
            grid[i] = [false, false, false, false, false];
        }
        return grid;
    }

    // Flip logic (contextual) (fires on mouse click)
    flip(event) {
        // Define location for flip (as JSON)
        const locationJSON = event.target.dataset.location;
        if (!locationJSON) {
            return;
        }

        // Parse locationJSON 
        const location = JSON.parse(locationJSON);

        // Localize rows and columns
        const locationRows = location.rows;
        const locationColumns = location.columns;

        // Flip localized puzzle
        this.grid[locationRows][locationColumns] = !this.grid[locationRows][locationColumns];

        // Render localized puzzles without delay
        this.render(locationRows, locationColumns, false);

        // Declare directions to "grab" the current puzzle
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        // "Grab" and render neighboring puzzles
        for (let direction of directions) {

            let neighboringRow = locationRows + direction[0];
            let neighboringColumn = locationColumns + direction[1];

            // Check if neighboring puzzles are within the game grid
            if (neighboringRow >= 0 && neighboringRow < this.size && neighboringColumn >= 0 && neighboringColumn < this.size) {

                // Flip localized neighboring puzzle
                this.grid[neighboringRow][neighboringColumn] = !this.grid[neighboringRow][neighboringColumn];

                // Render neighbouring puzzle with delay
                this.render(neighboringRow, neighboringColumn, true);
            }
        }
    }
}

new App(document.querySelector('#container'), 5);