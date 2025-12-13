import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'http://localhost:3000';

const MANUAL_TOKEN = "";

const TARGET_PERSONA = 'jarvis'; 

async function testChatFlow() {
  console.log('🤖 STARTING TEST: Chat System Flow (Token Bypass)');
  console.log('-----------------------------------');


  console.log(`\n1. Starting new chat with ${TARGET_PERSONA}...`);
  const sessionRes = await fetch(`${API_URL}/api/chats/sessions`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${MANUAL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ personaId: TARGET_PERSONA })
  });

  const sessionData = await sessionRes.json();
  if (!sessionRes.ok) {
    console.error('❌ Create Session Failed:', sessionData);
    return;
  }
  const sessionId = sessionData.session.id;
  console.log(`✅ Session Created! ID: ${sessionId}`);

  // STEP 2: SEND MESSAGE
  console.log('\n2. Sending message: "Hello Jarvis"...');
  const msgRes = await fetch(`${API_URL}/api/chats/${sessionId}/messages`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${MANUAL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: "Hello Jarvis, systems check." })
  });

  const msgData = await msgRes.json();
  if (!msgRes.ok) {
    console.error('❌ Send Message Failed:', msgData);
    return;
  }
  
  const aiReply = msgData.message.content;
  console.log('✅ Message Sent!');
  console.log(`🤖 AI REPLY: "${aiReply}"`);

  // STEP 3: VERIFY HISTORY
  console.log('\n3. Fetching chat history...');
  const historyRes = await fetch(`${API_URL}/api/chats/${sessionId}/messages`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${MANUAL_TOKEN}` }
  });

  const historyData = await historyRes.json();
  if (historyRes.ok) {
    console.log(`✅ History fetched! Found ${historyData.data.length} messages.`);
    console.log('-----------------------------------');
    console.log('🎉 DAY 10 COMPLETE: Chat Logic is 100% Working!');
  }
}

testChatFlow();