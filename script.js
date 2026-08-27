/* =========================================================
   CODING CLASS WEBSITE
   Firebase Firestore + Simple Admin Password
========================================================= */


/* =========================================================
   ADMIN PASSWORD
========================================================= */

const ADMIN_PASSWORD = "YOUR_PASSWORD_HERE";


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyATTYX8nB_urkLfMpq4cvON0zYZ3kogYYc",
    authDomain: "robotics-class-fc0f6.firebaseapp.com",
    projectId: "robotics-class-fc0f6",
    storageBucket: "robotics-class-fc0f6.firebasestorage.app",
    messagingSenderId: "16573968773",
    appId: "1:16573968773:web:65036fe8b2098604a5d4ec",
    measurementId: "G-M09HG2G047"
};


/* =========================================================
   FIREBASE INITIALIZATION
========================================================= */

let db = null;

try {

    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();

    console.log("Firebase connected successfully.");

}
catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let classes = [];

let currentClassIndex = 0;


/* =========================================================
   DEFAULT CLASSES
   These are only used if Firestore has no lessons yet.
========================================================= */

const defaultClasses = [

    {
        id: "1",
        className: "Class 1",
        title: "Introduction to GearsBot",
        description: "",
        content: "",
        code: "",
        challenge: ""
    },

    {
        id: "2",
        className: "Class 2",
        title: "Robot Movement",
        description: "",
        content: "",
        code: "",
        challenge: ""
    },

    {
        id: "3",
        className: "Class 3",
        title: "Loops",
        description: "",
        content: "",
        code: "",
        challenge: ""
    },

    {
        id: "4",
        className: "Class 4",
        title: "Variables and Console",
        description: "",
        content: "",
        code: "",
        challenge: ""
    },

    {
        id: "5",
        className: "Class 5",
        title: "Conditional Logic",
        description: "",
        content: "",
        code: "",
        challenge: ""
    },

    {
        id: "6",
        className: "Class 6",
        title: "Sensors and Automation",
        description: "",
        content: "",
        code: "",
        challenge: ""
    }

];


/* =========================================================
   ADMIN LOGIN
========================================================= */

function checkAdminPassword() {

    const passwordInput =
        document.getElementById(
            "admin-password"
        );

    const errorMessage =
        document.getElementById(
            "login-error"
        );


    if (!passwordInput) {

        console.error(
            "Admin password input not found."
        );

        return;

    }


    const enteredPassword =
        passwordInput.value;


    if (
        enteredPassword === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "adminLoggedIn",
            "true"
        );


        const loginScreen =
            document.getElementById(
                "admin-login"
            );

        const adminContent =
            document.getElementById(
                "admin-content"
            );


        if (loginScreen) {

            loginScreen.style.display =
                "none";

        }


        if (adminContent) {

            adminContent.style.display =
                "block";

        }


        if (errorMessage) {

            errorMessage.textContent = "";

        }


        initializeAdmin();

    }

    else {

        if (errorMessage) {

            errorMessage.textContent =
                "Incorrect password. Please try again.";

        }


        passwordInput.value = "";

        passwordInput.focus();

    }

}


/* =========================================================
   ENTER KEY FOR PASSWORD
========================================================= */

function handlePasswordKey(event) {

    if (
        event.key === "Enter"
    ) {

        checkAdminPassword();

    }

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

function logoutAdmin() {

    sessionStorage.removeItem(
        "adminLoggedIn"
    );

    location.reload();

}


/* =========================================================
   INITIALIZE ADMIN
========================================================= */

async function initializeAdmin() {

    console.log(
        "Initializing admin panel..."
    );


    await loadLessonsFromFirebase();

    renderAdminClassList();

    selectClass(0);

}


/* =========================================================
   LOAD LESSONS FROM FIREBASE
========================================================= */

async function loadLessonsFromFirebase() {

    if (!db) {

        console.error(
            "Firestore database is not initialized."
        );

        classes =
            JSON.parse(
                JSON.stringify(defaultClasses)
            );

        return;

    }


    try {

        const snapshot =
            await db
                .collection("lessons")
                .orderBy("order")
                .get();


        if (
            snapshot.empty
        ) {

            console.log(
                "No lessons found. Creating default classes."
            );


            classes =
                JSON.parse(
                    JSON.stringify(defaultClasses)
                );


            /*
             * We do NOT automatically upload
             * the default classes.
             *
             * This prevents accidental overwriting.
             */

            return;

        }


        classes = [];


        snapshot.forEach(
            function(document) {

                const data =
                    document.data();


                classes.push({

                    id:
                        document.id,

                    className:
                        data.className ||
                        "Class " +
                        (data.order + 1),

                    title:
                        data.title ||
                        "",

                    description:
                        data.description ||
                        "",

                    content:
                        data.content ||
                        "",

                    code:
                        data.code ||
                        "",

                    challenge:
                        data.challenge ||
                        "",

                    order:
                        data.order || 0

                });

            }
        );


        console.log(
            "Lessons loaded:",
            classes
        );

    }

    catch (error) {

        console.error(
            "Error loading lessons:",
            error
        );


        /*
         * If Firebase fails,
         * use the local default structure.
         */

        classes =
            JSON.parse(
                JSON.stringify(defaultClasses)
            );

    }

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
        function(classItem, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "class-tab";


            if (
                index === currentClassIndex
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.textContent =
                classItem.className ||
                "Class " +
                (index + 1);


            button.onclick =
                function() {

                    selectClass(index);

                };


            list.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT CLASS
========================================================= */

function selectClass(index) {

    if (
        index < 0 ||
        index >= classes.length
    ) {

        return;

    }


    currentClassIndex =
        index;


    const classItem =
        classes[index];


    const classNumber =
        document.getElementById(
            "editor-class-number"
        );

    const className =
        document.getElementById(
            "class-name"
        );

    const lessonTitle =
        document.getElementById(
            "lesson-title"
        );

    const description =
        document.getElementById(
            "lesson-description"
        );

    const content =
        document.getElementById(
            "lesson-content"
        );

    const code =
        document.getElementById(
            "lesson-code"
        );

    const challenge =
        document.getElementById(
            "lesson-challenge"
        );


    if (classNumber) {

        classNumber.textContent =
            "CLASS " +
            (index + 1);

    }


    if (className) {

        className.value =
            classItem.className || "";

    }


    if (lessonTitle) {

        lessonTitle.value =
            classItem.title || "";

    }


    if (description) {

        description.value =
            classItem.description || "";

    }


    if (content) {

        content.value =
            classItem.content || "";

    }


    if (code) {

        code.value =
            classItem.code || "";

    }


    if (challenge) {

        challenge.value =
            classItem.challenge || "";

    }


    renderAdminClassList();


    setSaveStatus(
        "Saved"
    );

}


/* =========================================================
   ADD CLASS
========================================================= */

function addClass() {

    const newNumber =
        classes.length + 1;


    const newClass = {

        id:
            String(
                Date.now()
            ),

        className:
            "Class " +
            newNumber,

        title:
            "New Lesson",

        description:
            "",

        content:
            "",

        code:
            "",

        challenge:
            "",

        order:
            classes.length

    };


    classes.push(
        newClass
    );


    currentClassIndex =
        classes.length - 1;


    renderAdminClassList();

    selectClass(
        currentClassIndex
    );


    setSaveStatus(
        "Unsaved"
    );

}


/* =========================================================
   SAVE LESSON
========================================================= */

async function saveLesson() {

    if (
        classes.length === 0
    ) {

        alert(
            "There are no classes to save."
        );

        return;

    }


    const classItem =
        classes[currentClassIndex];


    if (!classItem) {

        alert(
            "No class is currently selected."
        );

        return;

    }


    /* -----------------------------------------
       GET VALUES FROM EDITOR
    ----------------------------------------- */

    classItem.className =
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


    classItem.order =
        currentClassIndex;


    setSaveStatus(
        "Saving..."
    );


    /* -----------------------------------------
       SAVE TO FIRESTORE
    ----------------------------------------- */

    if (!db) {

        setSaveStatus(
            "Firebase Error"
        );

        alert(
            "Firebase is not connected."
        );

        return;

    }


    try {

        await db
            .collection("lessons")
            .doc(
                classItem.id
            )
            .set({

                className:
                    classItem.className,

                title:
                    classItem.title,

                description:
                    classItem.description,

                content:
                    classItem.content,

                code:
                    classItem.code,

                challenge:
                    classItem.challenge,

                order:
                    currentClassIndex,

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        setSaveStatus(
            "Saved"
        );


        renderAdminClassList();


        console.log(
            "Lesson saved successfully."
        );


    }

    catch (error) {

        console.error(
            "Firebase save error:",
            error
        );


        setSaveStatus(
            "Save Failed"
        );


        alert(
            "Firebase Error:\n\n" +
            error.code +
            "\n\n" +
            error.message
        );

    }

}


/* =========================================================
   DELETE CLASS
========================================================= */

async function deleteClass() {

    if (
        classes.length === 0
    ) {

        return;

    }


    const classItem =
        classes[currentClassIndex];


    if (!classItem) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete " +
            classItem.className +
            "?"
        );


    if (!confirmed) {

        return;

    }


    try {

        if (db) {

            await db
                .collection("lessons")
                .doc(
                    classItem.id
                )
                .delete();

        }


        classes.splice(
            currentClassIndex,
            1
        );


        if (
            classes.length === 0
        ) {

            classes =
                JSON.parse(
                    JSON.stringify(defaultClasses)
                );

        }


        if (
            currentClassIndex >=
            classes.length
        ) {

            currentClassIndex =
                classes.length - 1;

        }


        renderAdminClassList();

        selectClass(
            currentClassIndex
        );


        alert(
            "Class deleted successfully."
        );

    }

    catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "The class could not be deleted.\n\n" +
            error.message
        );

    }

}


/* =========================================================
   SAVE STATUS
========================================================= */

function setSaveStatus(status) {

    const element =
        document.getElementById(
            "save-status"
        );


    if (element) {

        element.textContent =
            status;

    }

}


/* =========================================================
   PREVIEW LESSON
========================================================= */

function previewLesson() {

    if (
        classes.length === 0
    ) {

        return;

    }


    const classItem =
        classes[currentClassIndex];


    let preview =
        "";


    preview +=
        classItem.className +
        "\n\n";


    preview +=
        classItem.title +
        "\n\n";


    preview +=
        classItem.description +
        "\n\n";


    preview +=
        classItem.content +
        "\n\n";


    preview +=
        "CODE\n\n";


    preview +=
        classItem.code +
        "\n\n";


    preview +=
        "CHALLENGE\n\n";


    preview +=
        classItem.challenge;


    alert(
        preview
    );

}


/* =========================================================
   STUDENT PAGE
========================================================= */

async function initializeStudent() {

    console.log(
        "Initializing student page..."
    );


    await loadStudentLessons();

    renderStudentTabs();

    renderStudentLesson(
        0
    );

}


/* =========================================================
   LOAD STUDENT LESSONS
========================================================= */

async function loadStudentLessons() {

    if (!db) {

        console.error(
            "Firestore is not connected."
        );

        classes =
            JSON.parse(
                JSON.stringify(defaultClasses)
            );

        return;

    }


    try {

        const snapshot =
            await db
                .collection("lessons")
                .orderBy("order")
                .get();


        if (
            snapshot.empty
        ) {

            classes =
                JSON.parse(
                    JSON.stringify(defaultClasses)
                );

            return;

        }


        classes = [];


        snapshot.forEach(
            function(document) {

                const data =
                    document.data();


                classes.push({

                    id:
                        document.id,

                    className:
                        data.className ||
                        "",

                    title:
                        data.title ||
                        "",

                    description:
                        data.description ||
                        "",

                    content:
                        data.content ||
                        "",

                    code:
                        data.code ||
                        "",

                    challenge:
                        data.challenge ||
                        "",

                    order:
                        data.order || 0

                });

            }
        );


        console.log(
            "Student lessons loaded."
        );

    }

    catch (error) {

        console.error(
            "Student lesson loading error:",
            error
        );


        classes =
            JSON.parse(
                JSON.stringify(defaultClasses)
            );

    }

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
                "tab-button";


            if (
                index === 0
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.textContent =
                classItem.className ||
                "Class " +
                (index + 1);


            button.onclick =
                function() {

                    renderStudentLesson(
                        index
                    );

                };


            tabs.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   RENDER STUDENT LESSON
========================================================= */

function renderStudentLesson(index) {

    if (
        index < 0 ||
        index >= classes.length
    ) {

        return;

    }


    currentClassIndex =
        index;


    const container =
        document.getElementById(
            "student-lessons"
        );


    if (!container) {

        return;

    }


    const classItem =
        classes[index];


    /* -----------------------------------------
       UPDATE TAB ACTIVE STATE
    ----------------------------------------- */

    const tabs =
        document.querySelectorAll(
            "#student-tabs .tab-button"
        );


    tabs.forEach(
        function(tab, tabIndex) {

            if (
                tabIndex === index
            ) {

                tab.classList.add(
                    "active"
                );

            }

            else {

                tab.classList.remove(
                    "active"
                );

            }

        }
    );


    /* -----------------------------------------
       CREATE LESSON
    ----------------------------------------- */

    container.innerHTML = "";


    const lesson =
        document.createElement(
            "div"
        );


    lesson.className =
        "lesson-card";


    /* -----------------------------------------
       CLASS NAME
    ----------------------------------------- */

    const classHeading =
        document.createElement(
            "div"
        );


    classHeading.className =
        "class-number";


    classHeading.textContent =
        classItem.className;


    lesson.appendChild(
        classHeading
    );


    /* -----------------------------------------
       TITLE
    ----------------------------------------- */

    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        classItem.title;


    lesson.appendChild(
        title
    );


    /* -----------------------------------------
       DESCRIPTION
    ----------------------------------------- */

    if (
        classItem.description
    ) {

        const description =
            document.createElement(
                "p"
            );


        description.textContent =
            classItem.description;


        lesson.appendChild(
            description
        );

    }


    /* -----------------------------------------
       MAIN CONTENT
    ----------------------------------------- */

    if (
        classItem.content
    ) {

        const content =
            document.createElement(
                "div"
            );


        content.className =
            "lesson-content";


        content.innerHTML =
            formatText(
                classItem.content
            );


        lesson.appendChild(
            content
        );

    }


    /* -----------------------------------------
       CODE
    ----------------------------------------- */

    if (
        classItem.code
    ) {

        const codeHeading =
            document.createElement(
                "h3"
            );


        codeHeading.textContent =
            "Code";


        lesson.appendChild(
            codeHeading
        );


        const codeBlock =
            document.createElement(
                "pre"
            );


        const code =
            document.createElement(
                "code"
            );


        code.textContent =
            classItem.code;


        codeBlock.appendChild(
            code
        );


        lesson.appendChild(
            codeBlock
        );

    }


    /* -----------------------------------------
       CHALLENGE
    ----------------------------------------- */

    if (
        classItem.challenge
    ) {

        const challengeHeading =
            document.createElement(
                "h3"
            );


        challengeHeading.textContent =
            "Challenge";


        lesson.appendChild(
            challengeHeading
        );


        const challenge =
            document.createElement(
                "div"
            );


        challenge.className =
            "challenge";


        challenge.innerHTML =
            formatText(
                classItem.challenge
            );


        lesson.appendChild(
            challenge
        );

    }


    container.appendChild(
        lesson
    );

}


/* =========================================================
   FORMAT TEXT
========================================================= */

function formatText(text) {

    if (!text) {

        return "";

    }


    /*
     * Escape HTML first so that normal lesson
     * text cannot accidentally become HTML.
     */

    const escaped =
        text
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


    /*
     * Convert line breaks into paragraphs.
     */

    return escaped
        .split(
            /\n\s*\n/
        )
        .map(
            function(paragraph) {

                return (
                    "<p>" +
                    paragraph
                        .replace(
                            /\n/g,
                            "<br>"
                        ) +
                    "</p>"
                );

            }
        )
        .join("");

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* -----------------------------------------
           ADMIN PAGE
        ----------------------------------------- */

        const adminLogin =
            document.getElementById(
                "admin-login"
            );


        if (adminLogin) {

            const loggedIn =
                sessionStorage.getItem(
                    "adminLoggedIn"
                );


            if (
                loggedIn === "true"
            ) {

                adminLogin.style.display =
                    "none";


                const adminContent =
                    document.getElementById(
                        "admin-content"
                    );


                if (adminContent) {

                    adminContent.style.display =
                        "block";

                }


                initializeAdmin();

            }

        }


        /* -----------------------------------------
           STUDENT PAGE
        ----------------------------------------- */

        const studentTabs =
            document.getElementById(
                "student-tabs"
            );


        if (studentTabs) {

            initializeStudent();

        }

    }
);
