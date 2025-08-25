const fs = require("fs");
const fetch = require("node-fetch");

// Thay link này bằng link CSV của bạn
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTL_5cixDsZizSGiWDRGUt9VpqQk4tJ06jaIbhAxakydY0Dp1pbW8-vjga9LCO2el0ToYaJ6IjL1N-S/pub?output=csv";

async function main() {
  const res = await fetch(sheetUrl);
  const text = await res.text();
  const rows = text.split("\n").map(r => r.split(","));

  let html = `
  <!doctype html>
  <html lang="vi">
  <head>
    <meta charset="utf-8">
    <title>Danh sách chi bộ</title>
    <style>
      body { font-family: sans-serif; padding: 20px; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 6px 12px; }
      th { background: #f0f0f0; }
    </style>
  </head>
  <body>
    <h1>Danh sách chi bộ</h1>
    <table>
  `;

  // Render header
  const headers = rows[0];
  html += "<tr>" + headers.map(c => `<th>${c}</th>`).join("") + "</tr>";

  // Render data
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length === 1 && r[0] === "") continue; // bỏ dòng trống
    html += "<tr>" + r.map(c => `<td>${c}</td>`).join("") + "</tr>";
  }

  html += `
    </table>
  </body>
  </html>`;

  fs.writeFileSync("index.html", html);
}

main();
