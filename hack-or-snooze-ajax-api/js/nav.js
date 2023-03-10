"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show submit form on click for adding new story*/

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  $addStoryForm.show();   
}

$navSubmit.on("click", navSubmitClick); 

/** Show users favorite list when cliked on the favorite link*/

function navFavoritesClick(evt) {
  console.debug("navFavorites", evt); 
  
  hidePageComponents();
  putFavoritesOnPage(); 
}
$navFavorites.on("click", navFavoritesClick); 

/**Show users stories when clicked on the my stories link */

function navUserStories(evt) {
  console.debug("navUserStories", evt);

  hidePageComponents();
  putUserStoriesOnPage();
  $userStories.show();

}

$navUserStories.on("click", navUserStories);