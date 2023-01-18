"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${Boolean(currentUser) ? getStarHTML(story) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function putNewStoryOnThePage(evt) {
  evt.preventDefault();
  const author = $("#author").val();
  const title = $("#title").val();
  const url = $("#url").val();

  const newStory = await storyList.addStory(currentUser, { title, author, url });

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  $addStoryForm.slideUp("slow");
  $addStoryForm.trigger("reset");

}
$addStoryForm.on("submit", putNewStoryOnThePage);

function putFavoritesOnPage() {
  $favoriteStoriesList.empty(); 

  if (currentUser.favorites.length === 0) {
    $favoriteStoriesList.append("<h2>No favorite stories added!</h2>");
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStoriesList.append($story);
    }
  }

  $favoriteStoriesList.show();
}

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $userStories.empty();

  if (currentUser.ownStories.length === 0) {
    $userStories.append("<h2>No stories added by user!</h2>");
  } else {
    for (let story of currentUser.ownStories) {
      console.log(story);
      let $newStory = generateStoryMarkup(story, true);
      $userStories.append($newStory);
    }
  }

  $userStories.show();
}


function getStarHTML(story) {
  const isFavorite = currentUser.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

async function toggleFavorites(evt) {

  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($target.hasClass("fas")) {
    await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
}

$storiesList.on("click", ".star", toggleFavorites);

function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}


async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();
}

$userStories.on("click", ".trash-can", deleteStory);