window.onload = () => {
  const photoContainer = document.getElementById("photo-container");
  console.log(photoContainer);
  const loadBtn = document.getElementById("load-btn");
  console.log(loadBtn);
  loadBtn.onclick = fetchImgArray;
};

const fetchImgArray = function () {
  fetch("https://api.pexels.com/v1/search?query=tree", {
    headers: {
      Authorization: "xvsFuKaIuSWRWQiQ2wy6BRSaI0vjGK0EnZmYNpW49muiLz4LSWOStPAE"
    }
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Bad Request");
        }
        if (resp.status === 401) {
          throw new Error("Unauthorized");
        }
        if (resp.status === 403) {
          throw new Error("Forbidden");
        }
        if (resp.status === 404) {
          throw new Error("Not found");
        }

        throw new Error("Generic Fetching error");
      }
      return resp.json();
    })
    .then(objArray => {
      console.log(objArray);
      const photoContainer = document.getElementById("photo-container");
      photoContainer.innerHTML = "";
      objArray.photos.forEach(photo => {
        const col = document.createElement("div");
        col.classList = "col-md-4";
        const card = document.createElement("div");
        card.classList = "card mb-4 shadow-sm";

        card.innerHTML = `
        <img src="${photo.src.original}" class="card-img-top img-fluid" alt="${photo.alt}">`;
        const cardBody = document.createElement("div");
        cardBody.classList = "card-body";
        cardBody.innerHTML = `<h5 class="card-title">${photo.photographer}</h5>
           <p class="card-text">${photo.alt}</p>`;
        const divBody = document.createElement("div");
        divBody.classList = "d-flex justify-content-between align-items-center";
        const divInsideBody = document.createElement("div");
        divInsideBody.classList = "btn-group";
        const viewBtn = document.createElement("button");
        viewBtn.classList = "btn btn-sm btn-outline-secondary";
        viewBtn.innerText = "View";
        const hideBtn = document.createElement("button");
        hideBtn.classList = "btn btn-sm btn-outline-secondary";
        hideBtn.innerText = "Hide";
        hideBtn.onclick = () => {
          col.remove();
        };
        const small = document.createElement("small");
        small.classList = "text-muted";
        small.innerText = photo.id;

        divInsideBody.appendChild(viewBtn);
        divInsideBody.appendChild(hideBtn);
        divBody.appendChild(divInsideBody);
        divBody.appendChild(small);
        cardBody.appendChild(divBody);
        card.appendChild(cardBody);
        col.appendChild(card);
        photoContainer.appendChild(col);
      });
    })

    .catch(err => console.log("Errore" + err));
};
