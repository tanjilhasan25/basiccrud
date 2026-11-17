// Import database instance and Firestore CRUD functions from SDK
import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// Connect to a specific collection in Firestore database
const colRef = collection(db, "crud_table");

// READ: Fetch data in real-time and display it inside the HTML table
onSnapshot(colRef, (snapshot) => {
    let rows = "";
    
    // Loop through each document in the database collection
    snapshot.forEach((d) => {
        let item = d.data();
        
        // Build table row HTML for each record
        rows += `
            <tr class="hover:bg-slate-800/50">
                <td class="p-3 font-bold">${item.title}</td>
                <td class="p-3 text-slate-400">${item.desc}</td>
                <td class="p-3 text-right space-x-2">
                    <button onclick="window.editItem('${d.id}', '${item.title}', '${item.desc}')" class="text-amber-400">Edit</button>
                    <button onclick="window.deleteItem('${d.id}')" class="text-red-400">Delete</button>
                </td>
            </tr>`;
    });
    
    // Insert rows into table body or show message if empty
    document.getElementById("tableBody").innerHTML = rows || `<tr><td colspan="3" class="p-4 text-center text-slate-500">No records found</td></tr>`;
});

// CREATE & UPDATE: Handle form submission to save or update data
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    
    let id = document.getElementById("id").value;     // Get hidden ID if editing
    let title = document.getElementById("title").value; // Get input title value
    let desc = document.getElementById("desc").value;   // Get input description value

    if (id) {
        // UPDATE: If ID exists, update the existing document in database
        await updateDoc(doc(db, "crud_table", id), { title, desc });
    } else {
        // CREATE: If no ID, add a brand new document to database
        await addDoc(colRef, { title, desc });
    }
    
    // Reset form fields after operation completion
    document.getElementById("form").reset();
    document.getElementById("id").value = "";
    document.getElementById("btn").innerText = "Save Entry";
});

// EDIT: Load selected row data back into the form fields for updating
window.editItem = (id, title, desc) => {
    document.getElementById("id").value = id;
    document.getElementById("title").value = title;
    document.getElementById("desc").value = desc;
    document.getElementById("btn").innerText = "Update Entry";
};

// DELETE: Remove a specific record from the database using its ID
window.deleteItem = async (id) => {
    if (confirm("Are you sure you want to delete this?")) {
        await deleteDoc(doc(db, "crud_table", id));
    }
};