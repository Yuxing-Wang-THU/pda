"use strict";

// Reported summaries from the finalized replies; no run-level results are inferred.
window.PDA_EVIDENCE = {
  study: { searches: 6, morphology_evaluations: 23, online_edits: 20, sd: "sample" },
  relative_gains: { "UpStepper-v0": 45.6, "Pusher-v0": 9.9 },
  endpoints: [
    { task: "UpStepper-v0", condition: "R", mean: 3.611, sd: 0.328, n: 6 },
    { task: "UpStepper-v0", condition: "N", mean: 2.481, sd: 0.037, n: 6 },
    { task: "UpStepper-v0", condition: "F", mean: 2.394, sd: 0.383, n: 6 },
    { task: "UpStepper-v0", condition: "C", mean: 1.927, sd: 0.578, n: 6 },
    { task: "Pusher-v0", condition: "R", mean: 9.852, sd: 0.199, n: 6 },
    { task: "Pusher-v0", condition: "N", mean: 8.965, sd: 0.795, n: 6 },
    { task: "Pusher-v0", condition: "F", mean: 9.167, sd: 0.125, n: 6 },
    { task: "Pusher-v0", condition: "C", mean: 8.132, sd: 0.893, n: 6 }
  ],
  differences: [
    { task: "UpStepper-v0", left: "R", right: "N", mean: 1.130, lower: 0.783, upper: 1.477, n: 6 },
    { task: "Pusher-v0", left: "R", right: "N", mean: 0.887, lower: 0.132, upper: 1.642, n: 6 },
    { task: "UpStepper-v0", left: "R", right: "F", mean: 1.218, lower: 0.831, upper: 1.605, n: 6 },
    { task: "Pusher-v0", left: "R", right: "F", mean: 0.685, lower: 0.455, upper: 0.914, n: 6 },
    { task: "UpStepper-v0", left: "R", right: "C", mean: 1.684, lower: 1.072, upper: 2.296, n: 6 },
    { task: "Pusher-v0", left: "R", right: "C", mean: 1.720, lower: 0.652, upper: 2.788, n: 6 }
  ]
};
