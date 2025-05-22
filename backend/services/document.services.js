import Document from "../models/document.js"
import cloudinary from "../utils/cloudinary.js"
import { getPublicIdFromUrl } from "../utils/cloudinary.js"

export const createDocumentService = async(req) => {
    if (!req.file) {
        throw new Error("No file uploaded")
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "raw",
          access_mode: "public",
          folder: "pdfs" 
      })
    const newDocument = await Document.create({
        type:req.body.type,
        date:Date.now(),
        lien: result.secure_url,
        idAuteur:req.body.idAuteur

    })
    return newDocument
}

export const deleteDocumentService = async (req)=>{
    const documents = await Document.findByPk(req.params.id)
    const publicid= getPublicIdFromUrl(documents.lien)
    cloudinary.uploader.destroy(publicid, (error, result) => {
        if (error) {
          console.log('Error deleting PDF:', error);
        } else {
          console.log('PDF deleted successfully:', result);
        }
      });
      const deletedDocuments = await Document.destroy({
      where:{id:req.params.id}})
    if (deletedDocuments===0) {
        throw new Error ("The document you want to delete does not exist")

    }
    return true
};

export const updateDocumentService = async (req)=>{
    const newPDF= req.body.newPDF
    var result 
    console.log(result)
    if (newPDF && !req.file ) {
        throw new Error("No file uploaded")
    }
    
        const document = await Document.findByPk(req.params.id);
     if (newPDF) {
       const publicid = getPublicIdFromUrl(document.lien)
         result = await cloudinary.uploader.upload(req.file.path, {
        public_id: publicid,  
        resource_type: 'raw',
        access_mode:"public",
        folder:"pdfs"  
      })
     }
     const newlien = result?.secure_url || document.lien;
        if (!document) {
          throw new Error("Document not found")
        }
    
        await document.update({...req.body, lien :newlien});

        return document
}
export const getDocumentService = async (req) =>{
    const requestedDocument = await Document.findByPk(req.params.id);
    if (!requestedDocument) {
        throw new Error ("The document you requested does not exist");

    }
    return requestedDocument;
}
export const getAllDocumentService = async (req) =>{
    const where = req.query.idAuteur ? {idAuteur:req.query.idAuteur} : {}
    const documents = await Document.findAll({where})
    return documents;
}