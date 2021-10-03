
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("delete_button").addEventListener("click", deleteData);
    document.getElementById("put_button").addEventListener("click", putData);

    // attach handler to handle the form 'submit' event. We will fetch the API instead
    // of sending the form with the regular SUBMIT action
    document.getElementById("theform").addEventListener("submit", postData);
});

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    // DELETE request
    // the function that triggers an Ajax call to the REST API: http DELETE item 123
    function deleteData() {
        fetch('/api/resources/123', {method: 'DELETE'})
            .then(status)
            .then((response)=> {return response.json()})
            .then(function(response) {
                console.log('Request succeeded with JSON response', response);

                // display the response : this is a demo!! no parsing
                document.querySelector("#data").innerHTML = "Response: " + response;

            }).catch(function(error) {
            console.log('Request failed', error);
        });

    };

    // PUT REQUEST
    // the function that triggers an Ajax call to the REST API: http PUT item 123
    function putData() {
        fetch('/api/resources/456',
            {
                    method: 'PUT',
                })
            .then(status)
            .then((response)=> {return response.json()})
            .then(function(response) {
                console.log('Request succeeded with JSON response', response);

                // display the response : this is a demo!! no parsing
                document.querySelector("#data").innerHTML = "Response: " + response;

            }).catch(function(error) {
            console.log('Request failed', error);
        });

    };

    // POST request - can send data in body of the request
    // the function that triggers an Ajax call to REST API: http POST item 123
    function postData(e) {
        // do not send the form to server - the form is now "Ajax-ified" (the ACTION attribute is irrelevant)
        e.preventDefault();
        // validation... we should check that the input text is not empty
        // then send an Ajax POST request to the API
        fetch('/api/resources',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // pass some params in body: the input value of the form
                body : JSON.stringify({prodname: document.getElementById("prodname").value.trim()})
                }
            )

            .then(status)
            .then((response)=> {return response.json()})
            .then(function(response) {
                console.log('Request succeeded with JSON response', JSON.stringify(response));

                // display the response : this is a demo!! no real parsing
                document.querySelector("#data").innerHTML = "Response: " + response.somefield;

            }).catch(function(error) {
            console.log('Request failed', error);
        });

    };

    // reset the result div to ""
    function resetData() {
        document.querySelector("#data").innerHTML = "";
    }