import { Etudiant, User } from "../models/index.js";

export const deleteUserByRoleService = async (req, t, expectedRole) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { transaction: t });

  if (!user) {
    await t.rollback();
    throw new Error("Utilisateur introuvable");
  }

  if (user.role !== expectedRole) {
    await t.rollback();
    throw new Error(
      "Vous ne pouvez supprimer que des utilisateurs de type " + expectedRole
    );
  }

  if (user.role === "admin") {
    await t.rollback();
    throw new Error("Impossible de supprimer un admin");
  }

  await User.destroy({ where: { id }, transaction: t });
  await Etudiant.destroy({ where: { id }, transaction: t });

  return {
    message: `Utilisateur de rôle ${expectedRole} supprimé avec succès.`,
  };
};
