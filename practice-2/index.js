const postTable = document.getElementById("table");
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

getPosts();
