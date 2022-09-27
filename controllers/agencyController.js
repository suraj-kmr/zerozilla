const jwt = require("jsonwebtoken");
const Agency = require('../model/agency');
const Client = require('../model/client');
const bycrypt = require('bcryptjs');
const { SUCCESS_RESPONSE, FAILURE_RESPONSE } = require("../common/responseBuilder");

const create = async (req, res, next) => {
    const salt = await bycrypt.genSalt(10);
    hashpassword = await bycrypt.hash(req.body.email, salt)
    try {
        let response;
        if (req?.body?.type === "client") {
            const emailExist = await Client.findOne({ email: req.body.email })
            if (emailExist) {
                return res.status(200).send(FAILURE_RESPONSE("Email already Exist"))
            }
            const client = new Client(req.body)
            response = await client.save()
        }
        else {
            const agency = new Agency(req.body)
            response = await agency.save()
        }
        jwt.sign({ id: response._id }, "zerozilla", { expiresIn: 100000 }, function (err, token) {
            if (err) {
                return res.status(400).send(FAILURE_RESPONSE(err))
            }
            return res.status(201).send(SUCCESS_RESPONSE("Data saved successfully", token))
        })
    }
    catch (err) {
        return res.status(400).send(FAILURE_RESPONSE(err))
    }
}

const update = async (req, res, next) => {
    const clientId = req.params.clientId;
    const clientData = req.body
    try {
        await Client.findByIdAndUpdate(clientId, { $set: clientData })
        return res.status(200).send(SUCCESS_RESPONSE("Client Data Updated Successfully"))
    }
    catch (err) {
        return res.status(400).send(FAILURE_RESPONSE(err))
    }
}

const get = async (req, res, next) => {
    const agencyId = req.params.agencyId;
    try {
        const agencyData = await Agency.findById(agencyId);
        let responseData = {
            AgencyName: agencyData?.name
        }
        const clientData = await Client.find({ agencyId: agencyId }).sort({ totalBill: -1 }).limit(1);
        responseData.ClientName = clientData[0].name;
        responseData.TotalBill = clientData[0].totalBill;
        return res.status(400).send(SUCCESS_RESPONSE("fetched record successfully", responseData))
    }
    catch (err) {
        return res.status(400).send(FAILURE_RESPONSE(err))
    }
}

module.exports = {
    create,
    update,
    get
}