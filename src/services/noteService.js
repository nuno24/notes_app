import supabase from '../utils/supabase';

export const fetchNotes = async () => {
  const { data: notes, error } = await supabase
  .from('notes')
  .select()
  if (error) {
    throw new Error(error.message);
  }
  return notes; 
};

export const createNote = async (note) => {  
  const { data, error } = await supabase
  .from('notes')
  .insert(note.title, note.content)
  .select()
  console.log('data', data);
  console.log('error', error);
  if (error) {
    throw new Error(error.message);
  }
  console.log('Created note:', data);
  return data;
};

export const updateNote = async (id, { title, content }) => {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, date: new Date().toISOString() })
    .eq('id', id)
    .select()
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteNote = async (id) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
  if (error) {
    throw new Error(error.message);
  }
}