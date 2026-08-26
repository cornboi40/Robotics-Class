/* =========================================================
   CODING CLASS WEBSITE
   PHASE 2 / 3 LOCAL VERSION

   Designed for:
   - Notepad
   - HTML files
   - CSS files
   - JavaScript files
   - No VS Code
   - No modules
   - No Firebase yet

   Data is saved using localStorage.
========================================================= */


/* =========================================================
   DEFAULT CLASSES
========================================================= */

const defaultClasses = [

    {
        id: 1,

        name: "Class 1",

        title: "Introduction to Python",

        description:
            "Getting started with basic Python syntax.",

        content:
            "Today we are learning the basic structure of a Python program and how to give instructions to the robot.",

        code:
`bot.move_forward(20, "cm")
bot.turn_right(90, "deg")`,

        challenge:
`1. Make the robot move forward 30 cm.
2. Make the robot turn left.
3. Try combining multiple commands.`
    },


    {
        id: 2,

        name: "Class 2",

        title: "Robot Movement",

        description:
            "Learning how to control the robot's movement.",

        content:
            "We will learn how to control the robot's speed, movement and timing.",

        code:
`bot.motors_on(50, 50)
bot.wait(2.5)
bot.motors_off()`,

        challenge:
            "Try making the robot travel forward for 5 seconds before stopping."
    },


    {
        id: 3,

        name: "Class 3",

        title: "Loops",

        description:
            "Using loops to repeat instructions.",

        content:
            "Instead of writing the same command repeatedly, we can use a loop.",

        code:
`for i in range(5):
    bot.move_forward(20, "cm")
    bot.turn_right(90, "deg")`,

        challenge:
            "Change the loop so that the robot performs the movement 10 times."
    }

];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let classes = [];

let selectedClassId = null;


/* =========================================================
   LOAD CLASSES
========================================================= */

function loadClasses() {

    const saved =
        localStorage.getItem("codingClasses");


    if (saved) {

        try {

            classes =
                JSON.parse(saved);

        }

        catch (error) {

            console.log(
                "Saved data was invalid. Loading default classes."
            );

            classes =
                JSON.parse(
                    JSON.stringify(defaultClasses)
                );

            saveClasses();

        }

    }

    else {

        classes =
            JSON.parse(
                JSON.stringify(defaultClasses)
            );

        saveClasses();

    }

}


/* =========================================================
   SAVE CLASSES
========================================================= */

function saveClasses() {

    localStorage.setItem(
        "codingClasses",
        JSON.stringify(classes)
    );

}


/* =========================================================
   GET NEXT CLASS ID
========================================================= */

function getNextClassId() {

    if (classes.length === 0) {

        return 1;

    }


    let highestId = 0;


    classes.forEach(function(classItem) {

        if (Number(classItem.id) > highestId) {

            highestId =
                Number(classItem.id);

        }

    });


    return highestId + 1;

}


/* =========================================================
   ADMIN PAGE INITIALIZATION
========================================================= */

function initializeAdmin() {

    loadClasses();


    if (classes.length === 0) {

        return;

    }


    selectedClassId =
        classes[0].id;


    renderAdminClassList();


    loadClassIntoEditor(
        selectedClassId
    );

}


/* =========================================================
   DISPLAY ADMIN CLASS LIST
========================================================= */

function renderAdminClassList() {

    const list =
        document.getElementById(
            "admin-class-list"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    classes.forEach(function(classItem) {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "admin-class";


        if (
            classItem.id ===
            selectedClassId
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            classItem.name;


        button.onclick =
            function() {

                selectedClassId =
                    classItem.id;


                renderAdminClassList();


                loadClassIntoEditor(
                    selectedClassId
                );

            };


        list.appendChild(button);

    });

}


/* =========================================================
   LOAD CLASS INTO ADMIN EDITOR
========================================================= */

function loadClassIntoEditor(classId) {

    const classItem =
        classes.find(
            function(item) {

                return item.id === classId;

            }
        );


    if (!classItem) {

        return;

    }


    selectedClassId =
        classId;


    document.getElementById(
        "editor-class-number"
    ).textContent =
        classItem.name.toUpperCase();


    document.getElementById(
        "class-name"
    ).value =
        classItem.name;


    document.getElementById(
        "lesson-title"
    ).value =
        classItem.title;


    document.getElementById(
        "lesson-description"
    ).value =
        classItem.description;


    document.getElementById(
        "lesson-content"
    ).value =
        classItem.content;


    document.getElementById(
        "lesson-code"
    ).value =
        classItem.code;


    document.getElementById(
        "lesson-challenge"
    ).value =
        classItem.challenge;


    document.getElementById(
        "save-status"
    ).textContent =
        "Saved";

}


/* =========================================================
   SAVE LESSON
========================================================= */

function saveLesson() {

    if (
        selectedClassId === null
    ) {

        alert(
            "Please select a class first."
        );

        return;

    }


    const classItem =
        classes.find(
            function(item) {

                return item.id === selectedClassId;

            }
        );


    if (!classItem) {

        return;

    }


    classItem.name =
        document.getElementById(
            "class-name"
        ).value;


    classItem.title =
        document.getElementById(
            "lesson-title"
        ).value;


    classItem.description =
        document.getElementById(
            "lesson-description"
        ).value;


    classItem.content =
        document.getElementById(
            "lesson-content"
        ).value;


    classItem.code =
        document.getElementById(
            "lesson-code"
        ).value;


    classItem.challenge =
        document.getElementById(
            "lesson-challenge"
        ).value;


    saveClasses();


    renderAdminClassList();


    document.getElementById(
        "editor-class-number"
    ).textContent =
        classItem.name.toUpperCase();


    document.getElementById(
        "save-status"
    ).textContent =
        "Saved!";


    setTimeout(function() {

        document.getElementById(
            "save-status"
        ).textContent =
            "Saved";

    }, 1500);

}


/* =========================================================
   ADD CLASS
========================================================= */

function addClass() {

    const nextId =
        getNextClassId();


    const newClass = {

        id: nextId,

        name:
            "Class " + nextId,

        title:
            "New Lesson",

        description:
            "",

        content:
            "",

        code:
            "",

        challenge:
            ""

    };


    classes.push(
        newClass
    );


    saveClasses();


    selectedClassId =
        nextId;


    renderAdminClassList();


    loadClassIntoEditor(
        nextId
    );

}


/* =========================================================
   DELETE CLASS
========================================================= */

function deleteClass() {

    if (
        classes.length <= 1
    ) {

        alert(
            "You must have at least one class."
        );

        return;

    }


    const classItem =
        classes.find(
            function(item) {

                return item.id === selectedClassId;

            }
        );


    if (!classItem) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete " +
            classItem.name +
            "?"
        );


    if (!confirmed) {

        return;

    }


    classes =
        classes.filter(
            function(item) {

                return item.id !== selectedClassId;

            }
        );


    saveClasses();


    selectedClassId =
        classes[0].id;


    renderAdminClassList();


    loadClassIntoEditor(
        selectedClassId
    );

}


/* =========================================================
   PREVIEW
========================================================= */

function previewLesson() {

    saveLesson();


    window.open(
        "index.html",
        "_blank"
    );

}


/* =========================================================
   STUDENT PAGE INITIALIZATION
========================================================= */

function initializeStudent() {

    loadClasses();


    renderStudentTabs();


    renderStudentLessons();

}


/* =========================================================
   STUDENT TABS
========================================================= */

function renderStudentTabs() {

    const tabs =
        document.getElementById(
            "student-tabs"
        );


    if (!tabs) {

        return;

    }


    tabs.innerHTML = "";


    classes.forEach(
        function(classItem, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "tab";


            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }


            button.textContent =
                classItem.name;


            button.onclick =
                function() {

                    showStudentClass(
                        classItem.id,
                        button
                    );

                };


            tabs.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   STUDENT LESSONS
========================================================= */

function renderStudentLessons() {

    const container =
        document.getElementById(
            "student-lessons"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    classes.forEach(
        function(classItem, index) {

            const lesson =
                document.createElement(
                    "section"
                );


            lesson.id =
                "student-class-" +
                classItem.id;


            lesson.className =
                "lesson";


            if (index === 0) {

                lesson.classList.add(
                    "active"
                );

            }


            lesson.innerHTML =

`
<div class="lesson-header">

    <span class="class-number">

        ${escapeHTML(
            classItem.name
        ).toUpperCase()}

    </span>


    <h2>

        ${escapeHTML(
            classItem.title
        )}

    </h2>


    <p>

        ${escapeHTML(
            classItem.description
        )}

    </p>

</div>


<div class="lesson-section">

    <h3>
        Today's Lesson
    </h3>


    <p>

        ${formatText(
            classItem.content
        )}

    </p>

</div>


${
    classItem.code &&
    classItem.code.trim() !== ""

    ?

`
<div class="lesson-section">

    <h3>
        Example Code
    </h3>


    <div class="code-container">

        <button
            class="copy-button"
            onclick="copyCode(this)"
        >
            Copy Code
        </button>


        <pre><code>${escapeHTML(
            classItem.code
        )}</code></pre>

    </div>

</div>
`

    :

""
}


${
    classItem.challenge &&
    classItem.challenge.trim() !== ""

    ?

`
<div class="lesson-section">

    <h3>
        Challenge
    </h3>


    <p>

        ${formatText(
            classItem.challenge
        )}

    </p>

</div>
`

    :

""
}

`;


            container.appendChild(
                lesson
            );

        }
    );

}


/* =========================================================
   SHOW STUDENT CLASS
========================================================= */

function showStudentClass(
    classId,
    button
) {

    const lessons =
        document.querySelectorAll(
            ".lesson"
        );


    lessons.forEach(
        function(lesson) {

            lesson.classList.remove(
                "active"
            );

        }
    );


    const tabs =
        document.querySelectorAll(
            ".tab"
        );


    tabs.forEach(
        function(tab) {

            tab.classList.remove(
                "active"
            );

        }
    );


    const selectedLesson =
        document.getElementById(
            "student-class-" +
            classId
        );


    if (selectedLesson) {

        selectedLesson.classList.add(
            "active"
        );

    }


    button.classList.add(
        "active"
    );

}


/* =========================================================
   COPY CODE
========================================================= */

function copyCode(button) {

    const code =
        button.parentElement
            .querySelector("code")
            .innerText;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard.writeText(
            code
        );

    }

    else {

        const temporary =
            document.createElement(
                "textarea"
            );


        temporary.value =
            code;


        document.body.appendChild(
            temporary
        );


        temporary.select();


        document.execCommand(
            "copy"
        );


        document.body.removeChild(
            temporary
        );

    }


    button.innerText =
        "Copied!";


    setTimeout(function() {

        button.innerText =
            "Copy Code";

    }, 1500);

}


/* =========================================================
   TEXT FORMATTING
========================================================= */

function formatText(text) {

    return escapeHTML(
        text || ""
    ).replace(
        /\n/g,
        "<br>"
    );

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(text) {

    return String(text || "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ADMIN PAGE */

        if (
            document.getElementById(
                "admin-class-list"
            )
        ) {

            initializeAdmin();

        }


        /* STUDENT PAGE */

        if (
            document.getElementById(
                "student-tabs"
            )
        ) {

            initializeStudent();

        }

    }
);