import { Entreprise, User } from "../models/index.js";
import bcrypt from "bcryptjs";

export const getAllEntreprisesService = async () => {
  const entreprises = await Entreprise.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });
  if (entreprises.length === 0) {
    throw new Error("Aucun entreprise trouvé");
  }

  // const users = await User.findAll({where})
  return entreprises;
};

export const getEntrepriseService = async (req) => {
  const entreprise = await Entreprise.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });
  if (!entreprise) {
    throw new Error("entreprise not found");
  }
  return entreprise;
};

export const createEntrepriseService = async (req, t) => {
  const { name, email, password, numeroSociale, numeroTel, addresse } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !numeroSociale ||
    !numeroTel ||
    !addresse
  ) {
    throw new Error(
      "Veuillez renseigner tous les champs: name, email, password, nss"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 16);

  const user = await User.create(
    { name, email, password: hashedPassword, role: "entreprise" },
    { transaction: t }
  );
  if (!user) {
    throw new Error("could not create Entreprise");
  }
  let entreprise = await Entreprise.create(
    { id: user.id, numeroSociale, numeroTel, addresse },
    { transaction: t }
  );
  if (!entreprise) {
    throw new Error("could not create Entreprise");
  }
  entreprise = await Entreprise.findOne({
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });
  return entreprise;
};

export const deleteEntrepriseService = async (req, t) => {
  const { id } = req.params;
  const entreprise = await Entreprise.findByPk(id, {
    attributes: ["id"],
    transaction: t,
  });

  if (!entreprise) {
    throw new Error("Entreprise not found to delete");
  }

  await User.destroy({ where: { id }, transaction: t });
  await Entreprise.destroy({ where: { id }, transaction: t });
  return true;
};

export const updateEntrepriseService = async (req, t) => {
  const { name, email, password, numeroSociale, numeroTel, addresse } =
    req.body;
  const { id } = req.params;
  let user = await User.findByPk(id, {
    transaction: t,
  });
  if (!user) {
    await t.rollback();
    throw new Error("Entreprise not found");
  }

  let entreprise = await Entreprise.findByPk(user.id, { transaction: t });
  if (!entreprise) {
    await t.rollback();
    throw new Error("Entreprise not found");
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

  let updatedEntreprise = false;
  if (addresse || numeroSociale || numeroTel) {
    const etudiantUpdates = {
      numeroSociale: numeroSociale || entreprise.numeroSociale,
      numeroTel: numeroTel || entreprise.numeroTel,
      adress: addresse || entreprise.addresse,
    };
    const [updated] = await Etudiant.update(
      { ...etudiantUpdates },
      { where: { userId: id }, transaction: t }
    );
    updatedEntreprise = updated > 0;
  }

  if (!updatedUser && !updatedEntreprise) {
    return res.status(404).json({ error: "No updates were made." });
  }
  const newEntreprise = await Entreprise.findOne({
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });

  return newEntreprise;
};
