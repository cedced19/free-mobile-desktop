// Since we have Node integration enabled, we can just expose the fs module directly
window.FS = require('fs');
window.filesystem = require('fs');
const path = require('path');

// Define a default data file path
const DEFAULT_DATA_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.free-mobile-data.json');

// Add the get method that the app is expecting - with no arguments
window.filesystem.get = function(filePath) {
  try {
    // If no filePath is provided, use the default
    const dataPath = filePath || DEFAULT_DATA_FILE;
    
    console.log('filesystem.get called for:', dataPath);
    
    if (filesystem.existsSync(dataPath)) {
      const content = filesystem.readFileSync(dataPath, 'utf8');
      try {
        // Parse JSON content
        return JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return [];
      }
    } else {
      console.log('Data file not found, returning empty array');
      return [];
    }
  } catch (error) {
    console.error('Error in filesystem.get:', error);
    return [];
  }
};

// Add the set method that app.js is using
window.filesystem.set = function(data, filePath) {
  try {
    // If no filePath is provided, use the default
    const dataPath = filePath || DEFAULT_DATA_FILE;
    
    console.log('filesystem.set called for:', dataPath);
    
    // Make sure the directory exists
    const dirPath = path.dirname(dataPath);
    if (!filesystem.existsSync(dirPath)) {
      filesystem.mkdirSync(dirPath, { recursive: true });
    }
    
    // Convert data to JSON string and write to file
    const jsonData = JSON.stringify(data, null, 2);
    filesystem.writeFileSync(dataPath, jsonData);
    
    return true;
  } catch (error) {
    console.error('Error in filesystem.set:', error);
    return false;
  }
};

// If you need to extend the functionality or customize it:
// Add any custom methods to window.filesystem here 