/**
 * Fuzzy Matching Utility for Typo Tolerance
 * Handles spelling errors and variations in user input
 */

/**
 * Calculate Levenshtein distance between two strings
 * Lower distance = more similar strings
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,     // deletion
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity ratio (0-1, where 1 is identical)
 */
export function similarity(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

/**
 * Check if a word matches any keyword with typo tolerance
 * @param word - The word to check
 * @param keywords - Array of keywords to match against
 * @param threshold - Similarity threshold (0-1), default 0.7
 */
export function fuzzyMatch(
  word: string,
  keywords: string[],
  threshold: number = 0.7
): boolean {
  const lowerWord = word.toLowerCase();
  
  // Exact match first (fastest)
  if (keywords.some(k => k.toLowerCase() === lowerWord)) {
    return true;
  }

  // Fuzzy match
  for (const keyword of keywords) {
    const sim = similarity(lowerWord, keyword.toLowerCase());
    if (sim >= threshold) {
      return true;
    }
  }

  return false;
}

/**
 * Check if message contains any keywords with typo tolerance
 * @param message - The message to check
 * @param keywords - Array of keywords to match against
 * @param threshold - Similarity threshold (0-1), default 0.7
 */
export function fuzzyContains(
  message: string,
  keywords: string[],
  threshold: number = 0.7
): boolean {
  const words = message.toLowerCase().split(/\s+/);
  
  // Check each word against keywords
  for (const word of words) {
    if (fuzzyMatch(word, keywords, threshold)) {
      return true;
    }
  }

  // Also check if any keyword is a substring (for multi-word keywords)
  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (message.toLowerCase().includes(lowerKeyword)) {
      return true;
    }
    // Fuzzy substring match
    if (message.length >= lowerKeyword.length) {
      for (let i = 0; i <= message.length - lowerKeyword.length; i++) {
        const substring = message.substring(i, i + lowerKeyword.length).toLowerCase();
        if (similarity(substring, lowerKeyword) >= threshold) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Find the best matching keyword from a list
 * @param word - The word to match
 * @param keywords - Array of keywords to match against
 * @returns The best matching keyword or null
 */
export function findBestMatch(
  word: string,
  keywords: string[]
): { keyword: string; similarity: number } | null {
  let bestMatch: { keyword: string; similarity: number } | null = null;
  const lowerWord = word.toLowerCase();

  for (const keyword of keywords) {
    const sim = similarity(lowerWord, keyword.toLowerCase());
    if (!bestMatch || sim > bestMatch.similarity) {
      bestMatch = { keyword, similarity: sim };
    }
  }

  return bestMatch && bestMatch.similarity >= 0.6 ? bestMatch : null;
}

/**
 * Common misspellings and variations mapping
 */
export const commonVariations: Record<string, string[]> = {
  'skill': ['skil', 'skils', 'skilz', 'skilss', 'skilsss', 'skills', 'sill', 'skull', 'skile'],
  'experience': ['experiance', 'experence', 'exp', 'expirience', 'experienc', 'experi', 'expeirence', 'expirance'],
  'project': ['projct', 'projet', 'projec', 'projecs', 'projcts', 'proj', 'porject', 'porjects'],
  'python': ['pythn', 'pytho', 'pyton', 'pythin', 'pythlon', 'pythn3', 'pyth'],
  'opencv': ['openc', 'open cv', 'opencv', 'ocv', 'opncv', 'open-cv'],
  'tensorflow': ['tensor flow', 'tensorflo', 'tensorflw', 'tensrflow', 'tenserflow', 'tf'],
  'pytorch': ['pytorch', 'py torch', 'pytor', 'pytroch', 'pytoch', 'torch', 'pyt'],
  'education': ['educaton', 'educatin', 'educaion', 'edu', 'eduction', 'educacion', 'ed'],
  'certification': ['certificaton', 'certificatin', 'cert', 'certif', 'cerification', 'certificate', 'certifications', 'certf'],
  'contact': ['contat', 'contct', 'contac', 'cntact', 'konatct', 'contakt', 'contackt', 'cotact'],
  'available': ['availble', 'availabe', 'availabl', 'avail', 'avaiable', 'avaliable', 'availlable'],
  'jagath': ['jagat', 'jagatth', 'jagaath', 'jagth', 'jaghat', 'jaghath'],
  'computer vision': ['cv', 'comp vision', 'computer vison', 'computervision', 'compuer vision', 'comuter vision'],
  'machine learning': ['ml', 'machine lerning', 'ml', 'machin learning', 'machne learning', 'macine learning', 'machine-learn', 'machinelearning'],
  'artificial intelligence': ['ai', 'artificial intellegence', 'aritificial intelligence', 'artifical intelligence', 'artificialintelligence'],
  'data engineering': ['data eng', 'dataengineer', 'data engg', 'data-eng', 'dta engineering', 'dataingineering'],
  'media engineering': ['media eng', 'mediaengineer', 'media engg', 'media-eng', 'mediaingineering'],
  'generative ai': ['gen ai', 'generative artificial intelligence', 'generative', 'gai'],
  'rag application': ['rag', 'retrieval augmented generation', 'r a g', 'rag app', 'ragapplication'],
  'networking': ['network', 'net working', 'networkingg', 'netwroking'],
  'mlops': ['ml ops', 'm l ops', 'mlop', 'ml-ops'],
  'edge ai': ['edgeai', 'edge artificial intelligence', 'edge-aI', 'edge-ai'],
  'database': ['data base', 'databse', 'db', 'datbase'],
  'cloud': ['clouds', 'cloudd', 'cld', 'clould'],
};

/**
 * Normalize word by checking common variations
 */
export function normalizeWord(word: string): string {
  const lowerWord = word.toLowerCase();
  
  // Check common variations
  for (const [correct, variations] of Object.entries(commonVariations)) {
    if (variations.includes(lowerWord) || lowerWord === correct) {
      return correct;
    }
    // Also check fuzzy match
    if (fuzzyMatch(lowerWord, [correct, ...variations], 0.8)) {
      return correct;
    }
  }

  return lowerWord;
}
