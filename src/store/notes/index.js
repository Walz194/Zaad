import snippet from '../../utils/snippet';
import DateTime from '../../utils/DateTime';
import id from '../../utils/idgen';
import db from '../../db/db';

export default {
    state: {
        
        notes:  [/*
            {
                id: '0',
                noteText: "Fries is delicious",
                excerpt: "Beans is...",
                date: "12-3-2019"
            } ,
            {
                id: '1',
                noteText: "Beans is delicious, rice is also good. Fish and chips",
                excerpt: "Beans is delicious, rice...",
                date: "12-3-2020"
            } */
        ],
        filteredNotes: [] 
    },
    getters: {
        getNotes: (state) => state.notes,
        getNote: (state) => (id) => {
            return state.notes.find(elem => elem.id === id)
        },
        getFilteredNotes: (state) => state.filteredNotes
    },
    actions: {
        async getNotesFromDB(context, payload) {
            var notes = await db.getItems('Notes', payload.index, payload.indexVal);
            context.state.notes = notes;
        },
        async addNote(context, payload) {
            var [currentDate] = DateTime.getDateTime();
            // add a snippet of the note to randomly generated characters
            var idPrefix = id.generate();

            var newNote = {
                id: idPrefix,
                noteText: payload.noteText,
                excerpt: snippet.snip(payload.noteText),
                date: currentDate,
                index: payload.index
            }
            
            await db.addItem('Notes', newNote);
        },
        async deleteNote(context, payload) {
            await db.deleteItem('Notes', payload);
        },
        async editNote(context, payload) {
            payload.excerpt = snippet.snip(payload.text);
        
            await db.editItem('Notes', payload.id, (data) => {
                data.noteText = payload.text;
                data.excerpt = payload.excerpt;
            });
        },
        async filterNotes(context, payload) {
            
            context.state.filteredNotes = [];
            var fetchedNotes = await db.getItems('Notes', 'index', payload.indexVal);

            for(const id of payload.noteIDs) {
                for(let i = 0; i < fetchedNotes.length; i++) {
                    let elem = fetchedNotes[i];
                    if(elem.id === id)
                        context.state.filteredNotes.push(elem);
                }
            }
        }
    }
}