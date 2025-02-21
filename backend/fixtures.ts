import config from './config';
import mongoose from 'mongoose';
import User from './models/User';
import {randomUUID} from 'node:crypto';
import Cocktail from './models/Cocktail';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e) {
        console.log('Collections were not present, skipping the drop ');
    }

    const [john] = await User.create(
        {
            email: "john@gmail.com",
            password: "123",
            role: "user",
            displayName: "John Doe",
            avatar: "fixtures/john.jpg",
            token: randomUUID(),
        },
        {
            email: "jane@gmail.com",
            password: "123",
            role: "admin",
            displayName: "Jane Smith",
            avatar: "fixtures/jane.jpg",
            token: randomUUID(),
        },
    );

    await Cocktail.create(
        {
            user: john._id,
            name: 'Margarita',
            image: "fixtures/margarita.jpg",
            recipe: "Gather all ingredients. Sprinkle salt on a small plate. Lightly wet the rim of a cocktail glass or margarita glass with a damp paper towel. Dip the moistened rim in salt to coat. Set aside. Combine tequila, orange-flavored brandy, and lime juice in a cocktail shaker. Add ice and shake until chilled. Strain into a salt-rimmed cocktail glass or a salt-rimmed, ice-filled margarita glass. Garnish with a lime wheel.",
            ingredients: [
                {name: 'Kosher salt', amount: '1 tablespoon'},
                {name: 'Tequila', amount: '1 ½ fluid ounces'},
                {name: 'Orange flavored liqueur', amount: ' 1 fluid ounce'},
                {name: 'Lime juice', amount: '½ fluid ounce'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Lime', amount: '1 wheel'}
            ],
            isPublished: false,
        },
        {
            user: john._id,
            name: 'Mojito',
            image: "fixtures/mojito.jpg",
            recipe: "In a glass, muddle mint leaves with sugar and lime juice. Add rum and top with soda water. Stir gently and garnish with mint leaves and lime wedges.",
            ingredients: [
                {name: 'Mint leaves', amount: '10 leaves'},
                {name: 'Sugar', amount: '2 teaspoons'},
                {name: 'Lime juice', amount: '1 ounce'},
                {name: 'White rum', amount: '2 ounces'},
                {name: 'Soda water', amount: '4 ounces'},
                {name: 'Ice', amount: '1 cup'}
            ],
            isPublished: false,
        },
        {
            user: john._id,
            name: 'Old Fashioned',
            image: "fixtures/old_fashioned.jpg",
            recipe: "Place sugar cube in an Old Fashioned glass and add a few dashes of bitters. Muddle the ingredients. Add bourbon and a large ice cube, then stir. Garnish with an orange twist.",
            ingredients: [
                {name: 'Sugar cube', amount: '1'},
                {name: 'Angostura bitters', amount: '2 dashes'},
                {name: 'Bourbon', amount: '2 ounces'},
                {name: 'Ice', amount: '1 large cube'},
                {name: 'Orange twist', amount: '1'}
            ],
            isPublished: false,
        },
        {
            user: john._id,
            name: 'Cosmopolitan',
            image: "fixtures/cosmopolitan.jpg",
            recipe: "Combine vodka, triple sec, cranberry juice, and lime juice in a shaker with ice. Shake and strain into a chilled martini glass. Garnish with a lime wheel.",
            ingredients: [
                {name: 'Vodka', amount: '1 ½ ounces'},
                {name: 'Triple sec', amount: '1 ounce'},
                {name: 'Cranberry juice', amount: '½ ounce'},
                {name: 'Lime juice', amount: '½ ounce'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Lime wheel', amount: '1'}
            ],
            isPublished: false,
        },
        {
            user: john._id,
            name: 'Pina Colada',
            image: "fixtures/pina_colada.jpeg",
            recipe: "In a blender, combine rum, coconut cream, pineapple juice, and ice. Blend until smooth. Serve in a chilled glass with a pineapple slice.",
            ingredients: [
                {name: 'Rum', amount: '2 ounces'},
                {name: 'Coconut cream', amount: '1 ounce'},
                {name: 'Pineapple juice', amount: '3 ounces'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Pineapple slice', amount: '1'}
            ],
            isPublished: true,
        },
        {
            user: john._id,
            name: 'Martini',
            image: "fixtures/martini.jpg",
            recipe: "Mix gin and dry vermouth in a mixing glass with ice. Stir and strain into a chilled martini glass. Garnish with an olive or lemon twist.",
            ingredients: [
                {name: 'Gin', amount: '2 ½ ounces'},
                {name: 'Dry vermouth', amount: '½ ounce'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Olive or lemon twist', amount: '1'}
            ],
            isPublished: true,
        },
        {
            user: john._id,
            name: 'Negroni',
            image: "fixtures/negroni.jpg",
            recipe: "Combine gin, vermouth rosso, and Campari in a glass with ice. Stir gently and garnish with an orange twist.",
            ingredients: [
                {name: 'Gin', amount: '1 ounce'},
                {name: 'Vermouth rosso', amount: '1 ounce'},
                {name: 'Campari', amount: '1 ounce'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Orange twist', amount: '1'}
            ],
            isPublished: true,
        },
        {
            user: john._id,
            name: 'Whiskey Sour',
            image: "fixtures/whiskey_sour.jpg",
            recipe: "Shake whiskey, lemon juice, sugar, and ice together. Strain into a rocks glass over ice and garnish with a cherry.",
            ingredients: [
                {name: 'Whiskey', amount: '2 ounces'},
                {name: 'Lemon juice', amount: '¾ ounce'},
                {name: 'Sugar', amount: '½ teaspoon'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Cherry', amount: '1'}
            ],
            isPublished: true,
        },
        {
            user: john._id,
            name: 'Bloody Mary',
            image: "fixtures/bloody_mary.jpg",
            recipe: "In a shaker, combine vodka, tomato juice, Worcestershire sauce, hot sauce, lemon juice, and a pinch of salt. Shake and strain into a tall glass with ice. Garnish with a celery stick and a lime wedge.",
            ingredients: [
                {name: 'Vodka', amount: '2 ounces'},
                {name: 'Tomato juice', amount: '4 ounces'},
                {name: 'Worcestershire sauce', amount: '2 dashes'},
                {name: 'Hot sauce', amount: '1 dash'},
                {name: 'Lemon juice', amount: '½ ounce'},
                {name: 'Celery stick', amount: '1'},
                {name: 'Lime wedge', amount: '1'}
            ],
            isPublished: true,
        },
        {
            user: john._id,
            name: 'Mai Tai',
            image: "fixtures/mai_tai.jpg",
            recipe: "Shake rum, lime juice, orgeat syrup, and simple syrup with ice. Strain into a glass filled with ice. Garnish with a mint sprig and a cherry.",
            ingredients: [
                {name: 'Rum', amount: '2 ounces'},
                {name: 'Lime juice', amount: '¾ ounce'},
                {name: 'Orgeat syrup', amount: '½ ounce'},
                {name: 'Simple syrup', amount: '½ ounce'},
                {name: 'Ice', amount: '1 cup'},
                {name: 'Mint sprig', amount: '1'},
                {name: 'Cherry', amount: '1'}
            ],
            isPublished: true,
        },
    );

    await db.close();
};

run().catch(console.error);