/* =========================================================
   CODING CLASS WEBSITE
   FIREBASE / FIRESTORE VERSION

   This version:
   - Uses Firebase Firestore
   - Works with normal Notepad HTML/JS files
   - Syncs data between devices
   - Keeps the existing admin buttons
   - Automatically creates the first 6 weeks
========================================================= */


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {

    apiKey: "AIzaSyATTYX8nB_urkLfMpq4cvON0zYZ3kogYYc",

    authDomain:
        "robotics-class-fc0f6.firebaseapp.com",

    projectId:
        "robotics-class-fc0f6",

    storageBucket:
        "robotics-class-fc0f6.firebasestorage.app",

    messagingSenderId:
        "16573968773",

    appId:
        "1:16573968773:web:65036fe8b2098604a5d4ec",

    measurementId:
        "G-M09HG2G047"

};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

firebase.initializeApp(
    firebaseConfig
);


const db =
    firebase.firestore();


/* =========================================================
   DATABASE SETTINGS
========================================================= */

const LESSONS_COLLECTION =
    "lessons";


/* =========================================================
   DEFAULT SIX WEEKS
========================================================= */

const defaultClasses = [

    {
        id: 1,

        name: "Week 1",

        title:
            "Introduction to Python & Robot Movement",

        description:
            "Learn the basics of Python programming and use simple commands to control the robot.",

        content:
`Welcome to the coding class!

Today we will learn the basic structure of Python commands and how we can use code to control a robot.

A computer follows instructions exactly as they are written. This means that the spelling, capital letters, brackets and commas in our code are important.

We will start with simple robot movement commands. We can tell the robot to move forward or turn by giving it a distance or angle.

Remember that Python is case-sensitive. This means that uppercase and lowercase letters are treated differently.

The goal for today is to become comfortable with typing simple commands and understanding how each command affects the robot.`,

        code:
`bot.move_forward(20, "cm")
bot.turn_right(90, "deg")
bot.move_forward(20, "cm")`,

        challenge:
`1. Make the robot move forward 30 cm.
2. Make the robot turn right 90 degrees.
3. Make the robot move forward another 30 cm.
4. Try combining several movement commands to create your own path.`

    },


    {
        id: 2,

        name: "Week 2",

        title:
            "Controlling Speed and Timing",

        description:
            "Learn how to control the robot's motors, speed and movement time using Python.",

        content:
`Today we will learn how to control the robot using its motors.

Instead of only telling the robot how far to move, we can control how fast its motors run and how long they remain switched on.

The speed of the motors affects how quickly the robot moves. We can also use a wait command to make the program pause for a specific amount of time.

Programming a robot is about giving it a clear sequence of instructions. The robot will follow these instructions in the order that we write them.

Pay attention to the values used for speed and time. Small changes can produce very different robot movements.`,

        code:
`bot.motors_on(50, 50)
bot.wait(2.5)
bot.motors_off()`,

        challenge:
`1. Make the robot move at 30% speed for 3 seconds.
2. Try increasing the speed to 50%.
3. Make the robot stop after moving.
4. Experiment with different times and observe how far the robot travels.`

    },


    {
        id: 3,

        name: "Week 3",

        title:
            "Loops and Repetition",

        description:
            "Learn how to use loops to repeat instructions without writing the same code multiple times.",

        content:
`Today we will learn about loops.

A loop allows us to repeat a set of instructions several times. This is useful when we want a robot to perform the same action repeatedly.

Without a loop, we would have to write the same commands over and over again. With a loop, we can tell Python how many times we want the instructions to be repeated.

Python uses indentation to show which instructions belong inside a loop. Make sure that the instructions inside the loop are properly indented.

Loops are one of the most useful tools in programming because they allow us to create more complicated behaviour using fewer lines of code.`,

        code:
`for i in range(4):
    bot.move_forward(20, "cm")
    bot.turn_right(90, "deg")`,

        challenge:
`1. Change the loop so the robot repeats the movement 6 times.
2. Try changing the distance from 20 cm to 30 cm.
3. Create a program that makes the robot travel in a square.
4. Try creating another shape using a loop.`

    },


    {
        id: 4,

        name: "Week 4",

        title:
            "Variables and Console Output",

        description:
            "Learn how to store information in variables and display information using the console.",

        content:
`Today we will learn about variables.

A variable is a name that we can use to store information. For example, instead of writing the number 40 every time we want to use a speed, we can store it in a variable called base_speed.

Variables make our programs easier to understand and easier to change.

We will also learn how to display information using the console. Printing information can help us understand what our program is doing while it runs.

Good programmers use clear variable names so that other people can understand their code.`,

        code:
`base_speed = 40

bot.print("Speed:", base_speed)

bot.motors_on(base_speed, base_speed)
bot.wait(2)
bot.motors_off()`,

        challenge:
`1. Create a variable called speed.
2. Give speed a value of 50.
3. Use the variable to control both motors.
4. Print the speed to the console.
5. Change the value of the variable and observe what happens.`

    },


    {
        id: 5,

        name: "Week 5",

        title:
            "Using Sensors",

        description:
            "Learn how sensors provide information to the robot and how the program can use that information.",

        content:
`Today we will begin working with sensors.

A robot can use sensors to collect information about its surroundings. Instead of simply following a fixed sequence of instructions, the robot can use sensor information to respond to what it detects.

For example, an ultrasonic sensor can be used to detect the distance between the robot and an object.

The robot can read the sensor value and use that information in its program.

This is an important step in robotics because it allows the robot to interact with its environment instead of simply following a predetermined path.`,

        code:
`distance = ultrasonic_sensor_in2.distance_centimeters()

bot.print("Distance:", distance)

if distance < 20:
    bot.motors_off()
else:
    bot.motors_on(40, 40)`,

        challenge:
`1. Read the distance detected by the ultrasonic sensor.
2. Display the distance on the console.
3. Make the robot stop when an object is less than 20 cm away.
4. Change the detection distance to 30 cm.
5. Test the robot using objects at different distances.`

    },


    {
        id: 6,

        name: "Week 6",

        title:
            "Final Robot Challenge",

        description:
            "Combine movement, loops, variables and sensors to create a complete robot program.",

        content:
`Today is our final challenge.

We will combine the programming concepts that we have learned throughout the previous weeks.

You will use variables to control values, loops to repeat instructions, movement commands to control the robot and sensors to allow the robot to respond to its surroundings.

The aim is not simply to write a long program. The aim is to create a program that is organised, easy to understand and works correctly.

Before running your program, check your code carefully. Make sure your brackets, commas, indentation and variable names are correct.

Test your program step by step and make changes when something does not work as expected.

Remember that debugging is an important part of programming. Errors are not failures — they are opportunities to find out what needs to be fixed.`,

        code:
`speed = 40

for i in range(5):

    distance = ultrasonic_sensor_in2.distance_centimeters()

    bot.print("Distance:", distance)

    if distance < 20:

        bot.motors_off()

        break

    else:

        bot.motors_on(speed, speed)

    bot.wait(1)

bot.motors_off()`,

        challenge:
`Final Challenge:

Create your own robot program using the concepts learned during the six weeks.

Your program should:

1. Use at least one variable.
2. Use a loop.
3. Use at least one sensor.
4. Include robot movement.
5. Make the robot respond to something it detects.
6. Include clear and organised code.

Test your program and be prepared to explain how your code works.`

    }

];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let classes = [];

let selectedClassId = null;


/* =========================================================
   LOAD LESSONS FROM FIRESTORE
========================================================= */

async function loadClassesFromFirebase() {

    try {

        const snapshot =
            await db
                .collection(LESSONS_COLLECTION)
                .orderBy("id")
                .get();


        /* -----------------------------------------
           DATABASE IS EMPTY
        ----------------------------------------- */

        if (snapshot.empty) {

            console.log(
                "Firestore is empty. Creating six default weeks..."
            );


            await createDefaultClasses();


            classes =
                JSON.parse(
                    JSON.stringify(defaultClasses)
                );


            return;

        }


        /* -----------------------------------------
           LOAD EXISTING LESSONS
        ----------------------------------------- */

        classes =
            snapshot.docs.map(
                function(doc) {

                    return doc.data();

                }
            );


        console.log(
            "Lessons loaded from Firestore."
        );


    }

    catch (error) {

        console.error(
            "Error loading Firestore:",
            error
        );


        alert(
            "Unable to connect to the lesson database. Please check your internet connection."
        );

    }

}


/* =========================================================
   CREATE DEFAULT SIX WEEKS
========================================================= */

async function createDefaultClasses() {

    try {

        const batch =
            db.batch();


        defaultClasses.forEach(
            function(classItem) {

                const documentReference =
                    db
                        .collection(
                            LESSONS_COLLECTION
                        )
                        .doc(
                            String(classItem.id)
                        );


                batch.set(
                    documentReference,
                    classItem
                );

            }
        );


        await batch.commit();


        console.log(
            "Six default weeks created."
        );

    }

    catch (error) {

        console.error(
            "Error creating default classes:",
            error
        );


        alert(
            "The lessons could not be created in Firebase."
        );

    }

}


/* =========================================================
   SAVE ONE LESSON
========================================================= */

async function saveLessonToFirebase(
    classItem
) {

    try {

        await db
            .collection(
                LESSONS_COLLECTION
            )
            .doc(
                String(classItem.id)
            )
            .set(
                classItem
            );


        console.log(
            "Lesson saved to Firebase."
        );

        alert(
            "Class Saved."
        );


        return true;

    }

    catch (error) {

        console.error(
            "Error saving lesson:",
            error
        );


        alert(
        "Firebase Error:\n\n" +
        error.code +
        "\n\n" +
        error.message
        );


        return false;

    }

}


/* =========================================================
   DELETE LESSON FROM FIREBASE
========================================================= */

async function deleteLessonFromFirebase(
    classId
) {

    try {

        await db
            .collection(
                LESSONS_COLLECTION
            )
            .doc(
                String(classId)
            )
            .delete();


        console.log(
            "Lesson deleted from Firebase."
        );


        return true;

    }

    catch (error) {

        console.error(
            "Error deleting lesson:",
            error
        );


        alert(
            "The lesson could not be deleted."
        );


        return false;

    }

}


/* =========================================================
   GET NEXT CLASS ID
========================================================= */

function getNextClassId() {

    if (
        classes.length === 0
    ) {

        return 1;

    }


    let highestId = 0;


    classes.forEach(
        function(classItem) {

            if (
                Number(classItem.id)
                >
                highestId
            ) {

                highestId =
                    Number(classItem.id);

            }

        }
    );


    return highestId + 1;

}


/* =========================================================
   ADMIN INITIALIZATION
========================================================= */

async function initializeAdmin() {

    await loadClassesFromFirebase();


    if (
        classes.length === 0
    ) {

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
   RENDER ADMIN CLASS LIST
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


    classes.forEach(
        function(classItem) {

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


            list.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   LOAD CLASS INTO EDITOR
========================================================= */

function loadClassIntoEditor(
    classId
) {

    const classItem =
        classes.find(
            function(item) {

                return item.id ===
                    classId;

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

async function saveLesson() {

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

                return item.id ===
                    selectedClassId;

            }
        );


    if (!classItem) {

        return;

    }


    /* -----------------------------------------
       GET VALUES FROM EDITOR
    ----------------------------------------- */

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


    /* -----------------------------------------
       SAVE TO FIREBASE
    ----------------------------------------- */

    const success =
        await saveLessonToFirebase(
            classItem
        );


    if (!success) {

        return;

    }


    renderAdminClassList();


    document.getElementById(
        "editor-class-number"
    ).textContent =
        classItem.name.toUpperCase();


    document.getElementById(
        "save-status"
    ).textContent =
        "Saved!";


    setTimeout(
        function() {

            document.getElementById(
                "save-status"
            ).textContent =
                "Saved";

        },
        1500
    );

}


/* =========================================================
   ADD CLASS
========================================================= */

async function addClass() {

    const nextId =
        getNextClassId();


    const newClass = {

        id: nextId,

        name:
            "Week " + nextId,

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


    const success =
        await saveLessonToFirebase(
            newClass
        );


    if (!success) {

        return;

    }


    classes.push(
        newClass
    );


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

async function deleteClass() {

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

                return item.id ===
                    selectedClassId;

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


    const success =
        await deleteLessonFromFirebase(
            selectedClassId
        );


    if (!success) {

        return;

    }


    classes =
        classes.filter(
            function(item) {

                return item.id !==
                    selectedClassId;

            }
        );


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
   STUDENT INITIALIZATION
========================================================= */

async function initializeStudent() {

    await loadClassesFromFirebase();


    renderStudentTabs();


    renderStudentLessons();

}


/* =========================================================
   RENDER STUDENT TABS
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


            if (
                index === 0
            ) {

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
   RENDER STUDENT LESSONS
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


            if (
                index === 0
            ) {

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
        Lesson
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


    if (
        selectedLesson
    ) {

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


    setTimeout(
        function() {

            button.innerText =
                "Copy Code";

        },
        1500
    );

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

    return String(
        text || ""
    )

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


        /* -----------------------------------------
           ADMIN PAGE
        ----------------------------------------- */

        if (
            document.getElementById(
                "admin-class-list"
            )
        ) {

            initializeAdmin();

        }


        /* -----------------------------------------
           STUDENT PAGE
        ----------------------------------------- */

        if (
            document.getElementById(
                "student-tabs"
            )
        ) {

            initializeStudent();

        }

    }
);
