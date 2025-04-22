import stringSimilarity from "string-similarity";
import {
  Specialite,
  Theme,
  Tag,
  Prerequisite,
  ThemeTag,
  ThemePrerequisite,
} from "../models/index.js";
import { Op } from "sequelize";

export const getAllThemesService = async (req, t) => {
  const user = req.user;
  const { annee, title, isValid, academicYear, createdByMe, specialiteName } =
    req.query;
  let where = {};
  let specialite;
  if (annee === null) {
    throw new Error("annee is required");
  }
  where.annee = annee;
  if (title !== null) {
    where.title = title;
  }
  if (academicYear !== null) {
    where.academicYear = academicYear;
  }
  if (specialiteName) {
    specialite = await Specialite.findOne({
      where: { name: specialiteName },
    });
    if (!specialite) {
      throw new Error("specialie  not found");
    }
    where.idSpecialite = specialite.id;
  }

  if (user.role === "admin" || user.role === "enseignant") {
    if (createdByMe) {
      where.idEnseignant = user.id;
    }
    const themes = await Theme.findAll({
      where: where,
      transaction: t,
    });
    const filteredThemes = themes.filter(
      (theme) => stringSimilarity.compareTwoStrings(theme.title, title) > 0.5
    );
    return filteredThemes;
  } else {
    if (isValid === false) {
      throw new Error("acces denied");
    }
    where.isValid = true;
    if (createdByMe) {
      if (user.role === "etudiant") {
        throw new Error("te3 wjhk tjib idee");
      }
      where.idEntreprise = user.id;
    }
    if (user.role === "etudiant" && annee !== user.annee) {
      throw new Error("acces denied");
    }
    const themes = await Theme.findAll({
      where: where,
      // hna tekmila te3 filtration bles tags
      attributes: { id },
      transaction: t,
    });
    const filteredThemes = themes.filter(
      (theme) => stringSimilarity.compareTwoStrings(theme.title, title) > 0.5
    );
    return filteredThemes;
  }
};

export const getThemeService = async (req) => {
  const id = req.params.id;
  const user = req.user;
  if (user.role === "admin" || user.role === "enseignant") {
    const theme = await Theme.find.One({ where: { id } });
    if (!theme) {
      throw new Error("theme not found");
    }
    return theme;
  } else {
    const theme = await Theme.findOne({ where: { id, isValid: true } });
    if (!theme) {
      throw new Error("Theme not found or not Valid");
    }
    return theme;
  }
};

export const createThemeService = async (req, t) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      tagsNames,
      specialiteName,
      annee,
      prerequisitesNames,
    } = req.body;
    let specialite;
    let themeData = {};
    if (!title || !description) {
      throw new Error("title and description are required");
    }
    if (user.role === "entreprise") {
      if (specialiteName || annee) {
        throw new Error("You are not allowed to add specialite name or annee");
      }
      themeData.idEntreprise = user.id;
    } else {
      if (specialiteName) {
        specialite = await Specialite.findOne({
          where: { name: specialiteName },
          transaction: t,
        });
        if (!specialite) {
          throw new Error("specialite not found");
        }
        themeData.idSpecialite = specialite.id;
        themeData.idEnseignant = user.id;
      }
    }
    // check if the tags exist
    const existingTags = await Tag.findAll({
      where: { name: { [Op.in]: tagsNames } },
      transaction: t,
    });

    const existingTagNames = existingTags.map((tag) => tag.name);
    const invalidTags = tagsNames.filter(
      (tag) => !existingTagNames.includes(tag)
    );

    if (invalidTags.length > 0) {
      throw new Error(`Some tags are invalid: ${invalidTags.join(", ")}`);
    }

    // check if prerequisites are valid
    const existingPrerequisites = await Prerequisite.findAll({
      where: { name: { [Op.in]: prerequisitesNames } },
      transaction: t,
    });
    const existingPrerequisitesNames = existingPrerequisites.map(
      (pre) => pre.name
    );
    const invalidPrerequisites = prerequisitesNames.filter((pre) => {
      !existingPrerequisitesNames.includes(pre);
    });

    if (invalidPrerequisites.length > 0) {
      throw new Error(
        `Some prerequisites are invalid: ${invalidPrerequisites.join(", ")}`
      );
    }
    // create the theme
    if (annee) {
      themeData.annee = annee;
    }
    const theme = await Theme.create({ ...themeData }, { transaction: t });
    // add the theme tags
    const themeTags = existingTags.map((tag) => {
      return { idTag: tag.id, idTheme: theme.id };
    });
    await ThemeTag.bulkCreate(themeTags, {
      validate: true,
      transaction: t,
    });

    const themePrerequisites = existingPrerequisites.map((prerequisite) => {
      return { idPrerequisite: prerequisite.id, idTheme: theme.id };
    });
    await ThemePrerequisite.bulkCreate(themePrerequisites, {
      validate: true,
      transaction: t,
    });

    return theme;
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

export const deleteThemeService = async (req) => {
  const { id } = req.params.id;
  const user = req.user;
  let deletedTheme;
  if (user.role === "enseignant") {
    deletedTheme = await Theme.destroy({
      where: { id, idEnseignant: user.id, isValid: false },
    });
  }
  if (user.role === "etnreprise") {
    deletedTheme = await Theme.destroy({
      where: { id, idEntreprise: user.id, isValid: false },
    });
  }
  if (deletedTheme === 0) {
    throw new Error("Theme not found or not Valid or not yours");
  }
  return true;
};

export const updateThemeService = async (req, t) => {
  let updatedValues = { ...req.body };

  // Authorization Checks
  if (user.role === "etudiant") {
    throw new Error("ma3ndk theme matmodifih");
  }
  if (user.role !== "admin" && req.body.isValid) {
    throw new Error("You are not allowed to validate or unvalidate a theme");
  }

  // Remove unwanted fields
  delete updatedValues.tagsNames;
  delete updatedValues.prerequisitesNames;

  // Update based on user role
  let updated = 0;
  if (user.role === "entreprise") {
    [updated] = await Theme.update(updatedValues, {
      where: { id: req.params.id, isValid: false, idEntreprise: user.id },
      transaction: t,
    });
  } else if (user.role === "enseignant") {
    [updated] = await Theme.update(updatedValues, {
      where: { id: req.params.id, isValid: false, idEnseignant: user.id },
      transaction: t,
    });
  } else {
    [updated] = await Theme.update(updatedValues, {
      where: { id: req.params.id },
      transaction: t,
    });
  }

  // Check if the update was successful
  if (updated === 0) {
    throw new Error("Theme not found, already validated, or not yours");
  }

  // Update the theme tags
  // check if the tags exist
  const existingTags = await Tag.findAll({
    where: { name: { [Op.in]: tagsNames } },
    transaction: t,
  });

  const existingTagNames = existingTags.map((tag) => tag.name);
  const invalidTags = tagsNames.filter(
    (tag) => !existingTagNames.includes(tag)
  );

  if (invalidTags.length > 0) {
    throw new Error(`Some tags are invalid: ${invalidTags.join(", ")}`);
  }

  // get the theme that already marked for the theme
  const thisThemeTags = await ThemeTag.findAll({
    where: { idTheme: req.params.id },
  });
  const existingTagIds = existingTags.map((tag) => tag.id);
  const thisThemeTagsIds = thisThemeTags.map((tag) => tag.id);
  // tags to be added
  const addedTagsIds = existingTagIds.filter(
    (tagId) => !thisThemeTagsIds.includes(tagId)
  );
  // tags to be removed
  const removedTagsIds = thisThemeTagsIds.filter(
    (tagId) => !existingTagIds.includes(tagId)
  );
  // add the tags
  const themetagscomb = addedTagsIds.map((tagId) => {
    return { idTag: tagId, idTheme: req.params.id };
  });
  await ThemeTag.bulkCreate(themetagscomb, {
    validate: true,
    transaction: t,
  });
  // remove the tags
  await ThemeTag.destroy({
    where: { idTheme: req.params.id, idTag: { [Op.in]: removedTagsIds } },
    transaction: t,
  });

  await t.commit();
  return true;
};
