import { convertToFormattedDate } from '../../utils/utils';

const unauthenticatedNavListTemplate = (userInfo) => `
  <ul class="nav justify-content-center align-items-center">
    <li id="loginMenu" class="nav-item">
      <a class="nav-link" href="#/login">Login</a>
    </li>
    <li id="registerMenu" class="nav-item">
      <a class="nav-link" href="#/register">Register</a>
    </li>
  </ul>
`;

const authenticatedNavListTemplate = (userInfo) => `
  <ul class="nav justify-content-center align-items-center">
    <li class="nav-item">
      <a class="nav-link" href="#/">Beranda</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#/note/create">Tambah</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#/bookmark">Bookmark</a>
    </li>
    <li id="userLoggedMenu" class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle text-nowrap"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div class="me-2 d-inline-block">
          <img
            id="imgUserLogged"
            style="width: 30px;height: 30px"
            class="img-fluid rounded-pill"
            src="https://ui-avatars.com/api/?name=${userInfo.name}&background=random"
            alt="${userInfo.name}"
          />
        </div>
        <span id="nameUserLogged">${userInfo.name}</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <a id="userLogOut" class="dropdown-item" href="#/logout">Logout</a>
      </ul>
    </li>
  </ul>
`;

const noteItemTemplate = (note, userInfo, bookmarkButton) => {

  let result = `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <span class="text-muted">${note.owner}</span> | 
        <span class="text-muted">${convertToFormattedDate(note.createdAt)}</span>
        <p class="card-text">${note.body}</p>
        <div class="mt-3 d-flex gap-2 justify-content-end align-items-end">
      ${bookmarkButton}`

  if (note.owner === userInfo) {
    result +=
      `
          <button 
            id="deleteNoteButton" 
            data-id="${note.id}" 
            class="btn btn-danger"
          >Hapus</button>
        `
  };
  result += `</div></div>
    </div>
  `
  return result;
};

const createNoteListEmptyTemplate = () => {
  return `
    <div class="col-12">
      <div class="text-center p-5">
        Tidak ada catatan tersedia.
      </div>
    </div>
  `;
};

const bookmarkNoteItemTemplate = (note, bookmarkButton) => `
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">${note.title}</h5>
      <span class="text-muted">${note.owner}</span> | 
      <span class="text-muted">${convertToFormattedDate(note.createdAt)}</span>
      <p class="card-text">${note.body}</p>
      <div class="mt-3 d-flex gap-2 justify-content-end align-items-end">
        ${bookmarkButton}
      </div>
    </div>
  </div>
`;

const createBookmarkButtonTemplate = (noteId) => {
  return `
    <button
      id="bookmarkButton"
      class="btn btn-primary"
      data-id="${noteId}"
    >Bookmark</button>
  `;
};

const createRemoveBookmarkButtonTemplate = (noteId) => {
  return `
    <button
      id="removeBookmarkButton"
      class="btn btn-danger"
      data-id="${noteId}"
    >Remove Bookmark</button>
  `;
};


export {
  authenticatedNavListTemplate,
  unauthenticatedNavListTemplate,
  noteItemTemplate,
  createNoteListEmptyTemplate,
  bookmarkNoteItemTemplate,
  createBookmarkButtonTemplate,
  createRemoveBookmarkButtonTemplate,
};
