const { execSync } = require("child_process");
const fs = require("fs");

const startDate = new Date("2025-01-12");
const today = new Date();
const commitCount = Math.floor(Math.random() * 11) + 90; // Random between 90–100

const messages = [
  "Refactored utility functions",
  "Improved project structure",
  "Fixed validation issues",
  "Cleaned up unused variables",
  "Enhanced error messages",
  "Added input checks",
  "Updated README.md",
  "Improved loading logic",
  "Formatted with Prettier",
  "Simplified conditionals",
  "Enhanced logging",
  "Code quality improvements",
  "Refined user auth flow",
  "Cleaned up console logs",
  "Optimized backend queries",
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

fs.writeFileSync("log.txt", "Contribution log:\n");

for (let i = 0; i < commitCount; i++) {
  const randomDays = Math.floor(Math.random() * ((today - startDate) / (1000 * 60 * 60 * 24)));
  const commitDate = new Date(startDate);
  commitDate.setDate(startDate.getDate() + randomDays);

  fs.appendFileSync("log.txt", `Commit on ${commitDate.toISOString()}\n`);

  execSync("git add .");
  execSync(`git commit -m "${getRandomMessage()}"`, {
    env: {
      ...process.env,
      GIT_AUTHOR_DATE: commitDate.toISOString(),
      GIT_COMMITTER_DATE: commitDate.toISOString(),
    },
  });
}
