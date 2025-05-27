import { exec } from "child_process";

const port = process.env.PORT || 3000;

// Start the serve command with the correct port
const command = `npx serve -s dist -p ${port}`;

console.log(`Starting server on port ${port}...`);

const child = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});

child.stdout.on("data", (data) => {
  console.log(data);
});

child.stderr.on("data", (data) => {
  console.error(data);
});
