const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');
global.loggedIn = null;
global.loggedInUserType = null;

//model
const user = require('./models/user');

//Adding controllers
const homeController = require('./controllers/home');
const g2testController = require('./controllers/g2test');
const gtestController = require('./controllers/gtest');
const updateUserController = require('./controllers/updateUser');
const signupController = require('./controllers/signup'); 
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const adminAppointmentController = require('./controllers/adminAppointment');
const appointmentCreateController = require('./controllers/appointmentCreate');
const appointmentFindController = require('./controllers/appointmentFind');
const testResultsController = require('./controllers/testResultsController');
const availableSlotsController = require('./controllers/availableSlotsController');
const g2testSubmitController = require('./controllers/g2testSubmitController');
const gtestSubmitController = require('./controllers/gtestSubmitController');
const examinerController = require('./controllers/examinerController');
const examinerControllerList = require('./controllers/examinerControllerList');
const examinerControllerUserData = require('./controllers/examinerControllerUserData');
const examinerControllerUserSaveComments = require('./controllers/examinerControllerUserSaveComments');

//Middleware
const validateMiddleware = require('./middleware/validateMiddleware');
const adminAuthMiddleware = require('./middleware/adminAuthMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const driverAuthMiddleware = require('./middleware/driverAuthMiddleware');

//creating server
const app = express();

//connect to mongoDB
const conString = 'mongodb+srv://kvov79:vovkodav79@cluster0.ahkokhb.mongodb.net/';

try{
    const connection = mongoose.connect(conString)
    console.log('MongoDB is connected')
}
catch(err) {
    console.log('MongoDB is not connected! Try again!' + err)
};

// using static files.
app.use(express.static('public'));
app.use(fileUpload());

//Set view engine:
app.set('view engine', 'ejs');
app.use('/save', validateMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
    secret: 'This is my secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use('*', (req,res,next) => {
    loggedIn = req.session.userId;
    loggedInUserType = req.session.userType;
    next()
});

//routes
app.get('/', homeController);
app.get('/g2test', driverAuthMiddleware, g2testController);
app.get('/gtest', driverAuthMiddleware, gtestController);
app.get('/admins/appointment', adminAuthMiddleware, adminAppointmentController);
app.post( "/admins/appointments", adminAuthMiddleware, appointmentCreateController )
app.get( "/admins/appointments/:month/:day/:year", appointmentFindController )
app.get('/testresults', adminAuthMiddleware, testResultsController);
app.get('/g2test/availableTimeSlots', availableSlotsController.getAvailableTimeSlots);
app.get('/gtest/availableTimeSlots', availableSlotsController.getAvailableTimeSlots);
app.post('/g2test/submitDate', g2testSubmitController.submitDate);
app.post('/gtest/submitDate', gtestSubmitController.submitGTestDate);
app.get('/examiner', examinerController);
app.post('/examiner', examinerController);
app.post('/examinerList', examinerControllerList);
app.post('/examinerUserData', examinerControllerUserData);
app.post('/saveComments', examinerControllerUserSaveComments);

//updating user
app.post('/update',updateUserController);
//User routing
app.get('/auth/signup', redirectIfAuthenticatedMiddleware, signupController);
app.post('/users/signup', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req,res) => res.render('notFound',{title: 'Not Found', page_name: 'notFound'}));




app.listen(5000,(req,res) => {
    console.log(`Application Link: http://localhost:5000/`)
})

