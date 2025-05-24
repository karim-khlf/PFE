  import { User, Specialite, Enseignant } from "../models/index.js";
import sequelize from "../index.js";
import bcrypt from "bcryptjs";

export const getAllEnseignantsService = async (req) => {
  const specialite = req.query.specialite || null;
  const enseignants = await Enseignant.findAll({
    where: specialite ? { specialite } : {}, // Avoid filtering with null
    include: [
    {
      model: User,
      attributes: ['name', 'email']
    },
    {
      model: Specialite,
      attributes: ['nom']
    }
  ]});

  if (enseignants.length === 0) {
    throw new Error("Aucun enseignant trouvé");
  }

  return enseignants;
};

export const getEnseignantService = async (req) => {
  const enseignant = await Enseignant.findByPk(req.params.id, {
  include: [
    {
      model: User,
      attributes: ['name', 'email']
    },
    {
      model: Specialite,
      attributes: ['nom']
    }
  ]
});

  if (!enseignant) {
    throw new Error("enseignant not found");
  }
  return enseignant;
};

export const createEnseignantService = async (req) => {
  const { name, email, password, specialiteName, nss } = req.body;
  if (!name || !email || !password || !nss) {
    throw new Error(
      "Veuillez renseigner tous les champs: name, email, password, nss"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 16);
  const t = await sequelize.transaction();

  let specialite;
  if (specialiteName) {
    specialite = await Specialite.findOne({
      where: { nom: specialiteName },
    });
    if (!specialite) {
      throw new Error("No specialite found ");
    }
  }

  const user = await User.create(
    { name, email, password: hashedPassword },
    { transaction: t }
  );
  if (!user) {
    t.rollback();
    throw new Error("could not create Enseignant");
  }
  const enseignant = await Enseignant.create(
    { id: user.id, nss, idSpecialite: specialite.id },
    { transaction: t }
  );
  await t.commit();
  if (!enseignant) {
    t.rollback();
    throw new Error("could not create Enseignant");
  }
  return enseignant;
};

  export const deleteEnseignantService = async (req) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
    const enseignant = await Enseignant.findByPk(id, {
      attributes: ["id"],
      transaction: t,
    });

    if (!enseignant) {
      throw new Error("Enseignant not found to delete");
    }

    if (enseignant.isAdmin) {
      throw new Error("Cannot delete an admin user");
    }

    await User.destroy({ where: { id }, transaction: t });
    await Enseignant.destroy({where:{id}, transaction: t})

    await t.commit();
    return true;
  } catch(error) {
    await t.rollback();
    throw error
  }
};

export const updateEnseignantService = async (req) => {
  const { name, email, password, nss, specialiteName } = req.body;
  const { id } = req.params;
  const t = await sequelize.transaction();

  let user = await User.findByPk(id, {
    transaction: t,
  });
  if (!user) {
    await t.rollback();
    throw new Error("Enseignant not found");
  }

  let enseignant = await Enseignant.findByPk(user.id, { transaction: t });
  if (!enseignant) {
    await t.rollback();
    throw new Error("Enseignant not found");
  }

  let specialite;
  if (specialiteName) {
    specialite = await Specialite.findOne({
      where: { name: specialite },
    });
    if (!specialite) {
      throw new Error("No specialite found ");
    }
  }

  let updatedUser = false;
  if (name || email || password) {
    const userUpdates = {
      name: name || user.name,
      email: email || user.email,
      password: password ? await bcrypt.hash(password, 16) : user.password,
    };
    const [updated] = await User.update(
      { ...userUpdates },
      { where: { id }, transaction: t }
    );
    updatedUser = updated > 0;
  }

  let updatedEnseignant = false;
  if (nss || specialiteName) {
    const etudiantUpdates = {
      nss: nss || enseignant.nss,
      idSpecialite: specialite.id || enseignant.idSpecialite,
    };
    const [updated] = await Etudiant.update(
      { ...etudiantUpdates },
      { where: { userId: id }, transaction: t }
    );
    updatedEtudiant = updated > 0;
  }

  if (!updatedUser && !updatedEnseignant) {
    await t.rollback();
    return res.status(404).json({ error: "No updates were made." });
  }

  await t.commit();
  return true;
};
