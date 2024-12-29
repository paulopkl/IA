To write a `.txt` file using Node.js with `fs.promises`, you can use the `writeFile` method provided by the `fs/promises` module. Here's how you can do it:

1. First, ensure you have Node.js installed on your system.
2. Create a JavaScript file, for example, `writeFileExample.js`.
3. Use the following code in your file:

```javascript
const fs = require('fs/promises');

async function writeTextFile(fileName, content) {
  try {
    await fs.writeFile(fileName, content, 'utf-8');
    console.log(`File ${fileName} has been written successfully.`);
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

const fileName = 'example.txt'; // Name of the text file to be created
const content = 'Hello, this is a sample text written to a file using Node.js!'; // Content of the file

writeTextFile(fileName, content);
```

### Explanation:
- `fs/promises` provides promise-based API for file system operations, which allows you to use async/await for cleaner asynchronous code.
- `writeFile`: This method writes data to a file, replacing the file if it already exists. 
  - The first argument is the name of the file.
  - The second argument is the content to write into the file.
  - The third argument `'utf-8'` specifies the encoding.
- `try...catch`: This is used to handle any errors that might occur during the file writing process.

### Running the Script:
To run the script, open a terminal in the directory where your `writeFileExample.js` is located and execute the following command:
```bash
node writeFileExample.js
```

This will create a file named `example.txt` with the specified content in the same directory. If the file already exists, it will be overwritten.