import React from "react";

export const ManageAlertJSON = {
    "premiumScreens": [
        3057,
        6160,
        9818,
        15543,
        15697,
        18910,
        19261,
        19889,
        19890,
        19891,
        19892,
        19895,
        20078,
        22709,
        35318,
        41532,
        41533,
        45188,
        45237,
        45882,
        45884,
        48091
    ],
    "FREQUENCY_CHOICES": [
        [
            48,
            "15 min"
        ],
        [
            40,
            "30 min"
        ],
        [
            32,
            "hourly"
        ],
        [
            24,
            "daily"
        ],
        [
            16,
            "weekly"
        ],
        [
            8,
            "monthly"
        ],
        [
            6,
            "quarterly"
        ],
        [
            4,
            "half yearly"
        ],
        [
            2,
            "yearly"
        ]
    ],
    "alertCountDict": {
        "category": {
            "price": 12,
            "corp_announce": 1,
            "volume_and_delivery": 5,
            "High_dvm_scoring_stocks": 2,
            "big_insider_sast_trades": 3,
            "breakouts_past_resistance_and_support": 3,
            "moving_averages": 2,
            "results_as_they_happen": 1
        },
        "level1objs": {
            "resultsRisingProfitRevenue": {
                "count": 1,
                "screen_pks": [
                    22709
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "delivery": {
                "count": 2,
                "screen_pks": [
                    9589,
                    9588
                ],
                "defFreq": 24,
                "minFreq": 24
            },
            "resultsFallingOperatingProfit": {
                "count": 0,
                "screen_pks": [
                    15543
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "priceCrossedOverEMA": {
                "count": 0,
                "screen_pks": [
                    35316,
                    35319,
                    35321,
                    35323,
                    35324,
                    35325,
                    35326,
                    35327
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "priceBreakout": {
                "count": 1,
                "screen_pks": [
                    24728,
                    24729,
                    24730
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "priceCrossedBelowEMA": {
                "count": 0,
                "screen_pks": [
                    35336,
                    35337,
                    35338,
                    35340,
                    35341,
                    35342,
                    35343,
                    35344
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "priceBreakdown": {
                "count": 2,
                "screen_pks": [
                    24733,
                    24732,
                    24731
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "insiderSastBuys": {
                "count": 2,
                "screen_pks": [
                    41532,
                    19895,
                    19890,
                    19889
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "priceChange": {
                "count": 4,
                "screen_pks": [
                    40448,
                    40449,
                    40451,
                    40450
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "goldenDeathCrossover": {
                "count": 1,
                "screen_pks": [
                    35318,
                    45188
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "volume": {
                "count": 3,
                "screen_pks": [
                    25867,
                    23584,
                    25859
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "upcomingResultsRisingShare": {
                "count": 0,
                "screen_pks": [
                    15697,
                    18910,
                    48091
                ],
                "defFreq": 24,
                "minFreq": 24
            },
            "momentum": {
                "count": 1,
                "screen_pks": [
                    6160,
                    3057
                ],
                "defFreq": 24,
                "minFreq": 24
            },
            "priceCrossedOverSMA": {
                "count": 1,
                "screen_pks": [
                    35308,
                    35309,
                    35310,
                    35312,
                    35313,
                    35314,
                    35315,
                    35317
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "strongDvm": {
                "count": 1,
                "screen_pks": [
                    19261,
                    9818
                ],
                "defFreq": 24,
                "minFreq": 24
            },
            "priceCrossHighLow": {
                "count": 8,
                "screen_pks": [
                    40457,
                    25866,
                    40455,
                    40458,
                    25865,
                    40456,
                    25863,
                    25862
                ],
                "defFreq": 32,
                "minFreq": 32
            },
            "corp_dividend": {
                "count": 1,
                "screen_pks": [
                    45882,
                    45884
                ],
                "defFreq": 24,
                "minFreq": 24
            },
            "insiderSastSells": {
                "count": 1,
                "screen_pks": [
                    41533,
                    20078,
                    19892,
                    19891
                ],
                "defFreq": 24,
                "minFreq": 48
            },
            "priceCrossedBelowSMA": {
                "count": 0,
                "screen_pks": [
                    35328,
                    35329,
                    35330,
                    35331,
                    35332,
                    35333,
                    35334,
                    35335
                ],
                "defFreq": 48,
                "minFreq": 48
            },
            "resultsRisingOperatingProfit": {
                "count": 0,
                "screen_pks": [
                    45237
                ],
                "defFreq": 48,
                "minFreq": 48
            }
        }
    },
    "activeAlerts": [
        40448,
        40449,
        40450,
        40451,
        40457,
        25862,
        25863,
        40456,
        25865,
        25866,
        25867,
        6160,
        25859,
        24730,
        24731,
        24733,
        23584,
        40455,
        22709,
        19895,
        45882,
        41532,
        40458,
        9818,
        36832,
        20078,
        35312,
        9588,
        9589,
        35318
    ],
    "CATEGORY_SCREENERS": [
        {
            "module_heading": "Price",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-price-alert.png",
            "description": "Price changes, highs and lows.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceChange",
                    "level2_objs": [
                        [
                            {
                                "pk": 40448,
                                "title": "> 5%"
                            },
                            {
                                "pk": 40449,
                                "title": "> 10%"
                            }
                        ],
                        [
                            {
                                "pk": 40451,
                                "title": "<-5%"
                            },
                            {
                                "pk": 40450,
                                "title": "<-10%"
                            }
                        ]
                    ],
                    "title": "Daily price change %"
                },
                {
                    "frequency": 32,
                    "max_frequency": 24,
                    "id": "priceCrossHighLow",
                    "level2_objs": [
                        [
                            {
                                "pk": 40457,
                                "title": "Week highs"
                            },
                            {
                                "pk": 25866,
                                "title": "52 week highs"
                            },
                            {
                                "pk": 40455,
                                "title": "10 Yr highs"
                            }
                        ],
                        [
                            {
                                "pk": 40458,
                                "title": "Week lows"
                            },
                            {
                                "pk": 25865,
                                "title": "52 week lows"
                            },
                            {
                                "pk": 40456,
                                "title": "10 Yr lows"
                            }
                        ],
                        [
                            {
                                "pk": 25863,
                                "title": "Near 52 week high"
                            },
                            {
                                "pk": 25862,
                                "title": "Near 52 week low"
                            }
                        ]
                    ],
                    "title": "Price crossing highs and lows"
                }
            ],
            "module_slug": "price"
        },
        {
            "module_heading": "Moving Averages",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-growth.png",
            "description": "Golden/Death crosses, SMA/EMA crossovers.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "goldenDeathCrossover",
                    "level2_objs": [
                        [
                            {
                                "pk": 35318,
                                "title": "Golden crossover"
                            },
                            {
                                "pk": 45188,
                                "title": "Death crossover"
                            }
                        ]
                    ],
                    "title": "Golden/ Death crossovers"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceCrossedOverSMA",
                    "level2_objs": [
                        [
                            {
                                "pk": 35308,
                                "title": "5"
                            },
                            {
                                "pk": 35309,
                                "title": "10"
                            },
                            {
                                "pk": 35310,
                                "title": "20"
                            },
                            {
                                "pk": 35312,
                                "title": "30"
                            },
                            {
                                "pk": 35313,
                                "title": "50"
                            },
                            {
                                "pk": 35314,
                                "title": "100"
                            },
                            {
                                "pk": 35315,
                                "title": "150"
                            },
                            {
                                "pk": 35317,
                                "title": "200"
                            }
                        ]
                    ],
                    "title": "Price crossing above SMA"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceCrossedOverEMA",
                    "level2_objs": [
                        [
                            {
                                "pk": 35316,
                                "title": "5"
                            },
                            {
                                "pk": 35319,
                                "title": "10"
                            },
                            {
                                "pk": 35321,
                                "title": "12"
                            },
                            {
                                "pk": 35323,
                                "title": "20"
                            },
                            {
                                "pk": 35324,
                                "title": "26"
                            },
                            {
                                "pk": 35325,
                                "title": "50"
                            },
                            {
                                "pk": 35326,
                                "title": "100"
                            },
                            {
                                "pk": 35327,
                                "title": "200"
                            }
                        ]
                    ],
                    "title": "Price crossing above EMA"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceCrossedBelowSMA",
                    "level2_objs": [
                        [
                            {
                                "pk": 35328,
                                "title": "5"
                            },
                            {
                                "pk": 35329,
                                "title": "10"
                            },
                            {
                                "pk": 35330,
                                "title": "20"
                            },
                            {
                                "pk": 35331,
                                "title": "30"
                            },
                            {
                                "pk": 35332,
                                "title": "50"
                            },
                            {
                                "pk": 35333,
                                "title": "100"
                            },
                            {
                                "pk": 35334,
                                "title": "150"
                            },
                            {
                                "pk": 35335,
                                "title": "200"
                            }
                        ]
                    ],
                    "title": "Price crossing below SMA"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "pricepriceCrossedBelowEMA",
                    "level2_objs": [
                        [
                            {
                                "pk": 35336,
                                "title": "5"
                            },
                            {
                                "pk": 35337,
                                "title": "10"
                            },
                            {
                                "pk": 35338,
                                "title": "12"
                            },
                            {
                                "pk": 35340,
                                "title": "20"
                            },
                            {
                                "pk": 35341,
                                "title": "26"
                            },
                            {
                                "pk": 35342,
                                "title": "50"
                            },
                            {
                                "pk": 35343,
                                "title": "100"
                            },
                            {
                                "pk": 35344,
                                "title": "200"
                            }
                        ]
                    ],
                    "title": "Price crossing below EMA"
                }
            ],
            "module_slug": "moving_averages"
        },
        {
            "module_heading": "Volume and Delivery",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-high-volume.png",
            "description": "Volume shockers, Delivery changes.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "volume",
                    "level2_objs": [
                        [
                            {
                                "pk": 25867,
                                "title": "Volume shockers"
                            }
                        ],
                        [
                            {
                                "pk": 23584,
                                "title": "High volume, top gainers"
                            },
                            {
                                "pk": 25859,
                                "title": "High volume, top losers"
                            }
                        ]
                    ],
                    "title": "High volumes"
                },
                {
                    "frequency": 24,
                    "max_frequency": 24,
                    "id": "delivery",
                    "level2_objs": [
                        [
                            {
                                "pk": 9589,
                                "title": "Rising delivery %"
                            }
                        ],
                        [
                            {
                                "pk": 9588,
                                "title": "High delivery%"
                            }
                        ]
                    ],
                    "title": "High delivery"
                }
            ],
            "module_slug": "volume_and_delivery"
        },
        {
            "module_heading": "Breakouts/Breakdowns past Resistance and Support",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-break.png",
            "description": "Price breakouts and breakdowns past resistances and supports.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceBreakout",
                    "level2_objs": [
                        [
                            {
                                "pk": 24728,
                                "title": "LTP > R1"
                            },
                            {
                                "pk": 24729,
                                "title": "LTP > R2"
                            },
                            {
                                "pk": 24730,
                                "title": "LTP > R3"
                            }
                        ]
                    ],
                    "title": "Price breakout"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "priceBreakdown",
                    "level2_objs": [
                        [
                            {
                                "pk": 24733,
                                "title": "LTP < S1"
                            },
                            {
                                "pk": 24732,
                                "title": "LTP < S2"
                            },
                            {
                                "pk": 24731,
                                "title": "LTP < S3"
                            }
                        ]
                    ],
                    "title": "Price breakdown"
                }
            ],
            "module_slug": "breakouts_past_resistance_and_support"
        },
        {
            "module_heading": "Upcoming and Live Results",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-live.png",
            "description": "Results as they are declared, with profit, revenue and price filters.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "resultsRisingProfitRevenue",
                    "level2_objs": [
                        [
                            {
                                "pk": 22709,
                                "title": "Today"
                            }
                        ]
                    ],
                    "title": "Results declared with rising net profit and revenue"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "resultsRisingOperatingProfit",
                    "level2_objs": [
                        [
                            {
                                "pk": 45237,
                                "title": "Today"
                            }
                        ]
                    ],
                    "title": "Results declared today"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "resultsFallingOperatingProfit",
                    "level2_objs": [
                        [
                            {
                                "pk": 15543,
                                "title": "Today"
                            }
                        ]
                    ],
                    "title": "Results declared with net profit falling YoY OR QoQ"
                },
                {
                    "frequency": 24,
                    "max_frequency": 24,
                    "id": "upcomingResultsRisingShare",
                    "level2_objs": [
                        [
                            {
                                "pk": 15697,
                                "title": "Upcoming results, rising share price"
                            },
                            {
                                "pk": 18910,
                                "title": "Upcoming results, declining share price"
                            },
                            {
                                "pk": 48091,
                                "title": "Upcoming results, rising delivery volumes"
                            }
                        ]
                    ],
                    "title": "Upcoming results"
                }
            ],
            "module_slug": "results_as_they_happen"
        },
        {
            "module_heading": "Corporate Actions",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-business-deal.png",
            "description": "Upcoming dividends, bonus and splits.",
            "level1_objs": [
                {
                    "frequency": 24,
                    "max_frequency": 24,
                    "id": "corp_dividend",
                    "level2_objs": [
                        [
                            {
                                "pk": 45882,
                                "title": "Upcoming Dividend"
                            },
                            {
                                "pk": 45884,
                                "title": "Upcoming Bonus and Split"
                            }
                        ]
                    ],
                    "title": "Upcoming Corporate Actions"
                }
            ],
            "module_slug": "corp_announce"
        },
        {
            "module_heading": "Big Deals: Insider/SAST Trades",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-insider-trade.png",
            "description": "Insider/SAST buys and sells.",
            "level1_objs": [
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "insiderSastBuys",
                    "level2_objs": [
                        [
                            {
                                "pk": 41532,
                                "title": ">1% of total shares today"
                            },
                            {
                                "pk": 19895,
                                "title": ">1% of total shares yesterday"
                            },
                            {
                                "pk": 19890,
                                "title": ">1% of total shares last week"
                            },
                            {
                                "pk": 19889,
                                "title": ">1% of total shares last month"
                            }
                        ]
                    ],
                    "title": "Insider/SAST buys"
                },
                {
                    "frequency": 48,
                    "max_frequency": 24,
                    "id": "insiderSastSells",
                    "level2_objs": [
                        [
                            {
                                "pk": 41533,
                                "title": ">1% of total shares today"
                            },
                            {
                                "pk": 20078,
                                "title": ">1% of total shares yesterday"
                            },
                            {
                                "pk": 19892,
                                "title": ">1% of total shares last week"
                            },
                            {
                                "pk": 19891,
                                "title": ">1% of total shares last month"
                            }
                        ]
                    ],
                    "title": "Insider/SAST sells"
                }
            ],
            "module_slug": "big_insider_sast_trades"
        },
        {
            "module_heading": "High DVM Scoring Stocks",
            "mapp_imgsrc": "https://cdn-static.trendlyne.com/static/mobile/alphaalerts/v2/icons-dvm.png",
            "description": "Stocks gaining on DVM scores.",
            "level1_objs": [
                {
                    "frequency": 24,
                    "max_frequency": 24,
                    "id": "strongDvm",
                    "level2_objs": [
                        [
                            {
                                "pk": 19261,
                                "title": "High performing DVM select stocks"
                            },
                            {
                                "pk": 9818,
                                "title": "High durability crossover"
                            }
                        ]
                    ],
                    "title": "Strong DVM stocks"
                },
                {
                    "frequency": 24,
                    "max_frequency": 24,
                    "id": "momentum",
                    "level2_objs": [
                        [
                            {
                                "pk": 6160,
                                "title": "Rising momentum"
                            },
                            {
                                "pk": 3057,
                                "title": "High momentum"
                            }
                        ]
                    ],
                    "title": "Momentum stocks"
                }
            ],
            "module_slug": "High_dvm_scoring_stocks"
        }
    ],
    "MIN_FREQ_ALLOWED": 48
};
