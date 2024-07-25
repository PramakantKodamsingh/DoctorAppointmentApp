EXAMPLE WORKFLOW:

CLIENT SENDS REQUEST:

The client includes the JWT in the Authorization header of the request (e.g., Authorization: Bearer <token>).

SERVER MIDDLEWARE:

The middleware extracts and decodes the token.
It verifies the token to ensure it is valid and not tampered with.
It checks the token's expiration.
It extracts the user ID and potentially other claims from the token.

USER IDENTIFICATION:

The decoded token provides the user ID, which can be used to fetch user-specific data or check user permissions.

CONTROL FLOW:

If the token is valid, the middleware attaches user information to the request object and calls next() to pass control to the next middleware or route handler.
If the token is invalid, the middleware sends an appropriate error response (e.g., 401 Unauthorized).

DOUBLE CURLY BRAICES:- in style={{ Cursor: "pointer" }}
The outer { } is used to indicate that you are embedding a JavaScript expression within the JSX.
The inner { } is the actual JavaScript object representing the CSS styles.
