module.exports = (req, res) => {
    const serverTime = new Date().toLocaleString('en', {
        timeZone: 'America/Toronto'
    });

    // Format the date for display in the date picker
    const formattedServerTime = new Date(serverTime).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    const data = req.flash('data')[0];
    res.render('appointment', {
        title: 'Appointment',
        page_name: 'appointment',
        messages: req.flash('messages'),
        errors: req.flash('validationErrors'),
        data: data,
        serverTime: formattedServerTime 
    });
};

    