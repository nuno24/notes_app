import supabase from '../utils/supabase';

export const fetchNotes = async () => {
  const { data: notes, error } = await supabase
  .from('notes')
  .select()
  .order('created_at');
  if (error) {
    throw new Error(error.message);
  }
  return notes; 
};