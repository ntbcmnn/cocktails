import mongoose, {Schema} from "mongoose";

const CocktailSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required."],
    },
    name: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the cocktail name",
        },
    },
    image: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Cocktail image required",
        }
    },
    recipe: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the recipe",
        },
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: String,
                required: true,
            },
        },
    ],
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);

export default Cocktail;
