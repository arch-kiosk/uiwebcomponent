ui_schema = {
    "header": {
        "version": 1
    },
    "meta": {
        "scenario": "query input"
    },
    "dsd": {
        "context_id": [
            "datatype(varchar), identifier()"
        ],
        "text_filter": [
            "datatype(varchar)"
        ],
        "modified": [
            "datatype(datetime)"
        ]
    },
    "layout_settings": {
        "orchestration_strategy": "stack",
    },
    "ui_elements": {
        "0": {
            "element_type": {
                "name": "layout",
                "layout": {
                    "padding": {
                        "top": ".5em",
                        "right": ".5em",
                        "bottom": "1em",
                        "left": ".5em",
                    }
                },
                "layout_settings": {
                    "orchestration_strategy": "columns",
                },
                "ui_elements": {
                    "1": {
                        "binding": {
                            "field_name": "context_id"
                        },
                        "layout": {
                            "min_width": "2",
                        },
                        "element_type": {
                            "name": "Selection",
                            "text": "context-id",
                            "is_identifier": true,
                            "items": {
                                "topic": "my topic"
                            }
                        }
                    },
                    "2": {
                        "binding": {
                            "field_name": "text_filter"
                        },
                        "layout": {
                            "min_width": "max"
                        },
                        "element_type": {
                            "name": "TextField",
                            "text": "text_filter"
                        }
                    },
                    "3": {
                        "binding": {
                            "field_name": "modified"
                        },
                        "layout": {
                            "min_width": 2
                        },
                        "element_type": {
                            "name": "DateField",
                            "text": "date field"
                        },
                    },
                    "4": {
                        "binding": {
                            "field_name": "modified"
                        },
                        "layout": {
                            "min_width": 2
                        },
                        "element_type": {
                            "name": "DateTimeField",
                            "text": "date time field"
                        },
                    },
                }
            }
        },
        "1": {
            "element_type": {
                "name": "line",
                "padding": 0
            }
        },
        "4": {
            "element_type": {
                "name": "layout",
                "layout": {
                  "padding": ".5em"
                },
                "layout_settings": {
                    "orchestration_strategy": "RightAlign",
                },
                "ui_elements": {
                    "5": {
                        "element_type": {
                            "name": "Button",
                            "type": "cancelButton"
                        }
                    },
                    "6": {
                        "element_type": {
                            "name": "Button",
                            "type": "okButton"
                        }
                    }
                }
            }
        }
    }
}
