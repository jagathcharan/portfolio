/** ponytail: smallest check that fails if chat Q&A knowledge/routing regresses. */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.dirname(fileURLToPath(import.meta.url));
const knowledge = fs.readFileSync(path.join(root, '../src/utils/siteKnowledge.ts'), 'utf8');
const local = fs.readFileSync(path.join(root, '../src/utils/localAI.ts'), 'utf8');
const chat = fs.readFileSync(path.join(root, '../src/components/AIChat.tsx'), 'utf8');

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

assert(knowledge.includes('98.5%'), 'face accuracy missing');
assert(knowledge.includes('17+ months'), 'tenure missing');
assert(knowledge.includes('Jagathcharan2004@gmail.com'), 'email missing');
assert(local.includes("case 'rag'"), 'RAG intent missing');
assert(local.includes("case 'edge'"), 'Edge intent missing');
assert(local.includes('suggestions'), 'suggestions missing');
assert(chat.includes('suggestedQuestions'), 'chat chips missing');
assert(chat.includes('generateLocalAIResponse'), 'chat not wired to localAI');
assert(!chat.includes('Co-authored-by'), 'watermark text must not appear');

console.log('check-local-ai: OK');
