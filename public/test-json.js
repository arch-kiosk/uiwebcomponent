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
        "context_id_2": [
            "datatype(varchar), identifier()"
        ],
        "text_filter": [
            "datatype(varchar)"
        ],
        "modified": [
            "datatype(datetime)"
        ],
        "created": [
            "datatype(datetime)"
        ]

    },
    "layout_settings": {
        "orchestration_strategy": "stack",
    },
    "ui_elements": {
        "e0": {
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
                    "e0": {
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
                                "topic": "locus",
                                "selection": ['type'],
                                "key": "type"
                            }
                        }
                    },
                    "e1": {
                        "binding": {
                            "field_name": "context_id_2"
                        },
                        "layout": {
                            "min_width": "2",
                        },
                        "element_type": {
                            "name": "Selection",
                            "text": "context-id",
                            "is_identifier": true,
                            "items": {
                                "topic": "locus",
                                "selection": ['type'],
                                "key": "type"
                            }
                        }
                    },
                    "e2": {
                        "binding": {
                            "field_name": "text_filter"
                        },
                        "layout": {
                            "min_width": "max"
                        },
                        "element_type": {
                            "name": "TextField",
                            "value": "${e2}",
                            "text": "text_filter"
                        }
                    },
                    "e3": {
                        "binding": {
                            "field_name": "modified"
                        },
                        "layout": {
                            "min_width": 2
                        },
                        "element_type": {
                            "name": "DateField",
                            "text": "date field",
                            "value": "${e3}"
                        },
                    },
                    "e4": {
                        "binding": {
                            "field_name": "created"
                        },
                        "layout": {
                            "min_width": 2
                        },
                        "element_type": {
                            "name": "DateTimeField",
                            "text": "date time field",
                            "value": "${e4}"
                        },
                    },
                    "e5template": {
                        "layout": {
                            "min_width": 2
                        },
                        "element_type": {
                            "name": "TemplateLabel",
                            "value": "${e5TemplateLabel}",
                            "style": "light-background"
                        }
                    }
                }
            }
        },
        "e5": {
            "element_type": {
                "name": "line",
                "padding": 0
            }
        },
        "e6": {
            "element_type": {
                "name": "layout",
                "layout": {
                  "padding": ".5em"
                },
                "layout_settings": {
                    "orchestration_strategy": "RightAlign",
                },
                "ui_elements": {
                    "e7": {
                        "element_type": {
                            "name": "Button",
                            "type": "cancelButton"
                        }
                    },
                    "e8": {
                        "element_type": {
                            "name": "Button",
                            "type": "okButton"
                        }
                    },
                    "e9": {
                        "element_type": {
                            "name": "Button",
                            "type": "iconButton",
                            "icon": ""
                        }
                    }
                }
            }
        }
    }
}
