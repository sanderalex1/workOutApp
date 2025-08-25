const routine = document.getElementById("routine");
const workoutForm = document.getElementById("workout-form");
const exerciseName = document.getElementById("exercise-name");
const sets = document.getElementById("sets");
const reps = document.getElementById("reps");
const weight = document.getElementById("weight");
const submitButton = document.getElementById("submit");
const myRoutines = document.getElementById("myRoutines");
const cancelButton = document.getElementById("cancel");
const saveButton = document.getElementById("save");
const newRoutineButton = document.getElementById("newRoutine");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

if (newRoutineButton) {
  newRoutineButton.addEventListener("click", () => {
    window.location.href = "workoutForm.html";
  });
}

if (workoutForm) {
  const editingId = localStorage.getItem("editingId");

  if (editingId) {
    const workoutToEdit = workouts.find((e) => e.id === editingId);
    if (workoutToEdit) {
      exerciseName.value = workoutToEdit.name;
      sets.value = workoutToEdit.sets;
      reps.value = workoutToEdit.reps;
      weight.value = workoutToEdit.weight;
    }
  }

  workoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (editingId) {
      const workoutToEdit = workouts.find((e) => e.id === editingId);
      if (workoutToEdit) {
        workoutToEdit.name = exerciseName.value;
        workoutToEdit.sets = parseInt(sets.value);
        workoutToEdit.reps = parseInt(reps.value);
        workoutToEdit.weight = parseInt(weight.value);
      }
      localStorage.removeItem("editingId");
    } else {
      workouts.push({
        id: Date.now().toString(),
        name: exerciseName.value,
        sets: parseInt(sets.value),
        reps: parseInt(reps.value),
        weight: parseInt(weight.value),
      });
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
    window.location.href = "index.html";
  });
}

if (myRoutines) {
  function renderWorkouts() {
    myRoutines.innerHTML = "";

    for (const workout of workouts) {
      const workoutItem = document.createElement("div");

      //Delete button
      const deleteItem = document.createElement("button");
      deleteItem.textContent = "Delete";
      deleteItem.dataset.id = workout.id; // storing id in dataset

      deleteItem.addEventListener("click", () => {
        const toDelete = deleteItem.dataset.id;
        workouts = workouts.filter((e) => e.id !== toDelete);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        renderWorkouts();
      });

      //Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      editButton.addEventListener("click", () => {
        localStorage.setItem("editingId", workout.id);
        window.location.href = "workoutForm.html";
      });

      workoutItem.textContent = `${workout.name} - ${workout.sets}x${workout.reps} at ${workout.weight}kg`;

      myRoutines.appendChild(workoutItem);
      workoutItem.appendChild(deleteItem);
      workoutItem.appendChild(editButton);
    }
  }

  renderWorkouts();
}
