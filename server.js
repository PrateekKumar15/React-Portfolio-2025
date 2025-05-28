import { exec } from "child_process";
import process from "process";

const port = process.env.PORT || 3000;

// Start the serve command with SPA support (-s flag) and correct port
const command = `npx serve -s dist -p ${port} --single`;

console.log(`Starting SPA server on port ${port}...`);
console.log(`Command: ${command}`);

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
