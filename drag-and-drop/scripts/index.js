/* Get required DOM Elements */
const backlogList = document.querySelector('#backlog-list');
const progressList = document.querySelector('#progress-list');
const completedList = document.querySelector('#completed-list');
const onHoldList = document.querySelector('#onhold-list');

/* Store board items */
let backlogItems = [];
let inProgressItems = [];
let completedItems = [];
let onHoldItems = [];

let isFirstLoad = false;

/* Helper function to update columns items to local storage */
function updateBoardColumnsInStorage() {
  localStorage.setItem('backlogItems', JSON.stringify(backlogItems));
  localStorage.setItem('inProgressItems', JSON.stringify(inProgressItems));
  localStorage.setItem('completedItems', JSON.stringify(completedItems));
  localStorage.setItem('onHoldItems', JSON.stringify(onHoldItems));
}

/* Helper function to get saved columns from local storage */
function getSavedBoardColumnsFromStorage() {
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

/* Helper function to create a drag item */
function createDragListItem(properties) {
  const { textContent } = properties;

  // create an li with class 'drag-item'
  const dragListItem = document.createElement('li');
  dragListItem.classList.add('drag-item');

  // add the properties given
  dragListItem.textContent = textContent;

  return dragListItem;
}

/* Helper function to append list items to parent list*/
function appendListItemsToParent(parentEl, listItem) {
  // create fragment to append all childs
  const listItemsFragment = document.createDocumentFragment();
  listItem.forEach((item) => {
    const newItem = createDragListItem({ textContent: item });
    listItemsFragment.appendChild(newItem);
  });
  // append the fragment on parent
  parentEl.appendChild(listItemsFragment);
}

/* Helper function to update the board */
function updateBoard() {
  // get saved columns from storage
  getSavedBoardColumnsFromStorage();

  if (!isFirstLoad) {
    updateBoardColumnsInStorage();
    isFirstLoad = true;
  }

  // update DOM for backlog board
  appendListItemsToParent(backlogList, backlogItems);

  // update DOM for progress board
  appendListItemsToParent(progressList, inProgressItems);

  // update DOM for the completed board
  appendListItemsToParent(completedList, completedItems);

  // update DOM for the on hold board
  appendListItemsToParent(onHoldList, onHoldItems);
}

updateBoard();
