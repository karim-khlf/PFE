import { Entreprise, User } from "../models/index.js";

export const getAllEntreprisesService = async () => {
  const entreprises = await Entreprise.findAll();
  if (enseignants.length === 0) {
    throw new Error("Aucun enseignant trouvé");
  }
  return entreprises;
};

export const getEntrepriseService = async (req) => {
  const entreprise = await Entreprise.findByPk(req.params.id);
  if (!entreprise) {
    throw new Error("enseignant not found");
  }
  return entreprise;
};

export const createEntrepriseService = async (req) => {
  const { name, email, password, numeroSociale, numeroTel, adress } = req.body;
  if (!name || !email || !password || !numeroSociale || !numeroTel || !adress) {
    throw new Error(
      "Veuillez renseigner tous les champs: name, email, password, nss"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 16);
  const t = await sequelize.transaction();

  const user = await User.create(
    { name, email, password: hashedPassword },
    { transaction: t }
  );
  if (!user) {
    t.rollback();
    throw new Error("could not create Enseignant");
  }
  const entreprise = await Entreprise.create(
    { id: user.id, nss, idSpecialite: specialite.id },
    { transaction: t }
  );
  await t.commit();
  if (!entreprise) {
    t.rollback();
    throw new Error("could not create Enseignant");
  }
  return entreprise;
};

export const deleteEntrepriseService = async (req) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  const entreprise = await Entreprise.findByPk(id, {
    attributes: ["id"],
    transaction: t,
  });

  if (!entreprise) {
    await t.rollback();
    throw new Error("Entreprise not found to delete");
  }

  await User.destroy({ where: { id }, transaction: t });

  await t.commit();
  return true;
};

export const updateEntrepriseService = async (req) => {
  const { name, email, password, numeroSociale, numeroTel, adress } = req.body;
  const { id } = req.params;
  const t = await sequelize.transaction();

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
  if (nss || specialiteName) {
    const etudiantUpdates = {
      numeroSociale: numeroSociale || entreprise.numeroSociale,
      numeroTel: numeroTel || entreprise.numeroTel,
      adress: adress || entreprise.adress,
    };
    const [updated] = await Etudiant.update(
      { ...etudiantUpdates },
      { where: { userId: id }, transaction: t }
    );
    updatedEntreprise = updated > 0;
  }

  if (!updatedUser && !updatedEntreprise) {
    await t.rollback();
    return res.status(404).json({ error: "No updates were made." });
  }

  await t.commit();
  return true;
};
