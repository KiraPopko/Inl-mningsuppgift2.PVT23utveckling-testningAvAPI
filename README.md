Betyg. Om det finns minst någon chance jag vill ha G.

1. API configuration:

   *download repository with name: Inl-mningsuppgift2.PVT23utveckling-testningAvAPI to the local machine and open in VSC
   *log in to MongooseDB and open MongoDB atlas
   *in file server.js add proper username and password that can be found in Security-> quick start mongoDB.com
   * start your server 
   * in file seedDB.js should be chosen amount of new users
   * check the url http://localhost:3000/api/users in the browser (database should be available on the page)
      and in postman by using GET request (status should be 200 and database should be available in the body request) to see that connection established and database is awailable.

2. Requests
   *GET request http://localhost:3000/api/users - to see all users
                http://localhost:3000/api/users/:id - to find specila user/object
   
   *POST request-  http://localhost:3000/api/users, in the body use correct object structure add new user information.
    after pressing SEND in request body new user with new ID should be available. Status code 2001

   *PUT request http://localhost:3000/api/users/:id, in the body change needed information for the user, press SEND.
     In request body should be available updated user. Status code 200

   *DElETE request- http://localhost:3000/api/users/:id, choose user that should be deleted (by ID), press SEND.
    user is not available in request body. starus code 200


   3. In all requests status code was checked:
      pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
      pm.response.to.have.status("OK");
     });
  all other tests with description are available in documentation.
    
