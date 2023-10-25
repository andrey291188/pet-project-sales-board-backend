

const getCurrent = async (rq, rs) => {
    const { name, email } = rq.user;

    rs.json({
      status: "Success",
      code: 200,
      data: {
        name,
        email,
      },
    });
}

module.exports = getCurrent