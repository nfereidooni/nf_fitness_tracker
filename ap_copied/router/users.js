const orm = require('../orm');

function router( app ){
    // == user ==
    app.post('/api/user/login', async function( req, res ){
        const email = req.body.email;
        const password = req.body.password;
        const userData = await orm.users.loginUser(email, password);
        console.log( '[/api/user/login] userData: ', userData);
        if( !userData ){
            return res.send( { status: false, message: 'Sorry unknown user or wrong password' } );
        }

        console.log('* valid password, proceeding with sending userData to client!', userData);
        res.send({ status: true, ...userData });
    });

    app.post( '/api/user/register', async function( req, res ){
        const userData = {
            firstName:     req.body.firstName,
            lastName:      req.body.lastName,
            emailAddress:  req.body.email,
            userPassword:  req.body.password
        };

        const userId = await orm.users.registerUser(userData);
        console.log( ' created user [orm.registerUser]: userId=', userId );

        if( !userId ){
            return res.send( { status: false, message: 'Sorry failed to create the user, try later?' } );
        }

        res.send( { status: true, message: `You are registered (userId: #${userId})!` } );
    } );
}

module.exports = router;