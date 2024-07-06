import { loginModel } from "../models/login_model.js";

export const loginUser = async (req, res, next) =>{
    try {
        const newUser = await loginModel.create(req.body)
        res.status(200).send(newUser)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = [];
            if (error.errors.firstName) {
                messages.push('email  is required.');
            }
            if (error.errors.lastName) {
                messages.push('password is required.');
            }
            return res.status(400).json({
                error: messages
            });
        }

        if (error.code === 11000) {
            const messages = [];
            if (error.keyValue.email) {
                messages.push('Email is incorrect.');
            }
            if (error.keyValue.password) {
                messages.push('Password is incorrect.');
            }
            return res.status(400).json({
                error: messages
            });
        }
        next(error)
    }
}


export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await loginModel.find()
        res.status(200).send(allUsers)
    } catch (error) {
        next(error)
    }
}

export const patchUser = async (req, res, next) => {
    try {
        const updatedUser = await loginModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(updatedUser)
    } catch (error) {
        if (error.code === 11000) {
            const messages = [];
            if (error.keyValue.email) {
                messages.push('Email already exists.');
            }
            if (error.keyValue.password) {
                messages.push('Password already exists.');
            }
            return res.status(400).json({
                error: messages
            });
        }
        next(error)
    }
}

export const deleteAUser = async (req, res, next) => {
    try {
        const deletedUser = await loginModel.findByIdAndDelete(req.params.id)
        res.status(200).send('User has been deleted successfully')
    } catch (error) {
        next(error)
    }
}

export const getAUser = async (req, res, next) => {
    try {
        const oneUser = await loginModel.findById(req.params.id)
        res.status(200).send(oneUser)
    } catch (error) {
        next(error)
    }
}