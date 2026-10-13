const express = require("express");
const Enquiry = require("../models/Enquiry");
const auth = require("../middleware/auth");

const router = express.Router();

// Public enquiry form submission
router.post("/public", async (req, res) => {
  try {
    const { name, email, courseInterest, phone } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: "Name, email, and courseInterest are required." });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      phone,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, courseInterest, phone } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: "Name, email, and courseInterest are required." });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      phone,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch unclaimed/public leads (Protected: CRM employees/counselors only)
router.get("/unclaimed", auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ isClaimed: false }).sort({ createdAt: -1 });
    res.status(200).json({
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/public", auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ isClaimed: false }).sort({ createdAt: -1 });
    res.status(200).json({
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Claim a lead (Protected: logged-in counselor)
const claimLeadHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    if (enquiry.isClaimed) {
      return res.status(400).json({ message: "This lead has already been claimed." });
    }

    enquiry.isClaimed = true;
    enquiry.claimedBy = req.user._id;
    enquiry.claimedAt = new Date();
    await enquiry.save();

    res.status(200).json({
      message: "Lead claimed successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

router.patch("/:id/claim", auth, claimLeadHandler);
router.post("/:id/claim", auth, claimLeadHandler);

// Fetch leads claimed by logged-in user (Protected: logged-in counselor)
const getMyClaimedLeads = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: req.user._id })
      .populate("claimedBy", "name email")
      .sort({ claimedAt: -1 });

    res.status(200).json({
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

router.get("/claimed", auth, getMyClaimedLeads);
router.get("/my-leads", auth, getMyClaimedLeads);

module.exports = router;
