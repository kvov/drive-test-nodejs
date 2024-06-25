const User = require("../models/user");

module.exports = async function (req, res) {
    try {
        const driversList = await User.find({
            appointmentId: { $ne: null },
            testResult: { $ne: null },
        })
        .populate("appointmentId", null, { isTimeSlotAvailable: false })
        .exec();

        if (!driversList || driversList.length === 0) {
            return res.render("testresults", {
                title: 'Test Results',
                page_name: 'testresults',
                errors: ["Error retrieving driver test-results"],
                messages: ["No test results found"],
                driversList: null,
            });
        }

        res.render("testresults", {
            title: 'Test Results',
            page_name: 'testresults',
            errors: null,
            messages: null,
            driversList: driversList,
        });
    } catch (error) {
        console.error("Error retrieving test results:", error);
        res.status(500).render("testresults", {
            title: 'Test Results',
            page_name: 'testresults',
            errors: ["Error retrieving driver test-results"],
            messages: null,
            driversList: null,
        });
    }
};
