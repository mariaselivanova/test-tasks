const postTable = document.getElementById("table");
const searchInput = document.getElementById("searchInput");
const tableBody = postTable.querySelector("tbody");

let posts = [];

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
    return;
  }

  if (searchedValue.length < 3) {
    return;
  }

  const filteredPosts = posts.filter(({ userId, id, title, body }) => {
    return (
      userId.toString().includes(searchedValue) ||
      id.toString().includes(searchedValue) ||
      title.toLowerCase().includes(searchedValue) ||
      body.toLowerCase().includes(searchedValue)
    );
  });

  renderTable(filteredPosts);
});

getPosts();
