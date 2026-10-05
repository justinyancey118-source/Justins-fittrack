const workouts = [
  {
    id: 1,
    name: "Full Body Beginner",
    description: "A simple full-body workout for beginners.",
    duration: 45,
    difficulty: "Beginner",
    exercises: [
      {
        exerciseId: 4,
        sets: 3,
        reps: 10,
      },
      {
        exerciseId: 6,
        sets: 3,
        reps: 10,
      },
      {
        exerciseId: 2,
        sets: 3,
        reps: 8,
      },
    ],
  },

  {
    id: 2,
    name: "Upper Body Strength",
    description: "A strength-focused workout for the upper body.",
    duration: 50,
    difficulty: "Intermediate",
    exercises: [
      {
        exerciseId: 1,
        sets: 4,
        reps: 8,
      },
      {
        exerciseId: 5,
        sets: 4,
        reps: 8,
      },
      {
        exerciseId: 4,
        sets: 3,
        reps: 12,
      },
    ],
  },

  {
    id: 3,
    name: "Lower Body Workout",
    description: "A lower-body focused workout targeting the legs.",
    duration: 40,
    difficulty: "Intermediate",
    exercises: [
      {
        exerciseId: 2,
        sets: 4,
        reps: 8,
      },
      {
        exerciseId: 6,
        sets: 3,
        reps: 12,
      },
    ],
  },
];

export default workouts;