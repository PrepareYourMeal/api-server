const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    authToken: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    planner: {
        monday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        tuesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        wednesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'

                },
                title: {
                    type: String

                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String

                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        thursday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        friday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        saturday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        sunday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes'
                },
                title: {
                    type: String
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients'
                        },
                        name: {
                            type: String
                        },
                        spoon_id: {
                            type: Number
                        },
                        quantity: {
                            type: Number
                        }
                    }
                ]
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    },
    inventory: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients'
            },
            name: {
                type: String
            },
            spoon_id: {
                type: Number
            }
        }
    ],
    grocery: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients'
            },
            name: {
                type: String
            },
            spoon_id: {
                type: Number
            }
        }
    ],
    favourites: [
        {
            recipe_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes'
            },
            title: {
                type: String
            },
            ingredients: [
                {
                    ingredient_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'ingredients'
                    },
                    name: {
                        type: String
                    },
                    spoon_id: {
                        type: Number
                    },
                    quantity: {
                        type: Number
                    }
                }
            ]
        }
    ],
    tags: {
        type: [String]
    }
});


module.exports = User = mongoose.model('user', UserSchema);