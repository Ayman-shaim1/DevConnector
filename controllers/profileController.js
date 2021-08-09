import asyncHandler from "express-async-handler";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import config from "config";
import Request from "Request";

// @desc    Get current user profile
// @route   GET /api/profiles/me
// @access  Private
export const getCurrentProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) {
    res.status(404);
    throw new Error("There is no profile for this user");
  } else {
    res.json(profile);
  }
});

// @desc    Create or update user profile
// @route   POST /api/profiles
// @access  Private
export const createUpdateUserProfile = asyncHandler(async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // build profile object :
  const profileFields = {};
  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (company) profileFields.company = company;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (location) profileFields.location = location;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    // update :
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(profile);
  } else {
    // create :
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  }
});

// @desc   Get all profiles
// @route   GET /api/profiles
// @access  Public
export const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  res.json(profiles);
});

// @desc   Get profile by user ID
// @route   GET /api/profiles/:id
// @access  Public
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error("Profile not found !");
  }
});

// @desc     Delete profile, user & posts
// @route    DELETE /api/profiles
// @access   Private
export const deleteUserProfile = asyncHandler(async (req, res) => {
  //Remove user posts :
  await Post.deleteMany({ user: req.user.id });
  //Remove profile :
  await Profile.findOneAndDelete({ user: req.user.id });
  //Remove User :
  await User.findOneAndDelete({ _id: req.user.id });

  res.json({
    msg: "User deleted",
  });
});

// @desc     Add profile experience
// @route    PUT /api/profiles/experience
// @access   Private
export const addExperienceToProfile = asyncHandler(async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  const profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } else {
    res.status(404);
    throw new Error("profile not found !");
  }
});

// @desc     Delete experience from profile
// @route    DELETE /api/profiles/experience/:exp_id
// @access   Private
export const deleteExpereiceFromProfile = asyncHandler(async (req, res) => {
  const exp_id = req.params.exp_id;
  const profile = await Profile.findOne({
    user: req.user.id,
  });
  if (profile) {
    // Get remove index :
    const indexArray = profile.experience.map((item) => item._id);
    const removeIndex = indexArray.indexOf(exp_id);

    if (removeIndex !== -1) {
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } else {
      res.status(404);
      throw new Error("Experience not found !");
    }
  } else {
    res.status(404);
    throw new Error("Profile not found !");
  }
});

// @desc     Add profile Education
// @route    PUT /api/profiles/education
// @access   Private
export const addEducationToProfile = asyncHandler(async (req, res) => {
  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } else {
    res.status(404);
    throw new Error("profile not found !");
  }
});

// @desc     Delete education from profile
// @route    DELETE /api/profiles/education/:edu_id
// @access   Private
export const deleteEducationFromProfile = asyncHandler(async (req, res) => {
  const edu_id = req.params.edu_id;
  const profile = await Profile.findOne({
    user: req.user.id,
  });
  if (profile) {
    // Get remove index :
    const indexArray = profile.education.map((item) => item._id);
    const removeIndex = indexArray.indexOf(edu_id);
    if (removeIndex !== -1) {
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } else {
      res.status(404);
      throw new Error("Education not found !");
    }
  } else {
    res.status(404);
    throw new Error("Profile not found !");
  }
});

// @desc     Get user repos from github
// @route    GET /api/profiles/github/:username
// @access   Public
export const getUserRepo = asyncHandler(async (req, res) => {
  const githubClientId = config.get("githubClientId");
  const githubSecret = config.get("githubSecret");
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&clientId=${githubClientId}&client_secret=${githubSecret}`,
    method: "GET",
    headers: {
      "user-agent": "node.js",
    },
  };
  Request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    }

    if (response.statusCode === 404) {
      console.error(error);
      res.status(response.statusCode);
      res.json({ message: "No github profile found" });
    } else {
      res.json(JSON.parse(body));
    }
  });
});
