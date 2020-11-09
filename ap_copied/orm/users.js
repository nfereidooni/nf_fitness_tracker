const bcrypt = require( 'bcrypt' );
const db = require( './models' );


// input: <object> { firstName, lastName, emailAddress, userPassword }
// output: userId
async function registerUser( userData ){
    // hint: look at https://mongoosejs.com/docs/api.html#model_Model.create
    console.log( '[registerUser] data passed by form (to write to DB): ', userData );

    // save hashed password
    const passwordHash = await bcrypt.hash(userData.userPassword, 10);
    userData.userPassword = passwordHash;

    const result = await db.users.create(userData);

    console.log( '[registerUser] complete save result: ', result );
    return result._id;
}

// input: email, password
// output: <object> { userId, firstName, lastName, emailAddress, createdAt} || false
async function loginUser( email, password ) {
    // load user-info (for email)
    if( !email || !password ){
        console.log( '[loginUser] invalid email/password' );
        return false;
    }
    const result = await db.users.findOne( { emailAddress: email } );
    console.log( '[loginUser] result from email search: ', result, !result );

    // check if users password is same as servers
    if( !result || !result.userPassword ){
        console.log( ' .. x sorry could not find a user with that email!');
        return false;
    } else {
        const isValidPassword = await bcrypt.compare( password, result.userPassword );
        console.log( ` [loginUser] checking password (password: ${password} ) hash(${result.userPassword})`, isValidPassword );
        if( !isValidPassword ) {
            console.log( '[loginUser] invalid password, hashes do not match!' );
            return false;
        }
    }

    console.log( ' .. yah! password is valid, let\'s login!');
    const userData = {
        userId:         result._id,
        firstName:      result.firstName,
        lastName:       result.lastName,
        emailAddress:   result.emailAddress,
        createdAt:      ''
    };
    console.log( '[loginUser] complete, returning with userData' );
    return userData;
}


module.exports = {
    registerUser,
    loginUser
};