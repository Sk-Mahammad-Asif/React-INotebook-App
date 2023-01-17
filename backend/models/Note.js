const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

   //logged in user can use his/her own notes use user as a foreign key.
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },

    /****************************************************/
    title:{
       type: String,
       required: true
       
    },
    description:{
       type: String,
       required: true,
       
    },
    tag:{
       type: String,
       default: "General"
    },
    date:{
       type: Date,
       default: Date.now
    },

 });

 module.exports = mongoose.model('notes', NotesSchema);