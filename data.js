// -- LIRE / SAUVEGARDER LES DONNÉES --------------------------

function lireEmployes() {
  var donnees = localStorage.getItem('mh_employes');
  if (donnees === null) return [];
  return JSON.parse(donnees);
}

function sauvegarderEmployes(liste) {
  localStorage.setItem('mh_employes', JSON.stringify(liste));
}

function lireHoraires() {
  var donnees = localStorage.getItem('mh_horaires');
  if (donnees === null) return [];
  return JSON.parse(donnees);
}

function sauvegarderHoraires(liste) {
  localStorage.setItem('mh_horaires', JSON.stringify(liste));
}


// -- IDENTIFIANT UNIQUE --------------------------------------
// Génère un id unique du style "ltz4k8f2" pour chaque employé ou entrée

function genererID() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}


// -- INITIALES -----------------------------------------------
// Reçoit un employé, retourne ses initiales ex: "JD" pour Jean Dupont

function initiales(employe) {
  var premiereLetterPrenom = employe.prenom[0] || '';
  var premiereLetterNom = employe.nom[0] || '';
  return (premiereLetterPrenom + premiereLetterNom).toUpperCase();
}


// -- DATE D'AUJOURD'HUI --------------------------------------
// Retourne la date du jour au format "2026-02-20" (utilisé par <input type="date">)

function dateAujourdhui() {
  return new Date().toISOString().slice(0, 10);
}


// -- CONVERTIR UNE HEURE EN MINUTES --------------------------
// Ex : "09:30" → 570

function heureEnMinutes(heure) {
  var parties = heure.split(':');
  var heures = Number(parties[0]);
  var minutes = Number(parties[1]);
  return heures * 60 + minutes;
}


// -- CONVERTIR DES MINUTES EN HEURE LISIBLE ------------------
// Ex : 570 → "9h30"

function minutesEnHeure(totalMinutes) {
  var heures = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;
  var minutesStr = minutes.toString().padStart(2, '0'); // "5" → "05"
  return heures + 'h' + minutesStr;
}


// -- FORMATER UNE DATE EN FRANÇAIS ---------------------------
// Ex : "2026-02-20" → "20/02/2026"

function formaterDateFR(dateISO) {
  var parties = dateISO.split('-');
  var annee = parties[0];
  var mois = parties[1];
  var jour = parties[2];
  return jour + '/' + mois + '/' + annee;
}


// -- AFFICHER UNE NOTIFICATION -------------------------------
// Affiche un petit message en bas d'écran pendant 3 secondes

function afficherToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

