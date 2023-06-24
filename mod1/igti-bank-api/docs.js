export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "IGTI Bank API description",
        "version": "1.0.0",
        "title": "IGTI Bank API"
    },
    "host": "http://localhost:3001/",
    "tags": [
        {
            "name": "account",
            "description": "Account Management"
        }
    ],
    "paths": {
        "/account": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Get existing accounts",
                "description": "Get all existing accoutns",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Account"
                            }
                        }
                    },
                    "500": {
                        "description": "Error occurred"
                    }
                }
            },
            "post": {
                "tags": [
                    "account"
                ],
                "summary": "Create a new account",
                "description": "Create a new account with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Error occurred"
                    }
                }
            }
        }
    },
    "definitions": {
        "Account": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "José Bezerra"
                },
                "balance": {
                    "type": "integer",
                    "example": 1234.56
                }
            }
        }
    }
}