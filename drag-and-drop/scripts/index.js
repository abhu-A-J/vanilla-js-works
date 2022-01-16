/* Get required DOM Elements */
const backlogListEl = document.querySelector('#backlog-list');
const progressListEl = document.querySelector('#progress-list');
const completedListEl = document.querySelector('#completed-list');
const onHoldListEl = document.querySelector('#onhold-list');

/* All droppable columns */
const allDroppableColumns = [
  backlogListEl,
  completedListEl,
  progressListEl,
  onHoldListEl,
];

/* Store board items */
let backlogItems = [];
let inProgressItems = [];
let completedItems = [];
let onHoldItems = [];

let isFirstLoad = true;

// store the currrent dragged item
let currentDraggedItem;
let currentDroppableColumn;

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

/* Helper function to remove over class */
function removeOverClass() {}

/* Listener to make columns droppable */
function allowDrop(e) {
  e.preventDefault();
}

/* Listener for when item starts to drag */
function handleItemDragStart(e) {
  currentDraggedItem = e.target;
  // console.log('Item dragged', e.target);
}

/* Listenrs for when drag item enter droppable zone */
function handleOnDragEnter(e, droppableEl) {
  if (droppableEl) {
    allDroppableColumns.forEach((column) => {
      if (column === droppableEl) {
        droppableEl.classList.add('over');
      } else {
        column.classList.remove('over');
      }
    });
    // store the current droppable column
    currentDroppableColumn = droppableEl;
  }
}

/* Listeners when drop event happens */
function drop(e) {
  e.preventDefault();

  // remove the over class on drop
  currentDroppableColumn.classList.remove('over');

  // apend the current dragged item to the current droppable column
  currentDroppableColumn.appendChild(currentDraggedItem);

  // rebuild the columns ad updateBoard()
  rebuildColumns();
}

/* Helper function to rebuild columns */
function rebuildColumns() {
  // rebuild the columns

  // first reset everything
  backlogItems = [];
  inProgressItems = [];
  completedItems = [];
  onHoldItems = [];

  backlogItems = Array.from(backlogListEl.children).map(
    (item) => item.textContent
  );

  completedItems = Array.from(completedListEl.children).map(
    (item) => item.textContent
  );

  inProgressItems = Array.from(progressListEl.children).map(
    (item) => item.textContent
  );

  onHoldItems = Array.from(onHoldListEl.children).map(
    (item) => item.textContent
  );

  updateBoard();
}

/* Helper function to create a drag item */
function createDragListItem(properties) {
  const { textContent, id } = properties;

  // create an li with class 'drag-item'
  const dragListItem = document.createElement('li');
  dragListItem.classList.add('drag-item');

  // add the properties given
  dragListItem.textContent = textContent;
  dragListItem.draggable = true;
  dragListItem.id = id;

  dragListItem.addEventListener('dragstart', handleItemDragStart);

  return dragListItem;
}

/* Helper function to append list items to parent list*/
function appendListItemsToParent(parentEl, listItem) {
  // create fragment to append all childs
  const listItemsFragment = document.createDocumentFragment();
  listItem.forEach((item, index) => {
    const newItem = createDragListItem({ textContent: item, id: index });
    listItemsFragment.appendChild(newItem);
  });
  // reset the child first
  parentEl.textContent = '';
  // append the fragment on parent
  parentEl.appendChild(listItemsFragment);
}

/* Helper function to update the board */
function updateBoard() {
  // get saved columns from storage

  if (isFirstLoad) {
    getSavedBoardColumnsFromStorage();
    isFirstLoad = false;
  }

  updateBoardColumnsInStorage();

  // update DOM for backlog board
  appendListItemsToParent(backlogListEl, backlogItems);

  // update DOM for progress board
  appendListItemsToParent(progressListEl, inProgressItems);

  // update DOM for the completed board
  appendListItemsToParent(completedListEl, completedItems);

  // update DOM for the on hold board
  appendListItemsToParent(onHoldListEl, onHoldItems);
}

/* Make the columns list item dropabble and also listen to on drop event */
function setupDragAndDrop() {
  /* Allow columns to be droppable */
  backlogListEl.addEventListener('dragover', allowDrop);
  completedListEl.addEventListener('dragover', allowDrop);
  progressListEl.addEventListener('dragover', allowDrop);
  onHoldListEl.addEventListener('dragover', allowDrop);

  /* Attach event drop event handler on all drag columns list */
  backlogListEl.addEventListener('drop', drop);
  completedListEl.addEventListener('drop', drop);
  progressListEl.addEventListener('drop', drop);
  onHoldListEl.addEventListener('drop', drop);

  /* Show visuals that column list can be dropped on */
  backlogListEl.addEventListener('dragenter', (e) => {
    handleOnDragEnter(e, backlogListEl);
  });
  completedListEl.addEventListener('dragenter', (e) => {
    handleOnDragEnter(e, completedListEl);
  });
  progressListEl.addEventListener('dragenter', (e) => {
    handleOnDragEnter(e, progressListEl);
  });
  onHoldListEl.addEventListener('dragenter', (e) => {
    handleOnDragEnter(e, onHoldListEl);
  });
}

setupDragAndDrop();

updateBoard();
