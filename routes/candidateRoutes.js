// const express = require("express");
// const router = express.Router();

// const User = require("../models/user");
// const { jwtAuthMiddleware, generateToken } = require("../jwt");
// const Candidate = require("../models/candidate");

// const checkAdminRole = async (userID) => {
//   try {
//     const user = await User.findById(userID);
//     if (user.role === "admin") {
//       return true;
//     }
//   } catch (err) {
//     return false;
//   }
// };

// // POST route to add a person
// router.post("/", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!(await checkAdminRole(req.user.id)))
//       return res.status(403).json({ message: "user does not have admin role" });

//     const data = req.body; // Assuming the request body contains the person data

//     // Create a new Person document using the Mongoose model
//     const newCandidate = new Candidate(data);

//     // Save the new person to the database
//     const response = await newCandidate.save();
//     console.log("data saved");
//     res.status(200).json({ response: response });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!checkAdminRole(req.user.id))
//       return res.status(403).json({ message: "user does not have admin role" });

//     const candidateID = req.params.candidateID;
//     const updateCandidateData = req.body;

//     const response = await Candidate.findByIdAndUpdate(
//       candidateID,
//       updateCandidateData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!response) {
//       return res.status(404).json({ error: "Candidate Notfound" });
//     }
//     console.log("candidate data updated");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete

// router.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!checkAdminRole(req.user.id))
//       return res.status(403).json({ message: "user does not have admin role" });

//     const candidateID = req.params.candidateID;

//     const response = await Candidate.findByIdAndDelete(candidateID);
//     if (!response) {
//       return res.status(404).json({ error: "Candidate Notfound" });
//     }
//     console.log("candidate deleted");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Lets start voting
// router.post("/vote/:candidateID", jwtAuthMiddleware, async (req, res) => {
//   // no admin can vote
//   // user can only bote once

//   candidateID = req.params.candidateID;
//   userId = req.user.id;

//   try {
//     // Find the candidate document with the specified candidateId
//     const candidate = await candidate.findById(candidateID);
//     if (!candidate) {
//       return res.status(404).json({ message: "Candidate not found" });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "user not found " });
//     }
//     if (user.isVoted) {
//       res.status(400).json({ message: "You have already voted" });
//     }
//     if (user.role == "admin") {
//       res.status(403).json({ message: "admin is  not allowed" });
//     }

//     // Update the Candidate document to record the vote

//     candidate.votes.push({ user: userId });
//     candidate.voteCount++;
//     await candidate.save();

//     // update the user document

//     user.isVoted = true;
//     await user.save();

//     res.status(200).json({ message: "Vote recorded successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Vote count

// router.get("/vote/count", async (req, res) => {
//   try {
//     // Find all the candidates and sort them by voteCount by descending order
//     const candidate = await Candidate.find().sort({ voteCount: "desc" });

//     // Map the candidates to only their name and voteCount

//     const voteRecord = candidate.map((data) => {
//       return {
//         party: data.party,
//         count: data.voteCount,
//       };
//     });

//     return res.status(200).json(voteRecord);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const Candidate = require("../models/candidate");

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (err) {
    return false;
  }
};

// POST route to add a person
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "User does not have admin role" });

    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new person to the database
    const response = await newCandidate.save();
    console.log("Data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id))
      return res.status(403).json({ message: "User does not have admin role" });

    const candidateID = req.params.candidateID;
    const updateCandidateData = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updateCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Candidate data updated");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete
router.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id))
      return res.status(403).json({ message: "User does not have admin role" });

    const candidateID = req.params.candidateID;

    const response = await Candidate.findByIdAndDelete(candidateID);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Candidate deleted");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Vote
router.post("/vote/:candidateID", jwtAuthMiddleware, async (req, res) => {
  // No admin can vote
  // User can only vote once

  const candidateID = req.params.candidateID;
  const userId = req.user.id;

  try {
    // Find the candidate document with the specified candidateId
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin is not allowed to vote" });
    }

    // Update the Candidate document to record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Update the user document to mark as voted
    user.isVoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Vote count
router.get("/vote/count", async (req, res) => {
  try {
    // Find all the candidates and sort them by voteCount by descending order
    const candidates = await Candidate.find().sort({ voteCount: "desc" });

    // Map the candidates to only their name and voteCount
    const voteRecord = candidates.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
