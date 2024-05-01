
const express = require('express');
const router = express.Router();
const Child = require('../models/Child'); 
const authenticate = require('../middleware/authenticate'); 

router.post('/add_child',authenticate, async (req, res) => {
    try {
        const { childFullName, childGender, childBirthdate, childAge, country, state, district, childWeight, childHeight ,blood_group} = req.body;

        const newChild = new Child({
            userId: req.userId, 
            fullName: childFullName,
            gender: childGender,
            birthdate: childBirthdate,
            age: childAge,
            location: {
                country,
                state,
                district
            },
            weight: childWeight,
            height: childHeight,
            blood_group:blood_group
        });

        await newChild.save();

        res.status(201).json({ message: 'Child details added successfully', child: newChild });
    } catch (error) {
        // Handle errors
        console.error('Error adding child details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get("/get_child_names", authenticate, async (req, res) => {
    try {
      const children = await Child.find({ userId: req.userId });
  
      const childNames = children.map(child => child.fullName);
        console.log(childNames)
      res.status(200).json({ childNames });
    } catch (error) {
      console.error("Error fetching child names:", error);
      res.status(500).json({ message: "Failed to fetch child names" });
    }
  });
// Export the router
module.exports = router;
