import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = 'Faucet';

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users":{
    "1":{
      "_id":1,
      "fullName": "Student One",
      "savedGraphs":[1,2,3,4,5],
      "majors":[1,3],
      "minors":[2]
    }
  },
  "feedback":{
    "1":{
      "content":"test 1"
    }
  },
  "majors":{
    "1":{
      "title": "Computer Science",
      "courses":[1,2]
    },
    "2":{
      "title": "Math",
      "courses":[]
    },
    "3":{
      "title": "Philosophy",
      "courses":[]
    }
  },
  "courses":{
    "1":{
      "name": "Web Programming",
      "department": "CS",
      "number": 326,
      "prereqs": [2]
    },
    "2":{
      "name": "Programming Methodology",
      "department": "CS",
      "number": 220,
      "prereqs": []
    },
    "3":{
      "name": "Calculus II",
      "department": "MATH",
      "number": 132,
      "prereqs": []
    }
},

"savePage": {
  "1": {
    "name": "first draft",
    "time": "03:11pm . 09/15/2016"
  },
  "2": {
    "name": "second draft",
    "time": "03:11pm . 09/15/2016"
  },
  "3": {
    "name": "third draft",
    "time": "03:11pm . 09/15/2016"
  },
  "4": {
    "name": "fourth draft",
    "time": "03:11pm . 09/15/2016"
  },
  "5": {
    "name": "fifth draft",
    "time": "03:11pm . 09/15/2016"
  },
  "6": {
    "name": "sixth draft",
    "time": "03:11pm . 09/15/2016"
  }
}

};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
