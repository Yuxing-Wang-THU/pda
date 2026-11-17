"use strict";

(() => {
  const data = window.PDA_EVIDENCE;
  document.documentElement.classList.remove("no-js");
  const names = { R: "PDA-R", N: "PDA-NoPred", F: "PDA-Facts", C: "PDA-NoCheck" };
  const tasks = ["UpStepper-v0", "Pusher-v0"];
  const comparisons = {
    all: {
      label: "What the added ablations show",
      title: "Make predictions, check them, and remember the results.",
      description: "R has higher mean returns than NoPred, Facts, and NoCheck on both tasks. These comparisons support using predictions, assessments, and past records together; they do not assign the full gain to prediction alone.",
      conditions: ["R", "N", "F", "C"]
    },
    RN: {
      label: "R vs NoPred / Do predictions help beyond measurements?",
      title: "Predictions and checks help when factual history is retained.",
      description: "Both receive current measurements and factual history. NoPred removes directional predictions and their assessments. R makes predictions, checks their outcomes, and retains these records for later decisions. R has higher mean returns on both tasks; this comparison tests these steps together.",
      conditions: ["R", "N"]
    },
    RF: {
      label: "R vs Facts / What should be remembered?",
      title: "Keep why an edit was proposed and whether its prediction held.",
      description: "Both make and check current predictions. Facts passes only bodies, edits, returns, and measured changes to later decisions. R also keeps past reasoning, predictions, and assessments, and has higher mean returns on both tasks.",
      conditions: ["R", "F"]
    },
    RC: {
      label: "R vs NoCheck / Do explicit assessments help?",
      title: "Explicit assessments and lessons help later decisions.",
      description: "NoCheck retains past reasoning, predictions, and measured outcomes, so the LLM can still infer whether they agree. R also provides explicit assessments and lessons and has higher mean returns on both tasks. This comparison tests assessments and their lessons together.",
      conditions: ["R", "C"]
    },
    FN: {
      label: "Facts vs NoPred / Are current-trial predictions enough?",
      title: "Current-trial predictions alone do not consistently improve return.",
      description: "Facts makes and checks current predictions, but passes only factual history onward. Its final mean is slightly lower than NoPred on UpStepper and higher on Pusher. The results do not show a consistent gain from these current-trial predictions alone.",
      conditions: ["F", "N"]
    }
  };
  let selected = "all";
  let printSelection = null;
  const endpoint = (task, condition) => data.endpoints.find(row => row.task === task && row.condition === condition);
  const signed = value => (value >= 0 ? "+" : "") + value.toFixed(3);
  const shortName = condition => names[condition].replace("PDA-", "");

  function renderSelection(key) {
    selected = key;
    const config = comparisons[key];
    document.getElementById("comparison-label").textContent = config.label;
    document.getElementById("comparison-title").textContent = config.title;
    document.getElementById("comparison-description").textContent = config.description;
    document.querySelectorAll("[data-comparison]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.comparison === key));
    });
    document.querySelectorAll("#added-matrix [data-condition]").forEach(row => {
      row.classList.toggle("is-focus", key !== "all" && config.conditions.includes(row.dataset.condition));
      row.classList.toggle("is-muted", key !== "all" && !config.conditions.includes(row.dataset.condition));
    });

    const pair = key === "all" ? ["R", "N"] : config.conditions;
    const differences = tasks.map(task => data.differences.find(row =>
      row.task === task && row.left === pair[0] && row.right === pair[1]));
    tasks.forEach((task, index) => {
      const suffix = index ? "push" : "up";
      document.getElementById("value-" + suffix + "-label").textContent =
        (index ? "Pusher" : "UpStepper") + ": " + shortName(pair[0]) + " vs " + shortName(pair[1]);
      const delta = differences[index]?.mean ?? (endpoint(task, pair[0]).mean - endpoint(task, pair[1]).mean);
      document.getElementById("value-" + suffix).textContent = key === "all" || key === "RN"
        ? "+" + data.relative_gains[task].toFixed(1) + "%"
        : signed(delta);
    });
    document.getElementById("value-context").textContent = key === "all" || key === "RN"
      ? "Relative mean gain at evaluation 23"
      : "Mean return difference at evaluation 23";
  }

  document.querySelectorAll("[data-comparison]").forEach(button => {
    button.addEventListener("click", () => renderSelection(button.dataset.comparison));
  });
  renderSelection("all");
  window.addEventListener("beforeprint", () => {
    if (printSelection !== null) return;
    printSelection = selected;
    renderSelection("all");
  });
  window.addEventListener("afterprint", () => {
    if (printSelection === null) return;
    renderSelection(printSelection);
    printSelection = null;
  });
})();
