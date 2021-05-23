const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}}){
            // TODO: Validate user data
            //TODO: MAKE SURE USER DOES NOT ALREADY EXIST

            const user = await User.findOne({username});

            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email, 
                username,
                password,
                createdAt: new Date().toString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
            }, process.env.TOKEN_SECRET, {expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}