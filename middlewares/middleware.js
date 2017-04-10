

// Express Validator middleware

function reg_valid(req,res,next){

	req.checkBody({

		'fullname' : { 
						notEmpty : true, 
						isLength : {
							options : [{ min:5 , max : 25 }],
							errorMessage : "Fullname must be between 5 to 25 characters"
						},
						errorMessage: 'Fullname is required' 
					 },

		'username' : { 
						notEmpty : true, 
						isLength : {
							options : [{ min:5 , max : 12 }],
							errorMessage : "Username must be between 5 to 12 characters"
						},
						errorMessage: 'Username is required' 
					 },

		'email'    : { 
						notEmpty:true,
						isEmail : {
							errorMessage : 'Invalid Email Address'
						},
						errorMessage:'Email is required'  
					 },
		'password' : { 
						notEmpty : true, 
						isLength : {
							options : [{min:8}],
							errorMessage : "Password must be greater than 7 characters"
						},
						errorMessage: 'Password is required' 
					 },

		'confirm' : { 
						notEmpty : true, 
						errorMessage: 'Confirm Password is required' 
					 }
	});

	req.assert('confirm','Password not matced').equals(req.body.password); 
	req.checkBody('username','Username already exist').isExist_username();
	req.checkBody('email','Email already exist').isExist_email();

	req.asyncValidationErrors().then(function(){
			next();
	},function(errors){
		if(errors){
			res.send(errors[0]);
		}
	});

}

function login_valid(req,res,next){
	var data;

    if(req.body.email == ""){
         req.flash('error','Email address required.');
	     res.redirect('/');
    }else{
    
        req.checkBody('email','Email already exist').isExist_email();

        req.getValidationResult()
           .then(function(result){

              var error = result.array();
              var data;

	              if(error.length == 0){
	                req.flash('error','Credentials not matched');
	                res.redirect('/');
	              }else{
	              	next();
	              }
            });
      }
}


/*
* Exporting all the modules
*/

module.exports.reg_valid = reg_valid;
module.exports.login_valid = login_valid;
