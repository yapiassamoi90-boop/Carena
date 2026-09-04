// ==========================================
// CONFIGURATION SUPABASE
// ==========================================
const SUPABASE_URL = 'https://okudbyjsfaafuiezjihm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qOK5Be5WMFki88iVLnDhdw_NHxkkhrC';

let _supabase = null;
try {
    if (typeof supabase !== 'undefined') {
        const { createClient } = supabase;
        _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("❌ La bibliothèque Supabase n'est pas chargée dans le HTML !");
    }
} catch (err) {
    console.error("❌ Erreur d'initialisation Supabase :", err);
}

// Variable globale pour stocker l'historique et filtrer instantanément
let historiqueGlobal = [];

// ==========================================
// LISTE COMPLÈTE DES ÉQUIPEMENTS & VILLAS (Carena)
// ==========================================
const equipementsList = [
    // --- Ateliers, Bâtiments & Bureaux (61xxx) ---
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

    // --- Villas (62101 à 62120) ---
    { code: "62101", nom: "62101 - Villa n° 01" },
    { code: "62102", nom: "62102 - Villa n° 02" },
    { code: "62103", nom: "62103 - Villa n° 03" },
    { code: "62104", nom: "62104 - Villa n° 04" },
    { code: "62105", nom: "62105 - Villa n° 05" },
    { code: "62106", nom: "62106 - Villa n° 06" },
    { code: "62107", nom: "62107 - Villa n° 07" },
    { code: "62108", nom: "62108 - Villa n° 08" },
    { code: "62109", nom: "62109 - Villa n° 09" },
    { code: "62110", nom: "62110 - Villa n° 10" },
    { code: "62111", nom: "62111 - Villa n° 11" },
    { code: "62112", nom: "62112 - Villa n° 12" },
    { code: "62113", nom: "62113 - Villa n° 13" },
    { code: "62114", nom: "62114 - Villa n° 14" },
    { code: "62115", nom: "62115 - Villa n° 15" },
    { code: "62116", nom: "62116 - Villa n° 16" },
    { code: "62117", nom: "62117 - Villa n° 17" },
    { code: "62118", nom: "62118 - Villa n° 18" },
    { code: "62119", nom: "62119 - Villa n° 19" },
    { code: "62120", nom: "62120 - Villa n° 20" },

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

document.addEventListener('DOMContentLoaded', () => {
    remplirSelectEquipements();
    chargerHistorique();

    const dateField = document.getElementById('dateIntervention');
    if (dateField) {
        dateField.value = new Date().toISOString().split('T')[0];
    }

    const form = document.getElementById('interventionForm');
    if (form) {
        form.addEventListener('submit', enregistrerIntervention);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filtrerHistoriqueLocal);
    }

    // Gestion de l'aperçu de la photo en direct
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const aperçuContainer = document.getElementById('aperçuContainer');
            const imageApercu = document.getElementById('imageApercu');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imageApercu.src = event.target.result;
                    aperçuContainer.style.display = 'block';
                }
                reader.readAsDataURL(file);
            } else {
                aperçuContainer.style.display = 'none';
            }
        });
    }
});

// Fonction pour afficher une notification visuelle in-app
function afficherNotification(message, type = 'succes') {
    const notif = document.getElementById('notification');
    if (!notif) return;
    
    notif.textContent = message;
    notif.style.display = 'block';
    
    if (type === 'succes') {
        notif.style.backgroundColor = '#d1e7dd';
        notif.style.color = '#0f5132';
        notif.style.border = '1px solid #badbcc';
    } else {
        notif.style.backgroundColor = '#f8d7da';
        notif.style.color = '#842029';
        notif.style.border = '1px solid #f5c2c7';
    }

    setTimeout(() => {
        notif.style.display = 'none';
    }, 5000);
}

function remplirSelectEquipements() {
    const select = document.getElementById('equipementSelect');
    if (!select) return;

    equipementsList.sort((a, b) => a.nom.localeCompare(b.nom));
    select.innerHTML = '<option value="">-- Sélectionnez un équipement ou atelier --</option>';

    equipementsList.forEach(eq => {
        const option = document.createElement('option');
        option.value = eq.nom;
        option.textContent = eq.nom;
        select.appendChild(option);
    });
}

async function enregistrerIntervention(e) {
    e.preventDefault();
    if (!_supabase) {
        afficherNotification("Erreur : Base de données non connectée.", "erreur");
        return;
    }

    const equipementVal = document.getElementById('equipementSelect').value;
    const dateVal = document.getElementById('dateIntervention').value;
    const heureDebutVal = document.getElementById('heureDebut').value;
    const heureFinVal = document.getElementById('heureFin').value;
    const panneVal = document.getElementById('panneResolue').value;
    const prestataireVal = document.getElementById('prestataire').value;
    const photoInput = document.getElementById('photoInput');

    if (!equipementVal) {
        afficherNotification('Veuillez sélectionner un équipement ou une villa.', 'erreur');
        return;
    }

    let photoUrlVal = '';
    if (photoInput && photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        try {
            // Compression automatique de l'image (max 800px de large, qualité 70%)
            photoUrlVal = await compresserImageEnBase64(file, 800, 0.7);
        } catch (err) {
            console.warn('Compression échouée, utilisation directe :', err);
            photoUrlVal = await convertirFichierEnBase64(file);
        }
    }

    const interventionData = {
        equipment: equipementVal,
        date_intervention: dateVal,
        heure_debut: heureDebutVal || null,
        heure_fin: heureFinVal || null,
        panne_travail: panneVal || '',
        prestataire: prestataireVal || '',
        photo_url: photoUrlVal || ''
    };

    try {
        const { error } = await _supabase
            .from('interventions_maintenance')
            .insert([interventionData]);

        if (error) throw new Error(error.message);

        afficherNotification('✅ Intervention enregistrée avec succès !');
        
        document.getElementById('interventionForm').reset();
        document.getElementById('dateIntervention').value = new Date().toISOString().split('T')[0];
        if (photoInput) photoInput.value = '';
        
        // Cacher l'aperçu de l'image
        const aperçuContainer = document.getElementById('aperçuContainer');
        if (aperçuContainer) aperçuContainer.style.display = 'none';

        chargerHistorique();

    } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error);
        afficherNotification('Erreur Supabase : ' + error.message, 'erreur');
    }
}

// Fonction de compression d'image pour optimiser la taille du Base64
function compresserImageEnBase64(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
}

function convertirFichierEnBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function chargerHistorique() {
    const tbody = document.querySelector('#historiqueTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#777;">Chargement de l\'historique...</td></tr>';

    if (!_supabase) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:red;">Erreur : Connexion Supabase absente.</td></tr>';
        return;
    }

    try {
        const { data, error } = await _supabase
            .from('interventions_maintenance')
            .select('*')
            .order('date_intervention', { ascending: false });

        if (error) throw error;

        historiqueGlobal = data || [];

        if (historiqueGlobal.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#777;">Aucune intervention enregistrée pour le moment.</td></tr>';
            return;
        }

        afficherTableau(historiqueGlobal);

    } catch (error) {
        console.error('Erreur chargement historique :', error.message);
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red;">Erreur : ${error.message}</td></tr>`;
    }
}

function afficherTableau(donnees) {
    const tbody = document.querySelector('#historiqueTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    donnees.forEach(item => {
        const nomEquipement = item.equipment || item.equipement || '';
        
        // Affichage propre de la photo sous forme de miniature carrée cliquable
        let photoHtml = '<span style="color: #94a3b8; font-size: 0.85rem;">Aucune</span>';
        if (item.photo_url && item.photo_url.startsWith('data:image')) {
            photoHtml = `
                <a href="${item.photo_url}" target="_blank" title="Cliquer pour voir l'image en grand">
                    <img src="${item.photo_url}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                </a>`;
        } else if (item.photo_url) {
            photoHtml = `<a href="${item.photo_url}" target="_blank" style="font-size: 0.85rem; color: #0284c7; text-decoration: underline; font-weight: 500;">📷 Voir</a>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${nomEquipement}</strong></td>
            <td>${item.date_intervention || ''}</td>
            <td>${item.heure_debut || '--:--'} - ${item.heure_fin || '--:--'}</td>
            <td>${item.panne_travail || ''}</td>
            <td><em>${item.prestataire || ''}</em></td>
            <td style="text-align: center; vertical-align: middle;">${photoHtml}</td>
            <td style="text-align: center; vertical-align: middle; white-space: nowrap;">
                <button onclick="supprimerIntervention(${item.id})" style="background-color: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 6px 10px; border-radius: 6px; font-size: 0.85rem; cursor: pointer;" title="Supprimer">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function supprimerIntervention(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette intervention ?')) {
        return;
    }

    try {
        const { error } = await _supabase
            .from('interventions_maintenance')
            .delete()
            .eq('id', id);

        if (error) throw error;

        afficherNotification('🗑️ Intervention supprimée avec succès !');
        chargerHistorique();

    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        afficherNotification('Erreur lors de la suppression : ' + error.message, 'erreur');
    }
}

function filtrerHistoriqueLocal(e) {
    const termeRecherche = (e.target.value || '').toLowerCase().trim();

    const donneesFiltrees = historiqueGlobal.filter(item => {
        const eq = (item.equipment || item.equipement || '').toLowerCase();
        const panne = (item.panne_travail || '').toLowerCase();
        const prestataire = (item.prestataire || '').toLowerCase();
        const date = (item.date_intervention || '').toLowerCase();

        return eq.includes(termeRecherche) ||
               panne.includes(termeRecherche) ||
               prestataire.includes(termeRecherche) ||
               date.includes(termeRecherche);
    });

    afficherTableau(donneesFiltrees);
}
