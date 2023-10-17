

const getCurrent = async (rq, rs) => {
    const { name, email } = rq.user;

    rs.json({
      status: "Success",
      code: 200,
      user: {
        name,
        email,
      },
    });
}

module.exports = getCurrent