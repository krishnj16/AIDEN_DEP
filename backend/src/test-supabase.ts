import { supabase } from './lib/supabase';

async function testConnection() {
  console.log('🔌 Testing connection to Supabase...');

  const { data, error } = await supabase
    .from('system_logs')
    .insert([
      { 
        event_name: 'AIDEN_INIT_TEST', 
        details: { status: 'online', phase: 'Day 3' } 
      }
    ])
    .select();

  if (error) {
    console.error(' Connection Failed:', error.message);
    process.exit(1);
  }

  console.log(' Success! Written to DB:', data);
  
  const { count } = await supabase
    .from('system_logs')
    .select('*', { count: 'exact', head: true });
    
  console.log(`📊 Total logs in DB: ${count}`);
}

testConnection();