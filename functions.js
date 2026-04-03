// script.js

function generate() {
    // 1. Read values from the form
    const baseImage  = document.getElementById("baseImage").value;
    const workdir    = document.getElementById("workdir").value  || "/app";
    const port       = document.getElementById("port").value     || "3000";
    const installCmd = document.getElementById("installCmd").value;
    const startCmd   = document.getElementById("startCmd").value;
  
    // 2. Basic validation — stop if no base image selected
    if (!baseImage) {
      alert("Please select a base image first.");
      return;
    }
  
    // 3. Build the Dockerfile string line by line
    let dockerfile = "";
  
    dockerfile += `FROM ${baseImage}\n`;
    dockerfile += `\nWORKDIR ${workdir}\n`;
    dockerfile += `\nCOPY . .\n`;
  
    if (installCmd) {
      dockerfile += `\nRUN ${installCmd}\n`;
    }
  
    if (port) {
      dockerfile += `\nEXPOSE ${port}\n`;
    }
  
    if (startCmd) {
      dockerfile += `\nCMD ["${startCmd.split(" ").join('", "')}"]`;
    }
  
    // 4. Show the output card and put the text in it
    document.getElementById("output").textContent = dockerfile;
    document.getElementById("outputCard").style.display = "block";
  }
  
  function copyToClipboard() {
    const text = document.getElementById("output").textContent;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  }
