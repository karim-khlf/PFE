import sequelize  from "../index.js";
import {
    createDocumentService,
    deleteDocumentService,
    updateDocumentService,
    getAllDocumentService,
    getDocumentService
} from "../services/document.services.js";

export const createDocument = async (req,res)=>{
    try {
        const newDocuemnt = await createDocumentService(req);
        return res.status(200).json(newDocuemnt);
    
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteDocument = async(req,res)=>{
    try {
       await deleteDocumentService(req);
       return res.status(200).json({ message : "Deleted document succesfully"})
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const updateDocument = async(req,res)=>{
    try {
        const updatedDocument = await updateDocumentService(req);
        return res.status(200).json(updatedDocument)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getDocument = async(req,res)=>{
    try  {
        const requestedDocument = await getDocumentService(req);
        return res.status(200).json(requestedDocument)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllDocument = async(req,res)=>{
    try  {
        const requestedDocument = await getAllDocumentService(req);
        return res.status(200).json(requestedDocument)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}