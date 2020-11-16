const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type."
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name."
            },
            duration: {
                type: Number,
                required: "Enter the exercise duration (minutes)."
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("workouts", workoutSchema, "workouts");

module.exports = Workout;