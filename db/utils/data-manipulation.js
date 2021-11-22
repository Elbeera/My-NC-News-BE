// extract any functions you are using to manipulate your data, into this file

const formatData = (data) => {
    const dataValues = data.map((dataObj) => {
        return Object.values(dataObj)
    })
    return dataValues
};

module.exports = formatData