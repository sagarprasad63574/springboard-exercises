// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const $spinContainer = $("#spin-container");

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const categoryIds = [];
    for (let i = 0; i < 6; i++) {
        let randomIdx = Math.floor(Math.random() * 999) + 1;
        let res = await axios.get("http://jservice.io/api/category", {
            params: {
                id: randomIdx
            }
        });
        let id = res.data.id;
        let clueCount = res.data.clues_count;
        if (clueCount <= 5 || categoryIds.includes(id)) {
            i--;
        }
        else {
            categoryIds.push(id);
        }
    }
    return categoryIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let res = await axios.get("http://jservice.io/api/category", {
        params: {
            id: catId
        }
    });
    let title = res.data.title;
    let clues = res.data.clues;
    const clueArr = clues.map(function (value) {
        return {
            question: value.question,
            answer: value.answer,
            showing: value.showing ? value.showing : null,
        }
    });
    const categoryObj = {
        title: title,
        clues: clueArr
    }
    return categoryObj;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    $("#jeopardy thead").empty();
    let $tread = $("#jeopardy thead");
    let $tr = $("<tr>");
    for (let i = 0; i < 6; i++) {
        $tr.append($("<th>").text(categories[i].title));
    }
    $tread.append($tr);
    $("#jeopardy tbody").empty();
    let $tbody = $("#jeopardy tbody");
    for (let i = 0; i < 5; i++) {
        let $tr = $("<tr>");
        for (let j = 0; j < 6; j++) {
            $tr.append(($("<td>")).attr("id", `${i}-${j}`).text("?"));
        }
        $tbody.append($tr);
    }
    hideLoadingView();
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let id = evt.target.id;
    let [i, j] = id.split("-");
    let clue = categories[j].clues[i];

    let show;

    if (clue.showing === null) {
        show = clue.question;
        clue.showing = "question";
    } else if (clue.showing === "question") {
        show = clue.answer;
        clue.showing = "answer";
    } else {
        return;
    }
    $(`#${i}-${j}`).html(show);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $spinContainer.css("display","block");
    $("#jeopardy thead").empty();
    $("#jeopardy tbody").empty();
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $spinContainer.hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    showLoadingView()
    let categoryIds = await getCategoryIds();

    categories = [];
  
    for (let Id of categoryIds) {
      categories.push(await getCategory(Id));
    }
  
    fillTable();
}

/** On click of start / restart button, set up game. */

// TODO
$("#start").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */

// TODO
$(async function () {
    setupAndStart();
    $("#jeopardy").on("click", "td", handleClick);
  }
);