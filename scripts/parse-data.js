const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const { glob } = require('glob');

// Configuration
const DATA_DIR = path.join(process.cwd(), 'raw_data');
const OUTPUT_FILE = path.join(process.cwd(), 'app', 'data', 'leetcode.json');

async function generateData() {
  const questionDb = {};
  const companyIndex = {};

  console.log('🔍 Looking for CSV files in:', DATA_DIR);

  // 1. Find all 'all.csv' files inside subfolders
  // Pattern: raw_data / [Any Folder] / all.csv
  const files = await glob(`${DATA_DIR}/*/all.csv`.replace(/\\/g, '/'));

  if (files.length === 0) {
    console.warn('⚠️  No CSV files found! Make sure your folders are in "raw_data/{CompanyName}/all.csv"');
    return;
  }

  for (const file of files) {
    // Extract company name from folder path
    // e.g. "raw_data/Google/all.csv" -> "Google"
    const companyName = path.basename(path.dirname(file));
    
    // Read and Parse CSV
    const csvContent = fs.readFileSync(file, 'utf8');
    const { data } = Papa.parse(csvContent, { 
      header: true, 
      skipEmptyLines: true,
      transformHeader: (h) => h.trim() // Safely trim spaces from headers
    });

    const companyQuestions = [];

    data.forEach((row) => {
      // MAPPING: Matching your specific CSV columns
      const id = row['ID'];
      
      // Skip row if ID is missing
      if (!id) return;

      // 2. Populate the Unique Question DB (Update if not exists)
      if (!questionDb[id]) {
        questionDb[id] = {
          title: row['Title'],
          link: row['URL'],
          difficulty: row['Difficulty'],
          acceptance: row['Acceptance %']
        };
      }

      // 3. Populate the Company List
      // Handle "100.0%" -> 100.0
      const freqString = row['Frequency %'] ? row['Frequency %'].replace('%', '') : '0';
      
      companyQuestions.push({
        id: id,
        frequency: parseFloat(freqString) || 0
      });
    });

    // Sort company questions by frequency (descending)
    companyQuestions.sort((a, b) => b.frequency - a.frequency);

    companyIndex[companyName] = companyQuestions;
    console.log(`✅ Parsed ${companyName}: ${companyQuestions.length} questions`);
  }

  // 4. Prepare Output Data
  const finalData = {
    generatedAt: new Date().toISOString(),
    stats: {
      totalCompanies: Object.keys(companyIndex).length,
      totalQuestions: Object.keys(questionDb).length
    },
    questions: questionDb,
    companies: companyIndex
  };

  // 5. Create Directory if it doesn't exist (Fixes ENOENT error)
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 6. Write to JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`\n🎉 Success! Data written to src/data/leetcode.json`);
}

generateData().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});