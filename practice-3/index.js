const postTable = document.getElementById("table");
const searchInput = document.getElementById("searchInput");
const tableBody = postTable.querySelector("tbody");
const tableHeads = document.querySelectorAll("th");

let posts = [];
let sortColumn = null;
let sortDirection = "asc";

async function getPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts = await res.json();
    renderTable(posts);
  } catch (error) {
    console.log(error);
  }
}

function renderTable(postData) {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  postData.forEach(({ userId, id, title, body }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${userId}</td>
            <td>${id}</td>
            <td>${title}</td>
            <td>${body}</td>
        `;
    tableBody.append(row);
  });
}

searchInput.addEventListener("input", () => {
  const searchedValue = searchInput.value.trim().toLowerCase();

  if (!searchedValue) {
    renderTable(posts);
    sortColumn = null;
    sortDirection = "asc";
    return;
  }

  if (searchedValue.length < 3) {
    return;
  }

  const filteredPosts = posts.filter(({ title, body }) => {
    return (
      title.toLowerCase().includes(searchedValue) ||
      body.toLowerCase().includes(searchedValue)
    );
  });

  renderTable(filteredPosts);
});

function sortData(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortDirection = "asc";
  }

  const sorted = [...posts];

  sorted.sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];

    if (aVal < bVal) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (aVal > bVal) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  sortColumn = column;
  renderTable(sorted);
}

getPosts();

Array.from(tableHeads).forEach((th) => {
  th.addEventListener("click", () => sortData(th.id));
});
