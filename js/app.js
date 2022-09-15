// toggle Spinner 

const toggleSpiner = isLoading => {
  const loaderSection = document.getElementById('spinner');

  if(isLoading){
   loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}
// ###### Load Category ######

const loadCategory = async() => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch (url);
    const data = await res.json();
    displayCategory(data.data.news_category);
    
  } catch (error) {
    console.log(error);
  }
    
    // console.log(data.data.news_category);
    let categoryListContainer = document.getElementById('category-list');
    let child1 = categoryListContainer.firstChild;
    let child2 = child1.childNodes[1];
    child2.classList.add("li-active");
    // console.log(child2);

}
// ###### Display Category ######

const displayCategory = categoris => {
    const categoryContainer = document.getElementById('category-list');
    categoris.forEach( category =>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList = "category-li ";
        categoryDiv.innerHTML = `
        <a onclick="loadCategoryNews('${category.category_id}','${category.category_name}')" class="pointer">${category.category_name}</a>
        `;
        // console.log(category.category_id)
        categoryContainer.appendChild(categoryDiv);
    });

    // console.log(categoris)
};
loadCategory();


// ###### Load Category News ######

const loadCategoryNews = async(categoryId, categoryName) => {
  toggleSpiner(true);
  
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  try {
    const res = await fetch (url);
  const data = await res.json();
  // console.log(data.data);
  displayCategoryNews(data.data, categoryName);
    
  } catch (error) {
    console.log(error);
    
  }
  activeButtonToggol();
}
// ###### Display Category News Section ######

  const displayCategoryNews = (allNews, categoryName) => {

    // News Sorted By Views 

    //Comparing based on the views

  function compare_views(a, b){
  // a should come before b in the sorted order
  if(b.total_view < a.total_view){
          return -1;
  // a should come after b in the sorted order
  }else if(b.total_view > a.total_view){
          return 1;
  // a and b are the same
  }else{
          return 0;
  }
}
allNews.sort(compare_views);

    const newsContainer = document.getElementById('news-list');
    newsContainer.textContent = '';


    // news items found Display section 
    const newsFoundContainer = document.getElementById('news-found');
    newsFoundContainer.textContent = '';
    const newsFoundDiv = document.createElement('div');
    newsFoundDiv.classList.add('container') ;
    newsFoundDiv.innerHTML = `<h5>${allNews.length} items found for category "${categoryName}" !!!</h5>
    `;
    newsFoundContainer.appendChild(newsFoundDiv);


    // NO NEWS FOUND Display in news list
    const noNewsFoundContainer = document.getElementById('no-news-found');
    if(allNews.length === 0){
      noNewsFoundContainer.classList.remove('d-none');
    }
    else {
      noNewsFoundContainer.classList.add('d-none');
    }

    // Displaying News By iterating

    allNews.forEach(news => {

    // console.log(news.author.name);

    let authorName = news.author.name;
    let views = news.total_view;
    let modalId ='m' + news._id;
    console.log(modalId);
    

    
      if(news.author.name == '' || news.author.name == null){
        authorName = 'Author Not Found';
      };

      if(news.total_view == null){
        views = 'Views Not Found'
      }   
      // console.log(authorName);
     
        const newsDiv = document.createElement('div');
        newsDiv.classList="row g-0 my-3 pt-3 ps-3 card-body rounded-3 card-width news-card";
        newsDiv.innerHTML = `
        <div class="row">
        <div class="col-12 col-md-2">
        <img
          src="${news.thumbnail_url}"
          class="img-fluid card-img rounded-start"
          alt="..."
        />
      </div>
      <div class="col-12 col-md-8 ms-4">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text news-details">
            ${news.details.slice(0,400)}<span>...</span>
          </p>
          <div class="row news-details-card d-flex align-items-center">
            <div class="col-md-4 col-4">
              <div class="row d-flex justify-content-center">
                <div class="col-md-4 col-12">
                  <img
                    class="img-fluid rounded-circle"
                    src="${news.author.img}"
                    alt=""
                  />
                </div>
                <div class="col-12 col-md-8 d-flex align-items-center  p-0">
                  <div
                    class="p-0 container d-flex justify-content-lg-start justify-content-center align-items-center"
                  >
                    ${authorName}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4">${views}</div>
            <div class="col-md-4 col-4">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#${modalId}"
              >
                See More
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="${modalId}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        News Details
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <strong>News Author Name:</strong> ${authorName}
                      <br />
                      
                      <strong>News Views:</strong> ${views}
                      <br />
                      <strong>News full Details:</strong> ${news.details}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
        
        newsContainer.appendChild(newsDiv) ;  
        // console.log(news);
        toggleSpiner(false);
    })
    
}


// ###### Calling Breaking News Default ######

loadCategoryNews('01','Breaking News');


