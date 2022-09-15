// categoryListContainer = document.getElementById('category-list');

// categoryListContainer.firstChild.classList = "li-active";



const activeButtonToggol = () => {
   

    let menuBtn = document.querySelectorAll('.pointer');

    // console.log(menuBtn);

    menuBtn.forEach((li) => {
        li.addEventListener("click", (e) => {
            menuBtn.forEach((el) => el.classList.remove("li-active"));
            li.classList.add("li-active");
        });
    });
};

// let categoryListContainer = document.getElementById('category-list');
// let child = categoryListContainer.firstChild;
// console.log(child);

