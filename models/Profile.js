const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length <= 5;
}

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    planner: {
        monday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        tuesday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        wednesday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        thursday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        friday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        saturday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        sunday: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    },
    inventory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredients'
        }
    ],
    grocery: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredients'
        }
    ],
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes'
        }
    ],
    tags: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

function date_setter() {
    let curr = new Date;
    let week = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first))
        week.push(day)
        console.log(day.getDay())
    
    }
    console.log(week)
    
}

module.exports = Profile = mongoose.model('profile', ProfileSchema);