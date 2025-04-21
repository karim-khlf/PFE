import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fam1*bus2@frst.Md",
  database: "pfe",
  port: "3306",
});

const sql = `   
   CREATE TABLE IF NOT EXISTS users ( 
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   is_admin TINYINT(1) DEFAULT FALSE
   );

   CREATE TABLE IF NOT EXISTS etudiants(
   id INT PRIMARY KEY,
   numero_etudiant BIGINT NOT NULL UNIQUE,
   annee INT NOT NULL,
   moyenne DECIMAL(4,2) DEFAULT 0.00,
   points INT DEFAULT 0,
   id_groupe INT,
   FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE,
   FOREIGN KEY (id_groupe) REFERENCES groupes(id) ON DELETE SET NULL,
   CHECK (annee IN (2, 3, 4, 5))
   );
  
   CREATE TABLE IF NOT EXISTS  enseignants(
   id INT PRIMARY KEY,
   nss BIGINT NOT NULL UNIQUE,
   FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
   );
    
   CREATE TABLE IF NOT EXISTS entreprises(
   id INT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   adresse VARCHAR(255) NOT NULL,
   telephone VARCHAR(30) NOT NULL,
   FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
   );
      
   CREATE TABLE IF NOT EXISTS specialites(
   id INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS groupes(
   id INT AUTO_INCREMENT PRIMARY KEY,
   numero INT ,
   annee INT NOT NULL,
   id_chef INT UNIQUE, 
   id_theme INT,
   FOREIGN KEY (id_chef) REFERENCES etudiants(id) ON DELETE CASCADE,
   CHECK (annee IN (2, 3, 4, 5))
   );

   CREATE TABLE IF NOT EXISTS documents(
   id INT AUTO_INCREMENT PRIMARY KEY,
   type ENUM("CONCEPTION", "ARCHITECTURE", "DEPLOIEMENT") NOT NULL,
   date DATE NOT NULL,
   lien VARCHAR(255) NOT NULL,
   id_auteur INT NOT NULL,
   FOREIGN KEY (id_auteur) REFERENCES etudiants(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS classes(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   type ENUM("small", "medium", "large") NOT NULL
   );

   CREATE TABLE IF NOT EXISTS jurys(
   id INT AUTO_INCREMENT PRIMARY KEY,
   annee INT NOT NULL,
   id_specialite INT,
   id_chef INT NOT NULL,
   FOREIGN KEY (id_chef) REFERENCES enseignants(id) ON DELETE CASCADE,
   FOREIGN KEY (id_specialite) REFERENCES specialites(id) ON DELETE SET NULL,
   CHECK (annee IN (2, 3, 4, 5))
   );

   CREATE TABLE IF NOT EXISTS jurys_ensignants(
   id_jury INT NOT NULL,
   id_enseignant INT NOT NULL,
   PRIMARY KEY (id_enseignant, id_jury),
   FOREIGN KEY (id_jury) REFERENCES jurys(id) ON DELETE CASCADE,
   FOREIGN KEY (id_enseignant) REFERENCES enseignants(id) ON DELETE CASCADE,
   )

   CREATE TABLE IF NOT EXISTS tags(
   id INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS prerequisites(
   id INT AUTO_INCREMENT PRIMARY KEY,
   type ENUM("projet", "stage", "autre") NOT NULL
   );
    
   CREATE TABLE IF NOT EXISTS themes(
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description TEXT NOT NULL,
   annee INT NOT NULL, 
   is_valide TINYINT(1) DEFAULT FALSE, 
   id_enseignant INT NULL,
   id_entreprise INT NULL,
   id_specialite INT NULL,
   FOREIGN KEY (id_enseignant) REFERENCES enseignants(id) ON DELETE SET NULL,
   FOREIGN KEY (id_entreprise) REFERENCES entreprises(id) ON DELETE SET NULL,
   FOREIGN KEY (id_specialite) REFERENCES specialites(id) ON DELETE SET NULL,
   CHECK (annee IN (2, 3, 4, 5))
   );

   CREATE TABLE IF NOT EXISTS themes_tags(
   id_theme INT,
   id_tag INT, 
   PRIMARY KEY (id_theme, id_tag),
   FOREIGN KEY (id_theme) REFERENCES themes(id) ONDELETE CASCADE,
   FOREIGN KEY (id_tag) REFERENCES tags(id) ONDELETE CASCADE,
   )

   CREATE TABLE IF NOT EXISTS competences(
   id INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS etudiants_competences(
   id_etudiant INT NOT NULL,
   id_competence INT NOT NULL,
   PRIMARY KEY (id_etudiant, id_competence),
   degree ENUM("high", "low", "medium") NOT NULL,
   FOREIGN KEY (id_etudiant) REFERENCES etudiants(id) ON DELETE CASCADE,
   FOREIGN KEY (id_competence) REFERENCES competences(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS groupes_needs(
   id_groupe INT NOT NULL,
   id_competence INT NOT NULL,
   PRIMARY Key (id_groupe, id_competence),
   FOREIGN KEY (id_groupe) REFERENCES groupes(id) ON DELETE CASCADE,
   FOREIGN KEY (id_competence) REFERENCES competences(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS soutenances(
   id INT AUTO_INCREMENT PRIMARY KEY,
   date DATE NOT NULL,
   id_groupe INT NOT NULL,
   id_jurys INT NOT NULL,
   id_classe INT NOT NULL,
   FOREIGN KEY (id_groupe) REFERENCES groupes(id) ON DELETE CASCADE,
   FOREIGN KEY (id_jurys) REFERENCES jurys(id) ON DELETE CASCADE,
   FOREIGN KEY (id_classe) REFERENCES classes(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS soutenance_evaluations(
   note DECIMAL(4,2) NOT NULL,
   remarque TEXT,
   id_soutenance INT NOT NULL,
   id_etudiant INT NOT NULL,
   PRIMARY KEY (id_soutenance, id_etudiant),
   FOREIGN KEY (id_soutenance) REFERENCES soutenances(id) ON DELETE CASCADE,
   FOREIGN KEY (id_etudiant) REFERENCES etudiants(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS themes_prerequisites(
   id_theme INT NOT NULL,
   id_prerequisite INT NOT NULL,
   degree ENUM("high", "low","medium") NOT NULL,
   PRIMARY KEY (id_theme, id_prerequisite),
   FOREIGN KEY (id_theme) REFERENCES themes(id) ON DELETE CASCADE,
   FOREIGN KEY (id_prerequisite) REFERENCES prerequisites(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS meets(
   id INT AUTO_INCREMENT PRIMARY KEY,
   date DATE NOT NULL,
   rapport TEXT,
   id_groupe INT NOT NULL,
   id_enseignant INT NULL,
   id_entreprise INT NULL,
   FOREIGN KEY (id_groupe) REFERENCES groupes(id) ON DELETE CASCADE,
   FOREIGN KEY (id_enseignant) REFERENCES enseignants(id) ON DELETE SET NULL,
   FOREIGN KEY (id_entreprise) REFERENCES entreprises(id) ON DELETE SET NULL
   );

   CREATE TABLE IF NOT EXISTS meet_evaluations(
   id_meet INT NOT NULL,
   id_etudiant INT NOT NULL,
   PRIMARY KEY (id_meet, id_etudiant),
   present TINYINT(1) DEFAULT FALSE NOT NULL,
   note DECIMAL(4,2) NOT NULL DEFAULT 0.00,
   remarque TEXT,
   FOREIGN KEY (id_meet) REFERENCES meets(id) ON DELETE CASCADE,
   FOREIGN KEY (id_etudiant) REFERENCES etudiants(id) ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS notifications(
   id INT AUTO_INCREMENT PRIMARY KEY,
   type ENUM("info", "warning", "meet") NOT NULL,
   id_enseignant INT NULL,
   id_entreprise INT NULL,
   id_etudiant INT NULL,
   id_groupe INT NULL,
   cible ENUM("groupe", "etudiant") NOT NULL,
   message TEXT NOT NULL,
   date DATE NOT NULL,
   FOREIGN KEY (id_enseignant) REFERENCES enseignants(id) ON DELETE SET NULL,
   FOREIGN KEY (id_entreprise) REFERENCES entreprises(id) ON DELETE SET NULL,
   FOREIGN KEY (id_etudiant) REFERENCES etudiants(id) ON DELETE SET NULL,
   FOREIGN KEY (id_groupe) REFERENCES groupes(id) ON DELETE SET NULL
   );
`;

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion:", err.message);
  } else {
    console.log("Connexion réussie à MySQL !");
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Erreur SQL:", err.message);
      } else {
        console.log("Tables existantes:", results);
      }
      db.end();
    });
  }
});
