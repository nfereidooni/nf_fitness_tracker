const db = require("../models/workout");

module.exports = function(app) {


    //app.get - gets last workout
    app.get("/api/workouts", (req, res) => {
        try {
            db.Workout.find({})
            .then(workout => {
                res.json(workout);
        })}
        catch(err){
            console.error("error occured in line 14 file api_routes: ", error);
        }
    });

    //app.post - creates new workout
    app.post("/api/workouts", (req, res) => {
        try {
            db.Workout.create({type: "workout"})
            .then(response => {
                res.json(response);
        })}
        catch(err){
            console.error("error occured in line 26 file api_routes: ", error)
        }
    });

    //app.put - saves exercise to an existing workout
    app.put("/api/workouts/:id", (req, res) => {
        const workoutID = req.params.id;
        let savedExercises = [];

        try {
        db.Workout.find({_id: workoutID})
            .then(workouts => {
              
                savedExercises = workouts[0].exercises;
                res.json(workouts[0].exercises);
                let allExercises = [...savedExercises, req.body]
                db.Workout.findByIdAndUpdate(workoutID, {exercises: allExercises})
            })}
        catch(err){
            console.error("error occured in line 45 file api_routes: ", error)
        }     
    });                      

    //app.get - gets workouts in a range
    app.get("/api/workouts/range", (req, res) => {
        try {
            db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })}
        catch(err){
            console.error("error occured in line 57 file api_routes: ", error)
        }
    }); 
};