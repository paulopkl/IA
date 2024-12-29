In Node.js, you can use the `fs` module's promise-based API to write to a `.txt` file. The `fs` module's promise-based API is available via the `fs/promises` sub-module. Below is an example of how you can write to a `.txt` file using `fs.promises.writeFile`:

First, ensure you have Node.js installed on your system, as you will need it to run the code.

Here's some code illustrating how to write to a `.txt` file:

```javascript
const fs = require('fs/promises');

async function writeToFile() {
  const content = 'This is the content I want to write to my file.';
  const filePath = 'example.txt';

  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`File has been written to ${filePath}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

writeToFile();
```

### Explanation:

1. **Import the Module**: We import the `fs/promises` module with `const fs = require('fs/promises');`. This gives us access to the promisified functions.

2. **Define an Async Function**: Since we're using promises, it's convenient to use an `async` function. We define one called `writeToFile`.

3. **Specify Content and Path**: Define the content you want to write and specify the path of the file.

4. **Using `writeFile`**: We call `await fs.writeFile(filePath, content, 'utf8');`. This function takes the file path, the content to write, and the encoding.

5. **Error Handling**: There is a `try-catch` block to handle any errors that might occur during the file writing process.

6. **Run the Function**: We call `writeToFile()` to execute our function.

This code will create (or overwrite if it already exists) a file named `example.txt` in your current directory and write the specified content to it. If there's any error, such as a permission issue, it will be logged to the console.