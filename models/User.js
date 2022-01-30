const mongoose = require('mongoose');
const {isEmail} = require('validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
let userSchema = new Schema({
   username:{
      type: String,
      required: [true,'Please enter the username'],
      unique:[true, 'This username is already in use']
   },
   email: {
      type: String,
      required: [true,'Please enter the email'],
      unique:[true,'This email is already in use'],
      lowertcase:true,
      validate: [isEmail, 'Please enter a valid email ']
   },
   password: {
      type: String,
      required: [true,'Please enter the username'],
      minlength : [6, 'Minimum password length is 6 characters']
   }
},{
   timestamps: true,
   collection: 'users'
})


//launch a function before adding doc into db

userSchema.pre('save',async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt)

   next()
})

//launch a function after successful save into the database

userSchema.post('save',function(doc, next) {
   console.log('new user was created and saved', doc)

   next()
})


module.exports = mongoose.model('User', userSchema);