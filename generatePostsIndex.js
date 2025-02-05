const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts.json');

fs.readdir(postsDir, (err, files) => {
  if (err) {
    console.error('Error reading posts directory:', err);
    process.exit(1);
  }

  // Filter for markdown files only (you can adjust the filter as needed)
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  // Optionally, you could include additional metadata (like file modified date) if needed.
  // For now, we output an array of relative paths.
  const postsIndex = markdownFiles.map(file => path.join('posts', file));

  // Write the JSON file to the root so it will be deployed with your site.
  fs.writeFile(outputFile, JSON.stringify(postsIndex, null, 2), err => {
    if (err) {
      console.error('Error writing posts index:', err);
      process.exit(1);
    }
    console.log('Posts index generated successfully.');
  });
});
