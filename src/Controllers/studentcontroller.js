const StudentUser = require("../models/user"); // Assuming your model is named 'student'
const jwt = require("jsonwebtoken");
const {isAdmin}=require("../Middlewares");
var bcrypt = require("bcryptjs"); 
exports.GetRecord = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1 if not provided
        const limit = parseInt(req.query.limit) || 3; // Get the limit from query parameters, default to 3 if not provided

        // Calculate the number of documents to skip based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database with skip and limit
        const student = await StudentUser.find({}).sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get the total count of documents in the collection
        const totalCount = await StudentUser.countDocuments();

        res.status(200).json({
            student,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit), // Calculate total pages
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getStudentById = async(req,res)=>{
    try{
        const id = req.params.id;
        const prod = await StudentUser.findById(id);
        res.status(200).json(prod);
    }catch(error){
        res.status(500).json({message:error.message})

    }
}

//only admin can delete 
exports.deleteStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStudent = await StudentUser.findByIdAndDelete(id); // Use the Student model to find and remove the student
                if (!deletedStudent) {
                    return res.status(404).json({ message: "Student not found" }); // If student with given ID doesn't exist, return 404
                }
                res.status(200).json({ message: "Delete Successful", deletedStudent });
        // Use isAdmin middleware to check if user is admin
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateStudent=async(req,res)=>{
    try {
        const {id} = req.params;
        const student = await StudentUser.findByIdAndUpdate(id,req.body);
        if(!student){
            return res.status(404).json({message: `Cannot find product with id ${id}`})
        }
        else{
            res.status(200).json("Successfullu Updated!!");
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


exports.addStudent = async(req,res) => {
    try{
 
  //const _user = new User(req.body);
  const _user = new StudentUser({   //schema m value store ho rha h req.body vala
    name: req.body.name,
    PhoneNo:req.body.PhoneNo,
    email: req.body.email,
    
    password: bcrypt.hashSync(req.body.password, 8)   //bcrypt module h humara  hashsync  method jo password ko encrypt kr rha h  secuire kitne  round sequre krna h  
  });
        const student = await StudentUser.create(_user)
        res.status(200).json("Added Successfully");
       // res.status(200).json(product);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
}