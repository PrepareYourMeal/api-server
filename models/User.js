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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
                spoon_id: {
                    type: Number
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
                ],
                vegetarian: {
                    type: Boolean
                },
                vegan: {
                    type: Boolean
                },
                glutenFree: {
                    type: Boolean
                },
                dairyFree: {
                    type: Boolean
                },
                ketogenic: {
                    type: Boolean
                },
                preparationMinutes: {
                    type: Number
                },
                readyInMinutes: {
                    type: Number
                },
                servings: {
                    type: Number
                },
                sourceUrl: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                instructions: {
                    type: [String]
                },
                tags: {
                    type: [String]
                }
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
            spoon_id: {
                type: Number
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
            ],
            vegetarian: {
                type: Boolean
            },
            vegan: {
                type: Boolean
            },
            glutenFree: {
                type: Boolean
            },
            dairyFree: {
                type: Boolean
            },
            ketogenic: {
                type: Boolean
            },
            preparationMinutes: {
                type: Number
            },
            readyInMinutes: {
                type: Number
            },
            servings: {
                type: Number
            },
            sourceUrl: {
                type: String
            },
            imageUrl: {
                type: String
            },
            instructions: {
                type: [String]
            },
            tags: {
                type: [String]
            }
        }
    ],
    tags: {
        type: [String]
    }
});


module.exports = User = mongoose.model('user', UserSchema);