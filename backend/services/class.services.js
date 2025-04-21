import Class from "../models/class";

export const createClassService = async (req) => {
  const newClass = await Class.create(req.body.params);
  if (!newClass) {
    throw new Error(
      "the class does not created, somethig went wrong, please retry"
    );
  }
  return newClass;
};
export const deleteClassService = async (req) => {
  const numberOfDeletedClasses = await Class.destroy({
    where: req.body.classId,
  });
  if (numberOfDeletedClasses === 0) {
    throw new Error("the class you want to delete does not exist");
  }
  return true;
};
export const updateClassService = async (req) => {
  const updatedClass = await Class.update(
    { ...req.body },
    { where: { id: req.params.id } }
  );
  if (!updatedClass) {
    throw new Error("the class does not updated!");
  }
  return updatedClass;
};
export const getClassService = async (req) => {
  const requestedClass = await Class.findByPk(req.params.id);
  if (!requestedClass) {
    throw new Error("the class you requested does not exist");
  }
  return requestedClass;
};
export const getAllClassesService = async (req) => {
  const where = req.query.type ? { type: req.query.type } : {};
  const classes = await Class.findAll({ where });
  return classes;
};
