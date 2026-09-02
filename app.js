// ==========================================
// CONFIGURATION SUPABASE
// ==========================================
const SUPABASE_URL = 'VOTRE_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'VOTRE_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Charger la liste des équipements dans le menu déroulant
    chargerEquipements();
    
    // 2. Charger l'historique des interventions depuis Supabase
    chargerHistoriqueSupabase();

    // 3. Gérer la soumission du formulaire
    const form = document.getElementById('interventionForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des valeurs du formulaire
        const nouvelleIntervention = {
            equipement_id: document.getElementById('equipementSelect').value,
            date_intervention: document.getElementById('dateIntervention').value,
            heure_debut: document.getElementById('heureDebut').value,
            heure_fin: document.getElementById('heureFin').value,
            panne_resolue: document.getElementById('panneResolue').value,
            prestataire: document.getElementById('prestataire').value
        };

        // Envoi des données vers Supabase
        const { error } = await supabase
            .from('interventions')
            .insert([nouvelleIntervention]);

        if (error) {
            alert('Erreur lors de l\'enregistrement : ' + error.message);
        } else {
            alert('Intervention enregistrée et synchronisée avec Supabase !');
            form.reset();
            // Actualiser le tableau en temps réel
            chargerHistoriqueSupabase(); 
        }
    });
});

// ==========================================
// FONCTION : CHARGER LES ÉQUIPEMENTS
// ==========================================
async function chargerEquipements() {
    const select = document.getElementById('equipementSelect');
    select.innerHTML = '<option value="">-- Sélectionnez un équipement --</option>';

    const { data, error } = await supabase
        .from('equipements')
        .select('*')
        .order('code_lieu', { ascending: true });

    if (error) {
        console.error('Erreur chargement équipements:', error);
        return;
    }

    data.forEach(eq => {
        const option = document.createElement('option');
        option.value = eq.id;
        // Affiche clairement le code, le nom du lieu et l'appareil
        option.textContent = `[${eq.code_lieu}] ${eq.nom_lieu} - ${eq.nom_equipement} (${eq.type_equipement})`;
        select.appendChild(option);
    });
}

// ==========================================
// FONCTION : CHARGER L'HISTORIQUE
// ==========================================
async function chargerHistoriqueSupabase() {
    const tbody = document.getElementById('historiqueTable').querySelector('tbody');
    tbody.innerHTML = '';

    const { data, error } = await supabase
        .from('interventions')
        .select(`
            *,
            equipements (code_lieu, nom_lieu, nom_equipement, type_equipement)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erreur chargement historique:', error);
        return;
    }

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#777;">Aucune intervention enregistrée pour le moment.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        
        let lieuInfo = 'Lieu inconnu';
        if (item.equipements) {
            lieuInfo = `<strong>[${item.equipements.code_lieu}]</strong> ${item.equipements.nom_lieu}<br><small style="color: #666;">${item.equipements.nom_equipement} (${item.equipements.type_equipement})</small>`;
        }
        
        row.innerHTML = `
            <td>${lieuInfo}</td>
            <td>${item.date_intervention}</td>
            <td>${item.heure_debut} - ${item.heure_fin}</td>
            <td>${item.panne_resolue}</td>
            <td>${item.prestataire}</td>
        `;
        tbody.appendChild(row);
    });
}
