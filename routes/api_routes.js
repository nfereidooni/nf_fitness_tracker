const db = require("../models");
const router = require("express").Router();

    //app.get - gets last workout
    router.get("/api/workouts", (req, res) => {
        try {
            db.Workout.find({})
            .then(workout => {
                res.json(workout);
        })}
        catch(err){
            console.error("error occured in get in file api_routes: ", err);
        }
    });

    //app.post - creates new workout
    router.post("/api/workouts", async (req, res) => {

        try {
            const workout = req.body
            console.log(workout)
            await db.Workout.create({ workout }).then(response => {
                res.json(response);
        })}
        catch(err){
            console.error("error occured in post in file api_routes: ", err)
        }
    });

    //app.put - saves exercise to an existing workout
    router.put("/api/workouts/:id", (req, res) => {
        const workoutID = req.params.id;
        const exercise = req.body;
        let savedExercises = [];

        try {
            db.Workout.findByIdAndUpdate(workoutID, {$push: {exercises: exercise}}).then( response => res.json(response))
        }
        catch(err){
            console.error("error occured in put in file api_routes: ", err)
        }     
    });                      

    //app.get - gets workouts in a range
    router.get("/api/workouts/range", (req, res) => {
        try {
            db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })}
        catch(err){
            console.error("error occured in second get in file api_routes: ", err)
        }
    });
    
module.exports = router;