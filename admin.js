// L'id de l'employé en cours d'édition
var idEmployeEnEdition = null;

// AFFICHER LES EMPLOYÉS
// ===============================
function afficherTableauEmployes() {
  var employes = lireEmployes();
  var tbody = document.getElementById("emp-tbody");

  if (employes.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>Aucun employé</td></tr>";
    return;
  }

  var html = "";
  for (var i = 0; i < employes.length; i++) {
    var e = employes[i];
    html += "<tr>";
    html += "<td>" + e.nom + "</td>";
    html += "<td>" + e.prenom + "</td>";
    html += "<td>" + (e.poste || "-") + "</td>";
    html += "<td>";
    html += "<button class=btn-sm onclick=\"ouvrirFormulaireEmploye('" + e.id + "')\">Modifier</button> ";
    html += "<button class=btn-sm onclick=\"supprimerEmploye('" + e.id + "')\">Supprimer</button>";
    html += "<button class=btn-sm onclick=\"voirEmploye('" + e.id + "')\">Voir</button>";
    html += "</td>";
    html += "</tr>";
  }
  tbody.innerHTML = html;
}


// OUVRIR LE FORMULAIRE
// ===============================
function ouvrirFormulaireEmploye(empID) {
  idEmployeEnEdition = empID;

  var prenom = "";
  var nom = "";
  var poste = "";

  if (empID) {
    var employes = lireEmployes();
    for (var i = 0; i < employes.length; i++) {
      if (employes[i].id == empID) {
        prenom = employes[i].prenom;
        nom = employes[i].nom;
        poste = employes[i].poste;
        break;
      }
    }
  }

  document.getElementById("fe-prenom").value = prenom;
  document.getElementById("fe-nom").value = nom;
  document.getElementById("fe-poste").value = poste;

  document.getElementById("emp-overlay").classList.add("open");
}

function fermerFormulaireEmploye() {
  document.getElementById("emp-overlay").classList.remove("open");
  idEmployeEnEdition = null;
}


// SAUVEGARDER EMPLOYÉ
// ===============================
function sauvegarderEmploye() {
  var prenom = document.getElementById("fe-prenom").value.trim();
  var nom = document.getElementById("fe-nom").value.trim();
  var poste = document.getElementById("fe-poste").value.trim();

  if (!prenom || !nom) {
    alert("Prénom et nom requis.");
    return;
  }

  var employes = lireEmployes();

  if (idEmployeEnEdition) {
    // Modifier
    for (var i = 0; i < employes.length; i++) {
      if (employes[i].id == idEmployeEnEdition) {
        employes[i].prenom = prenom;
        employes[i].nom = nom;
        employes[i].poste = poste;
        break;
      }
    }
  } else {
    // Ajouter
    employes.push({ id: genererID(), prenom: prenom, nom: nom, poste: poste });
  }

  sauvegarderEmployes(employes);
  fermerFormulaireEmploye();
  afficherTableauEmployes();
}


// SUPPRIMER EMPLOYE
// ===============================
function supprimerEmploye(empID) {

  var employes = lireEmployes();
  var nouvelle = [];

  for (var i = 0; i < employes.length; i++) {
    if (employes[i].id != empID) {
      nouvelle.push(employes[i]);
    }
  }

  sauvegarderEmployes(nouvelle);
  afficherTableauEmployes();
}


// VOIR EMPLOYE
// ===============================
function voirEmploye(empID) {
  var employes = lireEmployes();
  var employe = employes.find(e => e.id == empID);
  if (!employe) { alert("Employé introuvable"); return; }

  // Calculer total heures et repas
  var horaires = lireHoraires().filter(h => h.empID == empID);
  var totalMinutes = horaires.reduce((sum, h) => sum + h.dureeMin, 0);
  var repasCount = horaires.filter(h => h.repas).length;
  var totalHeures = (totalMinutes / 60).toFixed(1);

  // Contenu du modal détails
  var html = "";
  html += "<p><strong>Employé :</strong> " + employe.prenom + " " + employe.nom + "</p>";
  html += "<p><strong>Total heures :</strong> " + totalHeures + " h</p>";
  html += "<p><strong>Repas attribués :</strong> " + repasCount + "</p>";
  document.getElementById("details-content").innerHTML = html;

  // Mettre à jour le bouton historique avec le bon ID
  var btnHistorique = document.querySelector(".btn-historique");
  btnHistorique.setAttribute("onclick", "ouvrirHistorique('" + empID + "')");

  document.getElementById("details-overlay").classList.add("open");
}

function fermerDetailsEmploye() {
  document.getElementById("details-overlay").classList.remove("open");
}


function ouvrirHistorique(empID) {
  if (!empID) return;

  var horaires = lireHoraires().filter(h => h.empID == empID);
  var tbody = document.getElementById("historique-tbody");

  if (horaires.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Aucune entrée</td></tr>";
  } else {
    var html = "";
    for (var i = 0; i < horaires.length; i++) {
      var h = horaires[i];
      html += "<tr>";
      html += "<td>" + h.date + "</td>";
      html += "<td>" + h.debut + "</td>";
      html += "<td>" + h.fin + "</td>";
      html += "<td>" + (h.dureeMin/60).toFixed(1) + "</td>";
      html += "<td>" + (h.repas ? "Oui" : "Non") + "</td>";
      html += "</tr>";
    }
    tbody.innerHTML = html;
  }

  document.getElementById("historique-overlay").style.display = "flex";
}


// Fermer l'historique
function fermerHistorique() {
  document.getElementById("historique-overlay").style.display = "none";
}



// AU CHARGEMENT
// ===============================

document.addEventListener("DOMContentLoaded", function () {
afficherTableauEmployes();
});
