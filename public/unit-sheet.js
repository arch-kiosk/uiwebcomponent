ui_schema = {
    "header": {
        "version": 1
    },
    "meta": {
        "scenario": "query input"
    },
    "dsd": {
        "arch_context": [
            "datatype(VARCHAR)",
            "identifier()",
            "label(\"unit\")"
        ],
        "arch_domain": [
            "datatype(VARCHAR)",
            "id_domain(\"arch_context\")",
            "label(\"domain\")"
        ],
        "coordinates": [
            "datatype(VARCHAR)"
        ],
        "created": [
            "datatype(TIMESTAMP)",
            "replfield_created()"
        ],
        "excavator_full_name": [
            "datatype(VARCHAR)"
        ],
        "id": [
            "datatype(NUMBER)",
            "local_id(\"arch_context\")"
        ],
        "id_excavator": [
            "datatype(VARCHAR)"
        ],
        "id_site": [
            "datatype(VARCHAR)",
            "join(\"site\",\"id\")"
        ],
        "identification_method_analysis": [
            "datatype(VARCHAR)"
        ],
        "identification_method_cm": [
            "datatype(VARCHAR)"
        ],
        "identification_method_loci": [
            "datatype(VARCHAR)"
        ],
        "legacy_unit_id": [
            "datatype(VARCHAR)"
        ],
        "method": [
            "datatype(VARCHAR)"
        ],
        "modified": [
            "datatype(TIMESTAMP)",
            "replfield_modified()"
        ],
        "modified_by": [
            "datatype(VARCHAR)",
            "replfield_modified_by()",
            "default(null)"
        ],
        "name": [
            "datatype(VARCHAR)"
        ],
        "purpose": [
            "datatype(VARCHAR)"
        ],
        "spider_counter": [
            "datatype(NUMBER)"
        ],
        "term_for_locus": [
            "datatype(VARCHAR)"
        ],
        "term_for_unit": [
            "datatype(VARCHAR)"
        ],
        "type": [
            "datatype(VARCHAR)"
        ],
        "uid": [
            "datatype(UUID)",
            "replfield_uuid()"
        ],
        "unit_creation_date": [
            "datatype(DATE)"
        ]
    },
    "layout_settings": {
        "orchestration_strategy": "columns",
        readonly: true,
        order: ["id_site","arch_context", "line", "legacy_unit_id", "..."],
        default_element_visibility: "."
    },
    ui_elements: {
        "line": {
            "layout": {
                min_width: "max"
            },
            "element_type": {
                name: "line",
                "transparent": false
            }
        },
        "arch_context": {
            "element_type": {
                "isIdentifier": "True",
                "items": {
                    "key": "arch_context",
                    "lookup_type": "table",
                    "selection": [
                        "arch_context"
                    ],
                    "topic": "unit"
                },
                "name": "selection",
                "text": "#(unit/term_for_unit)",
                "value": "#(unit/arch_context)"
            }
        },
        "arch_domain": {
            "element_type": {
                "name": "TextField",
                "text": "",
                "value": "#(unit/arch_domain)"
            }
        },
        "coordinates": {
            "element_type": {
                "name": "TemplateLabel",
                "text": "coordinates",
                "value": "#(unit/coordinates)"
            }
        },
        "created": {
            "element_type": {
                "name": "DateTimeField",
                "text": "created",
                "value": null
            }
        },
        "excavator_full_name": {
            "element_type": {
                "name": "TextField",
                "text": "excavator_full_name",
                "value": "#(unit/excavator_full_name)",
                "visible": "."
            }
        },
        "id": {
            "element_type": {
                "format": "FLOAT",
                "name": "TextField",
                "text": "id",
                "value": "#(unit/id)"
            }
        },
        "id_excavator": {
            "element_type": {
                "name": "TextField",
                "text": "id_excavator",
                "value": "#(unit/id_excavator)"
            }
        },
        "id_site": {
            "element_type": {
                "name": "TextField",
                "text": "id_site",
                "value": "#(unit/id_site)"
            }
        },
        "identification_method_analysis": {
            "element_type": {
                "name": "TextField",
                "text": "identification_method_analysis",
                "value": "#(unit/identification_method_analysis)"
            }
        },
        "identification_method_cm": {
            "element_type": {
                "name": "TextField",
                "text": "identification_method_cm",
                "value": "#(unit/identification_method_cm)"
            }
        },
        "identification_method_loci": {
            "element_type": {
                "name": "TextField",
                "text": "identification_method_loci",
                "value": "#(unit/identification_method_loci)"
            }
        },
        "legacy_unit_id": {
            "element_type": {
                "name": "TextField",
                "text": "legacy_unit_id",
                "value": "#(unit/legacy_unit_id)"
            }
        },
        "method": {
            "element_type": {
                "name": "TextField",
                "text": "method",
                "value": "#(unit/method)"
            }
        },
        "modified": {
            "element_type": {
                "name": "DateTimeField",
                "text": "modified",
                "value": "#(unit/modified)",
                "visible": "."
            }
        },
        "modified_by": {
            "element_type": {
                "name": "TextField",
                "text": "modified_by",
                "value": "#(unit/modified_by)",
                "visible": "#(unit/modified)"

            }
        },
        "name": {
            "element_type": {
                "name": "TextField",
                "text": "name",
                "value": "#(unit/name)"
            }
        },
        "purpose": {
            "element_type": {
                "multiline": "True",
                "name": "TextField",
                "text": "purpose",
                "value": "#(unit/purpose)"
            },
            "layout": {
                "min_width": "max"
            }
        },
        "spider_counter": {
            "element_type": {
                "format": "FLOAT",
                "name": "TextField",
                "text": "spider_counter",
                "value": "#(unit/spider_counter)"
            }
        },
        "term_for_locus": {
            "element_type": {
                "name": "TextField",
                "text": "term_for_locus",
                "value": "#(unit/term_for_locus)"
            }
        },
        "term_for_unit": {
            "element_type": {
                "name": "TextField",
                "text": "term_for_unit",
                "value": "#(unit/term_for_unit)"
            }
        },
        "type": {
            "element_type": {
                "name": "TextField",
                "text": "type",
                "value": "#(unit/type)"
            }
        },
        "uid": {
            "element_type": {
                "name": "TextField",
                "text": "uid",
                "value": "#(unit/uid)",
                "visible" : "."
            }
        },
        "unit_creation_date": {
            "element_type": {
                include_time: false,
                date_format: "latin",
                "name": "DateTimeField",
                "text": "unit_creation_date",
                "value": "#(unit/unit_creation_date)"
            }
        }
    },
}
