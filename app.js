// ==========================================
// CONFIGURATION SUPABASE
// ==========================================
// Remplace ces valeurs par tes identifiants de projet Supabase
const SUPABASE_URL = 'VOTRE_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'VOTRE_SUPABASE_ANON_KEY';

// Initialisation du client Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// LISTE COMPLÈTE DES ÉQUIPEMENTS & ATELIERS (Carena)
// ==========================================
const equipementsList = [
    // --- Ateliers & Bâtiments (61xxx / 62xxx) ---
    { code: "61001", nom: "61001 - Bureaux Direction Production" },
    { code: "61002", nom: "61002 - Bâtiments magasins et parc à tôles" },
    { code: "61003", nom: "61003 - Bâtiment Peinture Anticorrosion" },
    { code: "61005", nom: "61005 - Bâtiment Chaudronnerie" },
    { code: "61006", nom: "61006 - Bâtiment Nettoyage Industriel" },
    { code: "61009", nom: "61009 - Bâtiment Menuiserie" },
    { code: "61010", nom: "61010 - Bâtiment Services Généraux et entretien" },
    { code: "61011", nom: "61011 - GUICHET EXPRESS CARENA - 2016" },
    { code: "61015", nom: "61015 - Bâtiment Mécanique Bord" },
    { code: "61016", nom: "61016 - Bâtiment Maintenance" },
    { code: "61017", nom: "61017 - Direction Générale - Frais généraux" },
    { code: "61018", nom: "61018 - Direction Financière - Frais généraux" },
    { code: "61019", nom: "61019 - Service Informatique - Frais généraux" },
    { code: "61020", nom: "61020 - Direction des Ressources Humaines - Frais généraux" },
    { code: "61021", nom: "61021 - Centre médical CARENA" },
    { code: "61022", nom: "61022 - SERVICE QHSSE - Frais généraux" },
    { code: "61024", nom: "61024 - Parc à tôles N°2" },
    { code: "61025", nom: "61025 - Bâtiment Electricité" },
    { code: "61026", nom: "61026 - Bureaux Administration" },
    { code: "61028", nom: "61028 - Hangar Mag. Bois" },
    { code: "61030", nom: "61030 - Quais" },
    { code: "61031", nom: "61031 - Bâtiment Machine-Outils" },
    { code: "61032", nom: "61032 - Bâtiment Tuyauterie" },
    { code: "61036", nom: "61036 - Bâtiment Manutention-Levage" },
    { code: "61037", nom: "61037 - QUAI SAN PEDRO" },
    { code: "61038", nom: "61038 - Bureaux San Pedro" },
    { code: "61041", nom: "61041 - Bâtiment atelier sauvetage" },
    { code: "61042", nom: "61042 - Hangar Cidex" },
    { code: "61045", nom: "61045 - Hangar & matériel de sablage" },
    { code: "61535", nom: "61535 - Réseau eau & air" },
    { code: "61536", nom: "61536 - Réseau électrique & transformateurs" },
    { code: "62101", nom: "62101 - Villa n° 01" },
    { code: "62102", nom: "62102 - Villa n° 02" },
    { code: "62103", nom: "62103 - Villa n° 03" },
    { code: "62105", nom: "62105 - Villa n° 05" },
    { code: "62106", nom: "62106 - Villa n° 06" },
    { code: "62107", nom: "62107 - Villa n° 07" },
    { code: "62108", nom: "62108 - Villa n° 08" },

    // --- Machines & Équipements Industriels (63xxx) ---
    { code: "63001", nom: "63001 - Poste de soudure ARC" },
    { code: "63011", nom: "63011 - Groupe motopompe" },
    { code: "63012", nom: "63012 - Ventilateur extracteur d'air" },
    { code: "63035", nom: "63035 - POSTE DE SOUDURE TIG" },
    { code: "63043", nom: "63043 - POSTES DE SOUDURE SEMI AUTO" },
    { code: "63065", nom: "63065 - POMPE GRACXTREME" },
    { code: "63073", nom: "63073 - FONTAINE REFRIGERANTE - Tuyauterie" },
    { code: "63075", nom: "63075 - CHAUFFE EAU POUR POMPE - Nettoyage Industriel" },
    { code: "63100", nom: "63100 - KARCHER HDS 10/20-4 M 200B 380V" },
    { code: "63220", nom: "63220 - POSTE A SOUDER SAFEX C2 N°1" },
    { code: "63221", nom: "63221 - POSTE A SOUDER SAFEX C2 N°2" },
    { code: "63222", nom: "63222 - NETTOYEUR HP EAU CHAUDE HDS SUPER" },
    { code: "63225", nom: "63225 - Pompe de détartrage KAMCO C210" },
    { code: "63536", nom: "63536 - Tour Sculfort Maxicap 129130" },
    { code: "63546", nom: "63546 - Pont roulant tour 8 (YALE- 5 Tonnes)" },

    // --- Véhicules, Grues & Engins (65xxx / 77xxx) ---
    { code: "65365", nom: "65365 - RENAULT LOGAN 1.2L 7586 HA 01" },
    { code: "65366", nom: "65366 - Mitsubishi L200 184 HK 01 - Manutention" },
    { code: "65501", nom: "65501 - Grue à tour BPR n° 5 type GT 229 B" },
    { code: "65513", nom: "65513 - NACELLE ARTICULEE HAULOTTE N°1" },
    { code: "65523", nom: "65523 - CHARIOT ELEVATEUR 5 TONNES H5.OFT" },
    { code: "77060", nom: "77060 - ENTRETIEN TRANSFORMATEURS & REMPLACEMENT CELLULES" },

    // --- Consommables Véhicules, Nacelles & Engins Maritimes (85xxx - 87xxx) ---
    { code: "85367", nom: "85367 - Conso. MITSUBISHI L200 936 HL 01 - ADMINISTRATION" },
    { code: "85368", nom: "85368 - Conso. RENAULT DUSTER 3388WW01 - Yann PERRET" },
    { code: "85369", nom: "85369 - Conso. RENAULT DOKKER VAN 1.5L - 8841WW01 (Supply Chain)" },
    { code: "85375", nom: "85375 - Conso DUSTER WWW6629CI01 DAC44587 (LAMAISON)" },
    { code: "85503", nom: "85503 - Consom. grue mobile" },
    { code: "85504", nom: "85504 - Consom. fourchette Cat." },
    { code: "85506", nom: "85506 - Conso. GRUE FLOTTANTE PIC-BOEUF" },
    { code: "85507", nom: "85507 - Conso. GRUE A TOUR N°5 TEREX" },
    { code: "85512", nom: "85512 - Conso NACELLE HAULOTTE N°4 HA18PX (Peinture)" },
    { code: "85513", nom: "85513 - CONSO NACELLE ARTICULEE HAULOTTE N°1" },
    { code: "85514", nom: "85514 - Conso CHARIOT ELEVATEUR HYSTER H7" },
    { code: "85515", nom: "85515 - Conso. Chariot élévateur Hyster H3.OFT" },
    { code: "85517", nom: "85517 - Conso MITSUBISHI PICK UP - 5984 GP 01 (Administration)" },
    { code: "85519", nom: "85519 - Conso NACELLE HAULOTTE N°2 (2015)" },
    { code: "85520", nom: "85520 - Conso NACELLE HAULOTTE N°3 (2015)" },
    { code: "85521", nom: "85521 - Conso PEUGEOT 2008 4x2 (2015 - F. BLEDOU)" },
    { code: "85522", nom: "85522 - Conso MITSUBISHI L200 184 GV 01 (2015 - MAGASIN)" },
    { code: "85523", nom: "85523 - Conso. CHARIOT ELEVATEUR 5 TONNES H5.OFT - 4000 MM (2015)" },
    { code: "85524", nom: "85524 - Conso. CHARIOT ELEVATEUR 5 TONNES H5.OFT - 6000 MM (2015)" },
    { code: "85525", nom: "85525 - Conso CHARIOT ELEVATEUR HYSTER H3 FORTENS" },
    { code: "85526", nom: "85526 - CONSO. CHARIOT ELEVATEUR HYSTER H7.OFT de 7 tonnes" },
    { code: "87000", nom: "87000 - Consom. compresseur Bauer plongeurs" },
    { code: "87017", nom: "87017 - Conso. 4e Dock flottant 10 800 tonnes" },
    { code: "87024", nom: "87024 - Consom. dock flottant 2 000 tonnes" },
    { code: "87032", nom: "87032 - Consom. remorqueur Mossi" },
    { code: "87035", nom: "87035 - Consom. vedette Guere" },
    { code: "87038", nom: "87038 - Conso. PONTONS INCENDIE - HSE" },
    { code: "87040", nom: "87040 - Consom. dock 10 000 tonnes" },
    { code: "87042", nom: "87042 - Consom. ponton et grue flottante" },
    { code: "87047", nom: "87047 - Consom. vedette Samba" },
    { code: "87048", nom: "87048 - Consom. vedette Gbele" },
    { code: "87068", nom: "87068 - Conso. Remorqueur Ebra" },
    { code: "87072", nom: "87072 - Consom. remorqueur Abroka" }
];

// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    chargerEquipementsSelect();
    chargerHistorique();

    // Date du jour par défaut sur le formulaire
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateIntervention').value = today;

    // Écouteur pour la soumission du formulaire
    document.getElementById('interventionForm').addEventListener('submit', enregistrerIntervention);

    // Écouteur pour la recherche en temps réel dans l'historique
    document.getElementById('searchInput').addEventListener('input', filtrerHistorique);
});

// ==========================================
// CHARGEMENT DES ÉQUIPEMENTS DANS LE SELECT
// ==========================================
function chargerEquipementsSelect() {
    const select = document.getElementById('equipementSelect');
    select.innerHTML = '<option value="">-- Sélectionnez un équipement ou atelier --</option>';

    // Tri alphabétique par nom
    equipementsList.sort((a, b) => a.nom.localeCompare(b.nom));

    equipementsList.forEach(eq => {
        const option = document.createElement('option');
        option.value = eq.nom; // On stocke le libellé complet
        option.textContent = eq.nom;
        select.appendChild(option);
    });
}

// ==========================================
// ENREGISTRER UNE INTERVENTION (SUPABASE)
// ==========================================
async function enregistrerIntervention(e) {
    e.preventDefault();

    const interventionData = {
        equipement: document.getElementById('equipementSelect').value,
        date_intervention: document.getElementById('dateIntervention').value,
        heure_debut: document.getElementById('heureDebut').value,
        heure_fin: document.getElementById('heureFin').value,
        panne_travail: document.getElementById('panneResolue').value,
        prestataire: document.getElementById('prestataire').value
    };

    try {
        const { data, error } = await _supabase
            .from('interventions_maintenance') // Nom de ta table Supabase
            .insert([interventionData]);

        if (error) throw error;

        alert('Intervention enregistrée avec succès !');
        document.getElementById('interventionForm').reset();
        
        // Remettre la date du jour après reset
        document.getElementById('dateIntervention').value = new Date().toISOString().split('T')[0];
        
        // Recharger l'historique
        chargerHistorique();

    } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error.message);
        alert('Erreur lors de l\'enregistrement de l\'intervention. Vérifie ta connexion ou la console.');
    }
}

// ==========================================
// CHARGER L'HISTORIQUE DEPUIS SUPABASE
// ==========================================
async function chargerHistorique() {
    const tbody = document.querySelector('#historiqueTable tbody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#777;">Chargement de l\'historique...</td></tr>';

    try {
        const { data, error } = await _supabase
            .from('interventions_maintenance')
            .select('*')
            .order('date_intervention', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#777;">Aucune intervention enregistrée pour le moment.</td></tr>';
            return;
        }

        afficherTableau(data);

    } catch (error) {
        console.error('Erreur chargement historique :', error.message);
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">Erreur de chargement des données.</td></tr>';
    }
}

// ==========================================
// AFFICHAGE DU TABLEAU
// ==========================================
function afficherTableau(donnees) {
    const tbody = document.querySelector('#historiqueTable tbody');
    tbody.innerHTML = '';

    donnees.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.equipement}</strong></td>
            <td>${item.date_intervention}</td>
            <td>${item.heure_debut} - ${item.heure_fin}</td>
            <td>${item.panne_travail}</td>
            <td><em>${item.prestataire}</em></td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================
// RECHERCHE / FILTRE DANS L'HISTORIQUE
// ==========================================
async function filtrerHistorique(e) {
    const termeRecherche = e.target.value.toLowerCase();
    
    try {
        const { data, error } = await _supabase
            .from('interventions_maintenance')
            .select('*')
            .order('date_intervention', { ascending: false });

        if (error) throw error;

        const donneesFiltrees = data.filter(item => 
            item.equipement.toLowerCase().includes(termeRecherche) ||
            item.panne_travail.toLowerCase().includes(termeRecherche) ||
            item.prestataire.toLowerCase().includes(termeRecherche) ||
            item.date_intervention.includes(termeRecherche)
        );

        afficherTableau(donneesFiltrees);

    } catch (error) {
        console.error('Erreur lors du filtrage :', error);
    }
}
