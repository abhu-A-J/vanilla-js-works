/* Store board items */
let backlogItems = [];
let inProgressItems = [];
let completedItems = [];
let onHoldItems = [];

/* Helper function to update columns items to local storage */
function updateBoardColumns() {
  localStorage.setItem('backlogItems', JSON.stringify(backlogItems));
  localStorage.setItem('inProgressItems', JSON.stringify(inProgressItems));
  localStorage.setItem('completedItems', JSON.stringify(completedItems));
  localStorage.setItem('onHoldItems', JSON.stringify(onHoldItems));
}

/* Helper function to get saved columns from local storage */
function getSavedBoardColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogItems = JSON.parse(localStorage.getItem('backlogItems') || '[]');
    inProgressItems = JSON.parse(
      localStorage.getItem('inProgressItems') || '[]'
    );
    completedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
    onHoldItems = JSON.parse(localStorage.getItem('onHoldItems') || '[]');
  } else {
    // if not backlog items then add dummy data
    backlogItems = ['Backlog Item 1', 'Backlog Item 2', 'Backlog Item 3'];
    inProgressItems = [
      'In Progress Item 1',
      'In Progress Item 2',
      'In Progress Item 3',
    ];
    completedItems = [
      'Completed Item 1',
      'Completed Item 2',
      'Completed Item 3',
    ];
    onHoldItems = ['On Hold Item 1', 'On Hold Item 2', 'On Hold Item 3'];
  }
}

/* On load */
getSavedBoardColumns();
updateBoardColumns();
