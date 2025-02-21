import express from 'express';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload} from '../multer';
import User from '../models/User';
import { Error } from "mongoose";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const token = req.get("Authorization");
    const user = await User.findOne({token});

    let cocktails;

    try {
        if (req.query.user) {
            cocktails = await Cocktail.find({user: req.query.user}).populate("user");
        } else if (user && user.role === 'admin') {
            cocktails = await Cocktail.find().populate("user");
        } else {
            cocktails = await Cocktail.find({isPublished: true}).populate("user");
        }

        res.send(cocktails.reverse());
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/:id', async (req: express.Request, res: express.Response, next) => {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send('Invalid cocktail ID.');
            return;
        }

        try {
            const cocktail = await Cocktail
                .findById(id)
                .populate("user", "-_id -token -password -__v");

            if (!cocktail) {
                res.status(404).send('Cocktail not found.');
                return;
            }

            res.send(cocktail);
        } catch (e) {
            next(e);
        }
    }
);

cocktailsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;

    if (!reqWithUser.user) {
        res.status(401).send('User not found');
        return;
    }

    try {
        const parsedIngredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

        const newCocktail = {
            user: reqWithUser.user._id,
            name: req.body.name,
            recipe: req.body.recipe,
            ingredients: parsedIngredients,
            image: req.file ? 'images' + req.file.filename : null,
        };

        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();
        res.send(cocktail);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

cocktailsRouter.patch(
    '/:id/togglePublished',
    auth,
    permit("admin"),
    async (req: express.Request, res: express.Response, next) => {
        const {id} = req.params;

        try {
            const cocktail = await Cocktail.findById(id);

            if (!cocktail) {
                res.status(404).send({error: "Cocktail not found"});
                return;
            }

            cocktail.isPublished = !cocktail.isPublished;
            await cocktail.save();

            res.send({message: "Cocktail publication status changed", cocktail});
        } catch (e) {
            next(e);
        }
    }
);

cocktailsRouter.delete(
    '/:id',
    auth,
    permit("admin"),
    async (req: express.Request, res: express.Response, next) => {
        const {id} = req.params;

        try {
            const cocktail = await Cocktail.findById(id);

            if (!cocktail) {
                res.status(404).send({error: "Cocktail not found"});
                return;
            }

            await Cocktail.findByIdAndDelete(id);
            res.send({message: "Cocktail deleted successfully."});
        } catch (e) {
            next(e);
        }
    }
);

export default cocktailsRouter;
