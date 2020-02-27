module.exports = (req, res) => {
    // console.log(req.query);
    const { message } = req.query;
    res.render('admin/user-edit', {
        message: message
    });
}