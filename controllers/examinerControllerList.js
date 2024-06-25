
const Appointment = require('../models/Appointment')
const User = require('../models/user')

module.exports = async (req, res) => {

  let testDate = req.body.testDate;
  let testType = req.body.testType;
  let appointments;

  let originalDate = new Date(testDate);
  let yyyy = originalDate.getFullYear();
  let mm = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  let dd = (originalDate.getDate() + 1).toString().padStart(2, '0');
  let testDateConsult = mm + '/' + dd + '/' + yyyy;


  try {

    const usersWithTestType = await User.find({ testType: testType });

    // appointment for the users
    const appointmentIds = usersWithTestType.map(user => user.appointmentId);

    appointments = await Appointment.find({
        _id: { $in: appointmentIds },
        appointmentDate: testDateConsult
    });

    console.log("appointments=" + appointments);
  } catch (error) {
    console.error("Examiner list=" + error);
    res.status(500).send('Error en la consulta');
  }

  res.render('examinerList', {
    title: 'examinerList',
    page_name: 'examinerList',
    appointments,
    testDate,
    testType
  })


};