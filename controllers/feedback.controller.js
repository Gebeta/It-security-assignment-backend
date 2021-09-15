var mongoose = require('mongoose');


const reportModel = require('../models/feedback.model');
const userModel = require('../models/user.model')

exports.createReport = async (req, res) => {
    try {

        const newReport = await new reportModel({
            name: req.body.name,
            description: req.body.description,
            // photo_url: req.file.path,
            reported_by: mongoose.Types.ObjectId(req.user.data._id),
        })

        await newReport.save();
        return res.status(200).send(newReport);


    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: true,
            message: err.message,

        })
    }
}

exports.viewAllReport = async (req, res) => {
    try {
        const option = {
            sort: { 'created_at': -1 }
        }
        const reports = await reportModel.find({})
        if (reports) {
            return res.status(200).json(reports)
        }
        return res.status(200).json({
            error: false,
            message: "No documents Retrived"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewReportById = async (req, res) => {
    try {
        const reports = await reportModel.find({
            _id: req.params.id
        }).populate(['reported_by'])
        if (reports.length != 0) {
            return res.status(200).json(reports)
        }
        throw new Error(" report not found")

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewMyReport = async (req, res) => {
    try {
        const reports = await reportModel.find({
            reported_by: mongoose.Types.ObjectId(req.user.data._id)
        })
        if (reports) {
            return res.status(200).json(reports)
        }
        return res.status(401).json({
            error: false,
            message: "No documents Retrived"
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.updateMyReport = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            error: true,
            message: err.message,

        })
    }
}


exports.removeReport = async (req, res) => {
    try {
        let report = await reportModel.findById(req.params.id)
        if (report) {
            await reportModel.remove({
                _id: report._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }
        res.status(200).json({
            message: 'report doesn\t exist',

        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: err.message,

        })
    }
}