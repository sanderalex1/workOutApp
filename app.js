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
  workoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const workout = {
      id: Date.now().toString(),
      name: exerciseName.value,
      sets: parseInt(sets.value),
      reps: parseInt(reps.value),
      weight: parseInt(weight.value),
    };

    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));

    workoutForm.reset();

    window.location.href = "index.html";
  });
}

if (myRoutines) {
  function renderWorkouts() {
    myRoutines.innerHTML = "";

    for (const workout of workouts) {
      const workoutItem = document.createElement("div");
      const deleteItem = document.createElement("button");
      deleteItem.textContent = "Delete";
      deleteItem.dataset.id = workout.id; // storing id in dataset

      deleteItem.addEventListener("click", () => {
        const toDelete = deleteItem.dataset.id;
        workouts = workouts.filter((e) => e.id !== toDelete);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        renderWorkouts();
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      editButton.addEventListener("click", () => {
        editingId = workout.id;
        exerciseName.value = workout.name;
        sets.value = workout.sets;
        reps.value = workout.reps;
        weight.value = workout.weight;

        if (editingId) {
          const workoutToEdit = workouts.find((e) => e.id === editingId);
          if (workoutToEdit) {
            workoutToEdit.name = exerciseName.value;
            workoutToEdit.sets = sets.value;
            workoutToEdit.reps = reps.value;
            workoutToEdit.weight = weight.value;
          }
        } else {
          const newWorkout = {
            id: Date.now().toString(),
            name: exerciseName.value,
            sets: parseInt(sets.value),
            reps: parseInt(reps.value),
            weight: parseInt(weight.value),
          };
          workouts.push(newWorkout);
        }

        localStorage.setItem("workouts", JSON.stringify(workouts));

        workoutForm.reset();
        editingId = null;

        window.location.href = "index.html";
      });

      workoutItem.textContent = `${workout.name} - ${workout.sets}x${workout.reps} at ${workout.weight}kg`;

      myRoutines.appendChild(workoutItem);
      workoutItem.appendChild(deleteItem);
      workoutItem.appendChild(editButton);
    }
  }

  renderWorkouts();
}
